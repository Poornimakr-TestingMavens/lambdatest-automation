// utils/faker.ts
import { faker } from "@faker-js/faker";

export class TestDataFactory {
  static generateUser() {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number({ style: "national" }),
      password: "Test@12345",
    };
  }

  static generateProduct() {
    const products = [
      "Apple", "HTC", "LG", "Nokia", "Samsung", "Xiomi",
      "Apple Macbook", "Asus", "HP", "Lenovo",
      "Headphones", "Memory Card", "Mobile cases", "Power bank", "Screenguards",
      "Smart Watch", "Smart band", "Apple Ipad",
      "Desktop", "Hard disk", "Mouse & Keyboard", "Pen Drive", "Printer",
      "Bluetooth Speaker", "DTH", "Home Audio", "Home Theatre", "SoundBar"
    ];

    return {
      searchTerm: faker.helpers.arrayElement(products), // pick random product
      quantity: faker.number.int({ min: 1, max: 3 }), // random quantity
    };
  }
}
