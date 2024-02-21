import { getNavigationController } from '../src'
import { navigationBackgrounds } from './Navigation.backgrounds'
import { navigationRouteKeys } from './Navigation.routeKeys'

export const { NavigationController, useNavigation } =
  getNavigationController<
    typeof navigationRouteKeys,
    typeof navigationBackgrounds
  >()
