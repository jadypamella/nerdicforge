/**
 * Index Page - Home page
 * 
 * Uses local products and CartContext instead of Shopify.
 */

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Paintbrush, Award, Package } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />

        {/* Featured Products */}
        <section className="relative">
          {/* Subtle background glow */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[100px] rounded-full" />
          </div>

          <ProductGrid
            title="Featured Collection"
            subtitle="Hand-picked statues from our most iconic characters"
            limit={8}
          />

          <div className="container pb-16">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/30 hover:border-primary hover:bg-primary/10"
              >
                <Link to="/shop">
                  View Full Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 border-t border-border bg-gradient-to-b from-secondary/30 to-background">
          <div className="container">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Why Collectors <span className="text-gradient-gold">Choose Us</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every statue is 3D printed with premium resin and filament, then hand-painted
                by skilled artisans. Museum-quality collectibles made for true fans.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Paintbrush,
                  title: "Hand Painted",
                  description: "Each piece receives hours of detailed hand-painting by skilled artisans"
                },
                {
                  icon: Shield,
                  title: "3D Printed Quality",
                  description: "Precision 3D printed with premium resin and PLA/PETG filament"
                },
                {
                  icon: Award,
                  title: "Collector Grade",
                  description: "Museum-quality finish worthy of any serious collection display"
                },
                {
                  icon: Package,
                  title: "Safe Shipping",
                  description: "Double-boxed with custom foam inserts for worldwide delivery"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="p-6 rounded-xl bg-card border border-border card-premium text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full" />
          </div>

          <div className="container">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Ready to <span className="text-gradient-gold">Forge</span> Your Collection?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join collectors worldwide who trust NerdicForge for their premium statue needs.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-14 px-8 text-lg btn-shimmer"
              >
                <Link to="/shop">
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
