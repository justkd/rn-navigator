import { Home } from './routes/Home'

export function Example() {
  return <Home />
}

/*
  - simple consumer api
  - handles status bar, safe area (including footer)
  - animates between routes/scenes/views
  - focus on development benefits
  - obsolescence

  // const { navigate, to, back, navigating } = useNavigation()
  // navigate(to['/Home'])
  // navigate(back())
*/
