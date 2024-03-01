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
  currentRoute: NavigationRouteKey
  previousLabel: string
  dangerLevel: number
  readSign: () => void
}

export function Template(props: {
  label: string
  index: number
}) {
  const numExtraRoutes = 1
  const { label, index } = props
  const { navigate, to, bg, back, navigator } = useNavigation()
  const [test, setTest] = useState('')
  const next = useMemo(
    () => ({
      route: (() => {
        const keys = Object.keys(to)
        const length = keys.length - numExtraRoutes
        const k = keys[(index + 1) % length]
        return (to as any)[k]
      })(),
      ahead: (() => {
        const keys = Object.keys(to)
        const length = keys.length - numExtraRoutes
        const k = keys[(index + 2) % length]
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
            const { route, background, ahead } = next
            const payload = {
              currentRoute: route,
              previousLabel: label,
              dangerLevel: Math.random(),
              readSign: () => {
                const d =
                  'You pass a sign pointing ahead of you.'
                console.log(d)
                console.log(`Next Route: ${ahead}`)
              },
            }
            navigate<PayloadType>(route, { background, payload })
          }}
        >
          <Text style={styles.text}>next</Text>
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
          <Text style={styles.text}>back</Text>
        </Pressable>
      </View>
    </View>
  )
}
