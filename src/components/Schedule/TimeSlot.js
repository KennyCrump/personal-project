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
        let {time, date, apptId, user, admin, username} = this.props
        let timeSlot = `${date} ${time}`
        console.log('time format', timeSlot)
        
        if(admin === 'admin'){
            this.setState({slotInfo: username})
        }
        else if(user.admin !== 'admin'){
            if(moment().isAfter(moment(timeSlot, 'MM/DD/YY h:mm A'))){
                this.setState({slotInfo: 'Past'})
            }else{
                this.setState({slotInfo: apptId})
            }
        }
    }

    updateModalToggle = () => {
        this.setState({
            modalToggle: !this.state.modalToggle
        })
    }

    updateSlotInfo = (apptSummary) => {
        this.setState({slotInfo: apptSummary.user_name}, () => {
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
                    <div> 
                        {this.state.slotInfo ? 
                            <div className='blocked adminSlotView'>
                                <p className='slotTimeText'>{this.props.time}</p>
                                <p className='apptInfoText'>{`${this.state.slotInfo}`}</p>
                            </div>
                        : 
                        <div onClick={this.updateModalToggle} className='open adminSlotView'>
                            <p className='slotTimeText'>{this.props.time}</p>
                            {/* <button onClick={this.updateModalToggle}>+</button> */}
                        </div>
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
                    </div>
                    :
                    this.state.slotInfo ?
                        <div className='blocked clientSlotView'>
                            <p className='blockedText'>{this.props.time}</p>
                        </div>
                        :
                        <div>
                            <div onClick={this.updateModalToggle} className='open clientSlotView'>
                                <p>{this.props.time}</p>
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