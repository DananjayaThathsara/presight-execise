import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPeople } from "../api/client";

// interface for the parameters that usePeople hook accepts
interface UsePeopleParams {
  search: string;
  hobby: string;
  nationality: string;
}

// This custom hook abstracts the logic for fetching people data with infinite scrolling
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

    // initialPageParam: always start from page 1
    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.meta.page < lastPage.meta.totalPages) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
  });

  const allPeople = query.data?.pages.flatMap((page) => page.data) ?? [];
  1;
  const filters = query.data?.pages[0]?.filters;

  return {
    allPeople,
    filters,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    hasNextPage: query.hasNextPage,
    fetchNextPage: query.fetchNextPage,
  };
}
