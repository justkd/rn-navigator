import { getNavigationController } from './Navigation.Controller'
import { Routes } from './Navigation.routes'
import { navigationBackgrounds } from './Navigation.backgrounds'
import SuperCat from './supercat.jpg'

export function Example() {
  console.log('render Example')
  const NavigationController =
    getNavigationController<typeof navigationBackgrounds>()
  return (
    <NavigationController
      routes={Routes}
      initialRoute="/Home"
      backgroundColor="black"
      backgroundImage={SuperCat}
      backgrounds={navigationBackgrounds}
    />
  )
}
