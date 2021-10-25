import React,{useEffect}  from 'react';
import classes from './App.css';
import Signin from './Auth/Signin/Signin';
import Signup from './Auth/Signup/Signup'
import {Route,Switch,Redirect, withRouter} from 'react-router-dom';
import TimeLine from './Containers/TimeLine/TimeLine'
import Settings from './Components/ProfileSettings/ProfileSettings';
import Messenger from './Components/Messenger/Messenger';
import MainAccount from './Containers/MainAccount/MainAccount';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';

const app = (props)=>{
 useEffect(()=>{
   props.onTryAutuSignup();
   console.log(props.auth);
 },[])
 let content=null;
 
 let token=localStorage.getItem('token');
 if(token){
   content=(<Switch>
    <Route path={'/Signin'} exact  component ={Signin}/>
   <Route path={'/Signup'} component ={Signup}/>
   <Route path={'/Settings'} component ={Settings}/>
   <Route path={'/TimeLine'} component={TimeLine}/>
   <Route path={'/MainAccount'} component={MainAccount}/>
   <Route path={'/Messenger'} component={Messenger}/>
  <Redirect to={'/Signin'} />
   </Switch>)
 }else{
   content=(<Switch>
     <Route path={'/Signin'} exact  component ={Signin}/>
   <Route path={'/Signup'} component ={Signup}/>
   <Redirect to={'/Signin'} />
   </Switch>)
 }
 
 

  
  return(
    <div className={classes.App}>
    {content}
    </div>
  );
}
let mapDispatchToProps=dispatch=>{
  return{
    onTryAutuSignup:()=>dispatch(actions.checkAuth() ),
  }
}
let mapStateToProps=state=>{
  return{
    auth:state.auth.token
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (withRouter(app) );
