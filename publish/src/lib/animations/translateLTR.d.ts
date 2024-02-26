import { type MutableRefObject } from 'react';
import { Animated } from 'react-native';
import { type NavigationAnimations } from '../Navigation.types';
/**
 * Animation collection for a given navigation transition style.
 * All of these should be in hook format that returns an object
 * `{ anims: NavigationAnimations }`
 * @note
 * Adding other animation types might need some reworking of how
 * anim refs are being passed and handled. I can imagine a transition
 * that adds a scaling effect somehow and may need a third ref.
 */
export declare const useTranslateLTR: (animTranslate: MutableRefObject<Animated.Value>, animOpacity: MutableRefObject<Animated.Value>) => {
    anims: NavigationAnimations;
    baseDur: number;
};
//# sourceMappingURL=translateLTR.d.ts.map