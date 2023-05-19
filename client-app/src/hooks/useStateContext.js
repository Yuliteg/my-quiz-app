import React, { createContext, useState, useContext, useEffect } from 'react'

export const stateContext = createContext()

const getContext = () => {
  if (localStorage.getItem('context') === null) {
    localStorage.setItem('context', JSON.stringify({
      participantId: 0,
      timeTaken: 0,
      selectedOptions: []
    }))
  }
  return JSON.parse(localStorage.getItem('context'))
}

export const useStateContext = () => {
  const { context, setContext } = useContext(stateContext);
  return {
    context,
    setContext: (obj) => {
      setContext({ ...context, ...obj })
    },
    resetContext: () => {
      localStorage.removeItem('context')
      setContext(getContext())
    }
  };
};

const ContextProvider = ({ children }) => {
  const [context, setContext] = useState(getContext())

  useEffect(() => {
    localStorage.setItem('context', JSON.stringify(context))
  }, [context])

  return (
    <stateContext.Provider value={{ context, setContext }}>
      {children}
    </stateContext.Provider>
  )
}

export default ContextProvider
