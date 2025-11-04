import { GlassWater } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg font-headline">
          <GlassWater className="h-6 w-6 text-primary" />
          Jus Délice
        </Link>
        <nav className="ml-auto flex items-center gap-4 sm:gap-6">
          <Link href="#products" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Products
          </Link>
          <Link href="#suggester" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            AI Recipes
          </Link>
        </nav>
      </div>
    </header>
  );
}
