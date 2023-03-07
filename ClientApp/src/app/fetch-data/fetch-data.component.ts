import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public recipes: Recipe[] = [];
  public baseApiUrl: string = "api/";

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<Recipe[]>(baseUrl + this.baseApiUrl + 'recipe').subscribe(result => {
      this.recipes = result;
    }, error => console.error(error));
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
