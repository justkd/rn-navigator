import { type ComponentType } from 'react';
import { type ImageSourcePropType, type ViewStyle } from 'react-native';
import { type NavigationContextType } from './Navigation.types';
export declare function getNavigationController<RouteGeneric, BackgroundGeneric = any>(): {
    useNavigation(): NavigationContextType<keyof RouteGeneric, keyof BackgroundGeneric>;
    NavigationController(props: {
        routes: Record<Exclude<keyof RouteGeneric, "BACK.TOKEN">, ComponentType>;
        initialRoute: Exclude<keyof RouteGeneric, "BACK.TOKEN">;
        backgroundColor?: ViewStyle['backgroundColor'];
        backgroundImage?: ImageSourcePropType | undefined;
        backgrounds?: BackgroundGeneric | undefined;
        topLevelController?: boolean | undefined;
    }): import("react/jsx-runtime").JSX.Element;
};
//# sourceMappingURL=Navigation.Controller.d.ts.map