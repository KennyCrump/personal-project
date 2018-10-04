import React from 'react'

export default function DisplayUser(props){
    return(
            <div className='userMini'>
                <img className='miniProfilePic' src={props.picture} alt="profile_picture"/>
                <h4 className='miniProfileName'>{props.username}</h4>
            </div>
    )
    
}