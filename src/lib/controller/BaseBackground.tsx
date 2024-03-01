import {
  ImageBackground,
  type ImageSourcePropType,
  type ViewStyle,
} from 'react-native'

export function BaseBackground(props: {
  backgroundImageStyle: ViewStyle
  backgroundColor?: ViewStyle['backgroundColor']
  backgroundImage?: ImageSourcePropType
}) {
  const {
    backgroundImageStyle,
    backgroundColor = 'rgba(0,0,0,0)',
    backgroundImage,
  } = props
  /* Base background. */
  return (
    <ImageBackground
      style={[backgroundImageStyle, { backgroundColor }]}
      source={backgroundImage ?? {}}
      resizeMode="cover"
    />
  )
}
