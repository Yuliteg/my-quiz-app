import React, { createContext, useState, useContext } from 'react'

export const stateContext = createContext()

const getContext = () => {
  return {
    participantId: 0,
    timeTaken: 0,
    selectedOptions: []
  }
}

export const useStateContext = () => {
  const { context, setContext } = useContext(stateContext);
  return {
    context,
    setContext: (obj) => {
      setContext({ ...context, ...obj });
    }
  };
};

const ContextProvider = ({ children }) => {
  const [context, setContext] = useState(getContext())

  return (
    <stateContext.Provider value={{context, setContext}}>
      {children}
    </stateContext.Provider>
  )
}

export default ContextProvider
