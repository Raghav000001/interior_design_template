"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FileText, Share2, Bot, Eye, Save, AlertCircle, CheckCircle, Loader2, RefreshCw } from "lucide-react";

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  canonicalUrl: string;
  ogImage: string;
  noIndex: boolean;
  noFollow: boolean;
}

const defaultSEO: SEOData = {
  title: "",
  description: "",
  keywords: "",
  canonicalUrl: "",
  ogImage: "",
  noIndex: false,
  noFollow: false,
};

export default function SEOPage() {
  const [pages, setPages] = React.useState<{ id: string; name: string }[]>([]);
  const [selectedPage, setSelectedPage] = React.useState("");
  const [seoData, setSeoData] = React.useState<SEOData>(defaultSEO);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [saveMessage, setSaveMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/seo");
        const json = await res.json();
        if (!json.success) throw new Error(json.message || "Failed to fetch pages");
        if (!mounted) return;
        const pageList = json.data.map((s: { page: string; title?: string }) => ({
          id: s.page,
          name: s.page.charAt(0).toUpperCase() + s.page.slice(1).replace(/-/g, " "),
        }));
        setPages(pageList);
        if (pageList.length > 0) setSelectedPage(pageList[0].id);
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : "Failed to fetch pages");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  React.useEffect(() => {
    if (!selectedPage) return;
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/seo/${selectedPage}`);
        const json = await res.json();
        if (!json.success) throw new Error(json.message || "Failed to fetch SEO data");
        if (!mounted) return;
        const d = json.data;
        setSeoData({
          title: d.title || "",
          description: d.description || "",
          keywords: d.keywords || "",
          canonicalUrl: d.canonicalUrl || "",
          ogImage: d.ogImage || "",
          noIndex: d.noIndex || false,
          noFollow: d.noFollow || false,
        });
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Failed to fetch SEO data");
          setSeoData(defaultSEO);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [selectedPage]);

  const handleSave = async () => {
    if (!selectedPage) return;
    setSaving(true);
    setSaveMessage(null);
    try {
      const res = await fetch(`/api/seo/${selectedPage}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seoData),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to save");
      setSaveMessage("Changes saved successfully");
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const seoScore = React.useMemo(() => {
    let score = 0;
    if (seoData.title.length > 0 && seoData.title.length <= 60) score += 20;
    if (seoData.description.length > 0 && seoData.description.length <= 160) score += 25;
    if (seoData.keywords.length > 0) score += 15;
    if (seoData.canonicalUrl.length > 0) score += 15;
    if (seoData.ogImage.length > 0) score += 15;
    if (!seoData.noIndex) score += 10;
    return score;
  }, [seoData]);

  const scoreColor = seoScore >= 80 ? "text-success" : seoScore >= 50 ? "text-warning" : "text-destructive";

  const suggestions = React.useMemo(() => {
    const s: { type: "success" | "warning"; message: string }[] = [];
    if (seoData.title.length > 0 && seoData.title.length <= 60) s.push({ type: "success", message: "Meta title length is optimal" });
    else s.push({ type: "warning", message: "Meta title should be 50-60 characters" });
    if (seoData.description.length > 0 && seoData.description.length <= 160) s.push({ type: "success", message: "Meta description is well formatted" });
    else s.push({ type: "warning", message: "Meta description should be under 160 characters" });
    if (seoData.keywords.length > 0) s.push({ type: "success", message: "Keywords added" });
    else s.push({ type: "warning", message: "Consider adding keywords" });
    if (seoData.canonicalUrl.length > 0) s.push({ type: "success", message: "Canonical URL set" });
    else s.push({ type: "warning", message: "Add a canonical URL" });
    return s;
  }, [seoData]);

  if (loading && pages.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3"><Loader2 className="h-8 w-8 animate-spin text-primary" /><p className="text-sm text-muted-foreground">Loading SEO settings...</p></div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SEO Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your website&apos;s search engine optimization</p>
        </div>
        <div className="flex items-center gap-2">
          {saveMessage && <Badge variant="success">{saveMessage}</Badge>}
          {error && <Badge variant="destructive">{error}</Badge>}
          <Button onClick={handleSave} disabled={saving || !selectedPage}>
            {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div><h3 className="font-semibold">SEO Score</h3><p className="text-sm text-muted-foreground">Overall optimization score</p></div>
              <div className={`text-4xl font-bold ${scoreColor}`}>{seoScore}%</div>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div className={`h-full transition-all ${seoScore >= 80 ? "bg-success" : seoScore >= 50 ? "bg-warning" : "bg-destructive"}`} style={{ width: `${seoScore}%` }} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Quick Tips</h3>
            <div className="space-y-3">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-2">
                  {suggestion.type === "success" ? <CheckCircle className="h-4 w-4 text-success mt-0.5" /> : <AlertCircle className="h-4 w-4 text-warning mt-0.5" />}
                  <span className="text-sm text-muted-foreground">{suggestion.message}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <Card>
          <CardHeader>
            <CardTitle>Page SEO Configuration</CardTitle>
            <CardDescription>Select a page and configure its SEO settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Select Page</Label>
              <Select value={selectedPage} onValueChange={setSelectedPage}>
                <SelectTrigger><SelectValue placeholder="Select a page" /></SelectTrigger>
                <SelectContent>
                  {pages.map((page) => (
                    <SelectItem key={page.id} value={page.id}>{page.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
            ) : (
              <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="general" className="gap-2"><FileText className="h-4 w-4" />General</TabsTrigger>
                  <TabsTrigger value="opengraph" className="gap-2"><Share2 className="h-4 w-4" />Open Graph</TabsTrigger>
                  <TabsTrigger value="robots" className="gap-2"><Bot className="h-4 w-4" />Robots</TabsTrigger>
                  <TabsTrigger value="preview" className="gap-2"><Eye className="h-4 w-4" />Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                  <div className="space-y-2">
                    <Label>Meta Title</Label>
                    <Input value={seoData.title} onChange={(e) => setSeoData((p) => ({ ...p, title: e.target.value }))} placeholder="Enter meta title" />
                    <p className="text-xs text-muted-foreground">{seoData.title.length}/60 characters</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Meta Description</Label>
                    <Textarea value={seoData.description} onChange={(e) => setSeoData((p) => ({ ...p, description: e.target.value }))} placeholder="Enter meta description" rows={4} />
                    <p className="text-xs text-muted-foreground">{seoData.description.length}/160 characters</p>
                  </div>
                  <div className="space-y-2">
                    <Label>Keywords</Label>
                    <Input value={seoData.keywords} onChange={(e) => setSeoData((p) => ({ ...p, keywords: e.target.value }))} placeholder="Enter keywords separated by commas" />
                  </div>
                  <div className="space-y-2">
                    <Label>Canonical URL</Label>
                    <Input value={seoData.canonicalUrl} onChange={(e) => setSeoData((p) => ({ ...p, canonicalUrl: e.target.value }))} placeholder="https://example.com/page" />
                  </div>
                </TabsContent>

                <TabsContent value="opengraph" className="space-y-4">
                  <div className="space-y-2">
                    <Label>OG Image URL</Label>
                    <Input value={seoData.ogImage} onChange={(e) => setSeoData((p) => ({ ...p, ogImage: e.target.value }))} placeholder="/og/image.jpg" />
                    <p className="text-xs text-muted-foreground">Recommended size: 1200x630px</p>
                  </div>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <p className="text-sm text-muted-foreground">Click to upload OG Image</p>
                  </div>
                </TabsContent>

                <TabsContent value="robots" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>No Index</Label>
                      <p className="text-sm text-muted-foreground">Prevent search engines from indexing this page</p>
                    </div>
                    <Switch checked={seoData.noIndex} onCheckedChange={(v) => setSeoData((p) => ({ ...p, noIndex: v }))} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>No Follow</Label>
                      <p className="text-sm text-muted-foreground">Prevent search engines from following links</p>
                    </div>
                    <Switch checked={seoData.noFollow} onCheckedChange={(v) => setSeoData((p) => ({ ...p, noFollow: v }))} />
                  </div>
                </TabsContent>

                <TabsContent value="preview" className="space-y-4">
                  <Card>
                    <CardHeader><CardTitle className="text-sm">Google Search Preview</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-blue-600 text-lg hover:underline cursor-pointer">{seoData.title || "Page Title"}</p>
                      <p className="text-green-700 text-sm">{seoData.canonicalUrl || "https://example.com/page"}</p>
                      <p className="text-gray-600 text-sm line-clamp-2">{seoData.description || "Meta description will appear here..."}</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader><CardTitle className="text-base">Pages</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {pages.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No pages configured</p>
            ) : (
              pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setSelectedPage(page.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedPage === page.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                >
                  {page.name}
                </button>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
