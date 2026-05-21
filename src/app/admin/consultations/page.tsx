"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, MoreHorizontal, Trash2, Calendar, Clock, Mail, Phone, Check, X, Loader2, AlertCircle } from "lucide-react";

interface Consultation {
  _id: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  message?: string;
  notes?: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  confirmed: "success",
  pending: "warning",
  completed: "info",
  cancelled: "secondary",
};

export default function ConsultationsPage() {
  const [consultations, setConsultations] = React.useState<Consultation[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedConsultation, setSelectedConsultation] = React.useState<Consultation | null>(null);
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [retryCount, setRetryCount] = React.useState(0);

  React.useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    params.set("limit", "50");

    fetch(`/api/consultations?${params}`)
      .then((res) => res.json())
      .then((json) => {
        if (!cancelled) {
          if (json.success) {
            setConsultations(json.data);
          } else {
            setError(json.message || "Failed to fetch consultations");
          }
        }
      })
      .catch(() => {
        if (!cancelled) setError("Failed to fetch consultations");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [searchQuery, retryCount]);

  const handleStatusUpdate = async (id: string, status: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/consultations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const json = await res.json();
      if (json.success) {
        setConsultations((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status: status as Consultation["status"] } : c))
        );
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/consultations/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setConsultations((prev) => prev.filter((c) => c._id !== id));
      }
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Consultations</h1>
          <p className="text-muted-foreground mt-1">Manage consultation requests</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {["Pending", "Confirmed", "Completed", "Cancelled"].map((status) => {
          const count = consultations.filter((c) => c.status === status.toLowerCase()).length;
          return (
            <Card key={status}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{status}</p>
                  <p className="text-2xl font-bold">{count}</p>
                </div>
                <Badge variant={statusColors[status.toLowerCase()] as "success" | "warning" | "info" | "secondary"}>
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
              placeholder="Search consultations..."
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
      ) : consultations.length === 0 ? (
        <div className="flex min-h-[200px] items-center justify-center">
          <p className="text-sm text-muted-foreground">No consultations found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {consultations.map((consultation) => (
            <Card key={consultation._id} className="hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`/avatars/${consultation._id}.jpg`} />
                      <AvatarFallback>
                        {consultation.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{consultation.name}</h3>
                      <p className="text-sm text-muted-foreground">{consultation.serviceType}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(consultation.preferredDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{consultation.preferredTime}</span>
                    </div>
                    <Badge variant={statusColors[consultation.status] as "success" | "warning" | "info" | "secondary"}>
                      {consultation.status}
                    </Badge>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedConsultation(consultation)}>
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader><DialogTitle>Consultation Details</DialogTitle></DialogHeader>
                        <div className="space-y-4 pt-4">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                              <AvatarFallback className="text-lg">
                                {consultation.name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold text-lg">{consultation.name}</h3>
                              <p className="text-muted-foreground">{consultation.serviceType}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{consultation.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{consultation.phone}</span>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{new Date(consultation.preferredDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{consultation.preferredTime}</span>
                            </div>
                          </div>
                          {consultation.message && (
                            <div className="space-y-2">
                              <Label>Message</Label>
                              <p className="text-sm p-3 bg-muted rounded-lg">{consultation.message}</p>
                            </div>
                          )}
                          <div className="flex gap-2">
                            {consultation.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleStatusUpdate(consultation._id, "confirmed")}
                                  disabled={updatingId === consultation._id}
                                >
                                  {updatingId === consultation._id ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  ) : (
                                    <Check className="mr-2 h-4 w-4" />
                                  )}
                                  Confirm
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-destructive"
                                  onClick={() => handleStatusUpdate(consultation._id, "cancelled")}
                                  disabled={updatingId === consultation._id}
                                >
                                  <X className="mr-2 h-4 w-4" />
                                  Cancel
                                </Button>
                              </>
                            )}
                            {consultation.status === "confirmed" && (
                              <Button
                                size="sm"
                                onClick={() => handleStatusUpdate(consultation._id, "completed")}
                                disabled={updatingId === consultation._id}
                              >
                                {updatingId === consultation._id ? (
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                  <Check className="mr-2 h-4 w-4" />
                                )}
                                Mark Completed
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
                        <DropdownMenuItem onClick={() => handleStatusUpdate(consultation._id, "confirmed")}>
                          Confirm
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(consultation._id, "completed")}>
                          Mark Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(consultation._id)}
                        >
                          {deletingId === consultation._id ? (
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
