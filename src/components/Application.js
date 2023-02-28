import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from 'components/DayList'
import 'components/Appointment';
import Appointment from "components/Appointment";
import {getInterview}  from "helpers/selectors";
import {getAppointmentsForDay, getInterviewersForDay}  from "helpers/selectors";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Appointment/Form";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });
  
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

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  const dailyInterviewers = getInterviewersForDay(state, state.day)
  
  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({ ...state, appointments });
    });
  }

  const schedule = dailyAppointments.map(appointments => {
 
    const interview = getInterview(state, appointments.interview);
 
    return (
      <Appointment
        key={appointments.id}
        {...appointments}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
      />
    )
  })

  
  console.log('state.interviewers',state.interviewers)


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm"
        />
      </section>
    </main>
  );
}


