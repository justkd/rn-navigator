import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  paragraph: {
    margin: 8,
    fontSize: 16,
    textAlign: 'center',
  },
  h1: {
    margin: 28,
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  h2: {
    margin: 16,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export function Example() {
  return (
    <>
      <Text style={styles.h1}>Hello CodeSandbox</Text>
      <Text style={styles.h2}>
        Start editing to see some magic happen, even on your
        mobile device!
      </Text>
      <br />
      <br />
      <Text style={styles.paragraph}>
        Open Expo on your mobile device with scanning the QR code
        in the application log under the start tab.
      </Text>
    </>
  )
}
