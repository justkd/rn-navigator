import { StyleSheet, View, Text, Pressable } from 'react-native'
import { useEffect, useMemo, useState } from 'react'
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
    fontSize: 30,
    paddingVertical: '10%',
  },
})

export function Template(props: {
  label: string
  index: number
}) {
  const numExtraRoutes = 1
  const { label, index } = props
  const { navigate, to, bg, back } = useNavigation()
  const [test, setTest] = useState('')
  useEffect(() => {
    console.log(`mount ${label}`)
    return () => {
      console.log(`dismount ${label}`)
    }
  }, [label])
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
          navigate(next.route, {
            background: next.background,
          })
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
          setTest('tested')
        }}
      >
        <Text style={styles.text}>{test || 'test'}</Text>
      </Pressable>
    </View>
  )
}
