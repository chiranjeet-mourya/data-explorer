import {
  useEffect,
  useRef,
} from "react";

import {
  useQuery,
} from "@tanstack/react-query";

import {
  getProduct,
} from "../api/products";

export default function ProductDetail({
  productId,
  onClose,
}) {
  const closeRef =
    useRef(null);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [
      "product",
      productId,
    ],

    queryFn: ({ signal }) =>
      getProduct(
        productId,
        signal
      ),

    enabled:
      Boolean(productId),

    retry: 0,
  });

  useEffect(() => {
    closeRef.current?.focus();

    const handleEscape = (
      event
    ) => {
      if (
        event.key === "Escape"
      ) {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [onClose]);

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Product details"
        className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-lg flex-col bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Product details
            </p>

            <h2 className="mt-1 text-lg font-bold text-slate-900">
              {data?.data?.name ||
                "Product"}
            </h2>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-2xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-400"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {isLoading && (
            <div
              className="flex min-h-64 flex-col items-center justify-center"
              role="status"
            >
              <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

              <p className="mt-4 text-sm font-medium text-slate-600">
                Loading product...
              </p>
            </div>
          )}

          {isError && (
            <div
              role="alert"
              className="rounded-2xl border border-red-200 bg-red-50 p-5"
            >
              <h3 className="font-bold text-red-800">
                Failed to load product
              </h3>

              <p className="mt-2 text-sm text-red-700">
                {error.message}
              </p>

              <button
                type="button"
                onClick={() =>
                  refetch()
                }
                className="mt-4 rounded-xl bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-200"
              >
                Retry
              </button>
            </div>
          )}

          {data?.data && (
            <div className="space-y-6">
              <div>
                <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                  Product #
                  {
                    data.data.id
                  }
                </span>

                <h3 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
                  {
                    data.data.name
                  }
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {
                    data.data
                      .description
                  }
                </p>
              </div>

              <div className="rounded-2xl bg-slate-900 p-6 text-white">
                <p className="text-sm text-slate-400">
                  Price
                </p>

                <p className="mt-1 text-4xl font-bold">
                  ₹
                  {data.data.price.toLocaleString(
                    "en-IN"
                  )}
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
                  <h4 className="font-bold text-slate-900">
                    Information
                  </h4>
                </div>

                <dl className="divide-y divide-slate-200">
                  <div className="flex items-center justify-between px-5 py-4">
                    <dt className="text-sm text-slate-500">
                      ID
                    </dt>

                    <dd className="font-semibold text-slate-900">
                      {
                        data.data.id
                      }
                    </dd>
                  </div>

                  <div className="flex items-center justify-between px-5 py-4">
                    <dt className="text-sm text-slate-500">
                      Category
                    </dt>

                    <dd className="font-semibold text-slate-900">
                      {
                        data.data
                          .category
                      }
                    </dd>
                  </div>

                  <div className="flex items-center justify-between px-5 py-4">
                    <dt className="text-sm text-slate-500">
                      Stock
                    </dt>

                    <dd className="font-semibold text-slate-900">
                      {
                        data.data
                          .stock
                      }
                    </dd>
                  </div>

                  <div className="flex items-center justify-between px-5 py-4">
                    <dt className="text-sm text-slate-500">
                      Status
                    </dt>

                    <dd>
                      <span
                        className={
                          data.data
                            .status ===
                          "active"
                            ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700"
                            : "rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600"
                        }
                      >
                        {
                          data.data
                            .status
                        }
                      </span>
                    </dd>
                  </div>

                  <div className="flex items-center justify-between px-5 py-4">
                    <dt className="text-sm text-slate-500">
                      Created
                    </dt>

                    <dd className="font-semibold text-slate-900">
                      {
                        data.data
                          .createdAt
                      }
                    </dd>
                  </div>
                </dl>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100"
              >
                Close details
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}