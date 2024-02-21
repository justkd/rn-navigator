import { getNavigationController } from '../src'
import { navigationBackgrounds } from './Navigation.backgrounds'
import { routeKeys } from './Navigation.routeKeys'

export const { NavigationController, useNavigation } =
  getNavigationController<
    typeof routeKeys,
    typeof navigationBackgrounds
  >()
