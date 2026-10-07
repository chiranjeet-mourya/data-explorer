export default function Filters({
  category,
  status,
  minPrice,
  maxPrice,
  categories,
  statuses,
  onCategoryChange,
  onStatusChange,
  onMinPriceChange,
  onMaxPriceChange,
  onReset,
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
      <div>
        <label
          htmlFor="category"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Category
        </label>

        <select
          id="category"
          value={category}
          onChange={(event) =>
            onCategoryChange(
              event.target.value
            )
          }
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-100"
        >
          <option value="">
            All categories
          </option>

          {categories.map(
            (item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <label
          htmlFor="status"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Status
        </label>

        <select
          id="status"
          value={status}
          onChange={(event) =>
            onStatusChange(
              event.target.value
            )
          }
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-100"
        >
          <option value="">
            All statuses
          </option>

          {statuses.map(
            (item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            )
          )}
        </select>
      </div>

      <div>
        <label
          htmlFor="min-price"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Min price
        </label>

        <input
          id="min-price"
          type="number"
          min="0"
          value={minPrice}
          onChange={(event) =>
            onMinPriceChange(
              event.target.value
            )
          }
          placeholder="0"
          className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-100"
        />
      </div>

      <div>
        <label
          htmlFor="max-price"
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          Max price
        </label>

        <input
          id="max-price"
          type="number"
          min="0"
          value={maxPrice}
          onChange={(event) =>
            onMaxPriceChange(
              event.target.value
            )
          }
          placeholder="5000"
          className="w-full rounded-xl border border-slate-300 px-3 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-4 focus:ring-slate-100"
        />
      </div>

      <div className="flex items-end">
        <button
          type="button"
          onClick={onReset}
          className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
        >
          Reset filters
        </button>
      </div>
    </div>
  );
}