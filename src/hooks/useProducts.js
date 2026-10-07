import {
  useQuery,
} from "@tanstack/react-query";

import {
  getProducts,
} from "../api/products";

export function useProducts(
  params
) {
  return useQuery({
    queryKey: [
      "products",
      params.search,
      params.category,
      params.status,
      params.minPrice,
      params.maxPrice,
      params.sortBy,
      params.sortOrder,
      params.page,
    ],

    queryFn: ({
      signal,
    }) =>
      getProducts(
        params,
        signal
      ),

    retry: 0,

    staleTime: 0,

    refetchOnWindowFocus: false,
  });
}