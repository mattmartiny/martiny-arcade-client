using Microsoft.EntityFrameworkCore;
using MartinyArcadeApi.Models;

namespace MartinyArcadeApi.Data;

public class ArcadeDbContext : DbContext
{
    public ArcadeDbContext(DbContextOptions<ArcadeDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<UserProfile> UserProfiles => Set<UserProfile>();
    public DbSet<UserGameStats> UserGameStats => Set<UserGameStats>();
    public DbSet<XpLedger> XpLedger => Set<XpLedger>();
    public DbSet<XpEvent> XpEvents => Set<XpEvent>();

    public DbSet<GameSession> GameSessions => Set<GameSession>();
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Composite key for UserGameStats
        modelBuilder.Entity<UserGameStats>()
            .HasKey(x => new { x.UserId, x.GameId });



        modelBuilder.Entity<User>()
            .HasIndex(u => u.Username)
            .IsUnique();

        modelBuilder.Entity<UserProfile>()
            .HasOne(p => p.User)
            .WithOne()
            .HasForeignKey<UserProfile>(p => p.UserId);

        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        // One-to-one User ↔ Profile
        modelBuilder.Entity<User>()
            .HasOne(u => u.Profile)
            .WithOne(p => p.User)
            .HasForeignKey<UserProfile>(p => p.UserId);

        modelBuilder.Entity<XpEvent>()
        .HasIndex(e => new { e.UserId, e.ClientEventId })
        .IsUnique();

        modelBuilder.Entity<XpEvent>()
        .HasIndex(e => new { e.UserId, e.CreatedAt });




        modelBuilder.Entity<XpEvent>()
            .HasOne(e => e.User)
            .WithMany(u => u.XpEvents)
            .HasForeignKey(e => e.UserId)
            .IsRequired();

    }



}