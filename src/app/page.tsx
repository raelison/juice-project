import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProductGrid } from '@/components/juices/product-grid';
import { juices } from '@/lib/juices';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { RecipeSuggester } from '@/components/ai/recipe-suggester';
import Link from 'next/link';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] text-primary-foreground">
            {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            )}
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
              <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight drop-shadow-md">Freshness in Every Sip</h1>
              <p className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow">
                Discover our range of delicious, all-natural fruit juices, crafted to perfection.
              </p>
              <Button asChild size="lg" className="mt-8">
                <Link href="#products">Explore Juices</Link>
              </Button>
            </div>
        </section>

        {/* Product Section */}
        <section id="products" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center font-headline mb-12">Our Delicious Selection</h2>
            <ProductGrid juices={juices} />
          </div>
        </section>

        {/* AI Recipe Suggester Section */}
        <section id="suggester" className="bg-primary/10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Create Your Own Juice</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                  Got some fruits at home? Let our AI chef suggest a delicious juice recipe for you!
              </p>
            </div>
            <div className="mt-12">
              <RecipeSuggester />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
