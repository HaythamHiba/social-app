import React from 'react'
import classes from './Message.css';
export default function Message(props) {
     return(
        <div className={ props.own? classes.messageOwn:classes.message}>
      <div className={classes.messageTop}>
        <img
          className={classes.messageImg}
          src={props.image}
          alt=""
        />
        <p className={classes.messageText}>{props.text}</p>
      </div>
    </div>
    )
  
}
