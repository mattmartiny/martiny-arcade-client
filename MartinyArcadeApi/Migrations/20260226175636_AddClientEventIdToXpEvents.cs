using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MartinyArcadeApi.Migrations
{
    /// <inheritdoc />
    public partial class AddClientEventIdToXpEvents : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_XpEvents_UserId",
                table: "XpEvents");

            migrationBuilder.AddColumn<Guid>(
                name: "ClientEventId",
                table: "XpEvents",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "UserId1",
                table: "XpEvents",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_XpEvents_UserId_ClientEventId",
                table: "XpEvents",
                columns: new[] { "UserId", "ClientEventId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_XpEvents_UserId_CreatedAt",
                table: "XpEvents",
                columns: new[] { "UserId", "CreatedAt" });

            migrationBuilder.CreateIndex(
                name: "IX_XpEvents_UserId1",
                table: "XpEvents",
                column: "UserId1");

            migrationBuilder.AddForeignKey(
                name: "FK_XpEvents_Users_UserId1",
                table: "XpEvents",
                column: "UserId1",
                principalTable: "Users",
                principalColumn: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_XpEvents_Users_UserId1",
                table: "XpEvents");

            migrationBuilder.DropIndex(
                name: "IX_XpEvents_UserId_ClientEventId",
                table: "XpEvents");

            migrationBuilder.DropIndex(
                name: "IX_XpEvents_UserId_CreatedAt",
                table: "XpEvents");

            migrationBuilder.DropIndex(
                name: "IX_XpEvents_UserId1",
                table: "XpEvents");

            migrationBuilder.DropColumn(
                name: "ClientEventId",
                table: "XpEvents");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "XpEvents");

            migrationBuilder.CreateIndex(
                name: "IX_XpEvents_UserId",
                table: "XpEvents",
                column: "UserId");
        }
    }
}
