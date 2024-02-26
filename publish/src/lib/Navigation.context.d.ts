import { type Dispatch } from 'react';
import { type NavigationState, type DispatchAction } from './Navigation.types';
export declare const useNavigationContext: <RouteGeneric, BackgroundGeneric>(state: NavigationState, dispatch: Dispatch<DispatchAction>, routes: RouteGeneric, backgrounds?: BackgroundGeneric | undefined) => {
    ctx: {
        navigate: <T extends Record<string, any>>(to: keyof RouteGeneric, opts?: {
            payload?: T | undefined;
            background?: string | undefined;
        } | undefined) => void;
        peek: () => {
            queue: import("./Navigation.types").NavigationEvent[];
            history: import("./Navigation.types").NavigationEvent[];
            isNavigating: "back" | "fwd" | "error" | null;
            background?: string | undefined;
        };
        to: Record<keyof RouteGeneric, keyof RouteGeneric>;
        bg: Record<keyof BackgroundGeneric, keyof BackgroundGeneric>;
        back: "BACK.TOKEN";
        get: {
            payload: <T_1>(n?: number) => T_1 | null;
        };
    };
};
//# sourceMappingURL=Navigation.context.d.ts.map