import { Star, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  id?: string;
  image: string;
  title: string;
  originalPrice: number;
  salePrice: number;
  rating: number;
  discount: number;
}

const ProductCard = ({ id, image, title, originalPrice, salePrice, rating, discount }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: id || title,
      title,
      image,
      price: salePrice,
      originalPrice,
    });
    toast.success(`${title.slice(0, 30)}… added to cart`);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group bg-card rounded-xl overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-hover)] transition-shadow"
    >
      <div className="relative aspect-square overflow-hidden">
        {discount > 0 && (
          <span className="absolute top-3 left-3 z-10 bg-sale text-sale-foreground text-xs font-bold px-2.5 py-1 rounded-md">
            -{discount}%
          </span>
        )}
        <img
          src={image}
          alt={title}
          loading="lazy"
          width={640}
          height={640}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 z-10 bg-primary text-primary-foreground p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:opacity-90"
        >
          <ShoppingCart size={18} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-heading text-sm font-semibold text-foreground line-clamp-2 mb-2 leading-snug">
          {title}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={13}
              className={i < rating ? "fill-primary text-primary" : "text-border"}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm line-through">${originalPrice.toFixed(2)}</span>
          <span className="text-primary font-bold text-base">${salePrice.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
