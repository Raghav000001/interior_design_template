"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Layers, Globe, RefreshCw, ExternalLink, Loader2, CheckCircle, AlertCircle, Copy, Check } from "lucide-react";

export default function SitemapPage() {
  const [lastGenerated, setLastGenerated] = React.useState<string | null>(null);
  const [generating, setGenerating] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [includeImages, setIncludeImages] = React.useState(true);
  const [includePages, setIncludePages] = React.useState(true);
  const [includeBlogs, setIncludeBlogs] = React.useState(true);
  const [includeProjects, setIncludeProjects] = React.useState(true);

  React.useEffect(() => {
    const saved = localStorage.getItem("sitemap_last_generated");
    if (saved) setLastGenerated(saved);
  }, []);

  const handleGenerate = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 1500));
    const now = new Date().toISOString();
    setLastGenerated(now);
    localStorage.setItem("sitemap_last_generated", now);
    setGenerating(false);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText("https://example.com/sitemap.xml");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pages = [
    { path: "/", priority: "1.0", changefreq: "daily" },
    { path: "/projects", priority: "0.9", changefreq: "weekly" },
    { path: "/services", priority: "0.8", changefreq: "weekly" },
    { path: "/about", priority: "0.7", changefreq: "monthly" },
    { path: "/blog", priority: "0.8", changefreq: "weekly" },
    { path: "/contact", priority: "0.6", changefreq: "monthly" },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight"><Layers className="inline mr-2 h-8 w-8" />Sitemap</h1>
          <p className="text-muted-foreground mt-1">Manage your XML sitemap for search engines</p>
        </div>
        <Button onClick={handleGenerate} disabled={generating}>
          {generating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
          {generating ? "Generating..." : "Regenerate Sitemap"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Sitemap Overview</CardTitle><CardDescription>Current sitemap status and configuration</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div><p className="font-medium">Sitemap URL</p><p className="text-xs text-muted-foreground">https://example.com/sitemap.xml</p></div>
              </div>
              <Button variant="outline" size="sm" onClick={handleCopyUrl}>
                {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 border rounded-lg">
                <p className="text-2xl font-bold">{pages.length + (includeBlogs ? 10 : 0) + (includeProjects ? 8 : 0)}</p>
                <p className="text-xs text-muted-foreground">Total URLs</p>
              </div>
              <div className="p-3 border rounded-lg">
                <p className="text-2xl font-bold">{lastGenerated ? new Date(lastGenerated).toLocaleDateString() : "Never"}</p>
                <p className="text-xs text-muted-foreground">Last Generated</p>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Include in Sitemap</Label>
              <div className="space-y-2">
                {[
                  { key: "includePages", label: "Static Pages", checked: includePages, setter: setIncludePages },
                  { key: "includeBlogs", label: "Blog Posts", checked: includeBlogs, setter: setIncludeBlogs },
                  { key: "includeProjects", label: "Projects", checked: includeProjects, setter: setIncludeProjects },
                  { key: "includeImages", label: "Images", checked: includeImages, setter: setIncludeImages },
                ].map(({ key, label, checked, setter }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm">{label}</span>
                    <Switch checked={checked} onCheckedChange={setter} />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Status</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                {lastGenerated ? <CheckCircle className="h-4 w-4 text-success" /> : <AlertCircle className="h-4 w-4 text-warning" />}
                <span className="text-sm">{lastGenerated ? "Sitemap is active" : "Sitemap not yet generated"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm">Search engines can discover your pages</span>
              </div>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />Google Search Console
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Pages</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {pages.map((page) => (
                <div key={page.path} className="flex items-center justify-between p-2 border rounded-lg text-sm">
                  <span className="font-medium">{page.path}</span>
                  <Badge variant="outline">{page.priority}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
