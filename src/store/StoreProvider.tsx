import React, { useReducer } from "react"
import { AppContext } from "./AppContext"
import { State, Dispatcher, reducer, initialState } from "./HomeReducer"

export const StoreProvider = ({ children }) => {
  const [state, updateState]: [State, (value: Dispatcher) => void] = useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={{
      appState: state,
      appReducer: updateState
    }}>
      {children}
    </AppContext.Provider>
  )
}