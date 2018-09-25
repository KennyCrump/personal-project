import React, {Component} from 'react'

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
        this.setState({slotInfo: this.props.apptId})
    }

    updateModalToggle = () => {
        this.setState({
            modalToggle: !this.state.modalToggle
        })
    }

    updateSlotInfo = (apptSummary) => {
        this.setState({slotInfo: apptSummary.appt_id})
    }

    render(){
        console.log('slot state', this.state)
        return(
            <div className='slotView'> 
                <p>{this.props.time}</p>
                {this.state.slotInfo ? 
                <p>{`Appointment: ${this.state.slotInfo}`}</p>
                : 
                <button onClick={this.updateModalToggle}>+</button>
                }
                {this.state.modalToggle ?
                <div className="addApptModal">
                    <AddAppt 
                        updateModalToggle={this.updateModalToggle}
                        slotId={this.props.slotId}
                        updateSlotInfo={this.updateSlotInfo}
                    />
                </div>
                :
                null
                }
                <hr/>
            </div>
        )
    }
}

export default TimeSlot