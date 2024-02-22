import {
  NavigationController,
  navigationRoutes,
  navigationBackgrounds,
} from './Navigation'
// import SuperCat from './supercat.jpg'

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
