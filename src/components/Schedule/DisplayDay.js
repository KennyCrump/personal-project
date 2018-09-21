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
        let date = encodeURI(this.props.date)
        axios.get(`/api/time/day?date=${date}`).then(res => {
            this.setState({
                timeSlots: res.data
            })
        })
    }
    componentDidUpdate(prevProps){
        console.log('Prev Props: ', prevProps.state)
        // if(this.props.date !== prevProps.date){
        //     this.props.match.history.push()
        // }
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