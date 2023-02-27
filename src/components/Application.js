import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from 'components/DayList'
import 'components/Appointment';
import Appointment from "components/Appointment";
import {getInterview}  from "helpers/selectors";
import {getAppointmentsForDay}  from "helpers/selectors";
import useVisualMode from "hooks/useVisualMode";

export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });

  const setDay = day => setState({ ...state, day });

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  

  const appointment = dailyAppointments.map(appointments => {
    console.log('state',state)
    const interview = getInterview(state, appointments.interview);
    

    return (
      <Appointment
        key={appointments.id}
        {...appointments}
        interview={interview}
        interviewers={[]}
      />
    )
  })

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
        {appointment}
        <Appointment key="last" time="5pm"
        />
      </section>
    </main>
  );
}
