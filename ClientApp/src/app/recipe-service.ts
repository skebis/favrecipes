import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Recipe } from "./classes/recipe";

@Injectable()
export class RecipeService {
  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    @Inject('BASE_API_URL') private baseApiUrl: string,
    @Inject('GET_RECIPE') private apiGetRecipe: string,
    @Inject('POST_RECIPE') private apiPostRecipe: string) {

  }

  public getRecipes(): Observable<any> {
    return this.http.get<Recipe[]>(this.baseUrl + this.baseApiUrl + this.apiGetRecipe);
  }

  public postRecipe(recipe: Recipe): Observable<any> {
    return this.http.post<Recipe>(this.baseUrl + this.baseApiUrl + this.apiPostRecipe, recipe);
  }
}
