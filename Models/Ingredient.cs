﻿namespace FavRecipes.Models
{
    public class Ingredient
    {
        public Guid IngredientId { get; set; }
        public string? Name { get; set; }
        public float Amount { get; set; }
        public string? Unit { get; set; }
        public Guid RecipeId { get; set; }
    }
}
