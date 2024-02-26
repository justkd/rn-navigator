import { type Dispatch } from 'react';
import { type NavigationState, type DispatchAction, type NavigationAnimations } from './Navigation.types';
type LocallyDependentProps = {
    topLevelController: boolean;
};
export declare const useNavigationHooks: (state: NavigationState, dispatch: Dispatch<DispatchAction>, initialRoute: string, animations: NavigationAnimations, props: LocallyDependentProps) => void;
export {};
//# sourceMappingURL=Navigation.hooks.d.ts.map