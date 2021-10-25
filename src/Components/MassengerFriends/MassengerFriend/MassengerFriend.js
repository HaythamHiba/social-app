import React from 'react'
import classes from './MassengerFriend.css'
export default function MassengerFriend(props) {
    return (
        <div onClick={props.clicked} className={classes.Friend}>
           <div className={classes.ImageContainer}>
                <img className={classes.ProfileImage} alt=" " src ={props.img}/>
            </div>
            <span className={classes.Username}>{props.name}</span>
            
        </div>
    )   
}
