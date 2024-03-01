# [@justkd/rn-navigator](https://github.com/justkd/rn-navigator)

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/justkd/rn-navigator/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/justkd/rn-navigator/tree/main)

React Native navigation with stateful transition animations leveraging
predefined backgrounds or background colors.

Each route is just a route key you assign to a given component. These should each be top level components for the intended route.

## Example
```
const { 
  navigate, 
  to, 
  back 
} = useNavigation()

navigate(to['/Home])

navigate(back)
```

![image](https://github.com/justkd/rn-navigator/blob/main/assets/rn-navigator-new.gif?raw=true)

```
const { 
  navigate, 
  navigator,
  to, 
  bg
} = useNavigation()

navigate(to.Last, { 
   background: bg.one,
   payload: { data: [] }
})

console.log( navigator.payload() )
```

# TODO

- tests 😒
- other animation options
- skip animation
- less setup

## Install

```
npm i @justkd/rn-navigator
```
```
yarn add @justkd/rn-navigator
```

## Setup

There are a few steps to set up `@justkd/rn-navigator` in your project. It doesn't matter what you name the following files or how you organize them.

### (required) Navigation.keys.ts

<details>
  <summary>Navigation.keys.ts (copypasta)</summary>

  ```
  import { 
    getTypedRouteKeys, 
    type GetTypedRouteKeys 
  } from '@justkd/rn-navigator'

  const routeKeys = [
      '/Home', 
      '/Last'
  ] as const

  export const { navigationRouteKeys } =
    getTypedRouteKeys<typeof routeKeys>(routeKeys)

  export type NavigationRouteKey = keyof GetTypedRouteKeys<
    typeof navigationRouteKeys
  >
  ```

</details>

<details>
  <summary>Navigation.keys.ts (commented)</summary>

  ```
  // Import the relevant getters and types from the package.
  import { 
    getTypedRouteKeys, 
    type GetTypedRouteKeys 
  } from '@justkd/rn-navigator'

  // All route keys will need to be declared here first. 
  // Also, it's important to cast the object type `as const`. 
  const routeKeys = [
      '/Home', 
      '/Last'
  ] as const

  // Ensure the navigator knows the typed keys and export 
  // the returned, deconstructed value `navigationRouteKeys`.

  export const { navigationRouteKeys } =
    getTypedRouteKeys<typeof routeKeys>(routeKeys)

  // Export the route key type. The variable name doesn't matter.

  export type NavigationRouteKey = keyof GetTypedRouteKeys<
    typeof navigationRouteKeys
  >
  ```

</details>


### (required) Navigation.routes.ts

<details>
  <summary>Navigation.routes.ts (copypasta)</summary>

  ```
  import { type ComponentType } from 'react'
  import { type NavigationRouteKey } from './Navigation.keys'
  import { getTypedRoutes } from '@justkd/rn-navigator'

  import { Home } from './routes/Home'
  import { Last } from './routes/Last'

  const routes: Record<NavigationRouteKey, ComponentType> = {
    '/Home': Home,
    '/Last': Last,
  }

  export const { navigationRoutes } =
    getTypedRoutes<typeof routes>(routes)
  ```

</details>

<details>
  <summary>Navigation.routes.ts (commented)</summary>

  ```
  // Import the relevant getters and types.
  import { type ComponentType } from 'react'
  import { type NavigationRouteKey } from './Navigation.keys'
  import { getTypedRoutes } from '@justkd/rn-navigator'

  // Import the relevant top level components to represent each route.
  import { Home } from './routes/Home'
  import { Last } from './routes/Last'

  // Enforce record type and map route keys to route components.
  const routes: Record<NavigationRouteKey, ComponentType> = {
    '/Home': Home,
    '/Last': Last,
  }

  // Export the returned, deconstructed value `navigationRoutes`.
  export const { navigationRoutes } =
    getTypedRoutes<typeof routes>(routes)
  ```

</details>

### (optional) Navigation.backgrounds.ts

Backgrounds are optional. A default color and/or image can also be declared as a controller prop.

<details>
  <summary>Navigation.backgrounds.ts (copypasta)</summary>

  ```
  import { 
    getTypedBackgrounds, 
    type NavigationBackground 
  } from '@justkd/rn-navigator'
  import ImageOne from './assets/1.jpg'
  import ImageTwo from './assets/2.jpg'

  const backgrounds: Record<string, NavigationBackground> = {
    one: { image: { source: ImageOne } },
    two: { image: { source: ImageTwo } },
    black: { color: 'black' },
    white: { color: 'white' },
    combined: {
      color: 'purple',
      image: {
        resizeMode: 'contain',
        source: ImageSix,
        style: { marginLeft: '5%' },
      },
    },
  } as const

  export const {
    navigationBackgrounds,
    navigationBackgroundKeys,
  } = getTypedBackgrounds(backgrounds)
  ```

</details>

<details>
  <summary>Navigation.backgrounds.ts (commented)</summary>

  ```
  // Import the relevant getters and types.

  import { getTypedBackgrounds, type NavigationBackground } from '@justkd/rn-navigator'

  // Import image assets that you want to use as backgrounds during animated transitions.

  import ImageOne from './assets/1.jpg'
  import ImageTwo from './assets/2.jpg'

  // Enforce record type and map transition backgrounds to background keys.
  // The keys are arbitrary. This should be cast to `as const` as well.
  const backgrounds: Record<string, NavigationBackground> = {
    one: { image: { source: ImageOne } },
    two: { image: { source: ImageTwo } },
    black: { color: 'black' },
    white: { color: 'white' },
    combined: {
      color: 'purple',
      image: {
        resizeMode: 'contain',
        source: ImageSix,
        style: { marginLeft: '5%' },
      },
    },
  } as const

  // Export the returned, deconstructed values `navigationBackgrounds` and `navigationBackgroundKeys`.
  export const {
    navigationBackgrounds,
    navigationBackgroundKeys,
  } = getTypedBackgrounds(backgrounds)
  ```

</details>

### (required) Navigation.ts

<details>
  <summary>Navigation.ts (copypasta)</summary>

  ```
  import { getNavigationController } from '@justkd/rn-navigator'
  import { navigationBackgrounds } from './Navigation.backgrounds'
  import { navigationRouteKeys } from './Navigation.keys'

  export const { NavigationController, useNavigation } =
    getNavigationController<
      typeof navigationRouteKeys,
      typeof navigationBackgrounds
    >()
  ```

</details>

<details>
  <summary>Navigation.ts (commented)</summary>

  ```
  // Import the relevant getters and types.
  import { getNavigationController } from '@justkd/rn-navigator'
  import { navigationBackgrounds } from './Navigation.backgrounds'
  import { navigationRouteKeys } from './Navigation.keys'

  // Export the returned, deconstructed values `NavigationController` and `useNavigation`.
  export const { NavigationController, useNavigation } =
    getNavigationController<
      typeof navigationRouteKeys,
      typeof navigationBackgrounds
    >()
  ```

</details>

## Use

<details>
  <summary>Example `App.tsx`</summary>

  ```
  // Import the values you generated in the other files.
  import {
    NavigationController,
    navigationRoutes,
    navigationBackgrounds,
  } from './Navigation'

  // Default background image and color are optional
  // import DefaultBackgroundImage from './assets/DefaultBackgroundImage.jpg'

  /* =^..^=  ✿  =^..^=  */
  export function App() {
    return (
      <NavigationController
        initialRoute="/Home"
        routes={navigationRoutes}
        backgrounds={navigationBackgrounds}
        // backgroundColor="black"
        // backgroundImage={DefaultBackgroundImage}
      />
    )
  }
  ```

</details>

<details>
  <summary>Example `Home.tsx`</summary>

  ```
  // Import the `useNavigation` hook from wherever you generated it earlier.
  import { useNavigation } from 'your_path_to/Your_Navigation_File'

  export function Home() {
      type PayloadType = { data: [] }
      const { navigate, to, bg, back, navigator } = useNavigation()
      
      const onPress = () => {
          navigate<PayloadType>(
            to['/A'], 
            { 
              background: bg['one'],
              payload: { data: [] 
            }
          })

          // navigate( back )
          // console.log( navigator.peek() )
      }

      return (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Pressable onPress={onPress}>
              <Text>{'Navigate'}</Text>
            </Pressable>
          </View>
      )
  }
  ```

</details>

## API

<details>
  <summary>NavigationControllerProps</summary>

  ```
  /**
   * Type representing the props for the `NavigationController` component.
   */
  export interface NavigationControllerProps<
    R extends string | number | symbol,
    B,
  > {

    /**
     * Provide the `navigationRoutes` object generated by `getTypedRoutes`.
     */
    routes: Record<R, ComponentType>

    /**
     * The initial route to show. This will also be the 
     * target route when using the `reset` function.
     */
    initialRoute: R

    /**
     * Default background color.
     */
    backgroundColor?: ViewStyle['backgroundColor']

    /**
     * Default background image.
     */
    backgroundImage?: ImageSourcePropType

    /**
     * Provide the `navigationBackgrounds` object generated by `getTypedBackgrounds`.
     */
    backgrounds?: B

    /**
     * If `true`, will error if the controller component ever unmounts.
     * It probably shouldn't ever unmount if it's meant to be at the top level.
     * But you can also use the controlelr to encapsulate sub navigators and routes.
     */
    topLevelController?: boolean

  }
  ```

  </details>

  <details>
  <summary>UseNavigationReturnType</summary>

  ```
  /**
   * Type representing the values returned by the `useNavigation` hook.
   */
  export type UseNavigationReturnType<
    R extends string | number | symbol,
    B extends string | number | symbol,
  > = {
    /**
     * Navigates to the given route with event options and animated transitions.
     */
    navigate: NavigateFn<R>

    /**
     * Object exposing typed route keys for navigation.
     */
    to: Record<R, R>

    /**
     * Object exposing typed background keys for navigation.
     */
    bg: Record<B, B>

    /**
     * Use as the navigation route target when navigating back in the history stack.
     */
    back: BackToken

    /**
     * Object holding utility methods for the navigator.
     */
    navigator: {
      /**
       * Return a frozen copy of the current state.
       * This is just for looking.
       * @example
       * import { useNavigation } from './Navigation'
       * const { navigator } = useNavigation()
       * console.log( navigator.peek() )
       */
      peek: () => NavigationState

      /**
       * Reset the navigator. Animates navigation back to the
       * `initialRoute`. A background can be provided as a param.
       * @example
       * import { useNavigation } from './Navigation'
       * const { navigator, bg } = useNavigation()
       * navigator.reset(bg.reset)
       */
      reset: (background?: string) => void

      /**
       * If no param is provided, retrieve the payload for the current route.
       * If an index is provided, retrieve the relevant payload from the
       * navigation history stack.
       * @example
       * import { useNavigation } from './Navigation'
       * const { navigator } = useNavigation()
       * console.log( navigator.payload() )
       * console.log( navigator.payload(1) ) // only if there is history to check
       */
      payload: <T extends GenericObj>(n?: number) => T | null

      /**
       * If no param is provided, retrieve the name for the current route.
       * If an index is provided, retrieve the relevant route name from the
       * navigation history stack.
       * @example
       * import { useNavigation } from 'your_path_to/Your_Navigation_File'
       * const { navigator } = useNavigation()
       * console.log( navigator.route() )
       * console.log( navigator.route(1) ) // only if there is history to check
       */
      route: (index?: number) => string | null

      /**
       * !!! You probably don't want to use this. But it's here just in case. !!!
       * Set the navigation state directly.
       * @example
       * import { useNavigation, type NavigationState } from '@justkd/rn-navigator'
       * const { navigator } = useNavigation()
       * const nextState: NavigationState = {
       *   queue: [{ to: '/Home' }],
       *   history: []
       * }
       * console.log( navigator.set( nextState ) )
       */
      set: (next: Partial<NavigationState>) => void
    }
  }

  ```
  
  </details>

  <details>
  <summary>Other Types</summary>

  ```
  /**
   * Used to ensure the user generated route keys type does not include
   * the internal back token. The back token is still accepted by
   * the navigate fn, and the route keys will be strongly typed.
   */
  export type GetTypedRouteKeys<T> = Omit<T, InternalBackTokenType>

  /**
   * Represents a background object when defining navigation backgrounds.
   */
  export type NavigationBackground = {
    color?: ViewStyle['backgroundColor']
    image?: {
      source: ImageSourcePropType
      resizeMode?: ImageBackgroundProps['resizeMode']
      style?: ImageBackgroundProps['style']
    }
  }

  /**
   * Type representing the values stored in the navigation queue and history.
   */
  export type NavigationEvent = {
    to: string
    payload?: Record<string, any>
    background?: string
  }

  /**
   * Type representing the internal navigation state.
   */
  export type NavigationState = {
    queue: NavigationEvent[]
    history: NavigationEvent[]
    isNavigating:
      | null
      | 'fwd'
      | 'back'
      | 'error'
    background?: string
  }
  ```
  
  </details>

  <details>
  <summary>Setup Functions</summary>

  ```
  /**
   * Uses the values returned from the other getters and returns
   * a strongly typed object holding all navigation routes.
   */
  export const getTypedRoutes = <T extends Record<any, any>>(
    routes: T,
  ) => { navigationRoutes: T }

  /**
   * Ensures the background key helper is strongly typed.
   */
  export const getTypedBackgrounds = <T extends Record<any, any>>(
    backgrounds: T,
  ) => {
    navigationBackgroundKeys: Record<keyof T, keyof T>,
    navigationBackgrounds: T,
  }

  /**
   * Adds the internal back token to the user route keys.
   * The back token won't be included in the exposed type,
   * but the navigate fn will still accept it from the `back`
   * helper returned by `useNavigation`. The route keys will
   * also be strongly typed.
   */
  export const getTypedRouteKeys = <T extends readonly string[]>(
    arr: T,
  ) => { 
    navigationRouteKeys: Record<
      T[number],
      T[number]
    > & InternalBackTokenType
  }

  /**
   * Returns a function component representing the `NavigationController`
   * and a `useNavigation` hook specific to that controller.
   */
  export function getNavigationController<
    R,
    B = any,
  >(): { 

    useNavigation: UseNavigationReturnType<
      keyof R, 
      keyof B
    >,
    
    NavigationController: (
      props: NavigationControllerProps<
        Exclude<keyof R, InternalBackTokenType>, 
        BackgroundGeneric
      >
    ): JSX.Element
  }
  ```
  
  </details>
