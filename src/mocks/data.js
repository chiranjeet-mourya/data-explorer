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

const statuses = ["active", "inactive"];

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

const products = Array.from({ length: 10000 }, (_, index) => {
  const name = productNames[index % productNames.length];
  const category = categories[index % categories.length];

  return {
    id: index + 1,
    name: `${name} ${index + 1}`,
    category,
    price: Number((10 + ((index * 37) % 4990)).toFixed(2)),
    stock: (index * 17) % 501,
    status: statuses[index % 2],
    description: `High quality ${name.toLowerCase()} for everyday use.`,
    createdAt: new Date(
      2024,
      index % 12,
      (index % 28) + 1
    ).toISOString(),
  };
});

export { products, categories, statuses };