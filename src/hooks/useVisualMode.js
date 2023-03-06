import { useState } from 'react';



//sets initial mode prop return an object with a mode property
const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transition to  new mode
  const transition = (newMode, replace = false) => {
    
    setMode(newMode)
    if (replace) {
      setHistory((prev) => {
        const newHistory = [...prev]
        newHistory[prev.length - 1] = newMode
        return newHistory
      })
    } else {
      setHistory((prev) => {
        return [...prev, newMode]
      })
    }
  }


  // to go back to previous mode
  const back = () => {

    setHistory((prev) => {
      let newHistory = [...prev];
      if (newHistory.length > 1) {
        newHistory.pop()
        const lastMode = newHistory[newHistory.length-1]
        setMode(lastMode)
      }
      return newHistory;
    });
  }

  return { mode, transition, back }
}

export default useVisualMode;
