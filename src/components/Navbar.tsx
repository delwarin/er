import { useState } from "react";
import { User, ShoppingCart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Crochet", href: "/shop?category=crochet" },
  { label: "Knitting", href: "/shop?category=knitting" },
  { label: "Sewing", href: "/shop?category=sewing" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();

  return (
    <nav className="bg-card shadow-[var(--shadow-soft)] sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        {/* Logo */}
        <Link to="/" className="font-heading text-2xl font-bold text-foreground tracking-tight">
          <span className="text-primary">Craft</span>yo
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">

          <Link to="/admin/login" className="p-2 text-muted-foreground hover:text-primary transition-colors">
            <User size={20} />
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {totalItems}
            </span>
          </button>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-muted-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 pb-4">
          <ul className="flex flex-col gap-3 pt-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
