import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Recipe } from "./classes/recipe";

@Injectable()
export class RecipeService {
  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    @Inject('BASE_API_URL') private baseApiUrl: string,
    @Inject('GET_RECIPE') private apiGetRecipe: string,
    @Inject('POST_RECIPE') private apiPostRecipe: string) {

  }

  public getRecipes() : any {
    this.http.get<Recipe[]>(this.baseUrl + this.baseApiUrl + this.apiGetRecipe).subscribe(result => {
      return result;
    }, error => console.error(error));
  }

  public postRecipe(recipe : Recipe) : any {
    this.http.post<Recipe>(this.baseUrl + this.baseApiUrl + this.apiPostRecipe, recipe).subscribe(result => {
      return result;
    }, error => console.error(error));
  }
}
