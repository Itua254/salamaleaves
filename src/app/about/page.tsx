import { Leaf, Heart, Recycle, History } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="bg-background min-h-screen">
            {/* Hero */}
            <div className="bg-secondary/20 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">About Salam Tea Leaves</h1>
                    <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
                        A premium natural tea brand crafted in the heart of Turkana. Pure, healthy, and authentic.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Mission */}
                <div className="max-w-3xl mx-auto text-center mb-20">
                    <Leaf className="w-12 h-12 text-primary mx-auto mb-6" />
                    <h2 className="text-3xl font-bold font-serif mb-6">Our Mission</h2>
                    <p className="text-lg text-foreground/80 leading-relaxed">
                        To promote a healthier lifestyle through high-quality natural tea products while uplifting local communities through sustainable sourcing and ethical production.
                        Every tea bag is made with carefully selected herbs, naturally dried, and blended with zero additives or artificial ingredients.
                    </p>
                </div>

                {/* Story */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="bg-muted aspect-video rounded-2xl overflow-hidden relative">
                        <img
                            src="/turkana-hills.jpg"
                            alt="The Hills of Turkana"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                            <span className="text-white font-serif italic text-xl">The Hills of Turkana</span>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <History className="h-6 w-6 text-primary" />
                            <h2 className="text-3xl font-bold font-serif">Our Story</h2>
                        </div>
                        <p className="text-foreground/80 leading-relaxed mb-4">
                            What started as a small idea in Lodwar grew into a wellness-focused local brand. Salam Tea Leaves was founded to share the rich herbal heritage of the region with customers across Kenya and internationally.
                        </p>
                        <p className="text-foreground/80 leading-relaxed">
                            We take pride in our roots in Turkana, bringing you a taste that is as authentic as the land it comes from.
                        </p>
                    </div>
                </div>

                {/* Values */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-secondary/10 p-8 rounded-xl text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <Leaf className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Purity</h3>
                        <p className="text-sm text-foreground/70">100% natural herbs with no additives.</p>
                    </div>
                    <div className="bg-secondary/10 p-8 rounded-xl text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <Heart className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Wellness</h3>
                        <p className="text-sm text-foreground/70">Supporting relaxation and everyday vitality.</p>
                    </div>
                    <div className="bg-secondary/10 p-8 rounded-xl text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <Recycle className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Sustainability</h3>
                        <p className="text-sm text-foreground/70">Ethical sourcing that respects nature.</p>
                    </div>
                    <div className="bg-secondary/10 p-8 rounded-xl text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <Leaf className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">Transparency</h3>
                        <p className="text-sm text-foreground/70">Honest ingredients, honest business.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
