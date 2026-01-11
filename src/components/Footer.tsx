import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Shield, Mail, MapPin } from "lucide-react";
export function Footer() {
  return <footer className="border-t border-border bg-card">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={logo} alt="NerdicForge" className="h-12 w-12" />
              <div>
                <span className="font-display text-xl font-bold text-gradient-forge">NerdicForge</span>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">Collector Statues</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md mb-6 leading-relaxed">
              Premium fan-made statues crafted with resin, 3D printing, and meticulous hand painting. 
              Each piece is forged with passion for true collectors who appreciate legendary craftsmanship.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@nerdicforge.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Sweden</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-6">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">
                  Shop Collection
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/custom-order" className="text-muted-foreground hover:text-primary transition-colors">
                  Custom Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold mb-6">Support</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>Shipping Info</li>
              <li>Returns & Exchanges</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <img alt="NerdicForge" className="h-8 w-8" src="/lovable-uploads/9e8c5132-1b02-4ba2-ae7f-20abe40bfdcb.png" />
              <p>EST. 2011</p>
            </div>
            <p>© {new Date().getFullYear()} NerdicForge. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </footer>;
}