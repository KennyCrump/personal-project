import React, {Component} from 'react'
import axios from 'axios'
import dotenv from 'dotenv'

import DisplayUser from '../Users/DisplayUser'

class AddAppt extends Component{
    constructor(props){
        super(props)
        this.state = {
            user_id: '',
            summary: '',
            notes: '',
            userList: [],
            usersDisplayed: [],
            searchInput: '',
            selectedUser: {}
        }
    }

    addAppt = () => {
        let {user_id, summary, notes} = this.state;
        let {slotId: slot_id} = this.props;
        const {REACT_APP_HOME} = process.env
        axios.post('/api/appt/add', {user_id, summary, slot_id, notes})
            .then(res => {
                this.props.updateSlotInfo(res.data[0])
                this.props.updateModalToggle()
                if(this.props.user.admin !== 'admin'){
                    window.location = `${REACT_APP_HOME}/#/profile`
                }
            })
        
    }

    componentDidMount(){
        if(this.props.user.admin !== 'admin'){
            this.setState({
                user_id: this.props.user.user_id
            })
        }else if(this.props.user.admin === 'admin'){
            axios.get('/api/users').then(res => {
                this.setState({
                    userList: res.data,
                    usersDisplayed: res.data
                })
            })
        }
    }

    searchUsers = () => {
        const {users, searchInput} = this.state
        let newDisplayList = users.filter(user => user.user_name.toLowerCase().includes(searchInput.toLowerCase()))
        this.setState({usersDisplayed: newDisplayList})
    }

    updateSelectedUser = (user) => {
        this.setState({
            user_id: user.user_id,
            selectedUser: user
        })
    }

    render(){
        console.log('add state', this.state)
        const {userList, searchInput} = this.state
        let displayedUsers = userList.slice('')
        if(this.state.searchInput){
            displayedUsers = userList.filter(user => user.user_name.toLowerCase().includes(searchInput.toLowerCase()))
        }
        displayedUsers = displayedUsers.map(user => {
            return  <div key={user.user_id} onClick={() => this.updateSelectedUser(user)}>
                        <DisplayUser
                            userId={user.user_id} 
                            picture={user.picture}
                            username={user.user_name}
                        />
                    </div>
        })
        return(
            <div className='addApptModal'>
            {this.props.user.admin === 'admin' ?
            <div className='apptModalContent'>
                <h2 id='addApptTitle'>Book an Appointment</h2>
                <h3 id='addApptDate'>{`on ${this.props.date} at ${this.props.time}`}</h3>
                <div className='changeApptInfo'>
                    <div className='userSelector'>
                        <h4 className='findUserText'>Find User: </h4>
                        <input onChange={e => this.setState({searchInput: e.target.value})} placeholder='Filter Results Here' type="text"/>
                        <div id='userListSearch'>
                            {displayedUsers}
                        </div>
                    </div>
                    <div className='appointmentSummary'>
                        <h4 className='selectedUserTitle'>Selected User:</h4>
                            <div className='selectedUser'>
                                {this.state.selectedUser.user_id ?
                                    <DisplayUser 
                                        key='selectedUser'
                                        userId={this.state.selectedUser.user_id} 
                                        picture={this.state.selectedUser.picture}
                                        username={this.state.selectedUser.user_name}
                                    />
                                :
                                    <p className='selectUserText'>Please Select A User</p>
                                }
                            </div>
                        <h4 className='apptSummaryTitle'>Appointment Summary:</h4>
                        <textarea placeholder='Please include a brief description of the reason for this appointment'
                            onChange={e => this.setState({summary: e.target.value})} 
                            rows="3" cols="43" /><br/>
                        <h4 className='apptSummaryTitle'>Additional Notes:</h4>
                        <textarea placeholder='Any additional notes about the appointment'
                            onChange={e => this.setState({notes: e.target.value})} 
                            rows="6" cols="43" />
                    </div>
                </div>
                <div className='addApptButtons'>
                    <div className='eachButtonDiv'>
                        <button id='cancelAddApptButton' onClick={() => this.props.updateModalToggle()}>Cancel</button>

                    </div>
                    <div className='eachButtonDiv'>
                        <button id='confirmAddApptButton' onClick={this.addAppt}>Confirm</button>
                    </div>
                </div>
            </div>
            :
            <div className='apptModalContent clientApptModal'>
                <h2 id='addApptTitleClient'>Book an Appointment</h2>
                
                <h3 className='addApptDate'>{`on ${this.props.date} at ${this.props.time}`}</h3>
                <h4>Appointment Summary:</h4>
                <textarea placeholder='Please include a brief description of the reason for this appointment'
                    onChange={e => this.setState({summary: e.target.value})} 
                    rows="4" cols="50" /><br/>
                <div className='addApptButtons'>
                    <div className='eachButtonDiv'>
                        <button id='cancelAddApptButton' onClick={() => this.props.updateModalToggle()}>Cancel</button>
                    </div>
                    <div className='eachButtonDiv'>
                        <button id='confirmAddApptButton' onClick={this.addAppt}>Confirm Booking</button>
                    </div>
                </div>
            </div>
            }
            <button id='xButton' onClick={this.props.updateModalToggle}>X</button>
            </div>
        )
    }
}

export default AddAppt