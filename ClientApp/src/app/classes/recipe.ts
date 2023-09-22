import { Ingredient } from "./ingredient";

export interface Recipe {
  recipeId?: string;
  name: string;
  ingredients: Ingredient[];
  description: string;
}
