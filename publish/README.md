# @justkd/rn-navigator

Each route is just a route key you assign to a given component. These should each be top level components for the route.

## Setup

There are a few steps to set up `rn-navigator` in your project. It doesn't matter what you name the following files or how you organize them.

- (required) Navigation.keys.ts

```
// Import the relevant getters and types.

import { getTypedRouteKeys, type GetTypedRouteKeys } from '@justkd/rn-navigator'

// All route keys will need to be declared here first. 
// Also, it's important to cast the object type `as const`. 

const routeKeys = [
    '/Home', 
    '/A', 
    '/B', 
    '/C', 
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

- (required) Navigation.routes.ts

```
// Import the relevant getters and types.

import { type ComponentType } from 'react'
import { type NavigationRouteKey } from './Navigation.keys'
import { getTypedRoutes } from '@justkd/rn-navigator'

// Import the relevant top level components to represent each route.

import { Home } from './routes/Home'
import { A } from './routes/A'
import { B } from './routes/B'
import { C } from './routes/C'
import { Last } from './routes/Last'

// Enforce record type and map route keys to route components.

const routes: Record<NavigationRouteKey, ComponentType> = {
  '/Home': Home,
  '/A': A,
  '/B': B,
  '/C': C,
  '/Last': Last,
}

// Export the returned, deconstructed value `navigationRoutes`.

export const { navigationRoutes } =
  getTypedRoutes<typeof routes>(routes)
```

- (optional) Navigation.backgrounds.ts
    - Backgrounds are optional. A default color and/or image can be declared as a controller prop.

```
// Import the relevant getters and types.

import { getTypedBackgrounds, type NavigationBackground } from '@justkd/rn-navigator'

// Import image assets that you want to use as backgrounds during animated transitions.

import ImageOne from './assets/1.jpg'
import ImageTwo from './assets/2.jpg'
import ImageThree from './assets/3.jpg'
import ImageFour from './assets/4.jpg'
import ImageFive from './assets/5.jpg'
import ImageSix from './assets/6.jpg'

// Enforce record type and map transition backgrounds to background keys.
// The keys are arbitrary.

const backgrounds: Record<string, NavigationBackground> = {
  one: { image: { source: ImageOne } },
  two: { image: { source: ImageTwo } },
  three: { image: { source: ImageThree } },
  four: { image: { source: ImageFour } },
  five: { image: { source: ImageFive } },
  six: {
    color: 'purple',
    image: {
      resizeMode: 'contain',
      source: ImageSix,
      style: { marginLeft: '5%' },
    },
  },
  black: { color: 'black' },
  blue: { color: 'blue' },
  cyan: { color: 'cyan' },
}

// Export the returned, deconstructed values 
// `navigationBackgrounds` and `navigationBackgroundKeys`.

export const {
  navigationBackgrounds,
  navigationBackgroundKeys,
} = getTypedBackgrounds(backgrounds)
```

- (required) Navigation.ts

```
// Import the relevant getters and types.

import { getNavigationController } from '@justkd/rn-navigator'
import { navigationBackgrounds } from './Navigation.backgrounds'
import { navigationRouteKeys } from './Navigation.keys'

// Export the returned, deconstructed values 
// `NavigationController` and `useNavigation`.

export const { NavigationController, useNavigation } =
  getNavigationController<
    typeof navigationRouteKeys,
    typeof navigationBackgrounds
  >()
```

## Use

- Example `App.tsx`

```
import {
  NavigationController,
  navigationRoutes,
  navigationBackgrounds,
} from './Navigation'
import DefaultBackgroundImage from './assets/DefaultBackgroundImage.jpg'

export function App() {
  return (
    <NavigationController
      initialRoute="/Home"
      backgroundColor="black"
      backgroundImage={DefaultBackgroundImage}
      routes={navigationRoutes}
      backgrounds={navigationBackgrounds}
    />
  )
}
```

- Example `Home.tsx`

```
export function Home() {
    const { navigate, to, bg, back, get, peek } = useNavigation()
    
    const onPress = () => {
        navigate(to['/A'], { background: bg['one'] })

        /*
        type PayloadType = {
            data: any
        }

        const payload: PayloadType = {
            data: { stuff: [] }
        }

        const background = bg['one']

        navigate<PayloadType>(route, { background, payload })
        */
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