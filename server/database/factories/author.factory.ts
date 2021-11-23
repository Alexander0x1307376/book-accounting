import { define } from 'typeorm-seeding';
import { Author } from '../../entity/Author';
import Faker from 'faker';

define(Author, (faker: typeof Faker) => {
  const author = new Author();
  author.name = faker.name.firstName + ' ' + faker.name.lastName;
  author.birthDate = faker.date.past(100);
  author.deathDate = faker.date.past(20);
  author.description = faker.lorem.sentences(10);
  return author;
})