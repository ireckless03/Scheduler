import React from "react";
import classNames from "classnames";
import 'components/InterviewerListItem.scss'

/// props 
// id:nu mber - the id of the interviewer
// name:string - name of interviewer
// avatar:url - url to image of interviewer

export default function InterviewerListItem(props) {
  
  let interviewerStyles = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  })

  let imageStyles = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": props.selected,
  })

  return (
    <li
      className={interviewerStyles}
      onClick={props.setInterviewer}
    >
      <img
        className={imageStyles}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}


