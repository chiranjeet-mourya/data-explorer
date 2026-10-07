import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useSearchParams } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import ProductTable from "../components/ProductTable";
import ProductDetail from "../components/ProductDetail";

import { useProducts } from "../hooks/useProducts";

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

const PAGE_SIZE = 50;

export default function ProductsPage() {
  const [
    searchParams,
    setSearchParams,
  ] = useSearchParams();

  const search =
    searchParams.get("search") || "";

  const category =
    searchParams.get("category") || "";

  const status =
    searchParams.get("status") || "";

  const minPrice =
    searchParams.get("minPrice") || "";

  const maxPrice =
    searchParams.get("maxPrice") || "";

  const sortBy =
    searchParams.get("sortBy") || "id";

  const sortOrder =
    searchParams.get("sortOrder") || "asc";

  const selectedProduct =
    searchParams.get("product");

  const rawPage =
    Number(searchParams.get("page"));

  const page =
    Number.isFinite(rawPage) &&
    rawPage >= 1
      ? Math.floor(rawPage)
      : 1;

  const [
    draftSearch,
    setDraftSearch,
  ] = useState(search);

  useEffect(() => {
    setDraftSearch(search);
  }, [search]);

  useEffect(() => {
    if (draftSearch === search) {
      return;
    }

    const timer = setTimeout(() => {
      setSearchParams(
        (current) => {
          const next =
            new URLSearchParams(current);

          const value =
            draftSearch.trim();

          if (value) {
            next.set(
              "search",
              value
            );
          } else {
            next.delete("search");
          }

          next.delete("page");

          return next;
        },
        {
          replace: false,
        }
      );
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [
    draftSearch,
    search,
    setSearchParams,
  ]);

  const updateParams = useCallback(
    (updates) => {
      setSearchParams(
        (current) => {
          const next =
            new URLSearchParams(current);

          Object.entries(updates).forEach(
            ([key, value]) => {
              if (
                value === "" ||
                value === null ||
                value === undefined
              ) {
                next.delete(key);
                return;
              }

              if (
                key === "page" &&
                Number(value) === 1
              ) {
                next.delete("page");
                return;
              }

              next.set(
                key,
                String(value)
              );
            }
          );

          return next;
        },
        {
          replace: false,
        }
      );
    },
    [setSearchParams]
  );

  const params = useMemo(
    () => ({
      search,
      category,
      status,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
      page,
      limit: PAGE_SIZE,
    }),
    [
      search,
      category,
      status,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
      page,
    ]
  );

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useProducts(params);

  const products =
    data?.data ?? [];

  const pagination =
    data?.pagination ?? null;

  const handleCategoryChange =
    useCallback(
      (value) => {
        updateParams({
          category: value,
          page: 1,
        });
      },
      [updateParams]
    );

  const handleStatusChange =
    useCallback(
      (value) => {
        updateParams({
          status: value,
          page: 1,
        });
      },
      [updateParams]
    );

  const handleMinPriceChange =
    useCallback(
      (value) => {
        updateParams({
          minPrice: value,
          page: 1,
        });
      },
      [updateParams]
    );

  const handleMaxPriceChange =
    useCallback(
      (value) => {
        updateParams({
          maxPrice: value,
          page: 1,
        });
      },
      [updateParams]
    );

  const handleSort =
    useCallback(
      (field) => {
        let nextOrder = "asc";

        if (sortBy === field) {
          nextOrder =
            sortOrder === "asc"
              ? "desc"
              : "asc";
        }

        updateParams({
          sortBy: field,
          sortOrder: nextOrder,
          page: 1,
        });
      },
      [
        sortBy,
        sortOrder,
        updateParams,
      ]
    );

  const handleReset =
    useCallback(() => {
      setDraftSearch("");

      setSearchParams(
        {},
        {
          replace: false,
        }
      );
    }, [setSearchParams]);

  const openProduct =
    useCallback(
      (id) => {
        updateParams({
          product: id,
        });
      },
      [updateParams]
    );

  const closeProduct =
    useCallback(() => {
      updateParams({
        product: null,
      });
    }, [updateParams]);

  const goToPage =
    useCallback(
      (nextPage) => {
        if (!pagination) {
          return;
        }

        if (
          nextPage < 1 ||
          nextPage >
            pagination.totalPages
        ) {
          return;
        }

        setSearchParams(
          (current) => {
            const next =
              new URLSearchParams(
                current
              );

            if (nextPage === 1) {
              next.delete("page");
            } else {
              next.set(
                "page",
                String(nextPage)
              );
            }

            return next;
          },
          {
            replace: false,
          }
        );

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      },
      [
        pagination,
        setSearchParams,
      ]
    );

  const isInitialLoading =
    isLoading && !data;

  const isPageChanging =
    isFetching && !isLoading;

  return (
    <main className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        <header className="mb-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

          <div>

            <span className="inline-flex rounded-full bg-slate-900 px-3 py-1 text-2xl font-bold tracking-tight text-white">
              DATA EXPLORER
            </span>

            <p className="mt-2 text-sm text-slate-600">
              Search, filter and explore
              10,000 products.
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Total records
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              10,000
            </p>

          </div>

        </header>

        <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <SearchBar
            value={draftSearch}
            onChange={setDraftSearch}
          />

        </section>

        <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-5">

            <h2 className="text-base font-bold text-slate-900">
              Filters
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Refine the product results.
            </p>

          </div>

          <Filters
            category={category}
            status={status}
            minPrice={minPrice}
            maxPrice={maxPrice}
            categories={categories}
            statuses={statuses}
            onCategoryChange={
              handleCategoryChange
            }
            onStatusChange={
              handleStatusChange
            }
            onMinPriceChange={
              handleMinPriceChange
            }
            onMaxPriceChange={
              handleMaxPriceChange
            }
            onReset={handleReset}
          />

        </section>

        <div
          className="mb-3 flex min-h-6 items-center justify-between px-1 text-sm text-slate-600"
          aria-live="polite"
        >

          <span>

            {pagination
              ? `Showing ${products.length} of ${pagination.total} products`
              : "Loading results..."}

          </span>

          {isPageChanging && (
            <span className="flex items-center gap-2 font-medium text-slate-500">

              <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-700" />

              Updating...

            </span>
          )}

        </div>

        {isInitialLoading && (
          <div
            role="status"
            aria-live="polite"
            className="rounded-2xl border border-slate-200 bg-white p-16 text-center shadow-sm"
          >

            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

            <p className="mt-4 text-sm font-semibold text-slate-700">
              Loading products...
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Fetching page {page}
            </p>

          </div>
        )}

        {isError && (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 p-10 text-center"
          >

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-xl font-bold text-red-700">
              !
            </div>

            <h2 className="mt-4 text-lg font-bold text-red-900">
              Failed to load products
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-red-700">
              {error?.message ||
                "Something went wrong while loading products."}
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="mt-5 rounded-xl bg-red-700 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-200"
            >
              Retry request
            </button>

          </div>
        )}

        {!isInitialLoading &&
          !isError &&
          products.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-16 text-center shadow-sm">

              <div className="text-4xl">
                🔎
              </div>

              <h2 className="mt-4 text-lg font-bold text-slate-900">
                No products found
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search
                or filters.
              </p>

              <button
                type="button"
                onClick={handleReset}
                className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
              >
                Clear filters
              </button>

            </div>
          )}

        {!isInitialLoading &&
          !isError &&
          products.length > 0 && (
            <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              {isPageChanging && (
                <div className="absolute inset-x-0 top-0 z-30 h-1 overflow-hidden bg-slate-100">

                  <div className="h-full w-1/3 animate-pulse bg-slate-900" />

                </div>
              )}

              <ProductTable
                products={products}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={handleSort}
                onProductClick={openProduct}
              />

            </section>
          )}

        {!isInitialLoading &&
          !isError &&
          pagination &&
          pagination.totalPages > 0 && (

            <nav
              aria-label="Product pagination"
              className="mt-5 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row"
            >

              <div
                className="text-sm text-slate-500"
                aria-live="polite"
              >

                Page{" "}

                <span className="font-bold text-slate-900">
                  {pagination.page}
                </span>

                {" "}of{" "}

                <span className="font-bold text-slate-900">
                  {pagination.totalPages}
                </span>

                <span className="ml-2 text-slate-400">
                  •
                </span>

                <span className="ml-2">
                  {pagination.total.toLocaleString(
                    "en-IN"
                  )}{" "}
                  total
                </span>

              </div>

              <div className="flex items-center gap-2">

                <button
                  type="button"
                  disabled={
                    !pagination.hasPreviousPage ||
                    isFetching
                  }
                  onClick={() =>
                    goToPage(
                      pagination.page - 1
                    )
                  }
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ← Previous
                </button>

                <span
                  aria-current="page"
                  className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-slate-900 px-3 text-sm font-bold text-white"
                >
                  {pagination.page}
                </span>

                <button
                  type="button"
                  disabled={
                    !pagination.hasNextPage ||
                    isFetching
                  }
                  onClick={() =>
                    goToPage(
                      pagination.page + 1
                    )
                  }
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next →
                </button>

              </div>

            </nav>
          )}

      </div>

      {selectedProduct && (
        <ProductDetail
          productId={Number(selectedProduct)}
          onClose={closeProduct}
        />
      )}

    </main>
  );
}