import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useEffect } from 'react'
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

export function Home() {
  const label = '/Home'
  const { navigate, to, bg } = useNavigation()
  useEffect(() => {
    console.log('mount home')
    return () => {
      console.log('dismount home')
    }
  }, [])
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigate(to['/One'], {
            background: bg.one,
          })
        }}
      >
        <Text style={styles.text}>{label}</Text>
      </Pressable>
    </View>
  )
}
