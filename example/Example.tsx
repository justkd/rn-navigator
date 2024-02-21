import { NavigationController } from './Navigation'
import { navigationRoutes } from './Navigation.routes'
import { navigationBackgrounds } from './Navigation.backgrounds'
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
