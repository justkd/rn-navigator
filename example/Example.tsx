import {
  NavigationController,
  navigationRoutes,
  navigationBackgrounds,
} from './Navigation'
// import ImageSix from './assets/6.jpg'

export function Example() {
  console.log('render Example')
  return (
    <NavigationController
      initialRoute="/Home"
      backgroundColor="cyan"
      routes={navigationRoutes}
      backgrounds={navigationBackgrounds}
      // backgroundImage={SuperCat}
    />
  )
}
