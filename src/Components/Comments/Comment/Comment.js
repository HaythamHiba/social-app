import React,{useEffect} from 'react'
import classes from './Comment.css';

export default function Comment(props) {
    useEffect(()=>{
        console.log(props.image);
    },[])
    return (
        <div className={classes.CommentWrapper}>
     
            <img className={classes.CommentOwnerImg} src={props.image} alt=""/>
           
            
                   <div className={classes.CommentOwnerInfo}>
            <p className={classes.CommentOwnerName}>{props.userName}</p>
            <span className={classes.Comment}>{props.text}</span>
            </div>
         

        </div>
    )
}
