import { Routes } from './Navigation.Routes'
import { useNavigationContextProvider } from './Navigation.Context'

export function Example() {
  const { NavigationProvider } = useNavigationContextProvider(
    Routes,
    '/Home',
  )
  return <NavigationProvider />
}
