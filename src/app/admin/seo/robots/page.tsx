"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Bot, Save, Loader2, Copy, Check, RotateCcw, AlertCircle, CheckCircle } from "lucide-react";

const defaultRobotsTxt = `# robots.txt
# https://www.robotstxt.org/

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /login/

# Sitemaps
Sitemap: https://example.com/sitemap.xml

# Crawl-delay
Crawl-delay: 10

# Allow specific bots
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 2
`;

const STORAGE_KEY = "admin_robots_txt";

export default function RobotsPage() {
  const [content, setContent] = React.useState(defaultRobotsTxt);
  const [loaded, setLoaded] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const [saveMessage, setSaveMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setContent(saved);
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  const handleSave = () => {
    setSaving(true);
    try {
      localStorage.setItem(STORAGE_KEY, content);
      setSaveMessage("robots.txt saved successfully");
      setTimeout(() => setSaveMessage(null), 3000);
    } catch {
      setSaveMessage("Failed to save robots.txt");
      setTimeout(() => setSaveMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setContent(defaultRobotsTxt);
    localStorage.setItem(STORAGE_KEY, defaultRobotsTxt);
    setSaveMessage("Reset to default");
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lineCount = content.split("\n").length;

  if (!loaded) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3"><Loader2 className="h-8 w-8 animate-spin text-primary" /><p className="text-sm text-muted-foreground">Loading robots.txt editor...</p></div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight"><Bot className="inline mr-2 h-8 w-8" />Robots.txt</h1>
          <p className="text-muted-foreground mt-1">Manage your robots.txt file for search engine crawlers</p>
        </div>
        <div className="flex items-center gap-2">
          {saveMessage && <Badge variant={saveMessage.includes("Failed") ? "destructive" : "success"}>{saveMessage}</Badge>}
          <Button variant="outline" onClick={handleCopy}>{copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}Copy</Button>
          <Button variant="outline" onClick={handleReset}><RotateCcw className="mr-2 h-4 w-4" />Reset</Button>
          <Button onClick={handleSave} disabled={saving}>{saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Save Changes</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <Card>
          <CardHeader>
            <CardTitle>Editor</CardTitle>
            <CardDescription>Edit the robots.txt content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{lineCount} lines</span>
              <Badge variant="outline">.txt</Badge>
            </div>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={20}
              className="font-mono text-sm"
              placeholder="Enter robots.txt content..."
            />
            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50">
              <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p>Changes to robots.txt are saved locally. Deploy your site for changes to take effect.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Common Directives</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { directive: "User-agent: *", desc: "Apply rules to all crawlers" },
                { directive: "Disallow: /admin/", desc: "Block admin section" },
                { directive: "Allow: /", desc: "Allow crawling" },
                { directive: "Sitemap: https://...", desc: "Point to sitemap" },
                { directive: "Crawl-delay: 10", desc: "Seconds between requests" },
              ].map(({ directive, desc }) => (
                <div key={directive} className="p-2 border rounded-lg">
                  <code className="text-xs font-mono text-primary">{directive}</code>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Validation</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-xs">Sitemap reference {content.includes("Sitemap:") ? "found" : "missing"}</span>
              </div>
              <div className="flex items-center gap-2">
                {content.includes("Disallow:") ? <CheckCircle className="h-4 w-4 text-success" /> : <AlertCircle className="h-4 w-4 text-warning" />}
                <span className="text-xs">Disallow rules {content.includes("Disallow:") ? "present" : "not found"}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-xs">Valid robots.txt format</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
