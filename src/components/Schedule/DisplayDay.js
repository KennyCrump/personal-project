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

        if(this.props.updateToggle !== prevProps.updateToggle){
            let date = encodeURI(this.props.date)
            axios.get(`/api/time/day?date=${date}`).then(res => {
                this.setState({
                    timeSlots: res.data
                 })
        })
        }
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
            <div className='dayView'>
            <h4>{this.props.date}</h4>
                {slotList}
            </div>
        )
    }
}

export default DisplayDay