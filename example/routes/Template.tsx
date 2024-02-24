import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useMemo, useState } from 'react'
import {
  type NavigationRouteKey,
  useNavigation,
} from '../Navigation'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
})

type PayloadType = {
  route: NavigationRouteKey
  label: string
  rand: number
  getTestString: () => string
}

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
            route,
            label,
            rand: Math.random(),
            getTestString: () => `test func : ${route} ${label}`,
          }
          navigate<PayloadType>(route, { background, payload })
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
          try {
            // This is not guarded.
            type ExpectedPayloadType = PayloadType
            const payload = get.payload<ExpectedPayloadType>()
            console.log(payload, payload?.getTestString())
          } catch (e) {
            console.log(e)
          }
        }}
      >
        <Text style={styles.text}>log payload</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          const payload = get.payload(1)
          console.log(payload, payload?.getTestString())
        }}
      >
        <Text style={styles.text}>log previous payload</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          const payload = get.payload(2)
          console.log(payload, payload?.getTestString())
        }}
      >
        <Text style={styles.text}>
          log previous previous payload
        </Text>
      </Pressable>
    </View>
  )
}
