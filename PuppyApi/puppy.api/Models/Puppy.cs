using System;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace Puppies.Api.Models;

public class Puppy
{
    [Key]
    public int Id { get; set; }

    public string Name { get; set; }

    public string Breed { get; set; }

    public DateTime BirthDate { get; set; }
}
