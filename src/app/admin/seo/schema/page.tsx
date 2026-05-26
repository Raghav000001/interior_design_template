"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileCode, Save, Loader2, Copy, Check, Play, AlertCircle, CheckCircle, Trash2 } from "lucide-react";

interface SchemaTemplate {
  id: string;
  name: string;
  json: string;
}

const templates: Record<string, string> = {
  "Organization": JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Your Company Name",
    "url": "https://example.com",
    "logo": "https://example.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service"
    }
  }, null, 2),
  "LocalBusiness": JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Your Business Name",
    "image": "https://example.com/photo.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main St",
      "addressLocality": "City",
      "addressRegion": "State",
      "postalCode": "12345"
    },
    "telephone": "+1-555-123-4567"
  }, null, 2),
  "Article": JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Article Title",
    "author": {
      "@type": "Person",
      "name": "Author Name"
    },
    "datePublished": "2024-01-01",
    "description": "Article description"
  }, null, 2),
  "Product": JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Product Name",
    "description": "Product description",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": "99.99",
      "availability": "https://schema.org/InStock"
    }
  }, null, 2),
  "FAQPage": JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Question 1?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Answer to question 1."
        }
      }
    ]
  }, null, 2),
};

const STORAGE_KEY = "admin_schema";

const defaultJson = templates["Organization"];

export default function SchemaPage() {
  const [jsonInput, setJsonInput] = React.useState(defaultJson);
  const [savedSchemas, setSavedSchemas] = React.useState<SchemaTemplate[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [selectedTemplate, setSelectedTemplate] = React.useState("Organization");
  const [validationResult, setValidationResult] = React.useState<{ valid: boolean; message: string } | null>(null);
  const [copied, setCopied] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [saveMessage, setSaveMessage] = React.useState<string | null>(null);

  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template);
    setJsonInput(templates[template] || "");
    setValidationResult(null);
  };

  const handleValidate = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (parsed["@context"] !== "https://schema.org") {
        setValidationResult({ valid: false, message: 'Missing or invalid "@context" (should be "https://schema.org")' });
        return;
      }
      if (!parsed["@type"]) {
        setValidationResult({ valid: false, message: 'Missing "@type" property' });
        return;
      }
      setValidationResult({ valid: true, message: `Valid JSON-LD schema of type "${parsed["@type"]}"` });
    } catch (err) {
      setValidationResult({ valid: false, message: err instanceof Error ? err.message : "Invalid JSON" });
    }
  };

  const handleSave = () => {
    setSaving(true);
    try {
      const parsed = JSON.parse(jsonInput);
      const existing = savedSchemas.findIndex((s) => s.id === selectedTemplate);
      const newSchema: SchemaTemplate = { id: selectedTemplate, name: selectedTemplate, json: jsonInput };
      let updated: SchemaTemplate[];
      if (existing >= 0) {
        updated = savedSchemas.map((s, i) => i === existing ? newSchema : s);
      } else {
        updated = [...savedSchemas, newSchema];
      }
      setSavedSchemas(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setSaveMessage("Schema saved successfully");
      setTimeout(() => setSaveMessage(null), 3000);
    } catch {
      setSaveMessage("Invalid JSON - fix errors before saving");
      setTimeout(() => setSaveMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonInput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDelete = (id: string) => {
    const updated = savedSchemas.filter((s) => s.id !== id);
    setSavedSchemas(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight"><FileCode className="inline mr-2 h-8 w-8" />Schema Markup</h1>
          <p className="text-muted-foreground mt-1">Manage JSON-LD structured data for SEO</p>
        </div>
        <div className="flex items-center gap-2">
          {saveMessage && <Badge variant={saveMessage.includes("Invalid") ? "destructive" : "success"}>{saveMessage}</Badge>}
          <Button variant="outline" onClick={handleCopy}>{copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}Copy</Button>
          <Button variant="secondary" onClick={handleValidate}><Play className="mr-2 h-4 w-4" />Validate</Button>
          <Button onClick={handleSave} disabled={saving}>{saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Save</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <Card>
          <CardHeader>
            <CardTitle>Schema Editor</CardTitle>
            <CardDescription>Edit JSON-LD structured data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Template</Label>
              <Select value={selectedTemplate} onValueChange={handleTemplateChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.keys(templates).map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>JSON-LD Code</Label>
              <Textarea
                value={jsonInput}
                onChange={(e) => { setJsonInput(e.target.value); setValidationResult(null); }}
                rows={20}
                className="font-mono text-sm"
                placeholder='{ "@context": "https://schema.org", ... }'
              />
            </div>

            {validationResult && (
              <div className={`flex items-start gap-2 p-3 rounded-lg ${validationResult.valid ? "bg-success/10" : "bg-destructive/10"}`}>
                {validationResult.valid ? <CheckCircle className="h-4 w-4 text-success mt-0.5" /> : <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />}
                <span className="text-sm">{validationResult.message}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Saved Schemas</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {savedSchemas.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No saved schemas</p>
              ) : (
                savedSchemas.map((schema) => (
                  <div key={schema.id} className="flex items-center justify-between p-2 border rounded-lg">
                    <span className="text-sm font-medium truncate">{schema.name}</span>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setJsonInput(schema.json); setSelectedTemplate(schema.name); }}><FileCode className="h-3 w-3" /></Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDelete(schema.id)}><Trash2 className="h-3 w-3" /></Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Resources</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <a href="https://schema.org/" target="_blank" rel="noopener noreferrer" className="block text-sm text-primary hover:underline">schema.org</a>
              <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer" className="block text-sm text-primary hover:underline">Rich Results Test</a>
              <a href="https://developers.google.com/search/docs/appearance/structured-data/search-gallery" target="_blank" rel="noopener noreferrer" className="block text-sm text-primary hover:underline">Search Gallery</a>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
