"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { StatsCard } from "@/components/dashboard/stats-card";
import { LeadsChart, ProjectsChart, ConsultationsChart } from "@/components/charts/dashboard-charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Calendar, ArrowRight, AlertCircle, Loader2, RefreshCw } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

interface Stats {
  totalLeads: number;
  totalProjects: number;
  totalConsultations: number;
  totalBlogs: number;
  recentLeads: Array<{
    _id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    createdAt: string;
  }>;
  recentConsultations: Array<{
    _id: string;
    name: string;
    serviceType: string;
    preferredDate: string;
    preferredTime: string;
    status: string;
  }>;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = React.useState<Stats | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetch("/api/dashboard/statistics")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setStats(json.data);
        else setError(json.message || "Failed to load dashboard");
      })
      .catch(() => setError("Failed to load dashboard"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      <motion.div variants={item} className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here&apos;s what&apos;s happening with your business.
          </p>
        </div>
        <button
          onClick={async () => {
            if (!window.confirm("Clear browser cache and reload the page? This will not affect your data.")) return;
            try {
              if ("caches" in window) {
                const keys = await caches.keys();
                await Promise.all(keys.map((key) => caches.delete(key)));
              }
            } catch {}
            window.location.href = window.location.pathname + "?t=" + Date.now();
          }}
          className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shrink-0"
          title="Clear browser cache"
        >
          <RefreshCw className="h-4 w-4" />
          Clear Cache
        </button>
      </motion.div>

      <motion.div variants={item} className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Leads"
          value={stats?.totalLeads ?? 0}
          change={0}
          trend="up"
          icon={Mail}
          delay={0}
        />
        <StatsCard
          title="Active Projects"
          value={stats?.totalProjects ?? 0}
          change={0}
          trend="up"
          icon={ArrowRight}
          delay={0.1}
        />
        <StatsCard
          title="Consultations"
          value={stats?.totalConsultations ?? 0}
          change={0}
          trend="up"
          icon={Calendar}
          delay={0.2}
        />
        <StatsCard
          title="Total Blogs"
          value={stats?.totalBlogs ?? 0}
          change={0}
          trend="up"
          icon={Phone}
          delay={0.3}
        />
      </motion.div>

      <motion.div variants={item} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <LeadsChart />
        <ProjectsChart />
        <ConsultationsChart />
      </motion.div>

      <motion.div variants={item} className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Recent Leads</CardTitle>
            <a href="/admin/leads" className="text-sm text-primary hover:underline">
              View all
            </a>
          </CardHeader>
          <CardContent>
            {stats?.recentLeads?.length ? (
              <div className="space-y-4">
                {stats.recentLeads.map((lead) => (
                  <div
                    key={lead._id}
                    className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={`/avatars/${lead._id}.jpg`} />
                        <AvatarFallback>
                          {lead.name.split(" ").map((n: string) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{lead.name}</p>
                        <p className="text-xs text-muted-foreground">{lead.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={lead.status === "new" ? "default" : "secondary"}
                        className="mb-1"
                      >
                        {lead.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-4 text-center text-sm text-muted-foreground">No recent leads</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Upcoming Consultations</CardTitle>
            <a href="/admin/consultations" className="text-sm text-primary hover:underline">
              View all
            </a>
          </CardHeader>
          <CardContent>
            {stats?.recentConsultations?.length ? (
              <div className="space-y-4">
                {stats.recentConsultations.map((consultation) => (
                  <div
                    key={consultation._id}
                    className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{consultation.name}</p>
                        <p className="text-xs text-muted-foreground">{consultation.serviceType}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={consultation.status === "confirmed" ? "success" : "warning"}
                        className="mb-1"
                      >
                        {consultation.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {new Date(consultation.preferredDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-4 text-center text-sm text-muted-foreground">No upcoming consultations</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
