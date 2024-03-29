import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from 'components/DayList'
import 'components/Appointment';
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  

  const dailyAppointments = getAppointmentsForDay(state, state.day)
  
  const dailyInterviewers = getInterviewersForDay(state, state.day)


  const schedule = dailyAppointments.map(appointments => {

    const interview = getInterview(state, appointments.interview);

    return (
      <Appointment
        key={appointments.id}
        {...appointments}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}

      />
    )
  })


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


