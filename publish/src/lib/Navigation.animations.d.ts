import { type MutableRefObject } from 'react';
import { Animated } from 'react-native';
export declare const navigationAnimations: {
    readonly translateLTR: (animTranslate: MutableRefObject<Animated.Value>, animOpacity: MutableRefObject<Animated.Value>) => {
        anims: import("./Navigation.types").NavigationAnimations;
    };
};
export declare const NavigationAnimationTypes: Record<"translateLTR", "translateLTR">;
/**
 * Must return an object `{ anims: NavigationAnimations }`
 */
export declare const useNavigationAnimations: (anim1: MutableRefObject<Animated.Value>, anim2: MutableRefObject<Animated.Value>, type: keyof typeof NavigationAnimationTypes) => {
    anims: import("./Navigation.types").NavigationAnimations;
};
//# sourceMappingURL=Navigation.animations.d.ts.map