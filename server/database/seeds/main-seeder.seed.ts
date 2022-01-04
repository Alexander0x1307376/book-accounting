import { Connection, getManager } from "typeorm";
import { factory, Factory, Seeder } from "typeorm-seeding";
import { Author } from "../../entity/Author";
import { User } from "../../entity/User";
import { Category } from "../../entity/Category";
import { Book } from "../../entity/Book";

import { v4 } from "uuid";
import { isNumber, random, sample, shuffle } from "lodash";


const flatCategories = (categories: Category[]) => {
  const result: Category[] = categories.reduce((acc, category) => {
    return category.children.length 
    ? acc.concat(category, flatCategories(category.children))
    : []
  }, [] as Category[]);
  return result;
}

const generateCategories = async (quantity: number, childQantity: number | (() => number), deep = 1) => {
  const categories = await factory(Category)().makeMany(quantity, { uuid: v4() });
  for (let i = 0; i < quantity; i++) {

    const childCount = isNumber(childQantity)
      ? childQantity
      : childQantity();


    const children = (deep > 1 && childCount)
      ? await generateCategories(childCount, childQantity, deep - 1)
      : [];


    categories[i].children = children;
  }
  return categories;
}


export class CreateAuthors implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {

    const users = await factory(User)().makeMany(20, { uuid: v4() });

    const authors = await factory(Author)().makeMany(25, { uuid: v4() });
    
    const categories = await generateCategories(10, () => random(0,5), 3);
    const flattenCategories = flatCategories(categories);
    
    const books = await factory(Book)().makeMany(200, { uuid: v4() });
    books.forEach(book => {
      const bookAuthors = shuffle(authors).slice(0, random(1,4));
      book.authors = bookAuthors;

      const category = sample(flattenCategories);
      book.category = category!;
    });

    const manager = getManager();

    await manager.save(users);
    await manager.save(authors);
    await manager.save(flattenCategories);
    await manager.save(books);
  }
}


