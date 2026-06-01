import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import ProductCard from "./ProductCard";
import { Skeleton } from "./ui/skeleton";

const BestSellers = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["best-sellers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_best_seller", true)
        .order("created_at", { ascending: false })
        .limit(8);
      if (error) throw error;
      return data;
    },
  });

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          Our Best Sellers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-square rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
            : products?.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image_url}
                  title={product.title}
                  originalPrice={product.original_price}
                  salePrice={product.sale_price ?? product.original_price}
                  rating={product.rating ?? 5}
                  discount={product.discount ?? 0}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
