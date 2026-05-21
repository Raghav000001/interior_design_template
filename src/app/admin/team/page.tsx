"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Search, Plus, MoreHorizontal, Edit, Trash2, Briefcase, AtSign, Loader2, AlertCircle, Inbox } from "lucide-react";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  image?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  twitter?: string;
  order: number;
  isActive: boolean;
}

export default function TeamPage() {
  const [members, setMembers] = React.useState<TeamMember[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingMember, setEditingMember] = React.useState<TeamMember | null>(null);
  const [formData, setFormData] = React.useState({ name: "", role: "", bio: "", email: "", phone: "", linkedin: "", twitter: "", isActive: true });
  const [submitting, setSubmitting] = React.useState(false);

  const fetchMembers = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      params.set("limit", "100");
      const res = await fetch(`/api/team?${params}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to fetch");
      setMembers(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load team");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const openCreateDialog = () => {
    setEditingMember(null);
    setFormData({ name: "", role: "", bio: "", email: "", phone: "", linkedin: "", twitter: "", isActive: true });
    setIsDialogOpen(true);
  };

  const openEditDialog = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      bio: member.bio || "",
      email: member.email || "",
      phone: member.phone || "",
      linkedin: member.linkedin || "",
      twitter: member.twitter || "",
      isActive: member.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const body = {
        ...formData,
        linkedin: formData.linkedin || undefined,
        twitter: formData.twitter || undefined,
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        bio: formData.bio || undefined,
      };
      const url = editingMember ? `/api/team/${editingMember._id}` : "/api/team";
      const method = editingMember ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Operation failed");
      setIsDialogOpen(false);
      fetchMembers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      const res = await fetch(`/api/team/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Delete failed");
      fetchMembers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const filteredMembers = members.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><h1 className="text-3xl font-bold">Team Members</h1><p className="text-muted-foreground mt-1">Manage your team</p></div>
        <Button onClick={openCreateDialog}><Plus className="mr-2 h-4 w-4" />Add Member</Button>
      </div>

      <Card><CardContent className="p-4"><div className="relative max-w-md"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search team..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" /></div></CardContent></Card>

      {loading ? (
        <Card><CardContent className="p-12 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></CardContent></Card>
      ) : error ? (
        <Card><CardContent className="p-12 flex flex-col items-center justify-center gap-2 text-destructive"><AlertCircle className="h-8 w-8" /><p>{error}</p><Button variant="outline" size="sm" onClick={fetchMembers}>Retry</Button></CardContent></Card>
      ) : filteredMembers.length === 0 ? (
        <Card><CardContent className="p-12 flex flex-col items-center justify-center gap-2 text-muted-foreground"><Inbox className="h-8 w-8" /><p>No team members found</p></CardContent></Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {filteredMembers.map(member => (
            <Card key={member._id}>
              <CardContent className="p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={member.image} />
                  <AvatarFallback className="text-xl">{member.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{member.bio}</p>
                <div className="flex justify-center gap-2 mt-4">
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" title="LinkedIn">
                      <Briefcase className="h-4 w-4" />
                    </a>
                  )}
                  {member.twitter && (
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors" title="Twitter">
                      <AtSign className="h-4 w-4" />
                    </a>
                  )}
                </div>
                {!member.isActive && <Badge variant="secondary" className="mt-3">Inactive</Badge>}
                <div className="flex justify-center mt-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => openEditDialog(member)}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(member._id)}><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingMember ? "Edit Team Member" : "Add Team Member"}</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2"><Label>Name</Label><Input placeholder="Full name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} /></div>
            <div className="grid gap-2"><Label>Role</Label><Input placeholder="Job title" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} /></div>
            <div className="grid gap-2"><Label>Bio</Label><Textarea placeholder="Short bio" rows={3} value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2"><Label>Email</Label><Input type="email" placeholder="email@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} /></div>
              <div className="grid gap-2"><Label>Phone</Label><Input placeholder="+1 234 567 890" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2"><Label>LinkedIn URL</Label><Input placeholder="https://linkedin.com/in/..." value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} /></div>
              <div className="grid gap-2"><Label>Twitter URL</Label><Input placeholder="https://twitter.com/..." value={formData.twitter} onChange={(e) => setFormData({ ...formData, twitter: e.target.value })} /></div>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={formData.isActive} onCheckedChange={(v) => setFormData({ ...formData, isActive: v })} />
              <Label className="cursor-pointer">Active</Label>
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingMember ? "Update Member" : "Add Member"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
