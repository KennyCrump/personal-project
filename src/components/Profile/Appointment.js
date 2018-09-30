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
        let {date, time, } = this.props //also on props: apptId, slotId, username, userId
        let {summary, notes, editToggle} = this.state //also on state: total
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
                                <button onClick={this.saveUpdatedAppt}>Save</button>
                            </div>
                            :
                            <div>
                                <p>Summary: {summary}</p>
                                <p>Notes: {notes}</p>
                                <button onClick={this.handleEditToggle}>Edit</button>
                            </div>
                        }
                    </div>
                   
                </div>
            // </button>
        )
    }
}

export default Appointment