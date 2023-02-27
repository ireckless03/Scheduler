export function getAppointmentsForDay(state, day) {
  let appointments = [];

  state.days.map(dayObj => {
    if (dayObj.name === day) {
      dayObj.appointments.forEach(apptId => appointments.push(state.appointments[apptId]));
    }
  });

  return appointments;
}


export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerInfo = state.interviewers[interview.interviewer];

  return {
    student: interview.student,
    interviewer: interviewerInfo
  }
}

