import { createContext, useReducer } from 'react'
import { Dispatcher, initialState, reducer, State } from './HomeReducer'



const appContext = createContext({
  appState: initialState,
  appReducer: (action: Dispatcher) => {}
})

export {
  appContext as AppContext
}