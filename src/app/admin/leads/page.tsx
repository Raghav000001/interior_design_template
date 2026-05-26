"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, MoreHorizontal, Eye, Mail, Phone, Trash2, Check, Loader2, AlertCircle } from "lucide-react";

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "new" | "contacted" | "qualified" | "converted";
  source: string;
  message: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  new: "default",
  contacted: "info",
  qualified: "warning",
  converted: "success",
};

export default function LeadsPage() {
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedStatus, setSelectedStatus] = React.useState<string>("all");
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [retryCount, setRetryCount] = React.useState(0);

  const statuses = ["all", "new", "contacted", "qualified", "converted"];

  React.useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedStatus !== "all") params.set("status", selectedStatus);
    params.set("limit", "50");

    fetch(`/api/leads?${params}`)
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) {
          if (json.success) {
            setLeads(json.data);
          } else {
            setError(json.message || "Failed to fetch leads");
          }
        }
      })
      .catch(() => {
        if (!cancelled) setError("Failed to fetch leads");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [searchQuery, selectedStatus, retryCount]);

  const handleStatusUpdate = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (json.success) {
        setLeads((prev) =>
          prev.map((l) => (l._id === id ? { ...l, status: status as Lead["status"] } : l))
        );
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/leads/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setLeads((prev) => prev.filter((l) => l._id !== id));
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contact Leads</h1>
          <p className="text-muted-foreground mt-1">
            Manage incoming leads from contact forms
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
        {statuses.slice(1).map((status) => {
          const count = leads.filter((l) => l.status === status).length;
          return (
            <Card key={status} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedStatus(status)}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground capitalize">{status}</p>
                    <p className="text-2xl font-bold">{count}</p>
                  </div>
                  <Badge variant={statusColors[status] as "default" | "secondary" | "info" | "warning" | "success"} className="capitalize">
                    {status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
            >
              <option value="all">All Status</option>
              {statuses.slice(1).map((status) => (
                <option key={status} value={status} className="capitalize">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex min-h-[200px] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="flex min-h-[200px] flex-col items-center justify-center gap-4">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <p className="text-sm text-muted-foreground">{error}</p>
              <Button variant="outline" onClick={() => setRetryCount((c) => c + 1)}>Retry</Button>
            </div>
          ) : leads.length === 0 ? (
            <div className="flex min-h-[200px] items-center justify-center">
              <p className="text-sm text-muted-foreground">No leads found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium">Lead</th>
                    <th className="px-4 py-3 text-left text-sm font-medium hidden sm:table-cell">Company</th>
                    <th className="px-4 py-3 text-left text-sm font-medium hidden md:table-cell">Source</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-medium hidden sm:table-cell">Date</th>
                    <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr
                      key={lead._id}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9 shrink-0">
                            <AvatarImage src={`/avatars/${lead._id}.jpg`} />
                            <AvatarFallback>
                              {lead.name.split(" ").map((n) => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="font-medium truncate">{lead.name}</p>
                            <p className="text-xs text-muted-foreground truncate">{lead.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">{lead.company}</td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <Badge variant="outline">{lead.source || "N/A"}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={statusColors[lead.status] as "default" | "secondary" | "info" | "warning" | "success"}>
                          {lead.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>Lead Details</DialogTitle>
                                <DialogDescription>
                                  Full information about this lead
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="flex items-center gap-4">
                                  <Avatar className="h-16 w-16">
                                    <AvatarFallback className="text-lg">
                                      {lead.name.split(" ").map((n) => n[0]).join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="text-lg font-semibold">{lead.name}</p>
                                    <p className="text-sm text-muted-foreground">{lead.company}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{lead.email}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm">{lead.phone}</span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label>Message</Label>
                                  <p className="text-sm text-muted-foreground p-3 bg-muted rounded-lg">
                                    {lead.message}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => handleStatusUpdate(lead._id, "contacted")}
                                    disabled={updatingId === lead._id}
                                  >
                                    {updatingId === lead._id ? (
                                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                      <Check className="mr-2 h-4 w-4" />
                                    )}
                                    Mark Contacted
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    <Mail className="mr-2 h-4 w-4" />
                                    Send Email
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleStatusUpdate(lead._id, "contacted")}>
                                Mark as Contacted
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusUpdate(lead._id, "qualified")}>
                                Mark as Qualified
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleStatusUpdate(lead._id, "converted")}>
                                Mark as Converted
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => handleDelete(lead._id)}
                              >
                                {deletingId === lead._id ? (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                  <Trash2 className="mr-2 h-4 w-4" />
                                )}
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
