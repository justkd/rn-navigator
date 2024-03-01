/**
 * Uses the values returned from the other getters and returns
 * a strongly typed object holding all navigation routes.
 */
export declare const getTypedRoutes: <T extends Record<any, any>>(routes: T) => {
    navigationRoutes: T;
};
/**
 * Ensures the background key helper is strongly typed.
 */
export declare const getTypedBackgrounds: <T extends Record<any, any>>(backgrounds: T) => {
    navigationBackgroundKeys: Record<keyof T, keyof T>;
    navigationBackgrounds: T;
};
/**
 * Adds the internal back token to the user route keys.
 * The back token won't be included in the exposed type,
 * but the navigate fn will still accept it from the `back`
 * helper returned by `useNavigation`. The route keys will
 * also be strongly typed.
 */
export declare const getTypedRouteKeys: <T extends readonly string[]>(arr: T) => {
    navigationRouteKeys: Record<T[number], T[number]> & Record<"BACK.TOKEN", "BACK.TOKEN">;
};
//# sourceMappingURL=Navigation.getters.d.ts.map