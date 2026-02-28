using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MartinyArcadeApi.Migrations
{
    /// <inheritdoc />
    public partial class FixXpEventUserRelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_XpEvents_Users_UserId1",
                table: "XpEvents");

            migrationBuilder.DropIndex(
                name: "IX_XpEvents_UserId1",
                table: "XpEvents");

            migrationBuilder.DropColumn(
                name: "UserId1",
                table: "XpEvents");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UserId1",
                table: "XpEvents",
                type: "uniqueidentifier",
                nullable: true);

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
    }
}
