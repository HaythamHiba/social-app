import React from 'react'
import classes from './Friend.css'
export default function Friend(props) {
    return (
        <div className={classes.Friend}>
           <div className={classes.ImageContainer}>
                <img className={classes.ProfileImage} alt=" " src ={props.img}/>
                <span className={props.online?classes.Online:classes.nothing}></span>
            </div>
            <span className={classes.Username}>{props.name}</span>
            
        </div>
    )   
}
