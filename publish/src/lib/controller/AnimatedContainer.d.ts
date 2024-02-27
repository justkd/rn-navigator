import { type ComponentType } from 'react';
import { Animated } from 'react-native';
import { type NavigationState } from '../Navigation.types';
export declare function AnimatedContainer<UserRouteKey extends number | string | symbol>(props: {
    routes: Record<UserRouteKey, ComponentType>;
    state: NavigationState;
    animO: Animated.Value;
    animT: Animated.Value;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AnimatedContainer.d.ts.map