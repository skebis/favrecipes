import { Component, Inject, Injectable, OnDestroy, OnInit } from "@angular/core";
import { Recipe } from "../classes/recipe";
import { RecipeService } from "../recipe-service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  providers: [RecipeService]
})

@Injectable()
export class RecipeListComponent implements OnInit, OnDestroy {
  // recipes is the list of all current recipes in a table. Used for showing recipes to user.
  recipes: Recipe[] = [];

  // Mat table definitions
  displayedColumns: string[] = ['name', 'description', 'ingredients'];

  constructor(private recipeService: RecipeService) {

  }

  ngOnInit(): void {
    
  }

  ngOnDestroy() {
    // Unsubscribes here
  }

  ngOnChanges() {
    // Change detection things here
  }

  showRecipes() {
    this.recipeService.getRecipes().subscribe(res => {
      this.recipes = res;
    });
  }
}
