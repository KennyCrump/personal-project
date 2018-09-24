import React, {Component} from 'react'
import axios from 'axios'

class AddAppt extends Component{
    constructor(props){
        super(props)
        this.state = {
            user_id: '',
            summary: ''
        }
    }

    addAppt = () => {
        let {user_id, summary} = this.state;
        let {slotId: slot_id} = this.props;
        axios.post('/api/appt/add', {user_id, summary, slot_id})
            .then(res => {
                this.props.modalToggle()
            })
    }

    render(){
        return(
            <div>
                enter user ID: 
                <input type="text" 
                    onChange={e => this.setState({user_id: e.target.value})}/>
                Appointment Summary: 
                <input type="text"
                    onChange={e => this.setState({summary: e.target.value})}/>
                <button onClick={this.addAppt}>Add Appointment</button>
                <button onClick={() => this.props.modalToggle()}>Cancel</button>
            </div>
        )
    }
}