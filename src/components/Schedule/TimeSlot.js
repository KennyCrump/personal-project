import React from 'react'

export default function TimeSlot(props){
    return(
        <div className='slotView'> 
            <p>{props.time}</p>
            {props.apptId ? 
            <p>{`Appointment: ${props.apptId}`}</p>
            : 
            null
            }
            <hr/>
        </div>
    )
}