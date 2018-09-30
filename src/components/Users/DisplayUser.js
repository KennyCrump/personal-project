import React from 'react'
import {Link} from 'react-router-dom'

export default function DisplayUser(props){
    return(
        <Link to={`/user/${props.userId}`}>
            <div className='userMini'>
                <img className='miniProfilePic' src={props.picture} alt="profile_picture"/>
                <h4>{props.username}</h4>
            </div>
        </Link>
    )
    
}