import React, {Component} from 'react'
import dotenv from 'dotenv'
import axios from 'axios'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { getUserData } from '../../ducks/reducer';
import './Nav.css'

dotenv.config()

class Nav extends Component{

    componentDidMount(){
        axios.get('/api/user/data').then(res => {
            this.props.getUserData(res.data)
        })
    }

    login = () => {
        let {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID} = process.env;
        let url = `${encodeURIComponent(window.location.origin)}/auth/callback`
        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${url}&response_type=code`
    }

    logout = () => {
        axios.post('/auth/logout', {}).then(
            console.log('goodbye'),
            window.location = process.env.REACT_APP_HOME
        )
    }

    render(){
        return(
            <div className='navBar'>
                <h1 className='logo'>TRACK YOUR TIME</h1>
                {this.props.user.admin === 'admin' ?
                    <div className='navLinks'>
                        <Link className='navTabs' to='/admin/home'><p className='linkText'>Home</p></Link>
                        <Link className='navTabs' to='/schedule'><p className='linkText'>Schedule</p></Link>
                        <Link className='navTabs' to='/users'><p className='linkText'>Users</p></Link>
                        <button onClick={this.logout}>Logout</button> 
                    </div>
                :
                    this.props.user.admin === 'client' ?
                        <div className='navLinks'>
                            <Link className='navTabs' to='/profile'><p className='linkText'>My Profile</p></Link>
                            <Link className='navTabs' to='/schedule'><p className='linkText'>Schedule</p></Link>
                            <button onClick={this.logout}>Logout</button>
                        </div>
                    :
                    <div className='navLinks'>
                        <button onClick={this.login}>Login</button> 
                    </div>

                }
            </div>
        )
    }
}
function moveFromStateToProps(appState) {
    let {user} = appState
    return {
        user
    }
}

const outputActions={
    getUserData
}
let connected = connect(moveFromStateToProps, outputActions)
export default connected(Nav)