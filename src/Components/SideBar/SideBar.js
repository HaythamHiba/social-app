import classes from "./SideBar.css";
import React,{useState} from 'react';
import {
  RssFeed,
  Chat,


} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router";
import Friends from "../Friends/Friends";
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'
  function  Sidebar(props) {
    const[open,setOpen]=useState(false);
 let gotoTimeLine=()=>{
    props.history.push('./TimeLine')
  }
  let gotoSettings=()=>{
    props.history.push('./Settings')
  }
  
 let gotoChats=()=>{
    props.history.push('./Messenger')
  }
  let friendsOfUser=()=>{
    if(props.token){
      props.onGetFriendsOfUser(props.token);
    }
  }
  let friendsArr=null;
  if(props.friends){
     friendsArr=(<Friends list={props.friends}/>)
  }
  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarWrapper}>
        <ul className={classes.sidebarList}>
          <li onClick={gotoTimeLine}className={classes.sidebarListItem}>
            <RssFeed className={classes.sidebarIcon} />
            <span  className={classes.sidebarListItemText}>Feed</span>
          </li>
          <li onClick={gotoChats}className={classes.sidebarListItem}>
            <Chat className={classes.sidebarIcon} />
            <span className={classes.sidebarListItemText}>Chats</span>
          </li>
         
        </ul>
        <hr className={classes.sidebarHr} />
        <Button
            fullWidth
            variant="contained"
            onClick={props.logoutClicked}
           style={{
             backgroundColor:'#1877f2',
             color:'white',
             marginBottom:'10px',
           }}
            className={classes.submit}
          >
            Logout
          </Button>
        <button onClick={gotoSettings} className={classes.settingsButton}>Show Settings</button>
        <button onClick={()=>{
          open?
          props.onFriendsClose()
          :friendsOfUser()
          setOpen(!open)
        }} className={classes.settingsButton}>Show Friends</button>
        {friendsArr} 
      </div>
    </div>
  );
}
let mapStateToProps=state=>{
  return{
      friends:state.friends.data,
      token:state.auth.token,
  }
}
let mapDispatchToProps=dispatch=>{
  return{
      onGetFriendsOfUser:(token)=>dispatch(actions.friendsOfUser(token)),
      onFriendsClose:()=>dispatch(actions.friendOfUserclose())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Sidebar)) ;