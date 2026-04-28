using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DastRas.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddStockQuantityToProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "StockQuantity",
                schema: "catalog",
                table: "Products",
                type: "numeric(10,2)",
                precision: 10,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.UpdateData(
                schema: "catalog",
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "StockQuantity",
                value: 100m);

            migrationBuilder.UpdateData(
                schema: "catalog",
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "StockQuantity",
                value: 80m);

            migrationBuilder.UpdateData(
                schema: "catalog",
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "StockQuantity",
                value: 150m);

            migrationBuilder.UpdateData(
                schema: "catalog",
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "StockQuantity",
                value: 60m);

            migrationBuilder.UpdateData(
                schema: "catalog",
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "StockQuantity",
                value: 40m);

            migrationBuilder.UpdateData(
                schema: "catalog",
                table: "Products",
                keyColumn: "Id",
                keyValue: 6,
                column: "StockQuantity",
                value: 25m);

            migrationBuilder.UpdateData(
                schema: "catalog",
                table: "Products",
                keyColumn: "Id",
                keyValue: 7,
                column: "StockQuantity",
                value: 15m);

            migrationBuilder.UpdateData(
                schema: "catalog",
                table: "Products",
                keyColumn: "Id",
                keyValue: 8,
                column: "StockQuantity",
                value: 50m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StockQuantity",
                schema: "catalog",
                table: "Products");
        }
    }
}
