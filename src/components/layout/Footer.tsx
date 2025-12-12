import Link from "next/link";
import { Leaf, Instagram, Facebook, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-foreground text-background py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="space-y-4">
                    <Link href="/" className="flex items-center gap-2">
                        <Leaf className="h-6 w-6 text-primary" />
                        <span className="text-xl font-bold font-serif">Salam Tea</span>
                    </Link>
                    <p className="text-background/70 text-sm leading-relaxed">
                        Premium organic tea leaves sourced directly from nature. Promoting health and wellness in every cup.
                    </p>
                </div>

                {/* Links */}
                <div>
                    <h3 className="font-bold mb-4 font-serif">Shop</h3>
                    <ul className="space-y-2 text-sm text-background/70">
                        <li><Link href="/shop" className="hover:text-primary transition-colors">All Teas</Link></li>
                        <li><Link href="/shop?cat=herbal" className="hover:text-primary transition-colors">Herbal</Link></li>
                        <li><Link href="/shop?cat=green" className="hover:text-primary transition-colors">Green Tea</Link></li>
                        <li><Link href="/shop?cat=sets" className="hover:text-primary transition-colors">Gift Sets</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="font-bold mb-4 font-serif">Company</h3>
                    <ul className="space-y-2 text-sm text-background/70">
                        <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="font-bold mb-4 font-serif">Stay Connected</h3>
                    <div className="flex gap-4 mb-6">
                        <Link href="#" className="p-2 bg-background/10 rounded-full hover:bg-primary transition-colors"><Instagram className="h-5 w-5" /></Link>
                        <Link href="#" className="p-2 bg-background/10 rounded-full hover:bg-primary transition-colors"><Facebook className="h-5 w-5" /></Link>
                        <Link href="#" className="p-2 bg-background/10 rounded-full hover:bg-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-background/10 text-center text-sm text-background/50">
                &copy; {new Date().getFullYear()} Salam Tea Leaves. All rights reserved.
            </div>
        </footer>
    );
}
