import React, {Component} from 'react'
import axios from 'axios'

class Appointment extends Component{
    constructor(props){
        super(props)
        this.state ={
            summary: '',
            notes: '',
            total: '',
            editToggle: false,
            modalToggle: false
        }
    }
    
    componentDidMount(){
        let {summary, notes, total} = this.props
        if(summary === null) summary = ''
        if(notes === null) notes = ''
        if(total === null) total = 0
        this.setState({summary, notes, total})
    }

    handleEditToggle = () => {
        this.setState({editToggle: !this.state.editToggle})
    }

    handleModalToggle = () => {
        this.setState({modalToggle: !this.state.modalToggle})
    }

    saveUpdatedAppt = () => {
        let {summary, notes, total} = this.state
        axios.put(`/api/appt/${this.props.apptId}`, {summary, notes, total})
            .then(() => this.handleEditToggle())
    }

    render(){
        let {date, time, username} = this.props //also on props: apptId, slotId, userId
        let {summary, notes, total, editToggle, modalToggle} = this.state
        console.log(this.state)
        return(
            // <button>
                <div >  
                    <div className='appointmentWrapper' onClick={this.handleModalToggle}>   
                        <p>Date: {date}</p>
                        <p>Time: {time}</p>
                        {editToggle ?
                            <div>
                                <p>Summary: </p>
                                <input type="text" 
                                    value={summary} 
                                    onChange={e => this.setState({summary: e.target.value})}/>
                                <p>Notes: </p>
                                <input type="text"
                                    value={notes}
                                    onChange={e => this.setState({notes: e.target.value})}/>
                                {/* <button onClick={this.saveUpdatedAppt}>Save</button> */}
                            </div>
                            :
                            <div>
                                <p>Summary: {summary}</p>
                                <p>Notes: {notes}</p>
                                {/* <button onClick={this.handleEditToggle}>Edit</button> */}
                            </div>
                        }
                    </div>
                    {modalToggle ?
                        <div className='appointmentModalWrapper'>
                            <div className='appointmentModal'>
                                <h2>Appointment For {username}</h2>
                                <h3>{date} at {time}</h3>
                                {editToggle ?
                                <div>
                                    <h4>Appointment Summary</h4>
                                    <input value={summary} 
                                        onChange={e => this.setState({summary: e.target.value})}
                                        type='text'/>
                                    <h4>Additional Notes</h4>
                                    <input value={notes} 
                                        onChange={e => this.setState({notes: e.target.value})}
                                        type='text'/>
                                    <h4>Total Cost: $</h4>
                                    <input value={total} 
                                        onChange={e => this.setState({total: e.target.value})}
                                        type='text'/>
                                    <button onClick={this.handleEditToggle}>Cancel</button>
                                    <button onClick={this.saveUpdatedAppt}>Save Changes</button>
                                </div>  
                                :
                                <div>
                                    <h4>Appointment Summary</h4>
                                    <p>{summary}</p>
                                    <h4>Additional Notes</h4>
                                    <p>{notes}</p>
                                    <h4>Total Cost: ${total}</h4>
                                    <button onClick={this.handleModalToggle}>Back</button>
                                    <button onClick={this.handleEditToggle}>Edit</button>
                                </div>
                                }
                            </div>
                        </div>
                    :
                        null
                    }
                </div>
            // </button>
        )
    }
}

export default Appointment