import { faker } from "@faker-js/faker";

export class TestDataFactory {
  static generateUser() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number({style:"national"}),
      password: faker.internet.password({ length: 8 }),
    };
  }
}
