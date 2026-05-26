"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Search, Plus, MoreHorizontal, Edit, Trash2, Star, Loader2, AlertCircle, Inbox } from "lucide-react";

interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  approved: boolean;
  createdAt: string;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingTestimonial, setEditingTestimonial] = React.useState<Testimonial | null>(null);
  const [formData, setFormData] = React.useState({ name: "", role: "", company: "", content: "", rating: 5, approved: true });
  const [submitting, setSubmitting] = React.useState(false);
  const mountedRef = React.useRef(true);

  async function fetchTestimonials() {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("search", searchQuery);
      params.set("limit", "100");
      const res = await fetch(`/api/testimonials?${params}`);
      const json = await res.json();
      if (!mountedRef.current) return;
      if (!json.success) throw new Error(json.message || "Failed to fetch");
      setTestimonials(json.data);
    } catch (err) {
      if (!mountedRef.current) return;
      setError(err instanceof Error ? err.message : "Failed to load testimonials");
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }

  React.useEffect(() => {
    mountedRef.current = true;
    fetchTestimonials();
    return () => { mountedRef.current = false; };
  }, [searchQuery]);

  const openCreateDialog = () => {
    setEditingTestimonial(null);
    setFormData({ name: "", role: "", company: "", content: "", rating: 5, approved: true });
    setIsDialogOpen(true);
  };

  const openEditDialog = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      content: testimonial.content,
      rating: testimonial.rating,
      approved: testimonial.approved,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const url = editingTestimonial ? `/api/testimonials/${editingTestimonial._id}` : "/api/testimonials";
      const method = editingTestimonial ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Operation failed");
      setIsDialogOpen(false);
      fetchTestimonials();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Delete failed");
      fetchTestimonials();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const toggleApproved = async (testimonial: Testimonial) => {
    try {
      const res = await fetch(`/api/testimonials/${testimonial._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approved: !testimonial.approved }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Update failed");
      fetchTestimonials();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  };

  const filteredTestimonials = testimonials.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><h1 className="text-3xl font-bold">Testimonials</h1><p className="text-muted-foreground mt-1">Manage client testimonials</p></div>
        <Button onClick={openCreateDialog}><Plus className="mr-2 h-4 w-4" />Add Testimonial</Button>
      </div>

      <Card><CardContent className="p-4"><div className="relative max-w-md"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search testimonials..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" /></div></CardContent></Card>

      {loading ? (
        <Card><CardContent className="p-12 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></CardContent></Card>
      ) : error ? (
        <Card><CardContent className="p-12 flex flex-col items-center justify-center gap-2 text-destructive"><AlertCircle className="h-8 w-8" /><p>{error}</p><Button variant="outline" size="sm" onClick={fetchTestimonials}>Retry</Button></CardContent></Card>
      ) : filteredTestimonials.length === 0 ? (
        <Card><CardContent className="p-12 flex flex-col items-center justify-center gap-2 text-muted-foreground"><Inbox className="h-8 w-8" /><p>No testimonials found</p></CardContent></Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredTestimonials.map(testimonial => (
            <Card key={testimonial._id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{testimonial.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => openEditDialog(testimonial)}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleApproved(testimonial)}>
                        {testimonial.approved ? "Unapprove" : "Approve"}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(testimonial._id)}><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? "fill-warning text-warning" : "text-muted-foreground"}`} />
                  ))}
                </div>
                <p className="text-muted-foreground italic">&ldquo;{testimonial.content}&rdquo;</p>
                <div className="flex gap-2 mt-4">
                  <Badge variant={testimonial.approved ? "success" : "secondary"}>
                    {testimonial.approved ? "Approved" : "Pending"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2"><Label>Client Name</Label><Input placeholder="Full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2"><Label>Company</Label><Input placeholder="Company name" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} /></div>
              <div className="grid gap-2"><Label>Role</Label><Input placeholder="Job title" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} /></div>
            </div>
            <div className="grid gap-2"><Label>Rating</Label>
              <select value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })} className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm">
                {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Star{n > 1 ? "s" : ""}</option>)}
              </select>
            </div>
            <div className="grid gap-2"><Label>Content</Label><Textarea placeholder="Testimonial text" rows={3} value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} /></div>
            <div className="flex items-center gap-2">
              <Switch checked={formData.approved} onCheckedChange={(v) => setFormData({ ...formData, approved: v })} />
              <Label className="cursor-pointer">Approved</Label>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
