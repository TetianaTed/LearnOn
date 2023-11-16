using Learnon_ui_integration.Module.Account.Model.Database.Entity;
using Microsoft.EntityFrameworkCore;

namespace Learnon
{
    // Implement DbContext for Entity Framework
    public class LearnOnDbContext : DbContext
    {
        public LearnOnDbContext(DbContextOptions<LearnOnDbContext> options) : base(options)
        {
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        }
        public DbSet<AccountEntity> Accounts { get; set; }

        
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