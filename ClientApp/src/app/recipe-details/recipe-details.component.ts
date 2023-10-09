import { Component, Injectable } from "@angular/core";
import { RecipeService } from "../recipe-service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
  providers: []
})

@Injectable()
export class RecipeDetailsComponent {
  recipe: any;

  subscriptions: Subscription[] = [];
  loading: boolean = true;
  recipeId: any;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {
    
  }

  // Get id from route and use it to fetch api data.
  ngOnInit() {
    this.subscriptions.push(this.route.paramMap.subscribe(param => {
      this.recipeId = param.get('id');
      this.recipeService.getRecipe(this.recipeId).subscribe(res => {
        this.loading = false;
        this.recipe = res;
      });
    }))
  }

  // Unsubscribe all subscriptions.
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  saveRecipeChanges() {
    console.log("save changes button works!");
  }
}
