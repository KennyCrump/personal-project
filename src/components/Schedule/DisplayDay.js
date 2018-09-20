import React, {Component} from 'react'
import axios from 'axios'

import TimeSlot from './TimeSlot'

class DisplayDay extends Component{
    constructor(props){
        super(props)
        this.state={
            timeSlots: []
        } 
    }

    componentDidMount(){
        let date = encodeURI('09/24/18')
        axios.get(`/api/time/day?date=${date}`).then(res => {
            this.setState({
                timeSlots: res.data
            })
        })
    }


    render(){
        let slotList = this.state.timeSlots.map(slot => {
            return <TimeSlot 
                    key={slot.slot_id}
                    slotId={slot.slot_id}
                    date={slot.date}
                    time={slot.time_formatted}
                    blocked={slot.blocked}
                    apptId={slot.appt_id}
                    taskId={slot.task_id}
                    />
        })
        return(
            <div>
                {slotList}
            </div>
        )
    }
}

export default DisplayDay