import React, {Component} from 'react'
import axios from 'axios'
import moment from 'moment'

import TimeSlot from './TimeSlot'

class DisplayDay extends Component{
    constructor(props){
        super(props)
        this.state={
            timeSlots: [],
            apptAddedToggle: false
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
        console.log('propstate', prevProps)
        if(this.props.updateToggle !== prevProps.updateToggle || this.props.date !== prevProps.date){
            let date = encodeURI(this.props.date)
            axios.get(`/api/time/day?date=${date}`).then(res => {
                this.setState({
                    timeSlots: res.data
                 })
            })
        }

    }

    updateApptAddedToggle = () => {
        this.setState({apptAddedToggle: !this.state.apptAddedToggle})
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
            apptAddedToggle={this.state.apptAddedToggle}
            updateApptAddedToggle={this.updateApptAddedToggle}
        />
                
        })
        return(
            <div className='dayView'>
            <h3>{this.props.date}</h3>
            <h4>{moment(this.props.date, 'MM/DD/YY').format('dddd')}</h4>
                {slotList}
            </div>
        )
    }
}

export default DisplayDay