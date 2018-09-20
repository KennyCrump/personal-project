import React from 'react'

export default function TimeSlot(props){
    return(
        <div>
            date: {props.date} 
            time: {props.time}
            {props.apptId ? 
            <p>{`Appointment: ${props.apptId}`}</p>
            : 
            null
            }
            <hr/>
        </div>
    )
}