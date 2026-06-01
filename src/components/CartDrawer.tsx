import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md bg-card">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl text-foreground">Your Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
            <ShoppingBag size={48} strokeWidth={1.5} />
            <p className="text-sm">Your cart is empty</p>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 py-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 bg-background rounded-lg">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-foreground line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground line-through">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-sm font-bold text-primary">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 border border-border rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-muted rounded-l-md transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-muted rounded-r-md transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-lg font-bold text-foreground">${totalPrice.toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg">
                Checkout
              </Button>
              <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={clearCart}>
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
