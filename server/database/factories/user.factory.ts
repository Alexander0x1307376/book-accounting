import { define } from 'typeorm-seeding';
import { User } from '../../entity/User';
import Faker from 'faker';

export const userFactory = define(User, (faker: typeof Faker) => {
  const user = new User()
  user.name = faker.internet.userName();
  user.email = faker.internet.email();
  user.password = faker.random.word();
  return user;
})