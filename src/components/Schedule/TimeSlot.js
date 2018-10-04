import React, {Component} from 'react'
import moment from 'moment'

import AddAppt from './AddAppt'

class TimeSlot extends Component{
    constructor(props){
        super(props)
        this.state={
            slotInfo: '',
            modalToggle: false
        }
    }

    componentDidMount(){
        let {time, date, apptId, user} = this.props
        let timeSlot = `${date} ${time}`
        console.log('time format', timeSlot)
        this.setState({slotInfo: apptId})
        if(user.admin !== 'admin'){
            if(moment().isAfter(moment(timeSlot, 'MM/DD/YY h:mm A'))){
                this.setState({slotInfo: 'Past'})
            }
        }
    }

    updateModalToggle = () => {
        this.setState({
            modalToggle: !this.state.modalToggle
        })
    }

    updateSlotInfo = (apptSummary) => {
        this.setState({slotInfo: apptSummary.appt_id}, () => {
            if(this.props.updateHomeToggle){
                console.log('appt update: ', this.state.slotInfo)
                this.props.updateHomeToggle()
            }
        } )
    }

    render(){
        let {date} = this.props
        console.log('slot state', date)
        return(
            <div>
                {this.props.user.admin === 'admin' ? 
                    <div className='slotView'> 
                        <p>{this.props.time}</p>
                        {this.state.slotInfo ? 
                        <p>{`Appointment: ${this.state.slotInfo}`}</p>
                        : 
                        <button onClick={this.updateModalToggle}>+</button>
                        }
                        {this.state.modalToggle ?
                        <div className="addApptModalWrapper">
                            <AddAppt 
                                updateModalToggle={this.updateModalToggle}
                                slotId={this.props.slotId}
                                updateSlotInfo={this.updateSlotInfo}
                                user={this.props.user}
                                date={this.props.date} 
                                time={this.props.time}
                            />
                        </div>
                        :
                        null
                        }
                        <hr/>
                    </div>
                    :
                    this.state.slotInfo ?
                        <div className='blocked clientSlotView'>
                            <h4>{this.props.time}</h4>
                        </div>
                        :
                        <div>
                            <div onClick={this.updateModalToggle} className='open clientSlotView'>
                                <h4>{this.props.time}</h4>
                            </div>
                                {this.state.modalToggle ?
                                    <div className="addApptModalWrapper">
                                        <AddAppt 
                                            updateModalToggle={this.updateModalToggle}
                                            slotId={this.props.slotId}
                                            updateSlotInfo={this.updateSlotInfo}
                                            user={this.props.user}   
                                            date={this.props.date} 
                                            time={this.props.time}
                                        />
                                    </div>
                                    :
                                    null
                                }
                        </div>
                    
                }
            </div>
        )
    }
}

export default TimeSlot