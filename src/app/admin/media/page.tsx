"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Search, Upload, Trash2, Copy, Check, Image, Grid, List, Filter, Loader2, AlertCircle, RefreshCw } from "lucide-react";

interface MediaItem {
  _id: string;
  name: string;
  url: string;
  type: "image" | "video" | "document";
  size: string;
  dimensions?: string;
  uploadedAt: string;
}

export default function MediaLibraryPage() {
  const [media, setMedia] = React.useState<MediaItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/uploads");
        const json = await res.json();
        if (!json.success) throw new Error(json.message || "Failed to fetch media");
        if (mounted) setMedia(json.data);
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : "Failed to fetch media");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const filteredMedia = media.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading media...</p>
        </div>
      </motion.div>
    );
  }

  if (error && media.length === 0) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3 text-center">
          <AlertCircle className="h-8 w-8 text-destructive" />
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button variant="outline" onClick={() => window.location.reload()}><RefreshCw className="mr-2 h-4 w-4" />Retry</Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground mt-1">Manage your images, videos, and documents</p>
        </div>
        <div className="flex gap-2">
          {selectedItems.length > 0 && (
            <Button variant="destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete ({selectedItems.length})
            </Button>
          )}
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search media..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center border rounded-md">
                <Button variant={viewMode === "grid" ? "secondary" : "ghost"} size="icon" onClick={() => setViewMode("grid")}><Grid className="h-4 w-4" /></Button>
                <Button variant={viewMode === "list" ? "secondary" : "ghost"} size="icon" onClick={() => setViewMode("list")}><List className="h-4 w-4" /></Button>
              </div>
              <Button variant="outline"><Filter className="mr-2 h-4 w-4" />Filter</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-dashed">
        <CardContent className="p-8 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center"><Upload className="h-8 w-8 text-primary" /></div>
            <div><p className="text-lg font-medium">Drag and drop files here</p><p className="text-sm text-muted-foreground">or click to browse</p></div>
            <p className="text-xs text-muted-foreground">Supports: JPG, PNG, GIF, PDF, MP4 up to 50MB</p>
          </div>
        </CardContent>
      </Card>

      {filteredMedia.length === 0 ? (
        <Card><CardContent className="p-12 text-center"><p className="text-muted-foreground">No media files found</p></CardContent></Card>
      ) : viewMode === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredMedia.map((item) => (
            <Card key={item._id} className="overflow-hidden group">
              <CardContent className="p-0 relative">
                <div className="aspect-square bg-muted relative">
                  {item.type === "image" ? (
                    <img src={item.url} alt={item.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"><Image className="h-12 w-12 text-muted-foreground/50" /></div>
                  )}
                  <div className="absolute top-2 left-2">
                    <Checkbox checked={selectedItems.includes(item._id)} onCheckedChange={() => handleSelect(item._id)} className="h-5 w-5 bg-background/80 border-background" />
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-1">
                      <Button variant="secondary" size="icon" className="h-8 w-8" onClick={() => handleCopyUrl(item.url, item._id)}>
                        {copiedId === item._id ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                      </Button>
                      <Button variant="secondary" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium truncate">{item.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground">{item.size}</span>
                    {item.dimensions && <span className="text-xs text-muted-foreground">{item.dimensions}</span>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-4 text-left"><Checkbox checked={selectedItems.length === filteredMedia.length} onCheckedChange={(checked) => { checked ? setSelectedItems(filteredMedia.map((i) => i._id)) : setSelectedItems([]); }} /></th>
                  <th className="p-4 text-left text-sm font-medium">Name</th>
                  <th className="p-4 text-left text-sm font-medium hidden sm:table-cell">Type</th>
                  <th className="p-4 text-left text-sm font-medium hidden md:table-cell">Size</th>
                  <th className="p-4 text-left text-sm font-medium hidden md:table-cell">Dimensions</th>
                  <th className="p-4 text-left text-sm font-medium hidden lg:table-cell">Uploaded</th>
                  <th className="p-4 text-right text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMedia.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-muted/50">
                    <td className="p-4"><Checkbox checked={selectedItems.includes(item._id)} onCheckedChange={() => handleSelect(item._id)} /></td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-muted overflow-hidden flex-shrink-0">
                          {item.type === "image" ? (
                            <img src={item.url} alt={item.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center"><Image className="h-5 w-5 text-muted-foreground" /></div>
                          )}
                        </div>
                        <span className="font-medium truncate max-w-[120px] sm:max-w-none">{item.name}</span>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell"><Badge variant="outline" className="capitalize">{item.type}</Badge></td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{item.size}</td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{item.dimensions || "-"}</td>
                    <td className="p-4 text-muted-foreground hidden lg:table-cell">{item.uploadedAt ? new Date(item.uploadedAt).toLocaleDateString() : ""}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleCopyUrl(item.url, item._id)}>
                          {copiedId === item._id ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-destructive" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
