import { define } from 'typeorm-seeding';
import { Category } from '../../entity/Category';
import Faker from 'faker';

define(Category, (faker: typeof Faker) => {
  const category = new Category()
  category.name = faker.internet.userName();
  category.description = faker.lorem.sentences(4);
  return category;
})