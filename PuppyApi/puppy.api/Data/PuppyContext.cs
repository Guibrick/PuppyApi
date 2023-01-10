using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Puppies.Api.Models;

    public class PuppyContext : DbContext
    {
        public PuppyContext(DbContextOptions<PuppyContext> options) : base(options)
        { }

        public DbSet<Puppy> Puppy { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=localhost;Database=Puppies;User Id=sa;Password=p@ssw0rd;trustServerCertificate=True;");
        }
    }
