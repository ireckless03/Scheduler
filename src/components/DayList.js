import React from "react";
import DayListItem from "./DayListItem";

function DayList(props) {
  
 const days = props.days.map(day => {
  return (
    <DayListItem
      key={day.id} 
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.value}
      setDay={props.onChange}
      {...day}
    />
  );
});


  return <ul>{days}</ul>;
};
export default DayList;