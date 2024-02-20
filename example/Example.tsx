import { NavigationController } from './Navigation.Controller'
import { Routes } from './Navigation.Routes'
import PlaceholderImage from './placeholder_image.png'

export function Example() {
  console.log('render Example')
  return (
    <NavigationController
      routes={Routes}
      initialRoute="/Home"
      backgroundColor="black"
      // backgroundImage={PlaceholderImage}
    />
  )
}
