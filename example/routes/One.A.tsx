import { useEffect } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useNavigation } from '../Navigation.Controller'
import { navigationBackgroundKeys } from '../Navigation.backgrounds'

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
  const { navigate, to } = useNavigation()
  const bg = navigationBackgroundKeys
  useEffect(() => {
    console.log('mount one/a')
    return () => {
      console.log('dismount one/a')
    }
  }, [])
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigate(to['/Two'], {
            background: bg.two,
          })
        }}
      >
        <Text style={styles.text}>{label}</Text>
      </Pressable>
    </View>
  )
}
