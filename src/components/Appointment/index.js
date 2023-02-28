import React from 'react'
import './style.scss'
import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import useVisualMode from 'hooks/useVisualMode'
import Form from './Form'
import Status from './Status'
import Confirm from './Confirm'

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = 'CREATE';
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = 'CONFIRM';
  const EDIT = 'EDIT';


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    console.log('name interview', name,interview)
    transition(SAVING)

    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const edit = (name, interviewer) => {
    transition(EDIT)
  }

  
  function remove() {

    if (mode === CONFIRM) {

      transition(DELETING)

      props.cancelInterview(props.id)
        .then(() => {
          transition(EMPTY)
        })

        .catch((err) => {
          console.log(err)
        })
    } else {
      transition(CONFIRM);
    }
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onCancel={back}
          onDelete={remove}
          onEdit={edit}
        />
      )}
      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM &&
        <Confirm
          onCancel={back}
          onConfirm={remove}
          message="Are you sure you would like to delete?"
        />}
        {mode === EDIT &&
        <Form 
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      }
    </article>
  );
}