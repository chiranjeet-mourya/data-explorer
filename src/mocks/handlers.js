import { http, HttpResponse } from "msw";
import { products } from "./data";

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const randomDelay = () =>
  Math.floor(Math.random() * 2801) + 200;

const shouldFail = () =>
  Math.random() < 0.1;

export const handlers = [
  http.get("/api/products", async ({ request }) => {
    const url = new URL(request.url);

    await sleep(randomDelay());

    if (shouldFail()) {
      return HttpResponse.json(
        {
          success: false,
          message: "Something went wrong. Please try again.",
        },
        { status: 500 }
      );
    }

    let result = [...products];

    const search = url.searchParams.get("search") || "";
    const category = url.searchParams.get("category") || "";
    const status = url.searchParams.get("status") || "";

    const minPrice = url.searchParams.get("minPrice");
    const maxPrice = url.searchParams.get("maxPrice");

    const sortBy =
      url.searchParams.get("sortBy") || "id";

    const sortOrder =
      url.searchParams.get("sortOrder") || "asc";

    const requestedPage =
      Number(url.searchParams.get("page")) || 1;

    const limit =
      Math.min(
        Math.max(
          Number(url.searchParams.get("limit")) || 50,
          1
        ),
        100
      );

    let page = Math.max(1, requestedPage);

    if (search.trim()) {
      const searchTerm = search.trim().toLowerCase();

      result = result.filter((product) =>
        [
          product.name,
          product.category,
          product.description,
        ].some((value) =>
          value.toLowerCase().includes(searchTerm)
        )
      );
    }

    if (category) {
      result = result.filter(
        (product) => product.category === category
      );
    }

    if (status) {
      result = result.filter(
        (product) => product.status === status
      );
    }

    if (minPrice !== null && minPrice !== "") {
      const minimum = Number(minPrice);

      if (!Number.isNaN(minimum)) {
        result = result.filter(
          (product) => product.price >= minimum
        );
      }
    }

    if (maxPrice !== null && maxPrice !== "") {
      const maximum = Number(maxPrice);

      if (!Number.isNaN(maximum)) {
        result = result.filter(
          (product) => product.price <= maximum
        );
      }
    }

    const allowedSortFields = [
      "id",
      "name",
      "category",
      "price",
      "stock",
      "status",
      "createdAt",
    ];

    const safeSortBy = allowedSortFields.includes(sortBy)
      ? sortBy
      : "id";

    const direction =
      sortOrder === "desc" ? -1 : 1;

    result.sort((a, b) => {
      const first = a[safeSortBy];
      const second = b[safeSortBy];

      if (
        typeof first === "string" &&
        typeof second === "string"
      ) {
        return (
          first.localeCompare(second) * direction
        );
      }

      if (first < second) return -1 * direction;
      if (first > second) return 1 * direction;

      return 0;
    });

    const total = result.length;

    const totalPages =
      total === 0
        ? 0
        : Math.ceil(total / limit);

    if (totalPages > 0 && page > totalPages) {
      page = totalPages;
    }

    const startIndex =
      (page - 1) * limit;

    const endIndex =
      startIndex + limit;

    const pageData =
      result.slice(startIndex, endIndex);

    console.log("[MSW] Pagination", {
      page,
      limit,
      startIndex,
      endIndex,
      returned: pageData.length,
      total,
      totalPages,
      firstId: pageData[0]?.id,
      lastId: pageData[pageData.length - 1]?.id,
    });

    return HttpResponse.json({
      success: true,

      data: pageData,

      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  }),

  http.get("/api/products/:id", async ({ params }) => {
    await sleep(randomDelay());

    if (shouldFail()) {
      return HttpResponse.json(
        {
          success: false,
          message: "Failed to load product details.",
        },
        { status: 500 }
      );
    }

    const id = Number(params.id);

    const product = products.find(
      (item) => item.id === id
    );

    if (!product) {
      return HttpResponse.json(
        {
          success: false,
          message: "Product not found.",
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: product,
    });
  }),
];