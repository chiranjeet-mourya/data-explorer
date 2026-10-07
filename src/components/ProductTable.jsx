import { useRef } from "react";

import {
  useVirtualizer,
} from "@tanstack/react-virtual";

export default function ProductTable({
  products,
  sortBy,
  sortOrder,
  onSort,
  onProductClick,
}) {
  const parentRef =
    useRef(null);

  const rowVirtualizer =
    useVirtualizer({
      count: products.length,

      getScrollElement: () =>
        parentRef.current,

      estimateSize: () => 58,

      overscan: 8,
    });

  const virtualRows =
    rowVirtualizer.getVirtualItems();

  const getIcon = (field) => {
    if (sortBy !== field) {
      return "";
    }

    return sortOrder === "asc"
      ? " ↑"
      : " ↓";
  };

  const getLabel = (field) => {
    if (sortBy !== field) {
      return `Sort by ${field}`;
    }

    return sortOrder === "asc"
      ? `Sort ${field} descending`
      : `Sort ${field} ascending`;
  };

  return (
    <div
      ref={parentRef}
      tabIndex={0}
      role="region"
      aria-label="Products table"
      className="h-[600px] overflow-auto outline-none focus:ring-2 focus:ring-slate-400"
    >
      <div className="min-w-[850px]">

        <div
          role="row"
          className="sticky top-0 z-20 grid grid-cols-[80px_2fr_1.2fr_1fr_1fr_1fr] border-b border-slate-200 bg-slate-100 shadow-sm"
        >
          <div
            role="columnheader"
            className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500"
          >
            <button
              type="button"
              onClick={() =>
                onSort("id")
              }
              aria-label={getLabel(
                "id"
              )}
              className="rounded font-bold text-slate-700 outline-none focus:ring-2 focus:ring-slate-400"
            >
              ID{getIcon("id")}
            </button>
          </div>

          <div
            role="columnheader"
            className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500"
          >
            <button
              type="button"
              onClick={() =>
                onSort("name")
              }
              aria-label={getLabel(
                "name"
              )}
              className="rounded font-bold text-slate-700 outline-none focus:ring-2 focus:ring-slate-400"
            >
              Name{getIcon("name")}
            </button>
          </div>

          <div
            role="columnheader"
            className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500"
          >
            Category
          </div>

          <div
            role="columnheader"
            className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500"
          >
            <button
              type="button"
              onClick={() =>
                onSort("price")
              }
              aria-label={getLabel(
                "price"
              )}
              className="rounded font-bold text-slate-700 outline-none focus:ring-2 focus:ring-slate-400"
            >
              Price{getIcon("price")}
            </button>
          </div>

          <div
            role="columnheader"
            className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500"
          >
            Stock
          </div>

          <div
            role="columnheader"
            className="px-4 py-4 text-xs font-bold uppercase tracking-wide text-slate-500"
          >
            Status
          </div>
        </div>

        <div
          role="rowgroup"
          className="relative"
          style={{
            height:
              `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {virtualRows.map(
            (virtualRow) => {
              const product =
                products[
                  virtualRow.index
                ];

              return (
                <div
                  key={product.id}
                  role="row"
                  tabIndex={0}
                  onClick={() =>
                    onProductClick(
                      product.id
                    )
                  }
                  onKeyDown={(
                    event
                  ) => {
                    if (
                      event.key ===
                        "Enter" ||
                      event.key ===
                        " "
                    ) {
                      event.preventDefault();

                      onProductClick(
                        product.id
                      );
                    }
                  }}
                  className="absolute left-0 grid w-full cursor-pointer grid-cols-[80px_2fr_1.2fr_1fr_1fr_1fr] border-b border-slate-100 bg-white transition hover:bg-slate-50 focus:z-10 focus:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-400"
                  style={{
                    height:
                      `${virtualRow.size}px`,
                    transform:
                      `translateY(${virtualRow.start}px)`,
                  }}
                >
                  <div
                    role="cell"
                    className="flex items-center px-4 text-sm font-semibold text-slate-700"
                  >
                    #{product.id}
                  </div>

                  <div
                    role="cell"
                    className="flex items-center truncate px-4 text-sm font-semibold text-slate-900"
                    title={
                      product.name
                    }
                  >
                    {product.name}
                  </div>

                  <div
                    role="cell"
                    className="flex items-center px-4"
                  >
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {
                        product.category
                      }
                    </span>
                  </div>

                  <div
                    role="cell"
                    className="flex items-center px-4 text-sm font-semibold text-slate-900"
                  >
                    ₹
                    {product.price.toLocaleString(
                      "en-IN"
                    )}
                  </div>

                  <div
                    role="cell"
                    className="flex items-center px-4 text-sm text-slate-600"
                  >
                    {
                      product.stock
                    }
                  </div>

                  <div
                    role="cell"
                    className="flex items-center px-4"
                  >
                    <span
                      className={
                        product.status ===
                        "active"
                          ? "rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700"
                          : "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600"
                      }
                    >
                      {
                        product.status
                      }
                    </span>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}