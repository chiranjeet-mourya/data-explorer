import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);

const dbPath =
  path.join(
    __dirname,
    "..",
    "db.json"
  );

function loadProducts() {
  const file =
    fs.readFileSync(
      dbPath,
      "utf-8"
    );

  const db = JSON.parse(file);

  return db.products || [];
}

function sendJson(
  res,
  status,
  data,
  total = null
) {
  res.statusCode = status;

  res.setHeader(
    "Content-Type",
    "application/json"
  );

  res.setHeader(
    "Cache-Control",
    "no-store"
  );

  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.setHeader(
    "Access-Control-Expose-Headers",
    "X-Total-Count"
  );

  if (total !== null) {
    res.setHeader(
      "X-Total-Count",
      String(total)
    );
  }

  res.end(
    JSON.stringify(data)
  );
}

function compareValues(
  firstValue,
  secondValue,
  order
) {
  if (
    firstValue ===
    secondValue
  ) {
    return 0;
  }

  if (
    firstValue === undefined ||
    firstValue === null
  ) {
    return 1;
  }

  if (
    secondValue === undefined ||
    secondValue === null
  ) {
    return -1;
  }

  const first =
    typeof firstValue === "string"
      ? firstValue.toLowerCase()
      : firstValue;

  const second =
    typeof secondValue === "string"
      ? secondValue.toLowerCase()
      : secondValue;

  let result = 0;

  if (first > second) {
    result = 1;
  }

  if (first < second) {
    result = -1;
  }

  if (order === "desc") {
    return -result;
  }

  return result;
}

function randomDelay() {
  return (
    Math.floor(
      Math.random() * 2801
    ) + 200
  );
}

export default function handler(
  req,
  res
) {
  try {
    const products =
      loadProducts();

    const query =
      req.query || {};

    const {
      q = "",
      category = "",
      status = "",
      price_gte = "",
      price_lte = "",
      _sort = "id",
      _order = "asc",
      _page = "1",
      _limit = "50",
      id = "",
    } = query;

    /*
     * Product detail
     */
    if (id !== "") {
      const product =
        products.find(
          (item) =>
            String(item.id) ===
            String(id)
        );

      if (!product) {
        return sendJson(
          res,
          404,
          {
            message:
              "Product not found.",
          }
        );
      }

      return sendJson(
        res,
        200,
        product
      );
    }

    /*
     * Filtering
     */
    let filtered =
      [...products];

    const searchValue =
      String(q)
        .trim()
        .toLowerCase();

    if (searchValue) {
      filtered =
        filtered.filter(
          (product) =>
            String(
              product.name
            )
              .toLowerCase()
              .includes(searchValue) ||
            String(
              product.category
            )
              .toLowerCase()
              .includes(searchValue) ||
            String(
              product.description
            )
              .toLowerCase()
              .includes(searchValue)
        );
    }

    if (category) {
      filtered =
        filtered.filter(
          (product) =>
            product.category ===
            category
        );
    }

    if (status) {
      filtered =
        filtered.filter(
          (product) =>
            product.status ===
            status
        );
    }

    if (price_gte !== "") {
      filtered =
        filtered.filter(
          (product) =>
            Number(product.price) >=
            Number(price_gte)
        );
    }

    if (price_lte !== "") {
      filtered =
        filtered.filter(
          (product) =>
            Number(product.price) <=
            Number(price_lte)
        );
    }

    /*
     * Sorting
     */
    const allowedSortFields = [
      "id",
      "name",
      "category",
      "price",
      "stock",
      "status",
      "createdAt",
    ];

    const safeSort =
      allowedSortFields.includes(
        _sort
      )
        ? _sort
        : "id";

    const safeOrder =
      _order === "desc"
        ? "desc"
        : "asc";

    filtered.sort(
      (a, b) =>
        compareValues(
          a[safeSort],
          b[safeSort],
          safeOrder
        )
    );

    /*
     * Pagination
     */
    const total =
      filtered.length;

    const pageNumber =
      Math.max(
        1,
        Number(_page) || 1
      );

    const pageSize =
      Math.min(
        100,
        Math.max(
          1,
          Number(_limit) || 50
        )
      );

    const start =
      (pageNumber - 1) *
      pageSize;

    const paginated =
      filtered.slice(
        start,
        start + pageSize
      );

    /*
     * Simulated latency
     */
    const delay =
      randomDelay();

    setTimeout(() => {
      sendJson(
        res,
        200,
        paginated,
        total
      );
    }, delay);
  } catch (error) {
    console.error(
      "Products API error:",
      error
    );

    return sendJson(
      res,
      500,
      {
        message:
          "Failed to load products.",
      }
    );
  }
}