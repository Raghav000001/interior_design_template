"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Mail, Calendar, FileText,
  Loader2, AlertCircle,
} from "lucide-react";

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

const DATE_PRESETS = ["7d", "30d", "90d", "1y"] as const;

interface StatItem {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  status?: string;
  service?: string;
  date?: string;
  createdAt?: string;
}

interface DashboardStats {
  totalProjects: number;
  totalBlogs: number;
  totalLeads: number;
  totalConsultations: number;
  recentLeads: StatItem[];
  recentConsultations: StatItem[];
  projectsByCategory: Record<string, number>;
  leadsByStatus: Record<string, number>;
}

export default function AnalyticsPage() {
  const [stats, setStats] = React.useState<DashboardStats | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [dateRange, setDateRange] = React.useState<string>("30d");
  const mountedRef = React.useRef(true);

  async function fetchStats() {
    try {
      const res = await fetch("/api/dashboard/statistics");
      const json = await res.json();
      if (!mountedRef.current) return;
      if (!json.success) throw new Error(json.message || "Failed to fetch");
      setStats(json.data);
    } catch (err) {
      if (!mountedRef.current) return;
      setError(err instanceof Error ? err.message : "Failed to load analytics");
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }

  React.useEffect(() => {
    mountedRef.current = true;
    fetchStats();
    return () => { mountedRef.current = false; };
  }, []);

  const categoryChartData = stats
    ? Object.entries(stats.projectsByCategory).map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }))
    : [];

  const leadsStatusData = stats
    ? Object.entries(stats.leadsByStatus).map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value }))
    : [];

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
        <Card><CardContent className="p-12 flex flex-col items-center justify-center gap-2 text-destructive">
          <AlertCircle className="h-8 w-8" />
          <p>{error}</p>
          <Button variant="outline" size="sm" onClick={fetchStats}>Retry</Button>
        </CardContent></Card>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">Track your business performance</p>
        </div>
        <div className="flex items-center gap-2">
          {DATE_PRESETS.map((preset) => (
            <Button
              key={preset}
              variant={dateRange === preset ? "default" : "outline"}
              size="sm"
              onClick={() => setDateRange(preset)}
            >
              {preset}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Total Projects" value={stats?.totalProjects ?? 0} icon={FileText} trend="up" delay={0} />
        <StatsCard title="Total Leads" value={stats?.totalLeads ?? 0} icon={Mail} trend="up" delay={0.1} />
        <StatsCard title="Consultations" value={stats?.totalConsultations ?? 0} icon={Calendar} trend="up" delay={0.2} />
        <StatsCard title="Blog Posts" value={stats?.totalBlogs ?? 0} icon={FileText} trend="up" delay={0.3} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Projects by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryChartData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                    {categoryChartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              {categoryChartData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1.5 text-sm">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span>{entry.name}</span>
                  <span className="text-muted-foreground">({entry.value})</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Leads by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={leadsStatusData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border)/50)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Bar dataKey="value" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Quick Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryChartData.slice(0, 4).map((entry, i) => (
              <div key={entry.name} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{entry.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(entry.value / Math.max(...categoryChartData.map(d => d.value))) * 100}%`,
                        backgroundColor: COLORS[i % COLORS.length],
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium w-8 text-right">{entry.value}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Recent Leads</CardTitle>
            <a href="/admin/leads" className="text-sm text-primary hover:underline">View all</a>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(!stats?.recentLeads || stats.recentLeads.length === 0) ? (
                <p className="text-sm text-muted-foreground text-center py-4">No recent leads</p>
              ) : (
                stats.recentLeads.map((lead) => (
                  <div key={lead._id} className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{((lead.name || "??").split(" ").map(n => n[0]).join(""))}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{lead.name}</p>
                        <p className="text-xs text-muted-foreground">{lead.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={lead.status === "new" ? "default" : "secondary"} className="mb-1">{lead.status}</Badge>
                      <p className="text-xs text-muted-foreground">{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : ""}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium">Recent Consultations</CardTitle>
            <a href="/admin/consultations" className="text-sm text-primary hover:underline">View all</a>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(!stats?.recentConsultations || stats.recentConsultations.length === 0) ? (
                <p className="text-sm text-muted-foreground text-center py-4">No recent consultations</p>
              ) : (
                stats.recentConsultations.map((consultation) => (
                  <div key={consultation._id} className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{consultation.name}</p>
                        <p className="text-xs text-muted-foreground">{consultation.service}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={consultation.status === "confirmed" ? "success" : "warning"} className="mb-1">{consultation.status}</Badge>
                      <p className="text-xs text-muted-foreground">{consultation.createdAt ? new Date(consultation.createdAt).toLocaleDateString() : ""}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
