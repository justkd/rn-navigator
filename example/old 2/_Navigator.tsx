// import {
//   useMemo,
//   useState,
//   useReducer,
//   useContext,
//   createContext,
//   useCallback,
//   ComponentType,
//   PropsWithChildren,
//   FC,
// } from 'react'
// import { View, Text } from 'react-native'

// const routes = {
//   one: (
//     <View
//       style={{ justifyContent: 'center', alignItems: 'center' }}
//     >
//       <Text>ONE</Text>
//     </View>
//   ),
//   two: (
//     <View
//       style={{ justifyContent: 'center', alignItems: 'center' }}
//     >
//       <Text>TWO</Text>
//     </View>
//   ),
// }

// const initialState = {
//   current: '',
//   next: '',
// }

// // action = {
// //     type: 'navigate',
// //     to: ''
// // }

// // function navigationReducer(navigation, action) {
// //   switch (action.type) {
// //     case 'navigate': {
// //       return {
// //         ...navigation,
// //         next: routes[action.to],
// //       }
// //     }
// //     // case 'changed': {
// //     //   return tasks.map((t) => {
// //     //     if (t.id === action.task.id) {
// //     //       return action.task
// //     //     }
// //     //     return t
// //     //   })
// //     // }
// //     // case 'deleted': {
// //     //   return tasks.filter((t) => t.id !== action.id)
// //     // }
// //     default: {
// //       throw Error(`Unknown action: ${action.type}`)
// //     }
// //   }
// // }

// const useNavigation = () => {
//   const [navigation, dispatch] = useReducer(
//     navigationReducer,
//     initialState,
//   )

//   const navigate = useCallback((to: string) => {
//     dispatch({ to })
//   }, [])

//   const get = useCallback(() => navigation, [navigation])

//   return {
//     navigate,
//     get,
//   }
// }

// // export function Navigator() {
// //   const [current, setCurrent] = useState('one')
// //   const [next, setNext] = useState('')

// //   return <View>{routes[current]}</View>
// // }

// /* ************************* */
// /* ************************* */
// /* ************************* */

// const getNavigationReducer = (routes, initialRoute) => {
//   const initialState = {
//     current: initialRoute,
//     next: '',
//   }
//   return function navigationReducer(navigation, action) {
//     switch (action.type) {
//       case 'navigate': {
//         return {
//           ...navigation,
//           next: routes[action.to],
//         }
//       }
//       // case 'changed': {
//       //   return tasks.map((t) => {
//       //     if (t.id === action.task.id) {
//       //       return action.task
//       //     }
//       //     return t
//       //   })
//       // }
//       // case 'deleted': {
//       //   return tasks.filter((t) => t.id !== action.id)
//       // }
//       default: {
//         throw Error(`Unknown action: ${action.type}`)
//       }
//     }
//   }
// }

// const NavigationContext = createContext<ReturnType<
//   typeof getNavigationReducer
// > | null>(null)

// export const useNavigationContext = () =>
//   useContext(NavigationContext)

// export const useNavigationContextProvider = (
//   routes,
//   initialRoute,
// ) =>
//   useCallback(
//     ({ children }: PropsWithChildren) => (
//       <NavigationContext.Provider
//         value={getNavigationReducer(routes, initialRoute)}
//       >
//         {children}
//       </NavigationContext.Provider>
//     ),
//     [],
//   )
