import { getNavigationController } from './Navigation.Controller'
import { Routes } from './Navigation.routes'
import SuperCat from './supercat.jpg'
import { navigationBackgrounds } from './Navigation.backgrounds'

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
