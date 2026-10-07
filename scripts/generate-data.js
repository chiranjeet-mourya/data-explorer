import fs from "node:fs";

const categories = [
  "Electronics",
  "Clothing",
  "Home",
  "Books",
  "Sports",
  "Beauty",
  "Toys",
  "Grocery",
];

const statuses = [
  "active",
  "inactive",
];

const productNames = [
  "Wireless Mouse",
  "Mechanical Keyboard",
  "USB-C Hub",
  "Bluetooth Speaker",
  "Laptop Stand",
  "Smart Watch",
  "Running Shoes",
  "Backpack",
  "Desk Lamp",
  "Water Bottle",
  "Coffee Maker",
  "Headphones",
  "Webcam",
  "Power Bank",
  "Gaming Controller",
];

const products = Array.from(
  {
    length: 10000,
  },
  (_, index) => {
    const id = index + 1;

    const name =
      productNames[
        index %
          productNames.length
      ];

    const category =
      categories[
        index %
          categories.length
      ];

    const status =
      statuses[
        index %
          statuses.length
      ];

    const price =
      100 +
      ((index * 37) % 4900);

    const stock =
      (index * 17) % 501;

    const month =
      String(
        (index % 12) + 1
      ).padStart(2, "0");

    const day =
      String(
        (index % 28) + 1
      ).padStart(2, "0");

    return {
      id,

      name: `${name} ${id}`,

      category,

      price,

      stock,

      status,

      description:
        `High quality ${name.toLowerCase()} for everyday use.`,

      createdAt:
        `2026-${month}-${day}`,
    };
  }
);

fs.writeFileSync(
  "db.json",
  JSON.stringify(
    {
      products,
    },
    null,
    2
  )
);

console.log(
  `Generated ${products.length} products.`
);