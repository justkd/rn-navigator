import {
  NavigationController,
  navigationRoutes,
  navigationBackgrounds,
} from './Navigation'
// import DefaultBackgroundImage from './Navigation/assets/1.jpg'

export function App() {
  return (
    <NavigationController
      initialRoute="/Home"
      backgroundColor="black"
      routes={navigationRoutes}
      backgrounds={navigationBackgrounds}
      // backgroundImage={DefaultBackgroundImage}
    />
  )
}
