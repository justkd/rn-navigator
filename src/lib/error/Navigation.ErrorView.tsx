import { View, Text, useWindowDimensions } from 'react-native'

export function NavigationErrorView() {
  const { width } = useWindowDimensions()
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <Text
        style={{
          fontSize: width / 15,
          fontWeight: 'bold',
        }}
      >
        ☹
      </Text>
    </View>
  )
}
