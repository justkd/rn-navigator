// import {
//   type PropsWithChildren,
//   type ComponentType,
//   type FC,
//   createContext,
//   useMemo,
//   useCallback,
//   useContext,
// } from 'react'

// import { type Logistics, Ship } from './Ship'

// class Expedition extends Ship {
//   constructor(logistics?: Logistics) {
//     super()
//     this.kit(logistics)
//     this.embark()
//   }

//   static theater: ComponentType<FC> = () => <></>
// }

// function Navigator(logistics?: Logistics) {
//   const expedition = new Expedition(logistics)
//   return expedition
// }

// /* ************************* */
// /* ************************* */
// /* ************************* */

// const NavigationContext = createContext<Expedition | null>(null)

// export const useNavigation = () => useContext(NavigationContext)

// export const useNavigationContextProvider = (
//   logistics?: Logistics,
// ) => {
//   const Navigation = useMemo(
//     () => Navigator(logistics),
//     [logistics],
//   )

//   return useCallback(
//     ({ children }: PropsWithChildren) => (
//       <NavigationContext.Provider value={Navigation}>
//         {children}
//       </NavigationContext.Provider>
//     ),
//     [Navigation],
//   ) as ComponentType<FC>
// }

// /*
// const { NavigationProvider }
// <NavigationProvider>

// </NavigationProvider>

// */
