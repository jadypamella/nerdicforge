import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sword, Shield, Axe, Sparkles, Send, Hammer, Crown, Skull, Flame } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
const CustomOrder = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    character: "",
    franchise: "",
    description: "",
    reference: ""
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your request has been sent to the forge!", {
      description: "We'll contact you within 2-3 business days."
    });
    setFormData({
      name: "",
      email: "",
      character: "",
      franchise: "",
      description: "",
      reference: ""
    });
  };
  return <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Epic Hero Section */}
        <section className="py-20 md:py-32 relative overflow-hidden bg-gradient-to-br from-secondary via-secondary to-iron">
          {/* Animated glow backgrounds */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-72 h-72 bg-amber-500/30 rounded-full blur-3xl animate-ember" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-ember" style={{
            animationDelay: '1s'
          }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-amber-400/10 rounded-full blur-3xl" />
          </div>

          {/* Triangle pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F59E0B' fill-opacity='1'%3E%3Cpath d='M40 40L20 20h40L40 40zm0 0L20 60h40L40 40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
          </div>

          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-10" />

          <div className="container relative z-10">
            <motion.div className="max-w-4xl mx-auto text-center" initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.7
          }}>
              {/* Viking decorative icons */}
              <motion.div className="flex items-center justify-center gap-4 mb-6" initial={{
              opacity: 0,
              scale: 0.8
            }} animate={{
              opacity: 1,
              scale: 1
            }} transition={{
              delay: 0.2,
              duration: 0.5
            }}>
                <motion.div animate={{
                rotate: [-5, 5, -5]
              }} transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}>
                  <Axe className="h-12 w-12 text-amber-500" />
                </motion.div>
                <Crown className="h-12 w-12 text-amber-400" />
                <motion.div animate={{
                rotate: [5, -5, 5]
              }} transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}>
                  <Sword className="h-12 w-12 text-amber-500" />
                </motion.div>
              </motion.div>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                Summon Your{" "}
                <span className="text-gradient-forge">Legend</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-foreground/80 mb-4">
                Can't find your favorite character? Let our forge masters create it!
              </p>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">From the mightiest warriors to the darkest villains: if you can dream it, we can forge it. Commission your own legendary statue today!</p>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-card/50 border-y border-border">
          <div className="container">
            <motion.div className="text-center mb-12" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }}>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                The Sacred Ritual of Custom Orders
              </h2>
              <p className="text-muted-foreground">How your legendary statue comes to life</p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[{
              icon: Sparkles,
              title: "1. Tell Us Your Vision",
              desc: "Describe the character of your dreams in glorious detail"
            }, {
              icon: Skull,
              title: "2. We Consult the Runes",
              desc: "Our craftsmen evaluate feasibility and provide a quote"
            }, {
              icon: Hammer,
              title: "3. Forging Begins",
              desc: "Once approved, we sculpt, print, and paint your masterpiece"
            }, {
              icon: Crown,
              title: "4. Claim Your Glory",
              desc: "Your legendary statue arrives, ready for your hall of honor"
            }].map((step, index) => <motion.div key={step.title} className="text-center" initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              delay: index * 0.1
            }}>
                  <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Order Form */}
        <section className="py-20 relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/10 blur-[100px] rounded-full" />
          </div>

          <div className="container">
            <div className="max-w-2xl mx-auto">
              <motion.div className="text-center mb-12" initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }}>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Send Your Request to the Forge
                </h2>
                <p className="text-muted-foreground">
                  Fill out the sacred scroll below and our blacksmiths shall answer your call
                </p>
              </motion.div>

              <motion.form onSubmit={handleSubmit} className="space-y-6 p-8 bg-card border border-border rounded-2xl card-premium" initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Your Name <span className="text-primary">*</span>
                    </Label>
                    <Input id="name" placeholder="Ragnar Lothbrok" value={formData.name} onChange={e => setFormData({
                    ...formData,
                    name: e.target.value
                  })} required className="bg-secondary/50 border-border focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email <span className="text-primary">*</span>
                    </Label>
                    <Input id="email" type="email" placeholder="warrior@valhalla.com" value={formData.email} onChange={e => setFormData({
                    ...formData,
                    email: e.target.value
                  })} required className="bg-secondary/50 border-border focus:border-primary" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="character" className="text-sm font-medium">
                      Character Name <span className="text-primary">*</span>
                    </Label>
                    <Input id="character" placeholder="e.g., Guts, Kratos, Geralt..." value={formData.character} onChange={e => setFormData({
                    ...formData,
                    character: e.target.value
                  })} required className="bg-secondary/50 border-border focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="franchise" className="text-sm font-medium">
                      From (Anime, Game, Movie...)
                    </Label>
                    <Input id="franchise" placeholder="e.g., Berserk, God of War..." value={formData.franchise} onChange={e => setFormData({
                    ...formData,
                    franchise: e.target.value
                  })} className="bg-secondary/50 border-border focus:border-primary" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Describe Your Vision <span className="text-primary">*</span>
                  </Label>
                  <Textarea id="description" placeholder="Tell us about the pose, outfit, expression, size preference... The more detail, the better we can forge your legend!" value={formData.description} onChange={e => setFormData({
                  ...formData,
                  description: e.target.value
                })} required rows={4} className="bg-secondary/50 border-border focus:border-primary resize-none" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reference" className="text-sm font-medium">
                    Reference Images (Optional)
                  </Label>
                  <Input id="reference" placeholder="Paste links to reference images (Pinterest, ArtStation, etc.)" value={formData.reference} onChange={e => setFormData({
                  ...formData,
                  reference: e.target.value
                })} className="bg-secondary/50 border-border focus:border-primary" />
                  <p className="text-xs text-muted-foreground">
                    Share any images that inspire your vision. Multiple links separated by commas.
                  </p>
                </div>

                <Button type="submit" size="lg" className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground btn-shimmer">
                  <Send className="mr-2 h-5 w-5" />
                  Send Request to the Forge
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  We typically respond within 2-3 business days. Custom orders start from 800 SEK.
                </p>
              </motion.form>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-card/50 border-t border-border">
          <div className="container">
            <motion.div className="max-w-3xl mx-auto" initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }}>
              <h2 className="font-display text-2xl font-bold text-center mb-8">
                Questions from Fellow Warriors
              </h2>
              <div className="space-y-4">
                {[{
                q: "How long does a custom order take?",
                a: "Depending on complexity, custom orders typically take 3-6 weeks from approval to shipping. We'll give you a timeline estimate in our quote."
              }, {
                q: "Can you make any character?",
                a: "Almost! We can create characters from anime, games, movies, comics, and more. If it can be sculpted, we can forge it."
              }, {
                q: "What sizes are available?",
                a: "We offer 1/8, 1/6, and 1/5 scale statues. Larger scales are possible for an additional cost."
              }, {
                q: "What if I don't like the final result?",
                a: "We share work-in-progress photos throughout the process. You can request adjustments during the painting phase to ensure you're happy with your statue."
              }, {
                q: "How long does shipping take?",
                a: "Shipping times vary by location. Within Brazil, expect 2-5 business days. International orders typically take 7-21 business days."
              }].map((faq, index) => <div key={index} className="p-5 rounded-xl bg-secondary/30 border border-border">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      {faq.q}
                    </h3>
                    <p className="text-sm text-muted-foreground pl-6">{faq.a}</p>
                  </div>)}
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default CustomOrder;