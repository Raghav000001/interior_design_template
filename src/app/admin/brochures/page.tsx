"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, MoreHorizontal, Eye, Mail, Phone, Trash2, FileDown, Loader2, AlertCircle } from "lucide-react";

interface Brochure {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  brochureType: string;
  status: "new" | "downloaded" | "contacted";
  createdAt: string;
}

const statusColors: Record<string, string> = {
  new: "default",
  downloaded: "info",
  contacted: "warning",
};

export default function BrochuresPage() {
  const [brochures, setBrochures] = React.useState<Brochure[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedBrochure, setSelectedBrochure] = React.useState<Brochure | null>(null);
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [retryCount, setRetryCount] = React.useState(0);

  React.useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    params.set("limit", "50");

    fetch(`/api/brochures?${params}`)
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) {
          if (json.success) {
            setBrochures(json.data);
          } else {
            setError(json.message || "Failed to fetch brochures");
          }
        }
      })
      .catch(() => {
        if (!cancelled) setError("Failed to fetch brochures");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [searchQuery, retryCount]);

  const handleStatusUpdate = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/brochures/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (json.success) {
        setBrochures((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: status as Brochure["status"] } : b))
        );
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/brochures/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setBrochures((prev) => prev.filter((b) => b._id !== id));
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Brochure Downloads</h1>
          <p className="text-muted-foreground mt-1">
            Track brochure download requests
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {["New", "Downloaded", "Contacted"].map((status) => {
          const count = brochures.filter((b) => b.status === status.toLowerCase()).length;
          return (
            <Card key={status}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{status}</p>
                  <p className="text-2xl font-bold">{count}</p>
                </div>
                <Badge variant={statusColors[status.toLowerCase()] as "default" | "info" | "warning"}>
                  {status}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search brochures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

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
      ) : brochures.length === 0 ? (
        <div className="flex min-h-[200px] items-center justify-center">
          <p className="text-sm text-muted-foreground">No brochure downloads yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {brochures.map((brochure) => (
            <Card key={brochure._id} className="hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 shrink-0">
                      <FileDown className="h-6 w-6 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold truncate">{brochure.name}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {brochure.brochureType} {brochure.company ? `- ${brochure.company}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4 shrink-0" />
                      <span className="hidden sm:inline truncate max-w-[120px]">{brochure.email}</span>
                    </div>
                    <Badge variant={statusColors[brochure.status] as "default" | "info" | "warning"}>
                      {brochure.status}
                    </Badge>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedBrochure(brochure)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader><DialogTitle>Brochure Download Details</DialogTitle></DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                              <AvatarFallback className="text-lg">
                                {brochure.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-lg">{brochure.name}</h3>
                              <p className="text-muted-foreground">{brochure.brochureType}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{brochure.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{brochure.phone || "N/A"}</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <Label className="text-sm text-muted-foreground">Company</Label>
                              <p className="text-sm">{brochure.company || "N/A"}</p>
                            </div>
                            <div className="space-y-1">
                              <Label className="text-sm text-muted-foreground">Brochure Type</Label>
                              <p className="text-sm capitalize">{brochure.brochureType}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            {brochure.status === "new" && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(brochure._id, "downloaded")}
                                disabled={updatingId === brochure._id}
                              >
                                {updatingId === brochure._id ? (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                  <FileDown className="mr-2 h-4 w-4" />
                                )}
                                Mark Downloaded
                              </Button>
                            )}
                            {brochure.status !== "contacted" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleStatusUpdate(brochure._id, "contacted")}
                                disabled={updatingId === brochure._id}
                              >
                                {updatingId === brochure._id ? (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                  <Phone className="mr-2 h-4 w-4" />
                                )}
                                Mark Contacted
                              </Button>
                            )}
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
                        <DropdownMenuItem onClick={() => handleStatusUpdate(brochure._id, "downloaded")}>
                          Mark Downloaded
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(brochure._id, "contacted")}>
                          Mark Contacted
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(brochure._id)}
                        >
                          {deletingId === brochure._id ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="mr-2 h-4 w-4" />
                          )}
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  );
}
