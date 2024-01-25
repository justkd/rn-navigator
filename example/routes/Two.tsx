import { StyleSheet, View, Text } from 'react-native'

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
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </View>
  )
}
