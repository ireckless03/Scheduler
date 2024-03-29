import React, { useEffect, setState, useState } from "react";
import axios from "axios";


export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  //updates available spots for given day
  const spotUpdate = (weekday, day, variable, id, appointments) => {
    let spot = day.spots;
    if (weekday ===
      day.name
      && variable === "REMOVE_SPOTS" && appointments[id].interview !== null) {
      return spot
    }
    if (weekday ===
      day.name
      && variable === "REMOVE_SPOT" && appointments[id].interview === null) {
      return spot - 1;
    }
    if (weekday ===
      day.name
      && variable === "ADD_SPOT" && appointments[id].interview !== null) {
      return spot + 1;
    }
    return spot;

  };

  // updates the number of spots available all week
  const updateSpots = (weekday, days, variable, id, appointments) => {
    if (variable === "REMOVE_SPOT") {
      const updatedStateDayArray =
        days.map
          (day => {
            return {
              ...day,
              spots: spotUpdate(weekday, day, variable, id, appointments)
            };
          });
      return updatedStateDayArray;
    }
    if (variable === "ADD_SPOT") {
      const updatedStateDayArray =
        days.map
          (day => {
            return {
              ...day,
              spots: spotUpdate(weekday, day, variable, id, appointments)
            };
          });
      return updatedStateDayArray;
    }
  };


  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)])
      .then(response => {
        setState(prevState =>
        ({
          ...prevState,
          days: response[0].data,
          appointments: response[1].data,
          interviewers: response[2].data
        }));
      })
  }, [])

  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const spotUpdate = updateSpots(state.day, state.days, "REMOVE_SPOT", id, state.appointments);
        setState({
          ...state,
          days: spotUpdate,
          appointments
        });
      });
  }

  function cancelInterview(id, interview) {

    return axios
      .delete(`/api/appointments/${id}`, interview)
      .then(() => {
        const spotUpdate = updateSpots(state.day, state.days, "ADD_SPOT", id, state.appointments);
        setState({
          ...state,
          days: spotUpdate,
        });
      });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }
}

