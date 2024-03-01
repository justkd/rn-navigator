import { type Dispatch } from 'react';
import { type NavigationState, type DispatchAction, UseNavigationReturnType } from './Navigation.types';
export declare const useNavigationContext: <RouteGeneric, BackgroundGeneric>(state: NavigationState, dispatch: Dispatch<DispatchAction>, routes: RouteGeneric, initialRoute: string, baseDur: number, backgrounds?: BackgroundGeneric | undefined) => {
    ctx: UseNavigationReturnType<keyof RouteGeneric, keyof BackgroundGeneric>;
};
//# sourceMappingURL=Navigation.context.d.ts.map