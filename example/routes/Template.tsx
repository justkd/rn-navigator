/* eslint-disable no-console */
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
    marginBottom: '2%',
    textAlign: 'center',
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28,
  },
  section: {
    marginBottom: '3%',
  },
})

type PayloadType = {
  location: NavigationRouteKey
  name: string
  danger: number
  readSign: () => string
}

export function Template(props: {
  label: string
  index: number
}) {
  const numExtraRoutes = 1
  const { label, index } = props
  const { navigate, to, bg, back, get, peek } = useNavigation()
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
      <View style={styles.section}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.section}>
        <Pressable
          onPress={() => {
            const { route, background } = next
            const payload = {
              location: route,
              name: label,
              danger: Math.random(),
              readSign: () => {
                const top = `Route: ${route}`
                const bot = `Location: ${label}`
                return `${top} | ${bot}`
              },
            }
            navigate<PayloadType>(route, { background, payload })
          }}
        >
          <Text style={styles.text}>explore</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigate(back, {
              background: (() => {
                const bgs = Object.keys(bg)
                const r = Math.random() * 100
                const i = Math.floor(r) % bgs.length
                return bgs[i]
              })(),
            })
          }}
        >
          <Text style={styles.text}>retreat</Text>
        </Pressable>
      </View>
      <View style={styles.section}>
        <Pressable
          onPress={() => {
            setTest('* you are glowing with a protective aura *')
          }}
        >
          <Text style={styles.text}>
            {test || 'cast protection'}
          </Text>
        </Pressable>
      </View>
      <View style={styles.section}>
        <Pressable
          onPress={() => {
            try {
              // This is not guarded.
              type ExpectedPayloadType = PayloadType
              const payload = get.payload<ExpectedPayloadType>()
              console.log(payload)
            } catch (e) {
              console.log(e)
            }
          }}
        >
          <Text style={styles.text}>check condition</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            // This is not guarded.
            type ExpectedPayloadType = PayloadType
            const payload = get.payload<ExpectedPayloadType>(1)
            console.log(payload)
          }}
        >
          <Text style={styles.text}>previous condition</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            // This is not guarded.
            type ExpectedPayloadType = PayloadType
            const payload = get.payload<ExpectedPayloadType>(2)
            console.log(payload)
          }}
        >
          <Text style={styles.text}>
            previous previous condition
          </Text>
        </Pressable>
      </View>
      <Pressable
        onPress={() => {
          // This is not guarded.
          type ExpectedPayloadType = PayloadType
          const payload = get.payload<ExpectedPayloadType>()
          console.log('You pass a sign pointing behind you.')
          console.log(payload?.readSign())
        }}
      >
        <Text style={styles.text}>read sign</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          console.log(peek())
        }}
      >
        <Text style={styles.text}>journal</Text>
      </Pressable>
    </View>
  )
}
