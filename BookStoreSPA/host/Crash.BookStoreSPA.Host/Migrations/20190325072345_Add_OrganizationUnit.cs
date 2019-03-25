using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Crash.BookStoreSPA.Host.Migrations
{
    public partial class Add_OrganizationUnit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BookStoreSPAOrganizationUnits",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    ExtraProperties = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    Title = table.Column<string>(maxLength: 128, nullable: false),
                    Code = table.Column<string>(maxLength: 95, nullable: false),
                    ParentId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BookStoreSPAOrganizationUnits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BookStoreSPAOrganizationUnits_BookStoreSPAOrganizationUnits_ParentId",
                        column: x => x.ParentId,
                        principalTable: "BookStoreSPAOrganizationUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OrganizationUnitUser",
                columns: table => new
                {
                    Id = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    OrganizationId = table.Column<Guid>(nullable: false),
                    IdentityUserId = table.Column<Guid>(nullable: false),
                    OrganizationUnitId = table.Column<Guid>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrganizationUnitUser", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrganizationUnitUser_BookStoreSPAOrganizationUnits_OrganizationUnitId",
                        column: x => x.OrganizationUnitId,
                        principalTable: "BookStoreSPAOrganizationUnits",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BookStoreSPAOrganizationUnits_ParentId",
                table: "BookStoreSPAOrganizationUnits",
                column: "ParentId");

            migrationBuilder.CreateIndex(
                name: "IX_OrganizationUnitUser_OrganizationUnitId",
                table: "OrganizationUnitUser",
                column: "OrganizationUnitId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrganizationUnitUser");

            migrationBuilder.DropTable(
                name: "BookStoreSPAOrganizationUnits");
        }
    }
}
