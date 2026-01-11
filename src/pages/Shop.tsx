/**
 * Shop Page - Product listing with search and filtering
 * 
 * Uses local product data instead of Shopify API.
 */

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, X } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products, getFranchises } from "@/data/products";

const Shop = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFranchise, setSelectedFranchise] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique franchises for filtering
  const franchises = getFranchises();

  // Filter products based on search and franchise
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesFranchise =
        !selectedFranchise ||
        product.franchise === selectedFranchise;

      return matchesSearch && matchesFranchise;
    });
  }, [searchQuery, selectedFranchise]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedFranchise(null);
  };

  const hasActiveFilters = searchQuery !== "" || selectedFranchise !== null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary/50 to-background py-12">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Our <span className="text-primary">Collection</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse our curated selection of premium, hand-painted collectible statues.
                Each piece is crafted with exceptional attention to detail.
              </p>
            </motion.div>

            {/* Search and Filter Bar */}
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Filter Toggle */}
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {hasActiveFilters && (
                    <Badge variant="secondary" className="ml-2">Active</Badge>
                  )}
                </Button>

                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear all
                  </Button>
                )}
              </div>

              {/* Filter Options */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2"
                >
                  {franchises.map((franchise) => (
                    <Badge
                      key={franchise}
                      variant={selectedFranchise === franchise ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() =>
                        setSelectedFranchise(
                          selectedFranchise === franchise ? null : franchise
                        )
                      }
                    >
                      {franchise}
                    </Badge>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="container py-12">
          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredProducts.length} of {products.length} products
          </p>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">
                No products found matching your criteria.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
