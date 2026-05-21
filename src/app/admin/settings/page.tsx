"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Save, Upload, Camera, ExternalLink, AtSign, Briefcase, Globe, Mail, Phone, MapPin, Loader2, CheckCircle, AlertCircle } from "lucide-react";

interface Settings {
  companyName: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  businessHours: string;
  enableContactForm: boolean;
  emailNotifications: boolean;
  autoRespond: boolean;
  instagram: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  pinterest: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  enableDarkMode: boolean;
  respectSystemTheme: boolean;
  navItems: { label: string; url: string; order: number }[];
}

const defaultSettings: Settings = {
  companyName: "Luxury Interiors",
  tagline: "Creating beautiful spaces",
  description: "We are a premium interior design studio specializing in luxury residential and commercial projects.",
  email: "contact@luxuryinteriors.com",
  phone: "+1 (555) 123-4567",
  address: "123 Design Street, Los Angeles, CA 90001",
  businessHours: "Monday - Friday: 9:00 AM - 6:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: Closed",
  enableContactForm: true,
  emailNotifications: true,
  autoRespond: false,
  instagram: "",
  facebook: "",
  twitter: "",
  linkedin: "",
  pinterest: "",
  primaryColor: "#5B3DF5",
  secondaryColor: "#7C3AED",
  accentColor: "#C4A962",
  enableDarkMode: true,
  respectSystemTheme: true,
  navItems: [
    { label: "Home", url: "/", order: 1 },
    { label: "Projects", url: "/projects", order: 2 },
    { label: "Services", url: "/services", order: 3 },
    { label: "About", url: "/about", order: 4 },
    { label: "Blog", url: "/blog", order: 5 },
    { label: "Contact", url: "/contact", order: 6 },
  ],
};

const STORAGE_KEY = "admin_settings";

