'use server';

import {
  suggestJuiceRecipe,
  type SuggestJuiceRecipeInput,
  type SuggestJuiceRecipeOutput,
} from '@/ai/flows/juice-recipe-suggestion';
import { z } from 'zod';

const formSchema = z.object({
  availableFruits: z.string().min(3, 'Please list at least one fruit.'),
  preferences: z.string().optional(),
});

export type RecipeFormState = {
  message: string;
  recipe?: SuggestJuiceRecipeOutput;
  fields?: Record<string, string>;
  issues?: string[];
};

export async function getJuiceSuggestion(
  prevState: RecipeFormState,
  formData: FormData
): Promise<RecipeFormState> {
  const validatedFields = formSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    const { fieldErrors } = validatedFields.error.flatten();
    return {
      message: 'Please check your input.',
      fields: {
        availableFruits: formData.get('availableFruits')?.toString() ?? '',
        preferences: formData.get('preferences')?.toString() ?? '',
      },
      issues: validatedFields.error.issues.map((issue) => issue.message),
    };
  }

  try {
    const result = await suggestJuiceRecipe(validatedFields.data as SuggestJuiceRecipeInput);
    return { message: 'Here is your recipe suggestion!', recipe: result };
  } catch (error) {
    console.error(error);
    return {
      message: "Sorry, we couldn't generate a recipe at this time. Please try again later.",
    };
  }
}
