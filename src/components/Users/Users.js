import React, {Component} from 'react'

class Users extends Component{
    constructor(props){
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount(){
        axios.get('/api/users').then(res => {
            this.setState({users: res.data})
        })
    }


    render(){
        return(
            <div></div>
        )
    }
}

export default Users
