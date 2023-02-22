namespace FavRecipes.Models;

public class Recipe
{
    public Guid RecipeId { get; set; }
    public string? Name { get; set; }
    public List<Ingredient>? Ingredients { get; set; }
    public string? Description { get; set; }
    public Guid UserId { get; set; }
}
public class RecipeDTO
{
    public Guid RecipeId { get; set; }
    public string? Name { get; set; }
    public List<Ingredient>? Ingredients { get; set; }
    public string? Description { get; set; }
}