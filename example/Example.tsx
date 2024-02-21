import { NavigationController } from './Navigation'
import { navigationRoutes } from './Navigation.routes'
import { navigationBackgrounds } from './Navigation.backgrounds'
import SuperCat from './supercat.jpg'

export function Example() {
  console.log('render Example')
  return (
    <NavigationController
      routes={navigationRoutes}
      initialRoute="/Home"
      backgroundColor="black"
      backgroundImage={SuperCat}
      backgrounds={navigationBackgrounds}
    />
  )
}
