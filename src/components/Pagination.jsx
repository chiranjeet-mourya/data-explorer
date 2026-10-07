export default function Pagination({
  page,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  isLoading,
  onPrevious,
  onNext,
}) {
  if (!totalPages) {
    return null;
  }

  return (
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
          {page}
        </span>{" "}
        of{" "}
        <span className="font-bold text-slate-900">
          {totalPages}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={
            !hasPreviousPage ||
            isLoading
          }
          onClick={onPrevious}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          ← Previous
        </button>

        <div
          aria-current="page"
          className="flex h-10 min-w-10 items-center justify-center rounded-xl bg-slate-900 px-3 text-sm font-bold text-white"
        >
          {page}
        </div>

        <button
          type="button"
          disabled={
            !hasNextPage ||
            isLoading
          }
          onClick={onNext}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next →
        </button>
      </div>
    </nav>
  );
}