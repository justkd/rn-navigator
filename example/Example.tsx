import { Routes } from './Navigation.Routes'
import { useNavigationContextProvider } from './Navigation.Context'

export function Example() {
  const useNCP = useNavigationContextProvider
  const { NavigationProvider } = useNCP(Routes, '/Home')
  console.log('render Example')
  return <NavigationProvider />
}
