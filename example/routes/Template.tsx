import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useMemo, useState } from 'react'
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
    fontSize: 20,
  },
})

export function Template(props: {
  label: string
  index: number
}) {
  const numExtraRoutes = 1
  const { label, index } = props
  const { navigate, to, bg, back, get } = useNavigation()
  const [test, setTest] = useState('')
  const next = useMemo(
    () => ({
      route: (() => {
        const keys = Object.keys(to)
        const length = keys.length - numExtraRoutes
        const k = keys[(index + 1) % length]
        return (to as any)[k]
      })(),
      background: (() => {
        const keys = Object.keys(bg)
        const length = keys.length - numExtraRoutes
        const k = keys[index % length]
        return (bg as any)[k]
      })(),
    }),
    [to, bg, index],
  )
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          const { route, background } = next
          const payload = {
            lastLabel: label,
            rand: Math.random(),
            test: () => console.log(`test func${label}`),
          }
          navigate(route, { background, payload })
        }}
      >
        <Text style={styles.text}>{label}</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigate(back, {
            background: (() => {
              const bgs = [bg.black, bg.blue, bg.cyan]
              const i = Math.floor(Math.random() * 100) % 3
              return bgs[i]
            })(),
          })
        }}
      >
        <Text style={styles.text}>back</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          setTest('ready')
        }}
      >
        <Text style={styles.text}>
          {test || 'test dismounting view state'}
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          const payload = get.payload()
          console.log(payload)
          payload?.test()
        }}
      >
        <Text style={styles.text}>log payload</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          const payload = get.payload(1)
          console.log(payload)
          payload?.test()
        }}
      >
        <Text style={styles.text}>log previous payload</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          const payload = get.payload(2)
          console.log(payload)
          payload?.test()
        }}
      >
        <Text style={styles.text}>
          log previous previous payload
        </Text>
      </Pressable>
    </View>
  )
}
