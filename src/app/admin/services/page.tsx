"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Search, Plus, MoreHorizontal, Edit, Trash2, Loader2, AlertCircle, Inbox } from "lucide-react";

interface Service {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  price?: string;
  features: string[];
  isActive: boolean;
  order: number;
  createdAt: string;
}

export default function ServicesPage() {
  const [services, setServices] = React.useState<Service[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingService, setEditingService] = React.useState<Service | null>(null);
  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    icon: "",
    price: "",
    isActive: true,
  });
  const [submitting, setSubmitting] = React.useState(false);
  const mountedRef = React.useRef(true);

  async function fetchServices() {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("search", searchQuery);
      params.set("limit", "100");
      const res = await fetch(`/api/services?${params}`);
      const json = await res.json();
      if (!mountedRef.current) return;
      if (!json.success) throw new Error(json.message || "Failed to fetch");
      setServices(json.data);
    } catch (err) {
      if (!mountedRef.current) return;
      setError(err instanceof Error ? err.message : "Failed to load services");
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }

  React.useEffect(() => {
    mountedRef.current = true;
    fetchServices();
    return () => { mountedRef.current = false; };
  }, [searchQuery]);

  const openCreateDialog = () => {
    setEditingService(null);
    setFormData({ title: "", description: "", icon: "", price: "", isActive: true });
    setIsDialogOpen(true);
  };

  const openEditDialog = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon || "",
      price: service.price || "",
      isActive: service.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const url = editingService ? `/api/services/${editingService._id}` : "/api/services";
      const method = editingService ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          icon: formData.icon || undefined,
          price: formData.price || undefined,
          isActive: formData.isActive,
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Operation failed");
      setIsDialogOpen(false);
      fetchServices();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Operation failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Delete failed");
      fetchServices();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  const toggleActive = async (service: Service) => {
    try {
      const res = await fetch(`/api/services/${service._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !service.isActive }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Update failed");
      fetchServices();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  };

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground mt-1">Manage your service offerings</p>
        </div>
        <Button onClick={openCreateDialog}><Plus className="mr-2 h-4 w-4" />Add Service</Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search services..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <Card><CardContent className="p-12 flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></CardContent></Card>
      ) : error ? (
        <Card><CardContent className="p-12 flex flex-col items-center justify-center gap-2 text-destructive"><AlertCircle className="h-8 w-8" /><p>{error}</p><Button variant="outline" size="sm" onClick={fetchServices}>Retry</Button></CardContent></Card>
      ) : filteredServices.length === 0 ? (
        <Card><CardContent className="p-12 flex flex-col items-center justify-center gap-2 text-muted-foreground"><Inbox className="h-8 w-8" /><p>No services found</p></CardContent></Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <Card key={service._id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditDialog(service)}><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(service._id)}><Trash2 className="mr-2 h-4 w-4" />Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-medium">{service.price || "-"}</span>
                  <div className="flex gap-2 items-center">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-muted-foreground">Active</span>
                      <Switch checked={service.isActive} onCheckedChange={() => toggleActive(service)} />
                    </div>
                    <Badge variant={service.isActive ? "success" : "secondary"}>{service.isActive ? "Active" : "Inactive"}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingService ? "Edit Service" : "Add New Service"}</DialogTitle>
            <DialogDescription>{editingService ? "Update service details." : "Create a new service offering."}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Service Title</Label>
              <Input placeholder="Enter service title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea placeholder="Enter service description" rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Icon</Label>
                <Input placeholder="Icon name" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label>Price</Label>
                <Input placeholder="From $0" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={formData.isActive} onCheckedChange={(v) => setFormData({ ...formData, isActive: v })} />
              <Label className="cursor-pointer">Active</Label>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingService ? "Update Service" : "Create Service"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
