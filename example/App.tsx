import {
  NavigationController,
  navigationRoutes,
  navigationBackgrounds,
} from './Navigation'
// import DefaultBackgroundImage from './assets/DefaultBackgroundImage.jpg'

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
