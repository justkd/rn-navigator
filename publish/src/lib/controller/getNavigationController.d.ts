import { type UseNavigationReturnType, type NavigationControllerProps } from '../Navigation.types';
/**
 * Returns a function component representing the `NavigationController`
 * and a `useNavigation` hook specific to that controller.
 */
export declare function getNavigationController<RouteGeneric, BackgroundGeneric = any>(): {
    /**
     * Hook generated in your own navigation file after setting up
     * `@justkd/rn-navigator`. Returns an object `UseNavigationReturnType<R, B>`
     * with navigation and utility functions and helpers.
     * @example
     * import { useNavigation } from 'your_project_path_to/Your_Navigation.ts'
     * const { navigate, to, bg, back, navigator } = useNavigation()
     * @example
     * const { navigate, to } = useNavigation()
     * navigate(to['/Home'])
     * @example
     * const { navigate, to, bg } = useNavigation()
     * navigate(to['/Home'], {
     *   payload: {
     *     item: 1,
     *     item: '2'
     *   },
     *   background: bg['imageKey']
     * })
     * @example
     * const { navigate, back, bg, navigator } = useNavigation()
     *
     * type PayloadType = {
     *   item1: number
     *   item2: string
     * }
     *
     * navigate<PayloadType>(back, {
     *   payload: {
     *     item1: 1,
     *     item2: '2'
     *   },
     *   background: bg['imageKey']
     * })
     *
     * console.log( navigator.peek() )
     */
    useNavigation(): UseNavigationReturnType<keyof RouteGeneric, keyof BackgroundGeneric>;
    NavigationController(props: NavigationControllerProps<Exclude<keyof RouteGeneric, "BACK.TOKEN">, BackgroundGeneric>): import("react/jsx-runtime").JSX.Element;
};
//# sourceMappingURL=getNavigationController.d.ts.map