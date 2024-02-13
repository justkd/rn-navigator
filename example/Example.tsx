import { NavigationController } from './Navigation.Controller'
import { Routes } from './Navigation.Routes'

export function Example() {
  // const useNCP = NavigationContextProvider
  // const { NavigationProvider } = useNCP(Routes, '/Home')
  console.log('render Example')
  return <NavigationController routes={Routes} />
}

// import { Routes } from './Navigation.Routes'
// import { NavigationContextProvider } from './Navigation.Context'

// export function Example() {
//   // const useNCP = NavigationContextProvider
//   // const { NavigationProvider } = useNCP(Routes, '/Home')
//   console.log('render Example')
//   return (
//     <NavigationContextProvider
//       routes={Routes}
//       initialRoute="/Home"
//     />
//   )
// }
