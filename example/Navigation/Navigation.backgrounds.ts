import { getTypedBackgrounds } from '../../src'
/* ******************** */
import ImageOne from './assets/1.jpg'
import ImageTwo from './assets/2.jpg'
import ImageThree from './assets/3.jpg'
import ImageFour from './assets/4.jpg'
import ImageFive from './assets/5.jpg'
/* ******************** */

const backgrounds = {
  one: { image: { source: ImageOne } },
  two: { image: { source: ImageTwo } },
  three: { image: { source: ImageThree } },
  four: { image: { source: ImageFour } },
  five: { image: { source: ImageFive } },
  red: { color: 'red' },
  blue: { color: 'blue' },
}

export const {
  navigationBackgrounds,
  navigationBackgroundKeys,
} = getTypedBackgrounds(backgrounds)
