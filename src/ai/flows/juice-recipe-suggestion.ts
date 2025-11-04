'use server';

/**
 * @fileOverview A juice recipe suggestion AI agent.
 *
 * - suggestJuiceRecipe - A function that handles the juice recipe suggestion process.
 * - SuggestJuiceRecipeInput - The input type for the suggestJuiceRecipe function.
 * - SuggestJuiceRecipeOutput - The return type for the suggestJuiceRecipe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestJuiceRecipeInputSchema = z.object({
  availableFruits: z
    .string()
    .describe('A comma-separated list of fruits that are available.'),
  preferences: z
    .string()
    .optional()
    .describe('Any specific preferences or dietary needs of the user.'),
});
export type SuggestJuiceRecipeInput = z.infer<typeof SuggestJuiceRecipeInputSchema>;

const SuggestJuiceRecipeOutputSchema = z.object({
  recipeName: z.string().describe('The name of the suggested juice recipe.'),
  ingredients: z
    .string()
    .describe(
      'A comma-separated list of ingredients with quantities for the suggested juice recipe.'
    ),
  instructions: z.string().describe('Instructions for preparing the juice recipe.'),
  nutritionalInfo: z
    .string()
    .optional()
    .describe('Nutritional information for the suggested juice recipe.'),
});
export type SuggestJuiceRecipeOutput = z.infer<typeof SuggestJuiceRecipeOutputSchema>;

export async function suggestJuiceRecipe(
  input: SuggestJuiceRecipeInput
): Promise<SuggestJuiceRecipeOutput> {
  return suggestJuiceRecipeFlow(input);
}

const recipeSelectionTool = ai.defineTool(
  {
    name: 'recipeSelectionTool',
    description: 'Selects a juice recipe based on available fruits and user preferences.',
    inputSchema: z.object({
      availableFruits: z
        .string()
        .describe('A comma-separated list of fruits that are available.'),
      preferences: z
        .string()
        .optional()
        .describe('Any specific preferences or dietary needs of the user.'),
    }),
    outputSchema: z.object({
      recipeName: z.string().describe('The name of the selected juice recipe.'),
      ingredients: z
        .string()
        .describe(
          'A comma-separated list of ingredients with quantities for the selected juice recipe.'
        ),
      instructions: z.string().describe('Instructions for preparing the juice recipe.'),
      nutritionalInfo: z
        .string()
        .optional()
        .describe('Nutritional information for the selected juice recipe.'),
    }),
  },
  async (input) => {
    const recipes = [
      {
        recipeName: 'Tropical Delight',
        ingredients: '1 cup mango, 1/2 cup pineapple, 1/2 banana, 1/2 cup coconut water',
        instructions:
          'Combine all ingredients in a blender and blend until smooth. Serve chilled.',
        nutritionalInfo: 'Calories: 250, Vitamins: A, C, Potassium',
      },
      {
        recipeName: 'Berry Blast',
        ingredients: '1 cup mixed berries, 1/2 cup spinach, 1/2 cup almond milk',
        instructions:
          'Combine all ingredients in a blender and blend until smooth. Serve immediately.',
        nutritionalInfo: 'Calories: 180, Vitamins: C, K, Fiber',
      },
      {
        recipeName: 'Citrus Zing',
        ingredients: '1 orange, 1/2 grapefruit, 1/4 lemon, 1/2 cup water',
        instructions:
          'Peel the orange and grapefruit. Combine all ingredients in a blender and blend until smooth. Serve with ice.',
        nutritionalInfo: 'Calories: 120, Vitamins: C, Antioxidants',
      },
    ];

    // Basic logic to select a recipe.  Could be expanded with more sophisticated matching.
    if (input.availableFruits.includes('mango') && input.availableFruits.includes('pineapple')) {
      return recipes[0];
    } else if (input.availableFruits.includes('berries')) {
      return recipes[1];
    } else if (input.availableFruits.includes('orange') && input.availableFruits.includes('grapefruit')) {
      return recipes[2];
    } else {
      return recipes[0]; // Default to Tropical Delight if no match
    }
  }
);

const prompt = ai.definePrompt({
  name: 'suggestJuiceRecipePrompt',
  tools: [recipeSelectionTool],
  input: {schema: SuggestJuiceRecipeInputSchema},
  output: {schema: SuggestJuiceRecipeOutputSchema},
  prompt: `Suggest a juice recipe based on the available fruits and any user preferences.

Available Fruits: {{{availableFruits}}}
Preferences: {{{preferences}}}

Use the recipeSelectionTool to select a suitable recipe.
`,
});

const suggestJuiceRecipeFlow = ai.defineFlow(
  {
    name: 'suggestJuiceRecipeFlow',
    inputSchema: SuggestJuiceRecipeInputSchema,
    outputSchema: SuggestJuiceRecipeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
