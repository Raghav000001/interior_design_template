"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Palette, Save, Loader2, RotateCcw, CheckCircle, AlertCircle } from "lucide-react";

interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColor: string;
  textColor: string;
  fontFamily: string;
  borderRadius: string;
  enableDarkMode: boolean;
  respectSystemTheme: boolean;
}

const defaultTheme: ThemeSettings = {
  primaryColor: "#5B3DF5",
  secondaryColor: "#7C3AED",
  accentColor: "#C4A962",
  backgroundColor: "#FFFFFF",
  textColor: "#111827",
  fontFamily: "Inter",
  borderRadius: "0.5rem",
  enableDarkMode: true,
  respectSystemTheme: true,
};

const fonts = ["Inter", "Space Grotesk", "DM Sans", "Plus Jakarta Sans", "Clash Display", "Cabinet Grotesk", "Satoshi", "General Sans"];
const borderRadiusOptions = ["0rem", "0.25rem", "0.5rem", "0.75rem", "1rem"];

const STORAGE_KEY = "admin_theme";

export default function ThemePage() {
  const [theme, setTheme] = React.useState<ThemeSettings>(defaultTheme);
  const [loaded, setLoaded] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [saveMessage, setSaveMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setTheme({ ...defaultTheme, ...JSON.parse(saved) });
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  const update = <K extends keyof ThemeSettings>(key: K, value: ThemeSettings[K]) => {
    setTheme((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setSaving(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
      setSaveMessage("Theme saved successfully");
      setTimeout(() => setSaveMessage(null), 3000);
    } catch {
      setSaveMessage("Failed to save theme");
      setTimeout(() => setSaveMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setTheme(defaultTheme);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTheme));
    setSaveMessage("Theme reset to defaults");
    setTimeout(() => setSaveMessage(null), 3000);
  };

  if (!loaded) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3"><Loader2 className="h-8 w-8 animate-spin text-primary" /><p className="text-sm text-muted-foreground">Loading theme settings...</p></div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight"><Palette className="inline mr-2 h-8 w-8" />Theme Settings</h1>
          <p className="text-muted-foreground mt-1">Customize the look and feel of your website</p>
        </div>
        <div className="flex items-center gap-2">
          {saveMessage && <Badge variant={saveMessage.includes("Failed") ? "destructive" : "success"}>{saveMessage}</Badge>}
          <Button variant="outline" onClick={handleReset}><RotateCcw className="mr-2 h-4 w-4" />Reset</Button>
          <Button onClick={handleSave} disabled={saving}>{saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Save Changes</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Color Palette</CardTitle><CardDescription>Customize your brand colors</CardDescription></CardHeader>
          <CardContent className="space-y-6">
            {([
              { key: "primaryColor", label: "Primary Color", desc: "Main brand color used for buttons and links" },
              { key: "secondaryColor", label: "Secondary Color", desc: "Supporting accent color" },
              { key: "accentColor", label: "Accent Color", desc: "Highlight color for special elements" },
              { key: "backgroundColor", label: "Background Color", desc: "Page background color" },
              { key: "textColor", label: "Text Color", desc: "Default text color" },
            ] as const).map(({ key, label, desc }) => (
              <div key={key} className="space-y-2">
                <Label>{label}</Label>
                <p className="text-xs text-muted-foreground">{desc}</p>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <input
                      type="color"
                      value={theme[key]}
                      onChange={(e) => update(key, e.target.value)}
                      className="h-10 w-16 rounded-md border cursor-pointer"
                    />
                  </div>
                  <Input
                    value={theme[key]}
                    onChange={(e) => update(key, e.target.value)}
                    className="font-mono flex-1"
                  />
                  <div
                    className="h-10 w-10 rounded-md border shrink-0"
                    style={{ backgroundColor: theme[key] }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Typography</CardTitle><CardDescription>Choose your font family</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Font Family</Label>
                <Select value={theme.fontFamily} onValueChange={(v) => update("fontFamily", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {fonts.map((f) => (
                      <SelectItem key={f} value={f} style={{ fontFamily: f }}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Border Radius</Label>
                <Select value={theme.borderRadius} onValueChange={(v) => update("borderRadius", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {borderRadiusOptions.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4 p-4 rounded-lg border" style={{ fontFamily: theme.fontFamily, borderRadius: theme.borderRadius }}>
                <p className="text-lg font-semibold">Preview</p>
                <p className="text-sm text-muted-foreground mt-1">The quick brown fox jumps over the lazy dog. 1234567890</p>
                <p className="text-xs text-muted-foreground mt-2">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Display Mode</CardTitle><CardDescription>Theme appearance preferences</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5"><Label>Enable Dark Mode</Label><p className="text-sm text-muted-foreground">Allow users to switch to dark mode</p></div>
                <Switch checked={theme.enableDarkMode} onCheckedChange={(v) => update("enableDarkMode", v)} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5"><Label>Respect System Preference</Label><p className="text-sm text-muted-foreground">Automatically match system theme</p></div>
                <Switch checked={theme.respectSystemTheme} onCheckedChange={(v) => update("respectSystemTheme", v)} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
