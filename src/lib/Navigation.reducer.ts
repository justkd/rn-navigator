import { backToken, navDirTokens } from './Navigation.tokens'
import {
  type NavigationState,
  type NavigationEvent,
  type DispatchAction,
} from './Navigation.types'

export function navigationReducer(
  state: NavigationState,
  action: DispatchAction
) {
  switch (action.type) {
    /* =^..^=  ✿  =^..^=  */
    case 'init': {
      return {
        ...state,
        queue: [{ to: action.event as string }],
      }
    }
    /* =^..^=  ✿  =^..^=  */
    case 'set': {
      const next = action.event as Partial<NavigationState>
      return {
        ...state,
        ...next,
      }
    }
    /* =^..^=  ✿  =^..^=  */
    case 'clear': {
      return {
        queue: [] as NavigationState['queue'],
        history: [] as NavigationState['history'],
        isNavigating: null,
        background: undefined,
      }
    }
    /* =^..^=  ✿  =^..^=  */
    case 'navigate': {
      const event =
        action?.event && typeof action?.event !== 'string'
          ? (action?.event as NavigationEvent)
          : null
      const background =
        typeof action.event !== 'string' &&
        typeof action.event !== 'boolean'
          ? action.event?.background
          : undefined
      const whichBackType = state.history.length
        ? navDirTokens.back
        : navDirTokens.error
      const isNavigating =
        typeof event !== 'boolean'
          ? event?.to === backToken
            ? whichBackType
            : navDirTokens.fwd
          : null
      return event
        ? {
            ...state,
            background,
            isNavigating,
            queue: [...state.queue, event],
          }
        : state
    }
    /* =^..^=  ✿  =^..^=  */
    case 'end_navigation_animation': {
      return {
        ...state,
        isNavigating: null,
      }
    }
    /* =^..^=  ✿  =^..^=  */
    case 'go_back_in_history': {
      if (!state.history.length) {
        const queue = [...state.queue]
        queue.pop()
        return {
          ...state,
          queue,
          isNavigating: null,
        }
      }
      const history = [...state.history]
      const prev = history.pop()
      const queue: NavigationEvent[] = prev
        ? [prev]
        : [...state.queue]
      return {
        ...state,
        queue,
        history,
      }
    }
    /* =^..^=  ✿  =^..^=  */
    case 'go_forward_in_history': {
      const queue = [...state.queue]
      const event = [queue.shift()] as NavigationEvent[]
      const history = event.length
        ? [...state.history, ...event]
        : [...state.history]
      return {
        ...state,
        queue,
        history,
      }
    }
    /* =^..^=  ✿  =^..^=  */
    default: {
      throw Error(
        `rn-navigator : unknown navigation action : ${action.type}`
      )
    }
    /* =^..^=  ✿  =^..^=  */
  }
}
