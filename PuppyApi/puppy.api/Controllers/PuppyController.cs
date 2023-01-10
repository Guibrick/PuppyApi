using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using Puppies.Api.Models;
using Microsoft.VisualStudio.Web.CodeGeneration.Design;

namespace Puppies.Api.Controllers;

[Route("api/[controller]")]
[ApiController]

public class PuppiesController : ControllerBase
{
    private readonly PuppyContext db;

    public PuppiesController(PuppyContext _db)
    {
        db = _db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Puppy>>> GetAll()
    {
        return await db.Puppy.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Puppy>> GetOne(int id)
    {
        var puppy = await db.Puppy.FindAsync(id);

        if (puppy == null)
        {
            return NotFound();
        }

        return puppy;
    }

    [HttpPost]
    public async Task<ActionResult<Puppy>> Create(Puppy puppy)
    {
        db.Puppy.Add(puppy);
        await db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOne), new { id = puppy.Id }, puppy);
    }
     
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Puppy puppy)
    {
        if (id != puppy.Id)
        {
            return BadRequest();
        }

        db.Entry(puppy).State = EntityState.Modified;

        try
        {
            await db.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PuppyExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var puppy = await db.Puppy.FindAsync(id);
        if (puppy == null)
        {
            return NotFound();
        }

        db.Puppy.Remove(puppy);
        await db.SaveChangesAsync();

        return NoContent();
    }

    private bool PuppyExists(int id)
    {
        return db.Puppy.Any(e => e.Id == id);
    }
}
