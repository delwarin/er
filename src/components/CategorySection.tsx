import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import categoryCrochet from "@/assets/category-crochet.jpg";
import categoryKnitting from "@/assets/category-knitting.jpg";
import categorySewing from "@/assets/category-sewing.jpg";

const categories = [
  { image: categoryCrochet, label: "Crochet", href: "/shop?category=crochet" },
  { image: categoryKnitting, label: "Knitting", href: "/shop?category=knitting" },
  { image: categorySewing, label: "Sewing", href: "/shop?category=sewing" },
];

const CategorySection = () => {
  return (
    <section className="py-16 px-4 bg-secondary/50">
      <div className="container mx-auto">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Link
                to={cat.href}
                className="group relative block rounded-xl overflow-hidden aspect-[4/3] shadow-[var(--shadow-card)]"
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  loading="lazy"
                  width={640}
                  height={640}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground drop-shadow-lg">
                    {cat.label}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
