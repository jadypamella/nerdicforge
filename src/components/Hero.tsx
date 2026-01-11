import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Paintbrush, Award, Sword } from "lucide-react";
import { motion } from "framer-motion";
export function Hero() {
  return <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        {/* Blood glow effect */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/15 blur-[120px] animate-ember" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] animate-ember" style={{
        animationDelay: '2s'
      }} />
        
        {/* Subtle iron texture pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      </div>

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div className="text-center lg:text-left" initial={{
          opacity: 0,
          y: 40
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.8,
          ease: "easeOut"
        }}>
            {/* Announcement badge */}
            <motion.div initial={{
            opacity: 0,
            scale: 0.9
          }} animate={{
            opacity: 1,
            scale: 1
          }} transition={{
            delay: 0.2,
            duration: 0.5
          }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 text-sm mb-8">
              <Sword className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Forged in Small Batches</span>
            </motion.div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Forge Your{" "}
              <span className="text-gradient-forge">Legend</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Premium collector statues 3D printed with high-quality resin and filament. 
              Each piece is hand-painted for those who collect legends.
            </p>

            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.4,
            duration: 0.6
          }}>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 h-14 text-lg btn-shimmer">
                <Link to="/shop">
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border hover:border-primary/50 hover:bg-secondary h-14 text-lg">
                <Link to="/about">Our Craft</Link>
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} transition={{
            delay: 0.6,
            duration: 0.6
          }}>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <Paintbrush className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Hand Painted<br className="hidden sm:block" /> Details</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Premium<br className="hidden sm:block" /> Resin</p>
              </div>
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Collector<br className="hidden sm:block" /> Quality</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual element - Viking emblem */}
          <motion.div className="relative hidden lg:block" initial={{
          opacity: 0,
          x: 40
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.3
        }}>
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative blood ring */}
              <div className="absolute inset-4 border-2 border-primary/20 rounded-full animate-float" style={{
              animationDelay: '1s'
            }} />
              <div className="absolute inset-12 border border-accent/10 rounded-full animate-float" style={{
              animationDelay: '2s'
            }} />
              
              {/* Center emblem */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 rounded-full bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center backdrop-blur-sm border border-primary/30">
                  <div className="text-center">
                    <img src="/favicon.png" alt="NerdicForge" className="w-20 h-20 mx-auto" />
                    <div className="flex items-center justify-center gap-2 mt-2">
                      
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">Est. 2011</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating stat cards */}
              <motion.div className="absolute top-8 right-0 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg" animate={{
              y: [0, -10, 0]
            }} transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}>
                <p className="text-2xl font-bold text-primary">1/1 - 1/12</p>
                <p className="text-xs text-muted-foreground">Choose Your Scale</p>
              </motion.div>

              <motion.div className="absolute top-32 left-0 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg" animate={{
              y: [0, -10, 0]
            }} transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}>
                <p className="text-2xl font-bold text-primary">Premium</p>
                <p className="text-xs text-muted-foreground">3D Printed</p>
              </motion.div>

              <motion.div className="absolute bottom-16 left-0 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg" animate={{
              y: [0, -10, 0]
            }} transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}>
                <p className="text-2xl font-bold text-primary">100%</p>
                <p className="text-xs text-muted-foreground">Hand Painted</p>
              </motion.div>

              <motion.div className="absolute bottom-0 right-16 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg" animate={{
              y: [0, -10, 0]
            }} transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}>
                <p className="text-2xl font-bold text-primary">Custom</p>
                <p className="text-xs text-muted-foreground">Order Yours</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>;
}