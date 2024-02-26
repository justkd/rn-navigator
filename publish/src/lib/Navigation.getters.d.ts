export declare const getTypedRoutes: <T extends Record<any, any>>(routes: T) => {
    navigationRoutes: T;
};
export declare const getTypedBackgrounds: <T extends Record<any, any>>(backgrounds: T) => {
    navigationBackgroundKeys: Record<keyof T, keyof T>;
    navigationBackgrounds: T;
};
export declare const getTypedRouteKeys: <T extends readonly string[]>(arr: T) => {
    navigationRouteKeys: Record<T[number], T[number]> & Record<"BACK.TOKEN", "BACK.TOKEN">;
};
//# sourceMappingURL=Navigation.getters.d.ts.map