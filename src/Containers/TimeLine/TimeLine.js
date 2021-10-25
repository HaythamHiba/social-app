import React,{useRef ,useEffect} from 'react';
import Bar from '../../UI/Bar/Bar'
import classes from './TimeLine.css';
import SideBar from '../../Components/SideBar/SideBar';
import Feeds from '../../Components/Feeds/Feeds';
import RightBar from '../../Components/RightBar/RightBar';
import Image1 from '../../assets/images/Haitham.jpg';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
const timeLine=(props)=>{

return(
    <div>
        <Bar image={Image1} />
        <div className={classes.Home}>
        <SideBar logoutClicked={()=>{
          props.history.push('/Signin');
          props.onlogout(props.token);
          props.onClearPosts();
        }}/>
        <Feeds image={Image1}/>
        
        <RightBar/>
            </div>
    </div>
);
}
let mapStateToProps=state=>{
    return{
      token:state.auth.token,
    }
  }
  let mapDispatchToProps=dispatch=>{
    return{
      onlogout:(token)=>dispatch(actions.logout(token)),
      onClearPosts:()=>dispatch(actions.clearPosts()),
    }
  }
export default connect (mapStateToProps,mapDispatchToProps) (withRouter(timeLine) );