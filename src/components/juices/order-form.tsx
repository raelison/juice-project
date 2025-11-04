'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';

const orderFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  quantity: z.coerce.number().min(1, { message: 'Quantity must be at least 1.' }),
});

interface OrderFormProps {
    juiceName: string;
    onOrderSuccess: () => void;
}

export function OrderForm({ juiceName, onOrderSuccess }: OrderFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof orderFormSchema>>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      name: '',
      email: '',
      quantity: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof orderFormSchema>) {
    console.log('Order submitted:', { ...values, juice: juiceName });
    // In a real app, you would send this to a server.
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    
    // Simulate a delay to show success message, then close the dialog
    await new Promise(resolve => setTimeout(resolve, 2000));
    onOrderSuccess();
    
    // Reset state for next time dialog is opened after a short delay
    setTimeout(() => {
        setIsSubmitted(false);
        form.reset();
    }, 500); 
  }

  if (isSubmitted) {
    return (
        <div className="flex flex-col items-center justify-center text-center gap-4 py-8">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <h3 className="text-xl font-semibold">Thank You!</h3>
            <p className="text-muted-foreground">Your order has been placed successfully.</p>
        </div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john.doe@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type="number" min="1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {form.formState.isSubmitting ? "Placing Order..." : "Confirm Order"}
        </Button>
      </form>
    </Form>
  );
}
