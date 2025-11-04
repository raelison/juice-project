import { type Juice } from '@/lib/juices';
import { ProductCard } from './product-card';

interface ProductGridProps {
  juices: Juice[];
}

export function ProductGrid({ juices }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {juices.map((juice) => (
        <ProductCard key={juice.id} juice={juice} />
      ))}
    </div>
  );
}
