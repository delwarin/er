import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <section className="py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto max-w-2xl text-center"
      >
        <h2 className="font-heading text-3xl font-bold text-foreground mb-3">
          Join Our Community
        </h2>
        <p className="text-muted-foreground mb-8">
          Get exclusive patterns, tips, and special offers delivered to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity whitespace-nowrap">
            Subscribe
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;
