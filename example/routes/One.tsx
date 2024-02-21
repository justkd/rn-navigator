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

export function One() {
  const label = '/One'
  const { navigate, to } = useNavigation()
  const bg = navigationBackgroundKeys
  useEffect(() => {
    console.log('mount one')
    return () => {
      console.log('dismount one')
    }
  }, [])
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigate(to['/One/A'], {
            background: bg.red,
          })
        }}
      >
        <Text style={styles.text}>{label}</Text>
      </Pressable>
    </View>
  )
}
