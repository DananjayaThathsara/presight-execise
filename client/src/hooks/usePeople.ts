import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPeople } from "../api/client";

interface UsePeopleParams {
  search: string;
  hobby: string;
  nationality: string;
}

export function usePeople({ search, hobby, nationality }: UsePeopleParams) {
  const query = useInfiniteQuery({
    queryKey: ["people", search, hobby, nationality],

    queryFn: ({ pageParam }) =>
      fetchPeople({
        page: pageParam as number,
        search: search || undefined,
        hobby: hobby || undefined,
        nationality: nationality || undefined,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      // Safety check — if response is not what we expect return undefined
      if (!lastPage || !lastPage.meta) return undefined;
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
  });

  const allPeople = query.data?.pages.flatMap((page) => page.data) ?? [];
  const filters = query.data?.pages[0]?.filters;

  return {
    allPeople,
    filters,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
    isError: query.isError,
    error: query.error,
  };
}
