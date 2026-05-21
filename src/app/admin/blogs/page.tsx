"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, MoreHorizontal, Edit, Trash2, Eye, FileText, Calendar, Eye as ViewIcon, Loader2, AlertCircle, RefreshCw } from "lucide-react";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  author: string;
  category: string;
  status: string;
  featured: boolean;
  createdAt: string;
  views: number;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = React.useState<Blog[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [deleting, setDeleting] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/blogs");
        const json = await res.json();
        if (!json.success) throw new Error(json.message || "Failed to fetch blogs");
        if (mounted) setBlogs(json.data);
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : "Failed to fetch blogs");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const handleDelete = async (id: string) => {
    setDeleting(id);
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      const json = await res.json();
      if (!json.success) throw new Error(json.message || "Failed to delete");
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setDeleting(null);
    }
  };

  const filteredBlogs = blogs.filter((b) =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground">Loading blogs...</p>
        </div>
      </motion.div>
    );
  }

  if (error && blogs.length === 0) {
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
        <div><h1 className="text-3xl font-bold">Blog Posts</h1><p className="text-muted-foreground mt-1">Manage your blog content</p></div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" />Create Post</Button></DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader><DialogTitle>Create New Blog Post</DialogTitle></DialogHeader>
            <Tabs defaultValue="content">
              <TabsList><TabsTrigger value="content">Content</TabsTrigger><TabsTrigger value="seo">SEO</TabsTrigger><TabsTrigger value="media">Media</TabsTrigger></TabsList>
              <TabsContent value="content" className="space-y-4">
                <div className="grid gap-2"><Label>Title</Label><Input placeholder="Blog post title" /></div>
                <div className="grid gap-2"><Label>Slug</Label><Input placeholder="url-friendly-slug" /></div>
                <div className="grid grid-cols-2 gap-4"><div className="grid gap-2"><Label>Category</Label><Input placeholder="Category" /></div><div className="grid gap-2"><Label>Author</Label><Input placeholder="Author name" /></div></div>
                <div className="grid gap-2"><Label>Content</Label><Textarea placeholder="Write your blog content..." rows={10} /></div>
                <div className="flex items-center justify-between"><div className="space-y-0.5"><Label>Publish</Label><p className="text-sm text-muted-foreground">Make this post visible</p></div><Switch defaultChecked /></div>
              </TabsContent>
              <TabsContent value="seo" className="space-y-4">
                <div className="grid gap-2"><Label>Meta Title</Label><Input placeholder="SEO title (60 chars)" /></div>
                <div className="grid gap-2"><Label>Meta Description</Label><Textarea placeholder="SEO description (160 chars)" rows={3} /></div>
                <div className="grid gap-2"><Label>Keywords</Label><Input placeholder="keyword1, keyword2" /></div>
              </TabsContent>
              <TabsContent value="media" className="space-y-4">
                <div className="grid gap-2"><Label>Featured Image</Label><div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50">Click to upload</div></div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end gap-3 mt-4"><Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button><Button>Create Post</Button></div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {["All", "Published", "Draft", "Featured"].map((filter, i) => (
          <Card key={filter} className="cursor-pointer hover:bg-muted/50"><CardContent className="p-4 text-center"><p className="text-2xl font-bold">{i === 0 ? blogs.length : blogs.filter((b) => b.status?.toLowerCase() === filter.toLowerCase() || b.featured === (filter === "Featured")).length}</p><p className="text-sm text-muted-foreground">{filter}</p></CardContent></Card>
        ))}
      </div>

      <Card><CardContent className="p-4"><div className="relative max-w-md"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input placeholder="Search posts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" /></div></CardContent></Card>

      {filteredBlogs.length === 0 ? (
        <Card><CardContent className="p-12 text-center"><p className="text-muted-foreground">No blog posts found</p></CardContent></Card>
      ) : (
        <div className="space-y-4">
          {filteredBlogs.map((blog) => (
            <Card key={blog._id} className="hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-24 rounded-lg bg-muted flex items-center justify-center"><FileText className="h-8 w-8 text-muted-foreground" /></div>
                    <div>
                      <h3 className="font-semibold">{blog.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span>{blog.author}</span>
                        <span>•</span>
                        <span className="capitalize">{blog.category}</span>
                        <span>•</span>
                        <Calendar className="h-3 w-3" />
                        <span>{blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right"><div className="flex items-center gap-1 text-sm"><ViewIcon className="h-4 w-4" />{blog.views}</div><Badge variant={blog.status === "published" ? "success" : "secondary"}>{blog.status}</Badge></div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent><DropdownMenuItem><Eye className="mr-2 h-4 w-4" />View</DropdownMenuItem><DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Edit</DropdownMenuItem><DropdownMenuItem className="text-destructive" onClick={() => handleDelete(blog._id)} disabled={deleting === blog._id}>{deleting === blog._id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}Delete</DropdownMenuItem></DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  );
}
