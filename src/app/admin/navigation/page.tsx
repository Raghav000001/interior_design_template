"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Menu, Plus, Edit, Trash2, GripVertical, Save, Loader2, ArrowUp, ArrowDown, CheckCircle, AlertCircle } from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  url: string;
  order: number;
}

const STORAGE_KEY = "admin_navigation";

const defaultItems: NavItem[] = [
  { id: "1", label: "Home", url: "/", order: 1 },
  { id: "2", label: "Projects", url: "/projects", order: 2 },
  { id: "3", label: "Services", url: "/services", order: 3 },
  { id: "4", label: "About", url: "/about", order: 4 },
  { id: "5", label: "Blog", url: "/blog", order: 5 },
  { id: "6", label: "Contact", url: "/contact", order: 6 },
];

export default function NavigationPage() {
  const [items, setItems] = React.useState<NavItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultItems;
    } catch {
      return defaultItems;
    }
  });
  const [loaded, setLoaded] = React.useState(true);
  const [editingItem, setEditingItem] = React.useState<NavItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [labelInput, setLabelInput] = React.useState("");
  const [urlInput, setUrlInput] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [saveMessage, setSaveMessage] = React.useState<string | null>(null);

  const openAdd = () => {
    setEditingItem(null);
    setLabelInput("");
    setUrlInput("");
    setIsDialogOpen(true);
  };

  const openEdit = (item: NavItem) => {
    setEditingItem(item);
    setLabelInput(item.label);
    setUrlInput(item.url);
    setIsDialogOpen(true);
  };

  const handleSaveItem = () => {
    if (!labelInput.trim() || !urlInput.trim()) return;
    if (editingItem) {
      setItems((prev) =>
        prev.map((i) => i.id === editingItem.id ? { ...i, label: labelInput.trim(), url: urlInput.trim() } : i)
      );
    } else {
      const newItem: NavItem = {
        id: Date.now().toString(),
        label: labelInput.trim(),
        url: urlInput.trim(),
        order: items.length + 1,
      };
      setItems((prev) => [...prev, newItem]);
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id).map((i, idx) => ({ ...i, order: idx + 1 })));
  };

  const moveItem = (id: string, direction: "up" | "down") => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === id);
      if (idx === -1) return prev;
      const newIdx = direction === "up" ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= prev.length) return prev;
      const copy = [...prev];
      [copy[idx], copy[newIdx]] = [copy[newIdx], copy[idx]];
      return copy.map((i, index) => ({ ...i, order: index + 1 }));
    });
  };

  const handleSave = () => {
    setSaving(true);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      setSaveMessage("Navigation saved successfully");
      setTimeout(() => setSaveMessage(null), 3000);
    } catch {
      setSaveMessage("Failed to save navigation");
      setTimeout(() => setSaveMessage(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  if (!loaded) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3"><Loader2 className="h-8 w-8 animate-spin text-primary" /><p className="text-sm text-muted-foreground">Loading navigation...</p></div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight"><Menu className="inline mr-2 h-8 w-8" />Navigation</h1>
          <p className="text-muted-foreground mt-1">Manage your website navigation menu</p>
        </div>
        <div className="flex items-center gap-2">
          {saveMessage && <Badge variant={saveMessage.includes("Failed") ? "destructive" : "success"}>{saveMessage}</Badge>}
          <Button onClick={handleSave} disabled={saving}>{saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Save Changes</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div><CardTitle>Menu Items</CardTitle><CardDescription>Drag to reorder or use arrow buttons</CardDescription></div>
          <Button onClick={openAdd}><Plus className="mr-2 h-4 w-4" />Add Item</Button>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12">
              <Menu className="h-10 w-10 text-muted-foreground/50" />
              <p className="text-muted-foreground">No menu items yet. Add your first one.</p>
              <Button variant="outline" onClick={openAdd}><Plus className="mr-2 h-4 w-4" />Add Item</Button>
            </div>
          ) : (
            <div className="space-y-2">
              {items.map((item, index) => (
                <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg bg-card hover:bg-muted/50 transition-colors">
                  <GripVertical className="h-5 w-5 text-muted-foreground/50 cursor-grab shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{item.label}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.url}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0">#{item.order}</Badge>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveItem(item.id, "up")} disabled={index === 0}><ArrowUp className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveItem(item.id, "down")} disabled={index === items.length - 1}><ArrowDown className="h-4 w-4" /></Button>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(item)}><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(item.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingItem ? "Edit Menu Item" : "Add Menu Item"}</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2"><Label>Label</Label><Input value={labelInput} onChange={(e) => setLabelInput(e.target.value)} placeholder="e.g. About Us" /></div>
            <div className="space-y-2"><Label>URL</Label><Input value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="e.g. /about" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveItem} disabled={!labelInput.trim() || !urlInput.trim()}>
              {editingItem ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
