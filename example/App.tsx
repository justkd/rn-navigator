import { View } from 'react-native'

import {
  NavigationController,
  navigationRoutes,
  navigationBackgrounds,
} from './Navigation'
// import DefaultBackgroundImage from './Navigation/assets/1.jpg'

export function App() {
  return (
    <NavigationController
      topLevelController
      initialRoute="/Home"
      backgroundColor="black"
      routes={navigationRoutes}
      backgrounds={navigationBackgrounds}
      // backgroundImage={DefaultBackgroundImage}
    >
      <View
        style={{
          backgroundColor: 'red',
          position: 'absolute',
          height: 50,
          width: 50,
        }}
      />
    </NavigationController>
  )
}
