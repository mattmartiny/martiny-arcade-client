using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MartinyArcadeApi.Migrations
{
    /// <inheritdoc />
    public partial class AddGamesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Games",
                columns: table => new
                {
                    GameKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ScoreDirection = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Games", x => x.GameKey);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GameSessions_GameKey_Score",
                table: "GameSessions",
                columns: new[] { "GameKey", "Score" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Games");

            migrationBuilder.DropIndex(
                name: "IX_GameSessions_GameKey_Score",
                table: "GameSessions");
        }
    }
}
