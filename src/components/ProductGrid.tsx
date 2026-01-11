/**
 * Product Grid Component
 * 
 * Displays a grid of products with optional title and subtitle.
 * Uses local product data.
 */

import { motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

interface ProductGridProps {
  title?: string;
  subtitle?: string;
  limit?: number;
}

export const ProductGrid = ({
  title,
  subtitle,
  limit
}: ProductGridProps) => {
  // Get products, optionally limited
  const displayProducts = limit ? products.slice(0, limit) : products;

  return (
    <section className="container py-16">
      {/* Header */}
      {(title || subtitle) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          )}
          {subtitle && (
            <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
          )}
        </motion.div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {/* Empty state */}
      {displayProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products available.</p>
        </div>
      )}
    </section>
  );
};
