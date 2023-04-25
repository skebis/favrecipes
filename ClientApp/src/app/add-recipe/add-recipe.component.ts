import { ChangeDetectorRef, Component, Inject, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../classes/recipe';
import { RecipeService } from '../recipe-service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
  providers: [RecipeService]
})

@Injectable()
export class AddRecipeComponent implements OnInit, OnDestroy{
  // recipes is the list of all current recipes in a table. Used for showing recipes to user.
  recipes: Recipe[] = [];

  // recipe is the current recipe that is being edited and added.
  recipe: Recipe = {
    name: '',
    ingredients: [],
    description: ''
  }

  // Mat table definitions
  displayedColumns: string[] = ['name', 'description', 'ingredients'];

  constructor(private recipeService: RecipeService) {

  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    // Unsubscribes and such
  }

  ngOnChanges() {
    // Change detection things here
  }

  // Adds new recipe by calling API backend.
  public addRecipe() {
    this.recipeService.postRecipe(this.recipe);
    this.clearRecipe();
  }

  // Adds new empty ingredient to current recipe.
  public addNewIngredient() {
    this.recipe.ingredients.push({
        name: '',
        amount: 0,
        unit: ''
    });
  }

  // Clears current recipe, making it empty.
  private clearRecipe() {
    this.recipe = {
      name: '',
      ingredients: [],
      description: ''
    }
  }

}
