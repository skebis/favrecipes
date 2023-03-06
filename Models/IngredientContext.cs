using Microsoft.EntityFrameworkCore;

namespace FavRecipes.Models;

public class IngredientContext : DbContext
{
    public IngredientContext(DbContextOptions<IngredientContext> options)
        : base(options)
    {
    }

    public DbSet<Ingredient> IngredientItems { get; set; } = null!;
}