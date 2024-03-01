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
    />
  )
}
