"use client";

import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Add logic to send email later
    };

    return (
        <div className="bg-background min-h-screen">
            <div className="relative py-24 lg:py-32 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/contact-hero.jpg"
                        alt="Tea Preparation Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 z-10" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-20">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-white">Get in Touch</h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto font-medium">
                        We'd love to hear from you. Reach out for orders, partnerships, or just to say hello.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div>
                        <h2 className="text-3xl font-bold font-serif mb-8">Contact Information</h2>
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-secondary/20 rounded-lg">
                                    <Phone className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Phone</h3>
                                    <a href="tel:+254769752124" className="text-foreground/80 hover:text-primary transition-colors block">
                                        +254 769 752 124
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-secondary/20 rounded-lg">
                                    <Mail className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Email</h3>
                                    <a href="mailto:salamaleaves@gmail.com" className="text-foreground/80 hover:text-primary transition-colors block">
                                        salamaleaves@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-secondary/20 rounded-lg">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Location</h3>
                                    <p className="text-foreground/80">
                                        Lodwar, Turkana, Kenya
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-8 bg-secondary/10 rounded-2xl">
                            <h3 className="font-bold text-xl mb-4 font-serif">Visit Us</h3>
                            <p className="text-foreground/80 mb-4">
                                Come experience the freshness of our tea right from the source. Open Monday to Saturday.
                            </p>
                            <div className="aspect-video bg-muted rounded-lg w-full flex items-center justify-center text-muted-foreground">
                                Map Placeholder (Lodwar)
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
                        <h2 className="text-2xl font-bold font-serif mb-6">Send us a Message</h2>
                        {submitted ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Send className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                                <p className="text-foreground/70">Thank you for reaching out. Our team will get back to you shortly.</p>
                                <button onClick={() => setSubmitted(false)} className="mt-6 text-primary hover:underline">Send another message</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Name</label>
                                        <input type="text" className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Your Name" required />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Email</label>
                                        <input type="email" className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary focus:outline-none" placeholder="email@example.com" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Subject</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Inquiry about..." required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Message</label>
                                    <textarea rows={5} className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary focus:outline-none" placeholder="Your message here..." required></textarea>
                                </div>
                                <button type="submit" className="w-full bg-primary text-primary-foreground py-4 rounded-full font-bold hover:bg-primary/90 transition-colors shadow-lg flex items-center justify-center gap-2">
                                    <Send className="h-5 w-5" /> Send Message
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
