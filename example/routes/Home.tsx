import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '../Navigation.Controller'
// import { useNavigationContext } from '../Navigation.Context'

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
  const { navigate, to } = useNavigation()
  console.log('render Home')
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigate(to['/One'])
          console.log('pressed')
        }}
      >
        <Text style={styles.text}>{label}</Text>
      </Pressable>
    </View>
  )
}
