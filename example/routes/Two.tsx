import { useEffect } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useNavigation } from '../Navigation'

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

export function Two() {
  const label = '/Two'
  const { navigate, to, bg } = useNavigation()
  useEffect(() => {
    console.log('mount two')
    return () => {
      console.log('dismount two')
    }
  }, [])
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigate(to['/Two/A'], { background: bg.blue })
        }}
      >
        <Text style={styles.text}>{label}</Text>
      </Pressable>
    </View>
  )
}
