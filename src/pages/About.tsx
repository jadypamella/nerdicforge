import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import logo from "@/assets/logo.png";
import { Paintbrush, Printer, Palette, Package, Timer, Heart } from "lucide-react";
import { motion } from "framer-motion";
const About = () => {
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full" />
          </div>
          <div className="container">
            <motion.div className="max-w-3xl mx-auto text-center" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6
          }}>
              <img src={logo} alt="NerdicForge" className="w-24 h-24 mx-auto mb-8" />
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
                About <span className="text-gradient-forge">NerdicForge</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Where Nordic craftsmanship meets nerdy passion.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story */}
        <section className="py-12 bg-card">
          <div className="container">
            <motion.div className="max-w-3xl mx-auto" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }}>
              <h2 className="font-display text-2xl font-semibold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>NerdicForge was born from a deep love for geek culture and the art of bringing fictional characters to life. The name combines "Nerdic" (nerd + Nordic) with "Forge"  representing our Swedish roots and the artisanal, handcrafted nature of everything we create.</p>
                <p>
                  What started as a hobby has grown into a passion project dedicated to creating 
                  museum-quality collectible statues for true fans. Like a Viking blacksmith 
                  forging legendary weapons, we craft each piece with care and precision.
                </p>
                <p>
                  We believe that collectors deserve pieces that honor the characters 
                  and stories they love. That's why we put countless hours into research, 
                  design, and finishing to create statues that stand out in any collection.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Craft Process - NEW DETAILED SECTION */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 opacity-30">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/20 blur-[120px] rounded-full" />
          </div>
          <div className="container">
            <motion.div className="text-center mb-12" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }}>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">How We Craft Your Statue</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Every piece goes through a meticulous multi-step process to ensure the highest quality.
              </p>
            </motion.div>

            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Step 1 */}
                <motion.div className="p-6 rounded-xl bg-card border border-border card-premium" initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.5,
                delay: 0.1
              }}>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Paintbrush className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">1. Digital Sculpting</h3>
                  <p className="text-sm text-muted-foreground">
                    We start with detailed digital sculpting in ZBrush, carefully referencing source 
                    material to capture accurate anatomy, costume details, and character personality.
                  </p>
                </motion.div>

                {/* Step 2 */}
                <motion.div className="p-6 rounded-xl bg-card border border-border card-premium" initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.5,
                delay: 0.2
              }}>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Printer className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">2. 3D Printing</h3>
                  <p className="text-sm text-muted-foreground">
                    Using high-resolution resin and filament printers, we produce the physical 
                    model with incredible detail. Each piece is printed in sections for optimal quality.
                  </p>
                </motion.div>

                {/* Step 3 */}
                <motion.div className="p-6 rounded-xl bg-card border border-border card-premium" initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.5,
                delay: 0.3
              }}>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">3. Assembly & Curing</h3>
                  <p className="text-sm text-muted-foreground">
                    Printed parts are carefully assembled, sanded smooth, and cured under UV light 
                    to ensure strength and durability. Any imperfections are corrected by hand.
                  </p>
                </motion.div>

                {/* Step 4 */}
                <motion.div className="p-6 rounded-xl bg-card border border-border card-premium" initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.5,
                delay: 0.4
              }}>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">4. Hand Painting</h3>
                  <p className="text-sm text-muted-foreground">
                    Each statue is individually painted by hand using professional-grade acrylics. 
                    Multiple layers, washes, and highlights bring the character to life.
                  </p>
                </motion.div>

                {/* Step 5 */}
                <motion.div className="p-6 rounded-xl bg-card border border-border card-premium" initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.5,
                delay: 0.5
              }}>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Timer className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">5. Sealing & QC</h3>
                  <p className="text-sm text-muted-foreground">
                    A protective matte or satin varnish is applied to protect the paint. 
                    Every statue undergoes quality control inspection before packaging.
                  </p>
                </motion.div>

                {/* Step 6 */}
                <motion.div className="p-6 rounded-xl bg-card border border-border card-premium" initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{
                once: true
              }} transition={{
                duration: 0.5,
                delay: 0.6
              }}>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">6. Careful Packaging</h3>
                  <p className="text-sm text-muted-foreground">
                    Statues are securely packaged with custom foam inserts to ensure they 
                    arrive safely at your doorstep, ready to be displayed.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Materials Section */}
        <section className="py-12 bg-card">
          <div className="container">
            <motion.div className="max-w-3xl mx-auto" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }}>
              <h2 className="font-display text-2xl font-semibold mb-6">Materials We Use</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="p-5 rounded-lg bg-secondary/50 border border-border">
                  <h3 className="font-semibold mb-2">Premium Resin</h3>
                  <p className="text-sm text-muted-foreground">
                    High-quality UV-cured resin that captures fine details and provides 
                    excellent durability. Perfect for intricate facial features and textures.
                  </p>
                </div>
                <div className="p-5 rounded-lg bg-secondary/50 border border-border">
                  <h3 className="font-semibold mb-2">PLA/PETG Filament</h3>
                  <p className="text-sm text-muted-foreground">
                    Strong filament materials used for larger structural parts, ensuring 
                    stability and longevity while keeping the statue lightweight.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="py-12">
          <div className="container">
            <motion.div className="max-w-3xl mx-auto" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.6
          }}>
              <h2 className="font-display text-2xl font-semibold mb-6">What We Stand For</h2>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="text-primary text-xl">•</span>
                  <div>
                    <strong className="block">Quality Over Quantity</strong>
                    <span className="text-sm text-muted-foreground">
                      We take our time to ensure every piece meets our high standards.
                    </span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-primary text-xl">•</span>
                  <div>
                    <strong className="block">Fan-Made With Love</strong>
                    <span className="text-sm text-muted-foreground">
                      We're collectors ourselves. We create what we'd want in our own collection.
                    </span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-primary text-xl">•</span>
                  <div>
                    <strong className="block">Transparent Communication</strong>
                    <span className="text-sm text-muted-foreground">
                      Clear information about materials, dimensions, and production timelines.
                    </span>
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default About;