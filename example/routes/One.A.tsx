import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useNavigationContext } from '../Navigation.Context'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cyan',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
  },
})

export function OneA() {
  const label = '/One/A'
  const { navigate, to } = useNavigationContext()
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigate(to['/Two'])
        }}
      >
        <Text style={styles.text}>{label}</Text>
      </Pressable>
    </View>
  )
}
