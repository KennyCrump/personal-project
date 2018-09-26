import React, {Component} from 'react'
import axios from 'axios'
import './Users.css'

import DisplayUser from './DisplayUser'

class Users extends Component{
    constructor(props){
        super(props)
        this.state = {
            users: [],
            usersDisplayed:[],
            searchInput: ''
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
            return <DisplayUser
                        key={user.user_id}
                        userId={user.user_id} 
                        picture={user.picture}
                        username={user.user_name}
                    />
        })
        return(
            <div>
                <input type="text" onChange={(e) => this.setState({searchInput: e.target.value})}/>
                <button onClick={this.searchUsers}>Search Users</button>
                {userList}
            </div>
        )
    }
}

export default Users
