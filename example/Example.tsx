import { View } from 'react-native'
import { Routes } from './Navigation.Routes'
import { useNavigationContextProvider } from './Navigation'

export function Example() {
  const NavigationProvider =
    useNavigationContextProvider('/Home')
  return <View />
}
