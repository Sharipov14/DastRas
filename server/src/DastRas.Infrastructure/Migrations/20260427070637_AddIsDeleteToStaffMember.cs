using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DastRas.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddIsDeleteToStaffMember : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                schema: "management",
                table: "StaffMembers",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                schema: "management",
                table: "StaffMembers");
        }
    }
}
