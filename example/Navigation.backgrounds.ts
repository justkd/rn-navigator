import { getTypedBackgrounds } from '../src'
import ImageOne from './1.jpg'
import ImageTwo from './2.jpg'
import ImageThree from './3.jpg'
import ImageFour from './4.jpg'
import ImageFive from './5.jpg'

const backgrounds = {
  one: { image: { source: ImageOne } },
  two: { image: { source: ImageTwo } },
  three: { image: { source: ImageThree } },
  four: { image: { source: ImageFour } },
  five: { image: { source: ImageFive } },
  red: { color: 'red' },
  blue: { color: 'blue' },
}

export const { navigationBackgrounds } =
  getTypedBackgrounds(backgrounds)
