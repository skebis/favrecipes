using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FavRecipes.Models;

namespace FavRecipes.Controllers;

[Route("api/[controller]")]
[ApiController]
public class RecipeController : ControllerBase
{
    private readonly RecipeContext _recipeContext;
    //private readonly IngredientContext _ingredientContext;

    public RecipeController(RecipeContext recipeContext/*, IngredientContext ingredientContext*/)
    {
        _recipeContext = recipeContext;
        //_ingredientContext = ingredientContext;
    }

    // GET: api/recipe
    [HttpGet]
    public async Task<ActionResult<IEnumerable<RecipeDTO>>> Get()
    {
        return await _recipeContext.RecipeItems
            .Include(x => x.Ingredients)
            .Select(x => ItemToDTO(x))
            .ToListAsync();
    }

    // GET: api/recipe/5
    // <snippet_GetByID>
    [HttpGet("{id}")]
    public async Task<ActionResult<RecipeDTO>> GetRecipeItem(long id)
    {
        var recipeItem = await _recipeContext.RecipeItems.FindAsync(id);

        if (recipeItem == null)
        {
            return NotFound();
        }

        return ItemToDTO(recipeItem);
    }
    // </snippet_GetByID>

    // PUT: api/recipe/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // <snippet_Update>
    [HttpPut("{id}")]
    public async Task<IActionResult> PutRecipeItem(Guid id, RecipeDTO recipeDTO)
    {
        if (id != recipeDTO.RecipeId)
        {
            return BadRequest();
        }

        var recipeItem = await _recipeContext.RecipeItems.FindAsync(id);
        if (recipeItem == null)
        {
            return NotFound();
        }

        recipeItem.Name = recipeDTO.Name;

        try
        {
            await _recipeContext.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException) when (!RecipeItemExists(id))
        {
            return NotFound();
        }

        return NoContent();
    }
    // </snippet_Update>

    // POST: api/recipe
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // <snippet_Create>
    [HttpPost]
    public async Task<ActionResult<RecipeDTO>> PostRecipeItem(RecipeDTO recipeDTO)
    {
        var recipeItem = new Recipe
        {
            Name = recipeDTO.Name,
            Description = recipeDTO.Description,
            Ingredients = recipeDTO.Ingredients
        };

        _recipeContext.RecipeItems.Add(recipeItem);
        await _recipeContext.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetRecipeItem),
            new { id = recipeItem.RecipeId },
            ItemToDTO(recipeItem));
    }
    // </snippet_Create>

    // DELETE: api/recipe/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRecipeItem(Guid id)
    {
        var recipeItem = await _recipeContext.RecipeItems.FindAsync(id);
        if (recipeItem == null)
        {
            return NotFound();
        }

        _recipeContext.RecipeItems.Remove(recipeItem);
        await _recipeContext.SaveChangesAsync();

        return NoContent();
    }

    private bool RecipeItemExists(Guid id)
    {
        return _recipeContext.RecipeItems.Any(e => e.RecipeId == id);
    }

    private static RecipeDTO ItemToDTO(Recipe recipeItem) =>
       new RecipeDTO
       {
           RecipeId = recipeItem.RecipeId,
           Name = recipeItem.Name,
           Ingredients = recipeItem.Ingredients,
           Description = recipeItem.Description
       };
}