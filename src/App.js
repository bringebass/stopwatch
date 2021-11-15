import React, { useReducer, useEffect, useRef } from 'react'

//this is a stopwatch
// its built with the react hook useEffect and others
// hey ho captain jack
// take me back to the railroad track

function reducer(state, action) {
  if (action.type === 'run') {
    return { ...state, isRunning: true }
  }
  if (action.type === 'stop') {
    return { ...state, isRunning: false }
  }
  if (action.type === 'tick') {
    return { ...state, time: state.time + 1 }
  }
  if (action.type === 'reset') {
    return { time: 0 }
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { isRunning: false, time: 0 })
  const idRef = useRef(0)

  useEffect(() => {
    if (!state.isRunning) {
      return
    } else if (state.isRunning) {
      idRef.current = setInterval(() => {
        dispatch({ type: 'tick' })
      }, 1000)
    }
    return () => {
      clearInterval(idRef.current)
    }
  }, [state.isRunning])

  return (
    <React.Fragment>
      <div className='main-container'>
        <div className='container'>
          <button onClick={() => dispatch({ type: 'run' })}>Run</button>
          <button onClick={() => dispatch({ type: 'stop' })}>Stop</button>
          <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
          <h1>{state.time}</h1>
        </div>
      </div>
    </React.Fragment>
  )
}

export default App
