import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Overview = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [productsRes, ordersRes] = await Promise.all([
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id, total, status"),
      ]);

      const orders = ordersRes.data || [];
      const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total), 0);
      const pendingOrders = orders.filter((o) => o.status === "pending").length;

      return {
        totalProducts: productsRes.count || 0,
        totalOrders: orders.length,
        totalRevenue,
        pendingOrders,
      };
    },
  });

  const cards = [
    { label: "Total Products", value: stats?.totalProducts, icon: Package, color: "text-primary" },
    { label: "Total Orders", value: stats?.totalOrders, icon: ShoppingCart, color: "text-blue-600" },
    { label: "Revenue", value: stats?.totalRevenue !== undefined ? `$${stats.totalRevenue.toFixed(2)}` : undefined, icon: DollarSign, color: "text-green-600" },
    { label: "Pending Orders", value: stats?.pendingOrders, icon: TrendingUp, color: "text-amber-600" },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.label}
              </CardTitle>
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-20" />
              ) : (
                <p className="text-2xl font-bold">{card.value}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Overview;
