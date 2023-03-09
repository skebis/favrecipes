import { Component, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})

@Injectable()
export class FetchDataComponent {
  public recipes: Recipe[] = [];
  public ingredients: Ingredient[] = [];
  public baseApiUrl: string = "api/";
  public apiGetRecipe: string = "recipe";
  public apiPostRecipe: string = "recipe";
  public recipe: Recipe = {
    name: 'uusi resepti',
    ingredients: [{
      name: 'test ingredient',
      amount: 5,
      unit: 'kg'
    }],
    description: 'tässä uusi hieno resepti'
  };
  

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }

  ngOnInit() {
    this.http.get<Recipe[]>(this.baseUrl + this.baseApiUrl + this.apiGetRecipe).subscribe(result => {
      this.recipes = result;
    }, error => console.error(error));
  }

  ngOnDestroy() {
    // Unsubscribes and such
  }

  public AddRecipe() {
    
    this.http.post<Recipe>(this.baseUrl + this.baseApiUrl + this.apiPostRecipe,
      this.recipe
      ).subscribe(result => {
      console.log(result);
      }, error => console.error(error));
    this.recipes.push(this.recipe);
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
