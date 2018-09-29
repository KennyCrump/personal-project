import React, { Component } from 'react'
import axios from 'axios'
import './Profile.css'

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
    }

    render(){
        console.log('Profile state: ', this.state)
        let {user_name, picture, email, user_id, userAppts} = this.state
        let apptList = userAppts.map(appt => {
            return <Appointment 
                        key={appt.appt_id}
                        apptId={appt.apptId}
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
            <div>profile page
                <div>User Info:
                    <img src={picture} alt="profile_picture"/>
                    <p>{user_name}</p>  
                    <p>{email}</p>
                </div>
                <div>
                    {apptList}
                </div>

            </div>
        )
    }
}

export default Profile