export default function SettingsPage() {
  const [settings, setSettings] = React.useState<Settings>(defaultSettings);
  const [loaded, setLoaded] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [saveMessage, setSaveMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Settings;
        setSettings({ ...defaultSettings, ...parsed });
      }
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setSaving(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      setSaveMessage("Settings saved successfully");
      setTimeout(() => setSaveMessage(null), 3000);
    } catch {
      setSaveMessage("Failed to save settings");
      setTimeout(() => setSaveMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3"><Loader2 className="h-8 w-8 animate-spin text-primary" /><p className="text-sm text-muted-foreground">Loading settings...</p></div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><h1 className="text-3xl font-bold tracking-tight">Site Settings</h1><p className="text-muted-foreground mt-1">Manage your website&apos;s general settings</p></div>
        <div className="flex items-center gap-2">
          {saveMessage && <Badge variant={saveMessage.includes("Failed") ? "destructive" : "success"}>{saveMessage}</Badge>}
          <Button onClick={handleSave} disabled={saving}>{saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Save Changes</Button>
        </div>
      </div>

      <Tabs defaultValue="brand" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-flex">
          <TabsTrigger value="brand">Brand</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="social">Social</TabsTrigger>
          <TabsTrigger value="theme">Theme</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
        </TabsList>

        <TabsContent value="brand" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Logo</CardTitle><CardDescription>Upload your company logo</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-32 rounded-lg bg-muted flex items-center justify-center border-2 border-dashed"><Upload className="h-8 w-8 text-muted-foreground" /></div>
                  <div><p className="text-sm font-medium">Current Logo</p><p className="text-xs text-muted-foreground">PNG, JPG up to 2MB</p></div>
                </div>
                <Button variant="outline">Upload New Logo</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Favicon</CardTitle><CardDescription>Upload your website favicon</CardDescription></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center border-2 border-dashed"><Upload className="h-6 w-6 text-muted-foreground" /></div>
                  <div><p className="text-sm font-medium">Current Favicon</p><p className="text-xs text-muted-foreground">ICO, PNG 32x32</p></div>
                </div>
                <Button variant="outline">Upload Favicon</Button>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader><CardTitle>Company Information</CardTitle><CardDescription>Basic company details</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2"><Label>Company Name</Label><Input value={settings.companyName} onChange={(e) => update("companyName", e.target.value)} /></div>
                <div className="space-y-2"><Label>Tagline</Label><Input value={settings.tagline} onChange={(e) => update("tagline", e.target.value)} /></div>
              </div>
              <div className="space-y-2"><Label>Description</Label><Textarea value={settings.description} onChange={(e) => update("description", e.target.value)} rows={4} /></div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Contact Information</CardTitle><CardDescription>How visitors can reach you</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2"><Label>Email</Label><div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /><Input value={settings.email} onChange={(e) => update("email", e.target.value)} /></div></div>
                <div className="space-y-2"><Label>Phone</Label><div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /><Input value={settings.phone} onChange={(e) => update("phone", e.target.value)} /></div></div>
              </div>
              <div className="space-y-2"><Label>Address</Label><div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /><Input value={settings.address} onChange={(e) => update("address", e.target.value)} /></div></div>
              <div className="space-y-2"><Label>Business Hours</Label><Textarea value={settings.businessHours} onChange={(e) => update("businessHours", e.target.value)} rows={3} /></div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Contact Form Settings</CardTitle><CardDescription>Configure the contact form behavior</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5"><Label>Enable Contact Form</Label><p className="text-sm text-muted-foreground">Show contact form on website</p></div>
                <Switch checked={settings.enableContactForm} onCheckedChange={(v) => update("enableContactForm", v)} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5"><Label>Send Email Notifications</Label><p className="text-sm text-muted-foreground">Receive email when form is submitted</p></div>
                <Switch checked={settings.emailNotifications} onCheckedChange={(v) => update("emailNotifications", v)} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5"><Label>Auto-respond to Submitters</Label><p className="text-sm text-muted-foreground">Send confirmation email</p></div>
                <Switch checked={settings.autoRespond} onCheckedChange={(v) => update("autoRespond", v)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Social Media Links</CardTitle><CardDescription>Connect your social media accounts</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2"><Label>Instagram</Label><div className="flex items-center gap-2"><Camera className="h-4 w-4 text-muted-foreground" /><Input value={settings.instagram} onChange={(e) => update("instagram", e.target.value)} placeholder="https://instagram.com/yourcompany" /></div></div>
                <div className="space-y-2"><Label>Facebook</Label><div className="flex items-center gap-2"><ExternalLink className="h-4 w-4 text-muted-foreground" /><Input value={settings.facebook} onChange={(e) => update("facebook", e.target.value)} placeholder="https://facebook.com/yourcompany" /></div></div>
                <div className="space-y-2"><Label>Twitter</Label><div className="flex items-center gap-2"><AtSign className="h-4 w-4 text-muted-foreground" /><Input value={settings.twitter} onChange={(e) => update("twitter", e.target.value)} placeholder="https://twitter.com/yourcompany" /></div></div>
                <div className="space-y-2"><Label>LinkedIn</Label><div className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-muted-foreground" /><Input value={settings.linkedin} onChange={(e) => update("linkedin", e.target.value)} placeholder="https://linkedin.com/company/yourcompany" /></div></div>
                <div className="space-y-2 md:col-span-2"><Label>Pinterest</Label><div className="flex items-center gap-2"><Globe className="h-4 w-4 text-muted-foreground" /><Input value={settings.pinterest} onChange={(e) => update("pinterest", e.target.value)} placeholder="https://pinterest.com/yourcompany" /></div></div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theme" className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Color Scheme</CardTitle><CardDescription>Customize your website colors</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2"><Label>Primary Color</Label><div className="flex items-center gap-2"><input type="color" value={settings.primaryColor} onChange={(e) => update("primaryColor", e.target.value)} className="h-10 w-16 rounded-md border" /><Input value={settings.primaryColor} onChange={(e) => update("primaryColor", e.target.value)} className="font-mono" /></div></div>
                <div className="space-y-2"><Label>Secondary Color</Label><div className="flex items-center gap-2"><input type="color" value={settings.secondaryColor} onChange={(e) => update("secondaryColor", e.target.value)} className="h-10 w-16 rounded-md border" /><Input value={settings.secondaryColor} onChange={(e) => update("secondaryColor", e.target.value)} className="font-mono" /></div></div>
                <div className="space-y-2"><Label>Accent Color</Label><div className="flex items-center gap-2"><input type="color" value={settings.accentColor} onChange={(e) => update("accentColor", e.target.value)} className="h-10 w-16 rounded-md border" /><Input value={settings.accentColor} onChange={(e) => update("accentColor", e.target.value)} className="font-mono" /></div></div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Default Theme</CardTitle><CardDescription>Set the default appearance</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5"><Label>Enable Dark Mode</Label><p className="text-sm text-muted-foreground">Allow users to switch to dark mode</p></div>
                <Switch checked={settings.enableDarkMode} onCheckedChange={(v) => update("enableDarkMode", v)} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5"><Label>Respect System Preference</Label><p className="text-sm text-muted-foreground">Automatically match user&apos;s system theme</p></div>
                <Switch checked={settings.respectSystemTheme} onCheckedChange={(v) => update("respectSystemTheme", v)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="navigation" className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Main Navigation</CardTitle><CardDescription>Configure your website navigation</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Menu Items</Label>
                <div className="space-y-2">
                  {settings.navItems.map((item) => (
                    <div key={item.label} className="flex items-center gap-2 p-3 border rounded-lg">
                      <div className="flex-1"><p className="font-medium">{item.label}</p><p className="text-xs text-muted-foreground">{item.url}</p></div>
                      <Badge variant="outline">Order: {item.order}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              <Button variant="outline">Add Menu Item</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
