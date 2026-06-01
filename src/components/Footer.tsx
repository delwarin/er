import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground/80 pt-12 pb-6 px-4">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="font-heading text-xl font-bold text-primary-foreground mb-4">
            <span className="text-primary">Craft</span>yo
          </h3>
          <p className="text-sm leading-relaxed">
            Your one-stop shop for beautiful digital craft patterns. Unlock your creativity today!
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-primary-foreground text-sm uppercase tracking-wider mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop?category=crochet" className="hover:text-primary transition-colors">Crochet</Link></li>
            <li><Link to="/shop?category=knitting" className="hover:text-primary transition-colors">Knitting</Link></li>
            <li><Link to="/shop?category=sewing" className="hover:text-primary transition-colors">Sewing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-primary-foreground text-sm uppercase tracking-wider mb-4">Help</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/faqs" className="hover:text-primary transition-colors">FAQs</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-primary-foreground text-sm uppercase tracking-wider mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/50">
        © {new Date().getFullYear()} Craftyo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
