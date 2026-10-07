const API_URL = "/api/products";

const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const randomDelay = () =>
  Math.floor(Math.random() * 2801) + 200;

export async function getProducts(
  params,
  signal
) {
  const searchParams = new URLSearchParams();

  const page = Math.max(
    1,
    Number(params.page) || 1
  );

  const limit = 50;

  searchParams.set(
    "_page",
    String(page)
  );

  searchParams.set(
    "_limit",
    String(limit)
  );

  if (params.search?.trim()) {
    searchParams.set(
      "q",
      params.search.trim()
    );
  }

  if (params.category) {
    searchParams.set(
      "category",
      params.category
    );
  }

  if (params.status) {
    searchParams.set(
      "status",
      params.status
    );
  }

  if (params.minPrice !== "") {
    searchParams.set(
      "price_gte",
      params.minPrice
    );
  }

  if (params.maxPrice !== "") {
    searchParams.set(
      "price_lte",
      params.maxPrice
    );
  }

  searchParams.set(
    "_sort",
    params.sortBy || "id"
  );

  searchParams.set(
    "_order",
    params.sortOrder || "asc"
  );

  await sleep(randomDelay());

  const response = await fetch(
    `${API_URL}?${searchParams.toString()}`,
    {
      signal,
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load products (${response.status})`
    );
  }

  const data = await response.json();

  const totalHeader =
    response.headers.get(
      "X-Total-Count"
    );

  const total = Number(totalHeader);

  if (!Number.isFinite(total)) {
    throw new Error(
      "Pagination total could not be determined."
    );
  }

  const totalPages = Math.ceil(
    total / limit
  );

  return {
    data,

    pagination: {
      page,
      limit,
      total,
      totalPages,

      hasNextPage:
        page < totalPages,

      hasPreviousPage:
        page > 1,
    },
  };
}

export async function getProduct(
  id,
  signal
) {
  await sleep(randomDelay());

  const searchParams =
    new URLSearchParams();

  searchParams.set(
    "id",
    String(id)
  );

  const response = await fetch(
    `${API_URL}?${searchParams.toString()}`,
    {
      signal,
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      "Product not found."
    );
  }

  const data = await response.json();

  return {
    success: true,
    data,
  };
}