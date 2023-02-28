import { useState } from 'react';



//sets initial mode prop return an object with a mode property
const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // transition to  new mode
  const transition = (newMode, replace = false) => {
    
    setMode((prev) => newMode)
    
    setHistory((prev) => {
      let newHistory = [...history]
      if (replace) {
        newHistory.pop()
      }
      return [...newHistory, newMode]
    })
  }


  // to go back to previous mode
  const back = () => {

    setHistory((prev) => {
      let newHistory = [...prev];
      if (newHistory.length > 1) {
        newHistory.pop()
        setMode((history) => newHistory[(newHistory.length - 1)]);
      }
      return newHistory;
    });
  }


  return { mode, transition, back }
}

export default useVisualMode;
