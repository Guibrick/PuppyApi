using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Puppies.Api.Models;

    public class PuppyContext : DbContext
    {
        public PuppyContext (DbContextOptions<PuppyContext> options)
            : base(options)
        {
        }
        public DbSet<Puppies.Api.Models.Puppy> Puppy { get; set; } = default!;
    }
