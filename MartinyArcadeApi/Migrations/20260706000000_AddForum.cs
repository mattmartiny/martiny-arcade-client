using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MartinyArcadeApi.Migrations
{
    public partial class AddForum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ForumCategories",
                columns: table => new
                {
                    ForumCategoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                    Slug = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(240)", maxLength: 240, nullable: false),
                    SortOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ForumCategories", x => x.ForumCategoryId);
                });

            migrationBuilder.CreateTable(
                name: "ForumThreads",
                columns: table => new
                {
                    ForumThreadId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ForumCategoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AuthorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(140)", maxLength: 140, nullable: false),
                    Body = table.Column<string>(type: "nvarchar(8000)", maxLength: 8000, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastActivityAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReplyCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ForumThreads", x => x.ForumThreadId);
                    table.ForeignKey(
                        name: "FK_ForumThreads_ForumCategories_ForumCategoryId",
                        column: x => x.ForumCategoryId,
                        principalTable: "ForumCategories",
                        principalColumn: "ForumCategoryId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ForumThreads_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ForumReplies",
                columns: table => new
                {
                    ForumReplyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ForumThreadId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AuthorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Body = table.Column<string>(type: "nvarchar(8000)", maxLength: 8000, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ForumReplies", x => x.ForumReplyId);
                    table.ForeignKey(
                        name: "FK_ForumReplies_ForumThreads_ForumThreadId",
                        column: x => x.ForumThreadId,
                        principalTable: "ForumThreads",
                        principalColumn: "ForumThreadId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ForumReplies_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "ForumCategories",
                columns: new[] { "ForumCategoryId", "Description", "Name", "Slug", "SortOrder" },
                values: new object[,]
                {
                    { Guid.Parse("11111111-1111-1111-1111-111111111111"), "Open discussion for the community.", "General", "general", 1 },
                    { Guid.Parse("22222222-2222-2222-2222-222222222222"), "Talk about arcade games, strategies, and updates.", "Games", "games", 2 },
                    { Guid.Parse("33333333-3333-3333-3333-333333333333"), "Meet other players and share community news.", "Community", "community", 3 },
                    { Guid.Parse("44444444-4444-4444-4444-444444444444"), "Share ideas and feedback for the site.", "Suggestions", "suggestions", 4 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ForumCategories_Slug",
                table: "ForumCategories",
                column: "Slug",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ForumReplies_AuthorId",
                table: "ForumReplies",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_ForumReplies_ForumThreadId_CreatedAt",
                table: "ForumReplies",
                columns: new[] { "ForumThreadId", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_ForumThreads_AuthorId",
                table: "ForumThreads",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_ForumThreads_ForumCategoryId_CreatedAt",
                table: "ForumThreads",
                columns: new[] { "ForumCategoryId", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_ForumThreads_ForumCategoryId_LastActivityAt",
                table: "ForumThreads",
                columns: new[] { "ForumCategoryId", "LastActivityAt" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ForumReplies");

            migrationBuilder.DropTable(
                name: "ForumThreads");

            migrationBuilder.DropTable(
                name: "ForumCategories");
        }
    }
}
