import React, { useEffect, useState } from "react";
import classes from "./Popper.css";
import PopperItem from "./PopperItem/PopperItem";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
export default function Popper(props) {
   const [show,setShow]=useState(null);
  const [popperItems, setPopperItems] = useState({
    like: {
      type: "like",
      icon: <ThumbUpIcon className={classes.PopperItemIcon} />,
      text: "liked your photo",
    },
    comment: {
      type: "comment",

      icon: <ChatBubbleIcon className={classes.PopperItemIcon} />,
      text: "commented on your photo",
    },
    friendRequest: {
      type: "friend",

      icon: <PersonAddIcon className={classes.PopperItemIcon} />,
      text: "sent you a friend request",
    },
  });
  let pop=[];
  let popper=[{
      type:'like',
    name:'Haitham Hiba',
    time:'2hr ago',
  },{
    type:'comment',
    name:'Amer Thallag',
    time:'1week ago',
  },{
    type:'friend',
    name:'Salman AbuWatfa',
    time:'1year ago',
  },{
    type:'friend',
    name:'Mohammad Fy',
    time:'1year ago',
  },{
    type:'friend',
    name:'Muhannad Jafaari',
    time:'1year ago',
  }];
 
  useEffect(()=>{
   popper.map(ind=>{
     
   Object.keys(popperItems).map(popIt=>{
       if(ind.type===popperItems[popIt].type){
         
              pop.push(<PopperItem
              key={Math.random()}
                type={ind.type}
                name={ind.name}
                desc={popperItems[popIt].text}
                time={ind.time}
                icon={popperItems[popIt].icon}
                />) 
         
       }
       
     })
   })
  setShow(pop);
  },[])

  return (
    <div className={classes.Popper}>
      <div className={classes.PopperWrapper}>
      {show}

      </div>
    </div>
  );
}
