import { type Dispatch } from 'react';
import { type NavigationState, type DispatchAction } from './Navigation.types';
export declare const useNavigationContext: <RouteGeneric, BackgroundGeneric>(state: NavigationState, dispatch: Dispatch<DispatchAction>, routes: RouteGeneric, initialRoute: string, baseDur: number, backgrounds?: BackgroundGeneric | undefined) => {
    ctx: {
        navigate: <T extends Record<string, any>>(to: keyof RouteGeneric, opts?: {
            payload?: T | undefined;
            background?: string | undefined;
        } | undefined) => void;
        to: Record<keyof RouteGeneric, keyof RouteGeneric>;
        bg: Record<keyof BackgroundGeneric, keyof BackgroundGeneric>;
        back: "BACK.TOKEN";
        navigator: {
            peek: () => {
                queue: import("./Navigation.types").NavigationEvent[];
                history: import("./Navigation.types").NavigationEvent[];
                isNavigating: "back" | "fwd" | "error" | null;
                background?: string | undefined;
            };
            clear: (background?: string) => void;
            payload: <T_1>(n?: number) => T_1 | null;
            set: (next: Partial<NavigationState>) => void;
        };
    };
};
//# sourceMappingURL=Navigation.context.d.ts.map