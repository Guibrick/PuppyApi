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
    private readonly PuppyContext _context;

    public PuppiesController(PuppyContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Puppy>>> GetAll()
    {
        return await _context.Puppy.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Puppy>> GetOne(int id)
    {
        var puppy = await _context.Puppy.FindAsync(id);

        if (puppy == null)
        {
            return NotFound();
        }

        return puppy;
    }

    [HttpPost]
    public async Task<ActionResult<Puppy>> Create(Puppy puppy)
    {
        _context.Puppy.Add(puppy);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetOne), new { id = puppy.Id }, puppy);
    }
     
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Puppy puppy)
    {
        if (id != puppy.Id)
        {
            return BadRequest();
        }

        _context.Entry(puppy).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
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
        var puppy = await _context.Puppy.FindAsync(id);
        if (puppy == null)
        {
            return NotFound();
        }

        _context.Puppy.Remove(puppy);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool PuppyExists(int id)
    {
        return _context.Puppy.Any(e => e.Id == id);
    }
}
