import React, { useContext, useEffect } from 'react'
import useStateContext, { stateContext } from '../hooks/useStateContext'

const Quiz = () => {
  const { context, setContext } = useStateContext();

  return (
    <div>
      Question
    </div>
  )
}

export default Quiz
