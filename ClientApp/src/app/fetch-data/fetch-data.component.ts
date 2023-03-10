import { Component, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
})

@Injectable()
export class FetchDataComponent {
   recipes: Recipe[] = [];
   ingredients: Ingredient[] = [];
   recipe: Recipe = {
    Name: '',
    Ingredients: [{
      name: '',
      amount: 0,
      unit: ''
    }],
    Description: ''
  };
  

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

  public addRecipe() {
    
    this.http.post<Recipe>(this.baseUrl + this.baseApiUrl + this.apiPostRecipe,
      this.recipe
      ).subscribe(result => {
      console.log(result);
      }, error => console.error(error));
    this.recipes.push(this.recipe);
  }
  public addNewIngredient() {
    this.ingredients.push({
        name: '',
        amount: 0,
        unit: ''
    });
  }
}

interface Recipe {
  Name: string;
  Ingredients: Ingredient[];
  Description: string;
}
interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}
