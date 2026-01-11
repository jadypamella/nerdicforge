/**
 * Product Card Component
 * 
 * Displays a single product in the grid.
 * Now uses local Product type instead of Shopify.
 */

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Product, formatPrice } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    addToCart(product);
    toast.success("Added to cart", {
      description: product.name,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-lg transition-shadow">
          {/* Image */}
          <div className="aspect-square relative overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />

            {/* Out of stock overlay */}
            {!product.inStock && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                <Badge variant="destructive">Out of Stock</Badge>
              </div>
            )}

            {/* Quick add button */}
            {product.inStock && (
              <Button
                size="sm"
                className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add
              </Button>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs">
                {product.franchise}
              </Badge>
            </div>

            <h3 className="font-semibold text-card-foreground line-clamp-1 mb-1">
              {product.name}
            </h3>

            <p className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
