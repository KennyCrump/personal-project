import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './Users.css'

import DisplayUser from './DisplayUser'
import Profile from '../Profile/Profile'


class Users extends Component{
    constructor(props){
        super(props)
        this.state = {
            users: [],
            usersDisplayed:[],
            searchInput: '',
            selectedUser: {}
        }
    }

    componentDidMount(){
        axios.get('/api/users').then(res => {
            console.log(res.data)
            this.setState({
                users: res.data,
                usersDisplayed: res.data
            })
        })
    }

    searchUsers = () => {
        const {users, searchInput} = this.state
        let newDisplayList = users.filter(user => user.user_name.toLowerCase().includes(searchInput.toLowerCase()))
        this.setState({usersDisplayed: newDisplayList})
    }

    render(){
        let userList = this.state.usersDisplayed.map(user => {
            return  <div className='linkToUser' key={user.user_id} onClick={e => this.setState({selectedUser: user})}>
                        <DisplayUser  
                            userId={user.user_id} 
                            picture={user.picture}
                            username={user.user_name}
                        />
                    </div>
        })
        console.log('selected user: ', this.state.selectedUser)
        return(
            <div className='entireUsersListPage'>
                <div className='userList'>
                    <div className='userSearch'>
                        <input type="text" onChange={(e) => this.setState({searchInput: e.target.value})}/>
                        <button onClick={this.searchUsers}>Search Users</button>
                    </div>
                    {userList}
                </div>
                <div className='selectedUserProfile'>
                    {this.state.selectedUser.user_id ?
                        <Profile  
                                selectedUser={this.state.selectedUser} 
                                userSearch={true}
                            />
                    :
                        null
                    }
                </div>
            </div>
        )
    }
}

export default Users
