import { define } from 'typeorm-seeding';
import { Book } from '../../entity/Book';
import Faker from 'faker';
import { random } from 'lodash';

define(Book, (faker: typeof Faker) => {
  const book = new Book();
  book.name = faker.lorem.sentence(random(1, 5));
  book.isbn = `${random(1000, 9999)}-${random(1000, 9999)}-${random(1000, 9999)}`
  book.description = faker.lorem.sentences(10);
  return book;
})