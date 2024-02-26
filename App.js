import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { App } from './example/App'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
})

export default function ExampleApp() {
  return (
    <SafeAreaView style={styles.container}>
      <App />
    </SafeAreaView>
  )
}
