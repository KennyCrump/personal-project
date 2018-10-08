import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'
import './Profile.css'
import {connect} from 'react-redux'

import Appointment from './Appointment'

class Profile extends Component{
    constructor(props){
        super(props)
        this.state ={
            user_name: '',
            picture: '',
            email: '',
            user_id: '',
            userAppts: []
        }
    }

    componentDidMount(){
        if(this.props.user.admin === 'admin' && !this.props.userSearch){
            axios.get(`/api/user/${this.props.match.params.id}`)
                .then(user => {
                    console.log(user)
                    let userInfo = user.data[0]     //single object for pulling user Info
                    let userAppts = user.data       //Array of all appts
                    this.setState({
                        user_name: userInfo.user_name,
                        picture: userInfo.picture,
                        email: userInfo.email,
                        user_id: userInfo.user_id,
                        userAppts: userAppts})
                })
        }else if(this.props.user.admin === 'admin' && this.props.userSearch){
            axios.get(`/api/user/${this.props.selectedUser.user_id}`)
                .then(user => {
                    console.log(user)
                    let userInfo = user.data[0]     //single object for pulling user Info
                    let userAppts = user.data       //Array of all appts
                    this.setState({
                        user_name: userInfo.user_name,
                        picture: userInfo.picture,
                        email: userInfo.email,
                        user_id: userInfo.user_id,
                        userAppts: userAppts})
                })
        }else{
            axios.get(`/api/user/${this.props.user.user_id}`)
                .then(user => {
                    console.log(user)
                    let userInfo = user.data[0]     //single object for pulling user Info
                    let userAppts = user.data       //Array of all appts
                    this.setState({
                        user_name: userInfo.user_name,
                        picture: userInfo.picture,
                        email: userInfo.email,
                        user_id: userInfo.user_id,
                        userAppts: userAppts})
                })
        }
    }
    componentDidUpdate(prevProps){
        if(prevProps.selectedUser !== this.props.selectedUser){
            if(this.props.user.admin === 'admin' && this.props.userSearch){
                axios.get(`/api/user/${this.props.selectedUser.user_id}`)
                    .then(user => {
                        console.log(user)
                        let userInfo = user.data[0]     //single object for pulling user Info
                        let userAppts = user.data       //Array of all appts
                        this.setState({
                            user_name: userInfo.user_name,
                            picture: userInfo.picture,
                            email: userInfo.email,
                            user_id: userInfo.user_id,
                            userAppts: userAppts})
                    })
            }
        }
    }
    deleteAppt = (appt_id) =>{
        let indexOfApptToDelete = this.state.userAppts.findIndex(appt => appt.appt_id === appt_id)
        let newApptsArr = this.state.userAppts.slice('')
        newApptsArr.splice(indexOfApptToDelete, 1)
        this.setState({userAppts: newApptsArr})
    }

    render(){
        console.log('Profile state: ', this.state)
        let {user_name, picture, email, userAppts} = this.state
        let today = moment()
        let upcomingAppts = userAppts.filter(appt => moment(today).isBefore(moment(appt.date, 'MM/DD/YY')) || moment(today).isSame(moment(appt.date, 'MM/DD/YY')))
        let upcomingApptsList = upcomingAppts.reverse().map(appt => {
            return <Appointment 
                        key={appt.appt_id}
                        admin={this.props.user.admin}
                        upcoming={true}
                        apptId={appt.appt_id}
                        slotId={appt.slot_id}  
                        summary={appt.summary}
                        date={appt.date}
                        time={appt.time_formatted}
                        notes={appt.notes}
                        username={appt.user_name}
                        userId={appt.user_id}
                        total={appt.total}
                        deleteAppt={this.deleteAppt}
                        />
        })
        let pastAppts = userAppts.filter(appt => moment(today).isAfter(moment(appt.date, 'MM/DD/YY')))
        let pastApptsList = pastAppts.map(appt => {
            return <Appointment 
                        key={appt.appt_id}
                        admin={this.props.user.admin}
                        upcoming={false}
                        apptId={appt.appt_id}
                        slotId={appt.slot_id}  
                        summary={appt.summary}
                        date={appt.date}
                        time={appt.time_formatted}
                        notes={appt.notes}
                        username={appt.user_name}
                        userId={appt.user_id}
                        total={appt.total}
                        />
        })
        return(
            <div className='profilePage'>
                <div>
                    <img className='profilePagePicture' src={picture} alt="profile_picture"/>
                    <p>{user_name}</p>  
                    <p>{email}</p>
                </div>
                <div className='profileApptsList'>
                    <h4>Upcoming Appointments</h4>
                    <div className='appointmentsList'>
                        {upcomingApptsList}
                    </div>
                    <h4>Past Appointments</h4>
                    <div className='pastAppointmentsList'>
                        {pastApptsList}
                    </div>
                </div>

            </div>
        )
    }
}
function mapFromStoreToProps({user}){
    return {
        user
    }
}

export default connect(mapFromStoreToProps,{})(Profile)