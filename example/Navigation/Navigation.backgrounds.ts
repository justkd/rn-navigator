import { getTypedBackgrounds } from '../../src'
/* ******************** */
import ImageOne from './assets/1.jpg'
import ImageTwo from './assets/2.jpg'
import ImageThree from './assets/3.jpg'
import ImageFour from './assets/4.jpg'
import ImageFive from './assets/5.jpg'
import ImageSix from './assets/6.jpg'
/* ******************** */
const backgrounds = {
  one: { image: { source: ImageOne } },
  two: { image: { source: ImageTwo } },
  three: {
    image: { source: ImageThree },
  },
  four: {
    image: { source: ImageFour },
  },
  five: { image: { source: ImageFive } },
  six: { image: { source: ImageSix } },
  black: { color: 'black' },
  blue: { color: 'blue' },
  cyan: { color: 'cyan' },
}
/* ******************** */
export const {
  navigationBackgrounds,
  navigationBackgroundKeys,
} = getTypedBackgrounds(backgrounds)
