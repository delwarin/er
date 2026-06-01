import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroCraft from "@/assets/hero-craft.jpg";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[420px] md:h-[520px] overflow-hidden">
      <img
        src={heroCraft}
        alt="Craft supplies and handmade amigurumi toys"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={800}
      />
      <div className="absolute inset-0 bg-foreground/40" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4 drop-shadow-lg"
        >
          Unlock Your Creativity
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-primary-foreground/90 text-lg md:text-xl mb-8 max-w-lg"
        >
          Discover beautiful digital crochet, knitting & sewing patterns
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to="/shop"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold text-base hover:opacity-90 transition-opacity shadow-lg"
          >
            Shop Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
