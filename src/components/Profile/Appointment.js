import React, {Component} from 'react'
import dotenv from 'dotenv'
import axios from 'axios'
import {connect} from 'react-redux'

class Appointment extends Component{
    constructor(props){
        super(props)
        this.state ={
            summary: '',
            notes: '',
            total: '',
            editToggle: false,
            modalToggle: false,
            deleteToggle: false
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
    handleDeleteToggle = () => {
        this.setState({deleteToggle: !this.state.deleteToggle})
    }

    saveUpdatedAppt = () => {
        let {summary, notes, total} = this.state
        axios.put(`/api/appt/${this.props.apptId}`, {summary, notes, total})
            .then(() => this.handleEditToggle())
    }

    cancelAppt = () => {
        if(this.props.upcoming){
            axios.delete(`/api/appt/${this.props.apptId}`).then(res => {
                this.props.deleteAppt(this.props.apptId)
            })
        }
    }

    rescheduleAppt = () => {
        const {REACT_APP_HOME} = process.env
        this.cancelAppt()
        window.location = (`${REACT_APP_HOME}/#/schedule`)
    }

    render(){
        let {date, time, username, picture} = this.props //also on props: apptId, slotId, userId
        let {summary, notes, total, editToggle, modalToggle, deleteToggle} = this.state
        console.log('appt total: ', this.state.total)
        return(
            <div>  
                <div className='appointmentWrapper' onClick={this.handleModalToggle}>   
                    {picture ? 
                        <div>
                            <img id='miniProfilePic' src={picture} alt=""/>
                            <h4>{username}</h4>
                        </div>
                        :
                        <p>Date: {date}</p>
                    }
                    <p>Time: {time}</p>
                        <div>
                            <p>Summary: {summary}</p>
                            {/* <p>Notes: {notes}</p> */}
                        </div>
                </div>
                {modalToggle ?
                    <div className='appointmentModalWrapper'>
                        <div className='appointmentModal'>
                            <h2>Appointment For {username}</h2>
                            <p className='apptDateText'>Date: {date}</p>
                            <p className='apptDateText'>Time: {time}</p>
                            {editToggle ?
                            <div className='apptModalContent'>
                                <div className='summaryBox'>
                                    <h4>Appointment Summary:</h4>
                                    <textarea placeholder='Please include a brief description of the reason for this appointment'
                                        onChange={e => this.setState({summary: e.target.value})} 
                                        rows="6" cols="89" 
                                    />
                                </div>
                                <div className='notesBox'>
                                    <h4>Additional Notes:</h4>
                                    <textarea placeholder='Any additional notes about the appointment'
                                        onChange={e => this.setState({notes: e.target.value})} 
                                        rows="10" cols="89" />

                                </div>
                                    <h4>Total Cost: $</h4>
                                <input value={total} 
                                    onChange={e => this.setState({total: e.target.value})}
                                    type='text'/>
                                <button onClick={this.handleEditToggle}>Cancel</button>
                                <button onClick={this.saveUpdatedAppt}>Save Changes</button>
                            </div>  
                            :
                            <div className='apptModalContent'>
                                <div className='summaryBox'>
                                    <h4>Appointment Summary</h4>
                                    <div className='summaryDiv'>
                                        <p className='detailsText'>{summary}</p>
                                    </div>
                                </div>
                                <div className='notesBox'>
                                    <h4>Additional Notes</h4>
                                    <div className='notesDiv'>

                                    </div>
                                    <p className='detailsText'>{notes}</p>
                                </div>
                                <h4>Total Cost: ${total}</h4>
                                <button onClick={this.handleModalToggle}>Back</button>
                                {this.props.admin === 'admin' ? 
                                    <button onClick={this.handleEditToggle}>Edit</button>
                                :
                                    null
                                }
                                {this.props.upcoming ? 
                                    <button onClick={this.handleDeleteToggle}>Cancel or Reschedule Appointment</button>
                                :
                                    this.state.total !== 0 ?
                                        <button>Make a Payment</button>
                                    :
                                    null
                                }
                            </div>
                            }
                        </div>
                    </div>
                :
                    null
                }
                {deleteToggle ? 
                <div className='deleteModalWrapper'>
                    <div className='deleteModal'>
                        <h4>{`You are about to cancel your appointment for`}</h4>
                        <h4>{`${time} on ${date}`}</h4>
                        <h4>Are you sure?</h4>
                        <button onClick={this.handleDeleteToggle}>No</button>
                        <button onClick={this.cancelAppt}>Yes</button>
                        <button onClick={this.rescheduleAppt}>Yes, and Reschedule</button>
                    </div>
                </div>
                :
                null
                }
            </div>
        )
    }
}
function moveFromStateToProps({user}){
    return {user}
}
export default connect(moveFromStateToProps, {})(Appointment)