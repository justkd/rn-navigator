import type {
  NavigationState,
  NavigationEvent,
} from './Navigation.types'

export function navigationReducer(
  state: NavigationState,
  action: {
    type: string
    payload?: string | NavigationEvent
  },
) {
  switch (action.type) {
    case 'init': {
      return {
        ...state,
        queue: [{ to: action.payload as string }],
      }
    }
    case 'navigate': {
      const event =
        action?.payload && typeof action?.payload !== 'string'
          ? action?.payload
          : null
      return event
        ? {
            ...state,
            queue: [...state.queue, event],
            payload: event.payload ?? null,
          }
        : state
    }
    case 'setBackground': {
      return {
        ...state,
        background: (action.payload as any)?.background ?? {},
      }
    }
    case 'shift': {
      const queue = [...state.queue]
      queue.shift()
      return {
        ...state,
        queue,
      }
    }
    default: {
      throw Error(`Unknown action: ${action.type}`)
    }
  }
}
