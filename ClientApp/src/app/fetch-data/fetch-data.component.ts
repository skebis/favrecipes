import { ChangeDetectorRef, Component, Inject, Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
})

@Injectable()
export class FetchDataComponent implements OnInit, OnDestroy{
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

  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    @Inject('BASE_API_URL') private baseApiUrl: string,
    @Inject('GET_RECIPE') private apiGetRecipe: string,
    @Inject('POST_RECIPE') private apiPostRecipe: string) {
  }

  ngOnInit() {
    this.http.get<Recipe[]>(this.baseUrl + this.baseApiUrl + this.apiGetRecipe).subscribe(result => {
      this.recipes = result;
    }, error => console.error(error));
  }

  ngOnDestroy() {
    // Unsubscribes and such
  }

  ngOnChanges() {
    // Change detection things here
  }

  public addRecipe() {
    this.http.post<Recipe>(this.baseUrl + this.baseApiUrl + this.apiPostRecipe, this.recipe).subscribe(result => {
      console.log(result);
      this.recipes.push(this.recipe);
    }, error => console.error(error));
    this.clearRecipe();
    
  }

  public addNewIngredient() {
    this.recipe.ingredients.push({
        name: '',
        amount: 0,
        unit: ''
    });
  }

  public clearRecipe() {
    this.recipe = {
      name: '',
      ingredients: [],
      description: ''
    }
  }

}

interface Recipe {
  name: string;
  ingredients: Ingredient[];
  description: string;
}
interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}
