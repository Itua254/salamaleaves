import { WalkingAssistant } from "@/components/ui/WalkingAssistant";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Salam Tea Leaves | Premium Organic Tea",
  description: "Experience the finest natural tea blends. Shop organic tea bags online with fast delivery.",
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { CartSidebar } from "@/components/layout/CartSidebar";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased flex flex-col min-h-screen`}
      >
        <CartProvider>
          <Navbar />
          <CartSidebar />
          <main className="flex-1">
            {children}
          </main>
          <WhatsAppButton />
          <Footer />
        </CartProvider>
        <WalkingAssistant />
      </body>
    </html>
  );
}


