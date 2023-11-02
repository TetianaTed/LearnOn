using Microsoft.EntityFrameworkCore;

namespace Learnon
{
    // Implement DbContext for Entity Framework
    public class LearnOnDbContext : DbContext
    {
        public LearnOnDbContext(DbContextOptions<LearnOnDbContext> options) : base(options)
        {
        }
        /*
        public DbSet<AccountEntity> Accounts { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AccountEntity>()
                .Property(e => e.Id)
                .UseHiLo("account_id_seq");
                //.ValueGeneratedOnAdd();
                //.UseSequence("account_id_seq");
     
            
            base.OnModelCreating(modelBuilder);
        }
        */
        // Add DbSet properties for other entities if needed
    }
}