import React from 'react'
import classes from './Friends.css'
import Friend from './Friend/Friend'
export default function OnlineFriends(props) {
  let Friends=[];
  console.log(props.list);
  props.list.map(ind=>{
   
    Friends.push(
        <li  onClick={()=>{props.gotoProfile(ind.id)}} key={ind.id}>
              <Friend
             img={ind.profilePic}
               online={props.online}
               name={ind.name}
               id={ind.id}
               />
        </li>
  
    )

  })
             
      
  
    return (
        
        <div >
            <ul className={classes.FreindsList}>
              {Friends}
                
            </ul>
        </div>
    )
}
