import { getNavigationController } from '../../src'
import { navigationBackgrounds } from './Navigation.backgrounds'
import { navigationRouteKeys } from './Navigation.keys'
/* ******************** */
export const { NavigationController, useNavigation } =
  getNavigationController<
    typeof navigationRouteKeys,
    typeof navigationBackgrounds
  >() || {}
