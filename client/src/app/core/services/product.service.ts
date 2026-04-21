import { Injectable, signal } from '@angular/core';
import { Category, Product, SubCategory } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  categories = signal<Category[]>([
    { id: 1, name: 'Овощи', emoji: '🥬' },
    { id: 2, name: 'Фрукты', emoji: '🍎' },
    { id: 3, name: 'Молочное', emoji: '🥛' },
    { id: 4, name: 'Мясо', emoji: '🍗' },
    { id: 5, name: 'Выпечка', emoji: '🍞' },
    { id: 6, name: 'Напитки', emoji: '🥤' },
    { id: 7, name: 'Заморозка', emoji: '🧊' },
    { id: 8, name: 'Сладости', emoji: '🍭' }
  ]);

  subCategories = signal<SubCategory[]>([
    { id: 101, categoryId: 1, name: 'Сезонные' },
    { id: 102, categoryId: 1, name: 'Зелень' },
    { id: 103, categoryId: 1, name: 'Экзотика' },
    { id: 201, categoryId: 2, name: 'Цитрусовые' },
    { id: 202, categoryId: 2, name: 'Ягоды' },
    { id: 203, categoryId: 2, name: 'Тропические' },
    { id: 301, categoryId: 3, name: 'Сыры' },
    { id: 302, categoryId: 3, name: 'Йогурты' },
    { id: 303, categoryId: 3, name: 'Молоко и масло' },
    { id: 401, categoryId: 4, name: 'Говядина' },
    { id: 402, categoryId: 4, name: 'Птица' },
    { id: 601, categoryId: 6, name: 'Соки и нектары' },
    { id: 602, categoryId: 6, name: 'Вода и газировка' },
    { id: 701, categoryId: 7, name: 'Полуфабрикаты' },
    { id: 702, categoryId: 7, name: 'Мороженое' },
    { id: 801, categoryId: 8, name: 'Шоколад' },
    { id: 802, categoryId: 8, name: 'Конфеты' }
  ]);

  products = signal<Product[]>([
    // Овощи -> Сезонные (101)
    { id: 1, categoryId: 1, subCategoryId: 101, nameRu: 'Помидоры Черри', nameTj: 'Помидор', nameEn: 'Tomatoes Cherry', price: 15, unit: 'кг', rating: 4.8, imageUrl: 'https://picsum.photos/300/300?random=1', description: 'Сладкие и сочные помидоры черри.' },
    { id: 2, categoryId: 1, subCategoryId: 101, nameRu: 'Огурцы тепличные', nameTj: 'Бодиринг', nameEn: 'Cucumbers', price: 12, unit: 'кг', rating: 4.5, imageUrl: 'https://picsum.photos/300/300?random=2', description: 'Хрустящие свежие огурцы.' },
    { id: 11, categoryId: 1, subCategoryId: 101, nameRu: 'Картофель молодой', nameTj: 'Картошка', nameEn: 'Potatoes', price: 6, unit: 'кг', rating: 4.7, imageUrl: 'https://picsum.photos/300/300?random=11', description: 'Отборный молодой картофель.' },
    { id: 30, categoryId: 1, subCategoryId: 101, nameRu: 'Морковь мытая', nameTj: 'Зардак', nameEn: 'Carrots', price: 5, unit: 'кг', rating: 4.6, imageUrl: 'https://picsum.photos/300/300?random=30', description: 'Сладкая мытая морковь.' },
    { id: 31, categoryId: 1, subCategoryId: 101, nameRu: 'Лук репчатый', nameTj: 'Пиёз', nameEn: 'Onion', price: 4, unit: 'кг', rating: 4.4, imageUrl: 'https://picsum.photos/300/300?random=31', description: 'Золотистый репчатый лук.' },
    { id: 32, categoryId: 1, subCategoryId: 101, nameRu: 'Перец болгарский', nameTj: 'Мурч', nameEn: 'Bell Pepper', price: 22, unit: 'кг', rating: 4.8, imageUrl: 'https://picsum.photos/300/300?random=32', description: 'Разноцветный сладкий перец.' },
    { id: 33, categoryId: 1, subCategoryId: 101, nameRu: 'Баклажаны', nameTj: 'Бондинчон', nameEn: 'Eggplant', price: 18, unit: 'кг', rating: 4.5, imageUrl: 'https://picsum.photos/300/300?random=33', description: 'Свежие темные баклажаны.' },
    { id: 34, categoryId: 1, subCategoryId: 101, nameRu: 'Кабачки цукини', nameTj: 'Каду', nameEn: 'Zucchini', price: 14, unit: 'кг', rating: 4.7, imageUrl: 'https://picsum.photos/300/300?random=34', description: 'Молодые нежные кабачки.' },

    // Фрукты -> Цитрусовые (201)
    { id: 3, categoryId: 2, subCategoryId: 201, nameRu: 'Яблоки Голден', nameTj: 'Себ', nameEn: 'Apples Golden', price: 10, unit: 'кг', rating: 4.9, imageUrl: 'https://picsum.photos/300/300?random=3', description: 'Сладкие желтые яблоки.' },
    { id: 13, categoryId: 2, subCategoryId: 201, nameRu: 'Апельсины', nameTj: 'Апельсин', nameEn: 'Oranges', price: 18, unit: 'кг', rating: 4.6, imageUrl: 'https://picsum.photos/300/300?random=13', description: 'Сочные апельсины.' },
    { id: 35, categoryId: 2, subCategoryId: 201, nameRu: 'Лимоны', nameTj: 'Лиму', nameEn: 'Lemons', price: 25, unit: 'кг', rating: 4.8, imageUrl: 'https://picsum.photos/300/300?random=35', description: 'Тонкокорые кислые лимоны.' },
    { id: 36, categoryId: 2, subCategoryId: 201, nameRu: 'Мандарины', nameTj: 'Мандарин', nameEn: 'Mandarins', price: 22, unit: 'кг', rating: 4.9, imageUrl: 'https://picsum.photos/300/300?random=36', description: 'Сладкие мандарины без косточек.' },
    { id: 37, categoryId: 2, subCategoryId: 201, nameRu: 'Грейпфрут', nameTj: 'Грейпфрут', nameEn: 'Grapefruit', price: 28, unit: 'кг', rating: 4.4, imageUrl: 'https://picsum.photos/300/300?random=37', description: 'Крупный красный грейпфрут.' },
    { id: 38, categoryId: 2, subCategoryId: 201, nameRu: 'Лайм', nameTj: 'Лайм', nameEn: 'Lime', price: 15, unit: 'шт', rating: 4.7, imageUrl: 'https://picsum.photos/300/300?random=38', description: 'Ароматный лайм для напитков.' },

    // Фрукты -> Тропические (203)
    { id: 4, categoryId: 2, subCategoryId: 203, nameRu: 'Бананы', nameTj: 'Банан', nameEn: 'Bananas', price: 18, unit: 'кг', rating: 4.7, imageUrl: 'https://picsum.photos/300/300?random=4', description: 'Спелые желтые бананы.' },
    { id: 16, categoryId: 2, subCategoryId: 203, nameRu: 'Манго', nameTj: 'Манго', nameEn: 'Mango', price: 30, unit: 'шт', rating: 4.8, imageUrl: 'https://picsum.photos/300/300?random=16', description: 'Экзотическое сладкое манго.' },
    { id: 39, categoryId: 2, subCategoryId: 203, nameRu: 'Ананас', nameTj: 'Ананас', nameEn: 'Pineapple', price: 45, unit: 'шт', rating: 4.9, imageUrl: 'https://picsum.photos/300/300?random=39', description: 'Крупный спелый ананас.' },
    { id: 40, categoryId: 2, subCategoryId: 203, nameRu: 'Киви', nameTj: 'Киви', nameEn: 'Kiwi', price: 25, unit: 'кг', rating: 4.6, imageUrl: 'https://picsum.photos/300/300?random=40', description: 'Сочный киви Голд.' },
    { id: 41, categoryId: 2, subCategoryId: 203, nameRu: 'Кокос', nameTj: 'Кокос', nameEn: 'Coconut', price: 35, unit: 'шт', rating: 4.3, imageUrl: 'https://picsum.photos/300/300?random=41', description: 'Молодой питьевой кокос.' },
    { id: 42, categoryId: 2, subCategoryId: 203, nameRu: 'Папайя', nameTj: 'Папайя', nameEn: 'Papaya', price: 80, unit: 'шт', rating: 4.8, imageUrl: 'https://picsum.photos/300/300?random=42', description: 'Огромная нежная папайя.' },
    { id: 43, categoryId: 2, subCategoryId: 203, nameRu: 'Гранат', nameTj: 'Анор', nameEn: 'Pomegranate', price: 20, unit: 'кг', rating: 5.0, imageUrl: 'https://picsum.photos/300/300?random=43', description: 'Красный сладкий гранат.' },

    // Молочное -> Молоко и масло (303)
    { id: 5, categoryId: 3, subCategoryId: 303, nameRu: 'Молоко 3.2%', nameTj: 'Шир', nameEn: 'Milk 3.2%', price: 8, unit: 'л', rating: 4.6, imageUrl: 'https://picsum.photos/300/300?random=5', description: 'Натуральное молоко.' },
    { id: 17, categoryId: 3, subCategoryId: 303, nameRu: 'Масло сливочное', nameTj: 'Маска', nameEn: 'Butter', price: 15, unit: 'шт', rating: 4.9, imageUrl: 'https://picsum.photos/300/300?random=17', description: 'Масло 82.5%.' },
    { id: 44, categoryId: 3, subCategoryId: 303, nameRu: 'Сливки 20%', nameTj: 'Каймак', nameEn: 'Cream', price: 18, unit: 'шт', rating: 4.7, imageUrl: 'https://picsum.photos/300/300?random=44', description: 'Сливки для кофе и готовки.' },
    { id: 45, categoryId: 3, subCategoryId: 303, nameRu: 'Творог 9%', nameTj: 'Творог', nameEn: 'Curd', price: 14, unit: 'уп', rating: 4.8, imageUrl: 'https://picsum.photos/300/300?random=45', description: 'Рассыпчатый домашний творог.' },
    { id: 46, categoryId: 3, subCategoryId: 303, nameRu: 'Сметана 15%', nameTj: 'Каймак', nameEn: 'Sour Cream', price: 9, unit: 'шт', rating: 4.9, imageUrl: 'https://picsum.photos/300/300?random=46', description: 'Густая натуральная сметана.' },
    { id: 47, categoryId: 3, subCategoryId: 303, nameRu: 'Кефир 2.5%', nameTj: 'Кефир', nameEn: 'Kefir', price: 7, unit: 'л', rating: 4.5, imageUrl: 'https://picsum.photos/300/300?random=47', description: 'Освежающий полезный кефир.' },
    { id: 48, categoryId: 3, subCategoryId: 303, nameRu: 'Ряженка', nameTj: 'Ряженка', nameEn: 'Ryazhenka', price: 8, unit: 'л', rating: 4.7, imageUrl: 'https://picsum.photos/300/300?random=48', description: 'Топленое молоко.' },

    // Напитки -> Вода и газировка (602)
    { id: 21, categoryId: 6, subCategoryId: 602, nameRu: 'Минеральная вода', nameTj: 'Оби минерали', nameEn: 'Mineral Water', price: 4, unit: 'л', rating: 4.9, imageUrl: 'https://picsum.photos/300/300?random=21', description: 'Минеральная вода.' },
    { id: 22, categoryId: 6, subCategoryId: 602, nameRu: 'Coca-Cola', nameTj: 'Кока-кола', nameEn: 'Coca-Cola', price: 9, unit: 'л', rating: 4.5, imageUrl: 'https://picsum.photos/300/300?random=22', description: 'Coca-Cola.' },
    { id: 49, categoryId: 6, subCategoryId: 602, nameRu: 'Pepsi', nameTj: 'Пепси', nameEn: 'Pepsi', price: 8, unit: 'л', rating: 4.4, imageUrl: 'https://picsum.photos/300/300?random=49', description: 'Классический газированный напиток.' },
    { id: 50, categoryId: 6, subCategoryId: 602, nameRu: 'Fanta Orange', nameTj: 'Фанта', nameEn: 'Fanta', price: 8, unit: 'л', rating: 4.6, imageUrl: 'https://picsum.photos/300/300?random=50', description: 'Апельсиновая фанта.' },
    { id: 51, categoryId: 6, subCategoryId: 602, nameRu: 'Sprite', nameTj: 'Спрайт', nameEn: 'Sprite', price: 8, unit: 'л', rating: 4.6, imageUrl: 'https://picsum.photos/300/300?random=51', description: 'Лимонный спрайт.' },
    { id: 52, categoryId: 6, subCategoryId: 602, nameRu: 'Хлодный чай Lipton', nameTj: 'Чои ях', nameEn: 'Ice Tea', price: 10, unit: 'л', rating: 4.8, imageUrl: 'https://picsum.photos/300/300?random=52', description: 'Чай с лимоном.' },
    { id: 53, categoryId: 6, subCategoryId: 602, nameRu: 'Borjomi', nameTj: 'Боржоми', nameEn: 'Borjomi', price: 14, unit: 'шт', rating: 4.9, imageUrl: 'https://picsum.photos/300/300?random=53', description: 'Лечебная минеральная вода.' },

    // Сладости -> Шоколад (801)
    { id: 25, categoryId: 8, subCategoryId: 801, nameRu: 'Шоколад молочный', nameTj: 'Шоколад', nameEn: 'Milk Chocolate', price: 10, unit: 'шт', rating: 4.8, imageUrl: 'https://picsum.photos/300/300?random=25', description: 'Шоколад.' },
    { id: 54, categoryId: 8, subCategoryId: 801, nameRu: 'Шоколад Горький 75%', nameTj: 'Шоколад', nameEn: 'Dark Chocolate', price: 12, unit: 'шт', rating: 4.9, imageUrl: 'https://picsum.photos/300/300?random=54', description: 'Настоящий темный шоколад.' },
    { id: 55, categoryId: 8, subCategoryId: 801, nameRu: 'Snickers', nameTj: 'Сникерс', nameEn: 'Snickers', price: 6, unit: 'шт', rating: 4.7, imageUrl: 'https://picsum.photos/300/300?random=55', description: 'Батончик с арахисом.' },
    { id: 56, categoryId: 8, subCategoryId: 801, nameRu: 'Mars', nameTj: 'Марс', nameEn: 'Mars', price: 6, unit: 'шт', rating: 4.5, imageUrl: 'https://picsum.photos/300/300?random=56', description: 'Батончик с нугой.' },
    { id: 57, categoryId: 8, subCategoryId: 801, nameRu: 'Twix', nameTj: 'Твикс', nameEn: 'Twix', price: 6, unit: 'шт', rating: 4.6, imageUrl: 'https://picsum.photos/300/300?random=57', description: 'Печенье с карамелью.' },
    { id: 58, categoryId: 8, subCategoryId: 801, nameRu: 'Bounty', nameTj: 'Баунти', nameEn: 'Bounty', price: 7, unit: 'шт', rating: 4.8, imageUrl: 'https://picsum.photos/300/300?random=58', description: 'Кокосовое наслаждение.' },
    { id: 59, categoryId: 8, subCategoryId: 801, nameRu: 'Kinder Chocolate', nameTj: 'Киндер', nameEn: 'Kinder', price: 8, unit: 'шт', rating: 5.0, imageUrl: 'https://picsum.photos/300/300?random=59', description: 'Любимый детский шоколад.' },

    // Выпечка (без подкатегории - 0)
    { id: 8, categoryId: 5, subCategoryId: 0, nameRu: 'Хлеб тандырный', nameTj: 'Нон', nameEn: 'Tandoor Bread', price: 4, unit: 'шт', rating: 4.9, imageUrl: 'https://picsum.photos/300/300?random=8', description: 'Горячий нон.' },
    { id: 27, categoryId: 5, subCategoryId: 0, nameRu: 'Круассан', nameTj: 'Круассан', nameEn: 'Butter Croissant', price: 6, unit: 'шт', rating: 4.8, imageUrl: 'https://picsum.photos/300/300?random=27', description: 'Слоеный круассан.' },
    { id: 60, categoryId: 5, subCategoryId: 0, nameRu: 'Багет французский', nameTj: 'Багет', nameEn: 'Baguette', price: 5, unit: 'шт', rating: 4.7, imageUrl: 'https://picsum.photos/300/300?random=60', description: 'Хрустящий длинный хлеб.' },
    { id: 61, categoryId: 5, subCategoryId: 0, nameRu: 'Булочка с корицей', nameTj: 'Булочка', nameEn: 'Cinnamon Roll', price: 7, unit: 'шт', rating: 4.9, imageUrl: 'https://picsum.photos/300/300?random=61', description: 'Ароматная выпечка с корицей.' },
    { id: 62, categoryId: 5, subCategoryId: 0, nameRu: 'Пончик глазированный', nameTj: 'Пончик', nameEn: 'Donut', price: 8, unit: 'шт', rating: 4.6, imageUrl: 'https://picsum.photos/300/300?random=62', description: 'Пончик с шоколадной глазурью.' },
    { id: 63, categoryId: 5, subCategoryId: 0, nameRu: 'Пирожок с картошкой', nameTj: 'Пирожок', nameEn: 'Potato Patty', price: 3, unit: 'шт', rating: 4.5, imageUrl: 'https://picsum.photos/300/300?random=63', description: 'Домашний жареный пирожок.' },
  ]);

  getFilteredProducts(categoryId: number | null, query: string) {
    let filtered = this.products();
    if (categoryId) filtered = filtered.filter(p => p.categoryId === categoryId);
    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(p => 
        p.nameRu.toLowerCase().includes(q) || 
        p.nameTj.toLowerCase().includes(q) || 
        p.nameEn.toLowerCase().includes(q)
      );
    }
    return filtered;
  }

  getSubCategories(categoryId: number | null): SubCategory[] {
    if (!categoryId) return [];
    return this.subCategories().filter(sc => sc.categoryId === categoryId);
  }

  getProductById(id: number) {
    return this.products().find(p => p.id === id);
  }
}
