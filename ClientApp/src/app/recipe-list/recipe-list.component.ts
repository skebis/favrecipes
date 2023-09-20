import { Component, Inject, Injectable, OnDestroy, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Recipe } from "../classes/recipe";
import { RecipeDetailsComponent } from "../recipe-details/recipe-details.component";
import { RecipeService } from "../recipe-service";
import { trigger, state, style, transition, animate } from "@angular/animations";

@Component({
  selector: 'app-recipe-list',
  animations: [
    trigger('detailExpand', [
      state('expanded', style({
        height: '*',
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

  constructor(private recipeService: RecipeService, public dialog: MatDialog) {
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

  openRecipeDetailsDialog(recipe: Recipe): void {
    const dialogRef = this.dialog.open(RecipeDetailsComponent ,{
      data: recipe
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
    });
  }

  showRecipes() {
    this.recipeService.getRecipes().subscribe(res => {
      this.recipes = res;
    });
  }
}
