import { useMemo } from 'react'
import {
  View,
  ImageBackground,
  type ViewStyle,
} from 'react-native'
import { navDirTokens } from '../Navigation.tokens'
import { type NavigationState } from '../Navigation.types'

export function Backgrounds<BackgroundGeneric = any>(props: {
  state: NavigationState
  backgroundImageStyle: ViewStyle
  backgrounds: BackgroundGeneric
}) {
  const { backgroundImageStyle, backgrounds, state } = props
  const outerOpac = useMemo(() => {
    const { error } = navDirTokens
    const { isNavigating } = state
    return Number(isNavigating !== error)
  }, [state])
  return (
    <View
      pointerEvents="none"
      style={[backgroundImageStyle, { opacity: outerOpac }]}
    >
      {/* Pre-render background images and hide ones that aren't needed. */}
      {Object.entries(backgrounds || {}).map(([k, v]: any) => {
        const { color = 'rgba(0,0,0,0)', image } = v
        const { style, resizeMode, source } = image || {}
        const { opacity, ...otherStyles } = style || {}
        const innerOpac = Number(state?.background === k)
        const localStyle = {
          backgroundColor: color,
          opacity: innerOpac,
        }
        const styles = [
          backgroundImageStyle,
          localStyle,
          otherStyles,
        ]
        return (
          <ImageBackground
            key={k}
            style={styles}
            resizeMode={resizeMode || 'cover'}
            source={source ?? {}}
          />
        )
      })}
    </View>
  )
}
