import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public recipes: Recipe[] = [];
  public ingredients: Ingredient[] = [];
  public baseApiUrl: string = "api/";
  public apiAddRecipe: string = "recipe";

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Recipe[]>(baseUrl + this.baseApiUrl + this.apiAddRecipe).subscribe(result => {
      this.recipes = result;
    }, error => console.error(error));
    
  }

  ngOnInit() {
    // TODO: move api calls here
  }
  ngOnDestroy() {
    // Unsubscribes and such
  }

  public AddRecipe() {
    console.log("add recipe works!");
  }
  public AddNewIngredient() {
    this.ingredients.push({
        name: 'test ingredient',
        amount: 5,
        unit: 'kg'
    });
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
