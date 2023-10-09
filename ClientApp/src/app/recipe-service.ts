import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Recipe } from "./classes/recipe";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  constructor(private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    @Inject('BASE_API_URL') private baseApiUrl: string,
    @Inject('BASE_RECIPE_URL') private apiRecipe: string) {

  }

  public getRecipes(): Observable<any> {
    return this.http.get<Recipe[]>(this.baseUrl + this.baseApiUrl + this.apiRecipe);
  }

  public postRecipe(recipe: Recipe): Observable<any> {
    return this.http.post<Recipe>(this.baseUrl + this.baseApiUrl + this.apiRecipe, recipe);
  }

  public deleteRecipe(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + this.baseApiUrl + this.apiRecipe + id);
  }

  public getRecipe(id: string): Observable<any> {
    return this.http.get<Recipe>(this.baseUrl + this.baseApiUrl + this.apiRecipe + id);
  }
}
