import React, {Component} from 'react'
import moment from 'moment'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './AdminHome.css'

import DisplayDay from '../Schedule/DisplayDay'
import DisplayUser from '../Users/DisplayUser'
import Appointment from '../Profile/Appointment'

class AdminHome extends Component{
    constructor(props){
        super(props)
        this.state={
            date: moment().format('MM/DD/YY'),
            usersByDate: [],
            apptsByDate: [],
            updateToggle: false
        }
    }

    componentDidMount(){
        let date = moment().format('MM/DD/YY')
        this.setStateByDate(date)
    }

    setStateByDate = (date) => {
        let encodedDate = encodeURI(date)
        let promise1 = axios.get(`/api/users/day?date=${encodedDate}`).then(res => {
            return res.data

        }) 
        let promise2 = axios.get(`/api/appt/day?date=${encodedDate}`).then(res => {
            return res.data
        })  
        Promise.all([promise1, promise2]).then(response => {
            console.log('Response: ', response)
            this.setState({
                date: date,
                usersByDate: response[0],
                apptsByDate: response[1]
            })
        })
    }

    changeDate = (day) => {
        let newDay = this.state.date;
        newDay = moment(newDay).add(day, 'd')
        this.setStateByDate(newDay.format('MM/DD/YY'))
        // this.setState({date: newDay.format('MM/DD/YY')})
    }

    updateHomeToggle = () => {
        let currentDate = this.state.date
        this.setStateByDate(currentDate)
    }

    render(){
        console.log("home state: ", this.state);
        let {usersByDate, apptsByDate, date} = this.state
        let userList = usersByDate.map(user => {
            return  <Link className='linkToUser' to={`/user/${user.user_id}`}>
                        <DisplayUser 
                            key={user.user_id}
                            userId={user.user_id} 
                            picture={user.picture}
                            username={user.user_name}
                        />
                    </Link>
        })
        let apptList = apptsByDate.map(appt => {
            return <Appointment 
                        key={appt.appt_id}
                        upcoming={false}
                        apptId={appt.appt_id}
                        slotId={appt.slot_id}  
                        summary={appt.summary}
                        date={appt.date}
                        time={appt.time_formatted}
                        notes={appt.notes}
                        username={appt.user_name}
                        picture={appt.picture}
                        userId={appt.user_id}
                        total={appt.total}
                    />
        })
        return(
            <div>
                <div className='homeDateDisplay'>
                <button onClick={() => this.changeDate(-7)}><h2>{'<<'}</h2><p>Week</p></button>
                    <button onClick={() => this.changeDate(-1)}><h2>{'<'}</h2><p>Day</p></button>
                    <div className='dateDisplayText'>
                        {date === moment().format('MM/DD/YY') ?
                            <h2 className='dateDisplayText'>{` Today's Schedule `}</h2>
                        :
                            <h2 className='dateDisplayText'>{` Schedule for ${date} `}</h2>
                        }
                    </div>
                    <button onClick={() => this.changeDate(1)}><h2>{'>'}</h2><p>Day</p></button>
                    <button onClick={() => this.changeDate(7)}><h2>{'>>'}</h2><p>Week</p></button>
                </div>
                <div className='adminHome'>
                    <div>
                        <DisplayDay 
                            date={this.state.date}
                            updateHomeToggle={this.updateHomeToggle}/>
                    </div>
                    <div>
                        <h2>Clients on Schedule</h2>
                        {userList}
                    </div>
                    <div>
                        <h2>Appointments on Schedule</h2>
                        {apptList}
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminHome