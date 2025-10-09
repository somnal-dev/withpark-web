// queryKeys.ts
export const createQueryKey = <T extends string>(base: T) => ({
  all: [base] as const,
  lists: () => [base, "list"] as const,
  list: (id: string | number) => [base, "list", id] as const,
  detail: (id: string | number) => [base, "detail", id] as const,
});

export const QUERY_KEYS = {
  USER: createQueryKey("USER"),
  POST: createQueryKey("POST"),
  COMMENT: createQueryKey("COMMENT"),
  PLACE: createQueryKey("PLACE"),

  POST_COMMENT: createQueryKey("POST_COMMENT"),
  PLACE_COMMENT: createQueryKey("PLACE_COMMENT"),
};
