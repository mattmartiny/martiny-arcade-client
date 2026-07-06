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

    public DbSet<UserRanking> UserRankings => Set<UserRanking>();
    public DbSet<GameSession> GameSessions => Set<GameSession>();

    public DbSet<Achievement> Achievements => Set<Achievement>();
    public DbSet<UserAchievement> UserAchievements => Set<UserAchievement>();

    public DbSet<HomelessHeroSave> HomelessHeroSaves => Set<HomelessHeroSave>();

    public DbSet<Game> Games => Set<Game>();
    public DbSet<GameLeaderboardEntry> GameLeaderboard => Set<GameLeaderboardEntry>();
    public DbSet<ForumCategory> ForumCategories => Set<ForumCategory>();
    public DbSet<ForumThread> ForumThreads => Set<ForumThread>();
    public DbSet<ForumReply> ForumReplies => Set<ForumReply>();

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


        modelBuilder.Entity<GameLeaderboardEntry>()
            .HasNoKey()
            .ToView("GameLeaderboard");

        modelBuilder.Entity<UserRanking>()
               .HasNoKey()
               .ToView("UserRankings");

        modelBuilder.Entity<UserProfile>()
            .HasIndex(p => p.TotalXP);

        modelBuilder.Entity<XpEvent>()
            .HasOne(e => e.User)
            .WithMany(u => u.XpEvents)
            .HasForeignKey(e => e.UserId)
            .IsRequired();


        modelBuilder.Entity<GameSession>()
            .HasIndex(g => new { g.GameKey, g.UserId });

        modelBuilder.Entity<GameSession>()
            .HasIndex(g => new { g.GameKey, g.Score });

        modelBuilder.Entity<UserAchievement>()
        .HasIndex(u => new { u.UserId, u.AchievementId })
        .IsUnique();

        modelBuilder.Entity<UserAchievement>()
            .HasOne(u => u.Achievement)
            .WithMany(a => a.UserAchievements)
            .HasForeignKey(u => u.AchievementId);

        modelBuilder.Entity<HomelessHeroSave>()
    .HasIndex(s => new { s.UserId, s.GameKey })
    .IsUnique();

        modelBuilder.Entity<ForumCategory>()
            .HasIndex(c => c.Slug)
            .IsUnique();

        modelBuilder.Entity<ForumCategory>()
            .HasData(
                new ForumCategory
                {
                    ForumCategoryId = Guid.Parse("11111111-1111-1111-1111-111111111111"),
                    Name = "General",
                    Slug = "general",
                    Description = "Open discussion for the community.",
                    SortOrder = 1
                },
                new ForumCategory
                {
                    ForumCategoryId = Guid.Parse("22222222-2222-2222-2222-222222222222"),
                    Name = "Games",
                    Slug = "games",
                    Description = "Talk about arcade games, strategies, and updates.",
                    SortOrder = 2
                },
                new ForumCategory
                {
                    ForumCategoryId = Guid.Parse("33333333-3333-3333-3333-333333333333"),
                    Name = "Community",
                    Slug = "community",
                    Description = "Meet other players and share community news.",
                    SortOrder = 3
                },
                new ForumCategory
                {
                    ForumCategoryId = Guid.Parse("44444444-4444-4444-4444-444444444444"),
                    Name = "Suggestions",
                    Slug = "suggestions",
                    Description = "Share ideas and feedback for the site.",
                    SortOrder = 4
                });

        modelBuilder.Entity<ForumCategory>()
            .HasMany(c => c.Threads)
            .WithOne(t => t.Category)
            .HasForeignKey(t => t.ForumCategoryId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ForumThread>()
            .HasIndex(t => new { t.ForumCategoryId, t.LastActivityAt });

        modelBuilder.Entity<ForumThread>()
            .HasIndex(t => new { t.ForumCategoryId, t.CreatedAt });

        modelBuilder.Entity<ForumThread>()
            .HasIndex(t => t.AuthorId);

        modelBuilder.Entity<ForumThread>()
            .HasOne(t => t.Author)
            .WithMany()
            .HasForeignKey(t => t.AuthorId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<ForumReply>()
            .HasIndex(r => new { r.ForumThreadId, r.CreatedAt });

        modelBuilder.Entity<ForumReply>()
            .HasIndex(r => r.AuthorId);

        modelBuilder.Entity<ForumReply>()
            .HasOne(r => r.Thread)
            .WithMany(t => t.Replies)
            .HasForeignKey(r => r.ForumThreadId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ForumReply>()
            .HasOne(r => r.Author)
            .WithMany()
            .HasForeignKey(r => r.AuthorId)
            .OnDelete(DeleteBehavior.Restrict);


    }




}
