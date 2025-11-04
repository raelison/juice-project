'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { getJuiceSuggestion, type RecipeFormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useEffect, useRef } from 'react';
import { ChefHat, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const initialState: RecipeFormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Suggesting...
        </>
      ) : (
        <>
          <ChefHat className="mr-2 h-4 w-4" />
          Get Recipe
        </>
      )}
    </Button>
  );
}

export function RecipeSuggester() {
  const [state, formAction] = useFormState(getJuiceSuggestion, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if(state.message && !state.recipe) {
      toast({
          variant: "destructive",
          title: state.issues ? "Invalid Input" : "Error",
          description: state.issues ? state.issues.join('\n') : state.message,
      });
    }
    if (state.message && state.recipe) {
      formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-6">
            <form ref={formRef} action={formAction} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="availableFruits">Available Fruits</Label>
                    <Input
                        id="availableFruits"
                        name="availableFruits"
                        placeholder="e.g., apples, bananas, oranges"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="preferences">Preferences (optional)</Label>
                    <Input
                        id="preferences"
                        name="preferences"
                        placeholder="e.g., low sugar, extra ginger"
                    />
                </div>
            </div>
            <div className='flex justify-end'>
                <SubmitButton />
            </div>
            </form>
        </CardContent>
      </Card>
      
      {state.recipe && (
        <div className="mt-8 animate-fade-in">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-headline flex items-center gap-2">
              <ChefHat /> {state.recipe.recipeName}
            </CardTitle>
            <CardDescription>{state.message}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg">Ingredients</h4>
              <p className="text-muted-foreground">{state.recipe.ingredients}</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Instructions</h4>
              <p className="text-muted-foreground whitespace-pre-line">{state.recipe.instructions}</p>
            </div>
            {state.recipe.nutritionalInfo && (
              <div>
                <h4 className="font-semibold text-lg">Nutritional Info</h4>
                <p className="text-muted-foreground">{state.recipe.nutritionalInfo}</p>
              </div>
            )}
          </CardContent>
        </Card>
        </div>
      )}
    </div>
  );
}
