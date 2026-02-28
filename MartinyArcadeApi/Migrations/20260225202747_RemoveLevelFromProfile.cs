using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MartinyArcadeApi.Migrations
{
    /// <inheritdoc />
    public partial class RemoveLevelFromProfile : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Level",
                table: "UserProfiles");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Level",
                table: "UserProfiles",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
