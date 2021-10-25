import React, { useEffect } from "react";
import classes from "./PopperItem.css";

import Image from "../../../assets/images/Haitham.jpg";
export default function PopperItem(props) {
  let friendReq=null;
  if(props.type==='friend'){
    friendReq=(
      <div  className={classes.FreindReq}>
          <button className={classes.submitFriend}>submit</button>
          <button className={classes.declineFriend}>decline</button>
        </div>
    )
  }
  useEffect(()=>{
    console.log(props.type);
    },[])
  return (
    <div className={classes.popperItemWrapper}>
      <div className={classes.ImgContainer}>
        <img className={classes.userImg} alt="" src={Image} />
        <div className={classes.IconContainer}>
          {props.icon}
        </div>
      </div>
      <div className={classes.PopperItemInfo}>
        <div className={classes.desc}>
          <p className={classes.descIn}>
            {props.name} {props.desc}
          </p>
          <span className={classes.timer}>{props.time}</span>
        </div>
        {friendReq}
      </div>
    </div>
  );
}
