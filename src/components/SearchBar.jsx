import {
  useEffect,
  useState,
} from "react";

export default function SearchBar({
  value,
  onChange,
}) {
  const [localValue, setLocalValue] =
    useState(value);

 useEffect(() => {
  const timer = setTimeout(() => {
    onChange(localValue);
  }, 400);

  return () => clearTimeout(timer);
}, [localValue, onChange]);

  return (
    <div>
      <label
        htmlFor="product-search"
        className="mb-2 block text-sm font-semibold text-slate-800"
      >
        Search products
      </label>

      <div className="relative">
        <span
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400"
          aria-hidden="true"
        >
          ⌕
        </span>

        <input
          id="product-search"
          type="search"
          value={localValue}
          onChange={(event) =>
            setLocalValue(
              event.target.value
            )
          }
          placeholder="Search by name, category or description..."
          className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-4 focus:ring-slate-100"
        />
      </div>
    </div>
  );
}