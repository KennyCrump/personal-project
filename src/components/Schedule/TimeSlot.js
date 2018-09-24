import React, {Component} from 'react'

import AddAppt from './AddAppt'

class TimeSlot extends Component{
    constructor(props){
        super(props)
        this.state={
            modalToggle: false
        }
    }

    updateModalToggle = () => {
        this.setState({
            modalToggle: !this.state.modalToggle
        })
    }

    render(){
        return(
            <div className='slotView'> 
                <p>{this.props.time}</p>
                {this.props.apptId ? 
                <p>{`Appointment: ${this.props.apptId}`}</p>
                : 
                <button onClick={this.updateModalToggle}>+</button>
                }
                <hr/>
            </div>
        )
    }
}

export default TimeSlot