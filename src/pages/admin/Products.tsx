import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Pencil, Trash2, Plus } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Product = Tables<"products">;

const emptyProduct = {
  title: "",
  image_url: "",
  original_price: 0,
  sale_price: null as number | null,
  discount: 0,
  description: "",
  is_best_seller: false,
  is_featured: false,
  rating: 5,
};

const Products = () => {
  const queryClient = useQueryClient();
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState(emptyProduct);

  const { data: products, isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (isNew) {
        const { error } = await supabase.from("products").insert({
          title: form.title,
          image_url: form.image_url,
          original_price: form.original_price,
          sale_price: form.sale_price,
          discount: form.discount,
          description: form.description,
          is_best_seller: form.is_best_seller,
          is_featured: form.is_featured,
          rating: form.rating,
        });
        if (error) throw error;
      } else if (editProduct) {
        const { error } = await supabase.from("products").update({
          title: form.title,
          image_url: form.image_url,
          original_price: form.original_price,
          sale_price: form.sale_price,
          discount: form.discount,
          description: form.description,
          is_best_seller: form.is_best_seller,
          is_featured: form.is_featured,
          rating: form.rating,
        }).eq("id", editProduct.id);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success(isNew ? "Product created!" : "Product updated!");
      closeDialog();
    },
    onError: (err: any) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Product deleted!");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const openEdit = (product: Product) => {
    setIsNew(false);
    setEditProduct(product);
    setForm({
      title: product.title,
      image_url: product.image_url,
      original_price: product.original_price,
      sale_price: product.sale_price,
      discount: product.discount ?? 0,
      description: product.description ?? "",
      is_best_seller: product.is_best_seller ?? false,
      is_featured: product.is_featured ?? false,
      rating: product.rating ?? 5,
    });
  };

  const openNew = () => {
    setIsNew(true);
    setEditProduct({} as Product);
    setForm(emptyProduct);
  };

  const closeDialog = () => {
    setEditProduct(null);
    setIsNew(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-bold">Products</h1>
        <Button onClick={openNew} className="gap-2">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
        </div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Sale</TableHead>
                <TableHead>Best Seller</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <img src={p.image_url} alt={p.title} className="w-10 h-10 rounded object-cover" />
                  </TableCell>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell>${p.original_price}</TableCell>
                  <TableCell>{p.sale_price ? `$${p.sale_price}` : "—"}</TableCell>
                  <TableCell>{p.is_best_seller ? "✓" : "—"}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(p)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => deleteMutation.mutate(p.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Edit / New Dialog */}
      <Dialog open={!!editProduct} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{isNew ? "Add Product" : "Edit Product"}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }}
            className="space-y-4"
          >
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div>
              <label className="text-sm font-medium">Image URL</label>
              <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Original Price</label>
                <Input type="number" step="0.01" value={form.original_price} onChange={(e) => setForm({ ...form, original_price: Number(e.target.value) })} required />
              </div>
              <div>
                <label className="text-sm font-medium">Sale Price</label>
                <Input type="number" step="0.01" value={form.sale_price ?? ""} onChange={(e) => setForm({ ...form, sale_price: e.target.value ? Number(e.target.value) : null })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Discount %</label>
                <Input type="number" value={form.discount} onChange={(e) => setForm({ ...form, discount: Number(e.target.value) })} />
              </div>
              <div>
                <label className="text-sm font-medium">Rating (1-5)</label>
                <Input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.is_best_seller} onChange={(e) => setForm({ ...form, is_best_seller: e.target.checked })} />
                Best Seller
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} />
                Featured
              </label>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={closeDialog}>Cancel</Button>
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Products;
