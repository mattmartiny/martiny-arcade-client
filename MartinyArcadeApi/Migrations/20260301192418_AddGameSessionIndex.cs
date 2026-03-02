using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MartinyArcadeApi.Migrations
{
    /// <inheritdoc />
    public partial class AddGameSessionIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "GameKey",
                table: "GameSessions",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_UserProfiles_TotalXP",
                table: "UserProfiles",
                column: "TotalXP");

            migrationBuilder.CreateIndex(
                name: "IX_GameSessions_GameKey_UserId",
                table: "GameSessions",
                columns: new[] { "GameKey", "UserId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserProfiles_TotalXP",
                table: "UserProfiles");

            migrationBuilder.DropIndex(
                name: "IX_GameSessions_GameKey_UserId",
                table: "GameSessions");

            migrationBuilder.AlterColumn<string>(
                name: "GameKey",
                table: "GameSessions",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
