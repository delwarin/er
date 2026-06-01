import { useEffect } from "react";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { LayoutDashboard, Package, ShoppingCart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const navItems = [
  { label: "Overview", path: "/admin", icon: LayoutDashboard },
  { label: "Products", path: "/admin/products", icon: Package },
  { label: "Orders", path: "/admin/orders", icon: ShoppingCart },
];

const AdminDashboard = () => {
  const { user, isAdmin, loading, signOut } = useAdmin();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Skeleton className="w-64 h-8" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <Link to="/" className="font-heading text-xl font-bold">
            <span className="text-primary">Craft</span>yo Admin
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2 truncate">{user.email}</p>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={() => { signOut(); navigate("/admin/login"); }}
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
