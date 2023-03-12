using Microsoft.EntityFrameworkCore;

namespace FavRecipes.Models;

public class RecipeContext : DbContext
{
    public RecipeContext(DbContextOptions<RecipeContext> options)
        : base(options)
    {
    }

    public DbSet<Recipe> RecipeItems { get; set; } = null!;
    public DbSet<Ingredient> IngredientItems { get; set; } = null!;

}