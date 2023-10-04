import { Component, Injectable, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Recipe } from "../classes/recipe";
import { RecipeService } from "../recipe-service";
import { trigger, state, style, transition, animate } from "@angular/animations";
import { Router } from "@angular/router";

@Component({
  selector: 'app-recipe-list',
  animations: [
    trigger('detailExpand', [
      state('expanded', style({
        height: '*',
        minHeight: '35px',
      })),
      state('collapsed', style({
        height: '0px',
        minHeight: '0',
      })),
      transition('expanded <=> collapsed', [
        animate('0.25s')
      ])
    ])
  ],
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
  providers: [RecipeService]
})

@Injectable()
export class RecipeListComponent implements OnInit, OnDestroy {
  // recipes is the list of all current recipes in a table. Used for showing recipes to user.
  recipes: Recipe[];

  // Mat table definitions
  displayedColumns: string[] = ['name', 'description', 'ingredients', 'actions'];

  expandedRecipe: Recipe | null;

  constructor(private recipeService: RecipeService, private dialog: MatDialog, private router: Router) {
    this.expandedRecipe = null;
    this.recipes = [];
  }

  ngOnInit(): void {
    this.showRecipes();
  }

  ngOnDestroy() {
    // Unsubscribes here
  }

  ngOnChanges() {
    // Change detection things here
  }

  // Routes to a certain recipe by id.
  routeRecipeDetails(id: string): void {
    this.router.navigate(['/recipe', id], );
  }

  // Deletes the recipe, triggered by a click event
  deleteRecipe(id: string): void {
    this.recipeService.deleteRecipe(id).subscribe(res => {
      console.log("recipe deleted succesfully")
      this.showRecipes();
    },
      error => {
        console.log("encountered an error");
      }
    )
  }

  // Add two recipes for fast and easy testing purposes
  addTestRecipes() {
    let res1: Recipe = {
      name: 'makarylliloota',
      ingredients: [
        { name: 'makaroni', amount: 3, unit: 'dl' },
        { name: 'sipuli', amount: 1, unit: 'kpl' },
        { name: 'jauheliha', amount: 400, unit: 'g' }
      ],
      description: 'maukkaan hyvä ja herkullinen loota'
    }
    let res2: Recipe = {
      name: 'maukas munakas',
      ingredients: [
        { name: 'kananmuna', amount: 3, unit: 'kpl' },
        { name: 'sipuli', amount: 1, unit: 'pieni' },
        { name: 'suola', amount: 1, unit: 'tl' }
      ],
      description: 'herkullinen ranskalainen munakas nam'
    }
    this.recipeService.postRecipe(res1).subscribe(res => {
      console.log("test recipe 1 added succesfully");
      this.recipes.push(res1);
    })
    this.recipeService.postRecipe(res2).subscribe(res => {
      console.log("test recipe 2 added succesfully");
      this.recipes.push(res2);
    })
    this.showRecipes();
  }

  // Fetch all recipes and show them in a table.
  private showRecipes() {
    this.recipeService.getRecipes().subscribe(res => {
      this.recipes = res;
    });
  }
}
