using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace DastRas.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                schema: "catalog",
                table: "Categories",
                columns: new[] { "Id", "Emoji", "Name" },
                values: new object[,]
                {
                    { 1, "🥬", "Овощи" },
                    { 2, "🍎", "Фрукты" },
                    { 3, "🥛", "Молочное" },
                    { 4, "🍗", "Мясо" },
                    { 5, "🍞", "Выпечка" }
                });

            migrationBuilder.InsertData(
                schema: "catalog",
                table: "Products",
                columns: new[] { "Id", "CategoryId", "Description", "ImageUrl", "NameEn", "NameRu", "NameTj", "Price", "Rating", "Unit" },
                values: new object[,]
                {
                    { 1, 1, "Свежие, сочные помидоры.", "https://picsum.photos/300/300?random=1", "Tomatoes", "Помидоры", "Помидор", 15m, 4.7999999999999998, "кг" },
                    { 2, 1, "Хрустящие огурцы.", "https://picsum.photos/300/300?random=2", "Cucumbers", "Огурцы", "Бодиринг", 12m, 4.5, "кг" },
                    { 3, 2, "Сладкие красные яблоки.", "https://picsum.photos/300/300?random=3", "Apples", "Яблоки", "Себ", 10m, 4.9000000000000004, "кг" },
                    { 4, 2, "Спелые бананы.", "https://picsum.photos/300/300?random=4", "Bananas", "Бананы", "Банан", 18m, 4.7000000000000002, "кг" },
                    { 5, 3, "Натуральное молоко 3.2%.", "https://picsum.photos/300/300?random=5", "Milk", "Молоко", "Шир", 8m, 4.5999999999999996, "л" },
                    { 6, 3, "Твердый сыр.", "https://picsum.photos/300/300?random=6", "Cheese", "Сыр", "Паннир", 45m, 4.7999999999999998, "кг" },
                    { 7, 4, "Свежая говядина без костей.", "https://picsum.photos/300/300?random=7", "Beef", "Говядина", "Гушти гов", 85m, 5.0, "кг" },
                    { 8, 5, "Горячий тандырный хлеб.", "https://picsum.photos/300/300?random=8", "Bread", "Хлеб", "Нон", 4m, 4.9000000000000004, "шт" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                schema: "catalog",
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                schema: "catalog",
                table: "Products",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                schema: "catalog",
                table: "Products",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                schema: "catalog",
                table: "Products",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                schema: "catalog",
                table: "Products",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                schema: "catalog",
                table: "Products",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                schema: "catalog",
                table: "Products",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                schema: "catalog",
                table: "Products",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                schema: "catalog",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                schema: "catalog",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                schema: "catalog",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                schema: "catalog",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                schema: "catalog",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5);
        }
    }
}
