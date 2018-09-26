import React, { Component } from 'react'
import axios from 'axios'

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
        return(
            <div>profile page</div>
        )
    }
}

export default Profile