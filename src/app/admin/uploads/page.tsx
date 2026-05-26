"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Upload, Image, FileText, Video, Loader2, AlertCircle, RefreshCw, Download, Trash2 } from "lucide-react";

interface UploadRecord {
  _id: string;
  name: string;
  url: string;
  type: string;
  size: string;
  uploadedAt: string;
  folder?: string;
}

export default function UploadsPage() {
  const [uploads, setUploads] = React.useState<UploadRecord[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/uploads");
        const json = await res.json();
        if (!json.success) throw new Error(json.message || "Failed to fetch uploads");
        if (mounted) setUploads(json.data);
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : "Failed to fetch uploads");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const filteredUploads = uploads.filter((u) =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const typeIcon = (type: string) => {
    if (type.startsWith("image")) return <Image className="h-5 w-5" />;
    if (type.startsWith("video")) return <Video className="h-5 w-5" />;
    return <FileText className="h-5 w-5" />;
  };

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3"><Loader2 className="h-8 w-8 animate-spin text-primary" /><p className="text-sm text-muted-foreground">Loading upload history...</p></div>
      </motion.div>
    );
  }

  if (error && uploads.length === 0) {
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
          <h1 className="text-3xl font-bold tracking-tight">Upload History</h1>
          <p className="text-muted-foreground mt-1">View all uploaded files and their details</p>
        </div>
        <Button onClick={() => window.location.reload()} variant="outline"><RefreshCw className="mr-2 h-4 w-4" />Refresh</Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search uploads..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
          </div>
        </CardContent>
      </Card>

      {filteredUploads.length === 0 ? (
        <Card><CardContent className="p-12 text-center">
          <div className="flex flex-col items-center gap-3">
            <Upload className="h-10 w-10 text-muted-foreground/50" />
            <p className="text-muted-foreground">No uploads found</p>
          </div>
        </CardContent></Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium">File</th>
                    <th className="px-4 py-3 text-left text-sm font-medium hidden sm:table-cell">Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium hidden md:table-cell">Size</th>
                    <th className="px-4 py-3 text-left text-sm font-medium hidden md:table-cell">Folder</th>
                    <th className="px-4 py-3 text-left text-sm font-medium hidden lg:table-cell">Uploaded</th>
                    <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUploads.map((upload) => (
                    <tr key={upload._id} className="border-b hover:bg-muted/50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded bg-muted overflow-hidden flex-shrink-0">
                            {upload.type.startsWith("image") ? (
                              <img src={upload.url} alt={upload.name} className="h-full w-full object-cover" />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center">{typeIcon(upload.type)}</div>
                            )}
                          </div>
                          <span className="font-medium truncate max-w-[120px] sm:max-w-none">{upload.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell"><Badge variant="outline">{upload.type}</Badge></td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{upload.size || "-"}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{upload.folder || "-"}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">{upload.uploadedAt ? new Date(upload.uploadedAt).toLocaleString() : "-"}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => window.open(upload.url, "_blank")}>
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
}
