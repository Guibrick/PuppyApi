using System;
using System.Text.Json.Serialization;

namespace Puppies.Api.Models;

public class Puppy
{
    
    public int Id { get; set; }

    public string Name { get; set; }

    public string Breed { get; set; }

    public DateTime BirthDate { get; set; }
}
