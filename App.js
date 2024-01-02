import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { Example } from './example/Example'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
})

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Example />
    </SafeAreaView>
  )
}
