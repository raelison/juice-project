'use client';

import Image from 'next/image';
import { type Juice } from '@/lib/juices';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, Zap } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { OrderForm } from './order-form';

interface ProductCardProps {
  juice: Juice;
}

export function ProductCard({ juice }: ProductCardProps) {
  const [isOrderOpen, setOrderOpen] = useState(false);
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={juice.image.imageUrl}
            alt={juice.image.description}
            fill
            className="object-cover"
            data-ai-hint={juice.image.imageHint}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 flex flex-col">
        <CardTitle className="text-xl font-headline">{juice.name}</CardTitle>
        <CardDescription className="mt-2 text-base flex-1">{juice.description}</CardDescription>
        <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                {juice.nutritionalInfo.calories}
            </Badge>
            {juice.nutritionalInfo.vitamins.map((vitamin) => (
                <Badge key={vitamin} variant="secondary" className="flex items-center gap-1">
                <Leaf className="h-3 w-3" />
                Vitamin {vitamin}
                </Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-2xl font-bold text-primary">{juice.price}</p>
        <Dialog open={isOrderOpen} onOpenChange={setOrderOpen}>
          <DialogTrigger asChild>
            <Button>Order Now</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Order {juice.name}</DialogTitle>
              <DialogDescription>
                Complete the form below to place your order.
              </DialogDescription>
            </DialogHeader>
            <OrderForm juiceName={juice.name} onOrderSuccess={() => setOrderOpen(false)} />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
