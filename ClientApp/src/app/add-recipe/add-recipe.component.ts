import { ChangeDetectorRef, Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Recipe } from '../classes/recipe';
import { RecipeService } from '../recipe-service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
  providers: [RecipeService]
})

@Injectable()
export class AddRecipeComponent implements OnInit, OnDestroy {

  // recipe is the current recipe that is being edited and added.
  recipe: Recipe = {
    name: '',
    ingredients: [],
    description: ''
  }

  constructor(private recipeService: RecipeService,
    public dialogRef: MatDialogRef<AddRecipeComponent>) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    // Unsubscribes and such
  }

  ngOnChanges() {
    // Change detection things here
  }

  // Adds new recipe by calling API backend.
  addRecipe() {
    this.recipeService.postRecipe(this.recipe).subscribe(res => {
      console.log(res + " got answer");
    });
    this.clearRecipe();
    this.dialogRef.close();
  }

  // Adds new empty ingredient to current recipe.
  addNewIngredient() {
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
