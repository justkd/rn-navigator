export const Navigator = <
  T extends
    | Iterable<readonly [unknown, unknown]>
    | null
    | undefined,
>(
  routes: T,
) => ({ test: '1', routes })
