import React,{useEffect} from "react";
import classes from "./Feeds.css";
import NewPost from '../NewPost/NewPost'
import Post from '../Post/Post';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Loader from "react-loader-spinner";
import InfiniteScroll from 'react-infinite-scroll-component';
 function Feeds(props) {
  useEffect(()=>{
    if(props.token){
      console.log(props.token);
      if(props.profile){
        console.log(props.profile);
          props.onGetUserPosts(props.token,props.userNextUrl,props.id)
      }else{
        
        console.log(props.nextUrl);
        props.onGetPosts(props.token,props.nextUrl);
      }
      
    }
  },[props.token]);
  let fetchData=()=>{
    if(props.token&&props.nextUrl){
      props.onGetPosts(props.token,props.nextUrl);
    }
  }
  let fetchUserData=()=>{
    if(props.token&&props.userNextUrl){
      props.onGetUserPosts(props.token,props.userNextUrl,props.id)

    }
  }
  let spinner=(<Loader type="TailSpin" color="#1877f2" height={80} width={80} />);
  let userSpinner=(<Loader type="ThreeDots" color="#1877f2" height={80} width={80} />);
 console.log(props.loading);
if(!props.loading){
 console.log(props.posts);
   spinner= props.posts.map(ind=>
    {
      console.log(ind.comments)
     return <Post 
     key={ind.id}
     profile={props.profile}
     name={ind.userName}
     likes={ind.likes}
     liked={ind.liked}
     comments={ind.comments}
     postable_id={ind.postable_id}
     userImg={ind.userProfilePic}
     postText={ind.text_body}
     postImg={ind.photos}
     id={ind.id}
     time={ind.updated_at}
     
     />

    })
     
    
  
}
console.log(props.userLoading);
if(!props.userLoading){
  console.log(props.userPosts);
    userSpinner= props.userPosts.map(ind=>
      <Post 
      key={ind.id}
      profile={props.profile}
      name={ind.userName}
      likes={ind.likes}
      liked={ind.liked}
      comments={ind.comments}
      userImg={ind.userProfilePic}
      postText={ind.text_body}
      postImg={ind.photos}
      postable_id={ind.postable_id}
      id={ind.id}
      time={ind.updated_at}
      
      />
 
     )
   
 }

  return (
    <div className={classes.Feeds}>
      <div className={classes.claassWrapper}>
            <NewPost  image={props.image}/>
            <InfiniteScroll
  dataLength={props.profile?props.userPosts.length:props.posts.length} 
  next={props.profile?fetchUserData:fetchData}
  hasMore={
    props.profile?
    (props.userNextUrl?true:false):props.nextUrl?true:false}
  loader={<h4>Loading...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>
  }>
           {
             props.profile?userSpinner:spinner
           }
           </InfiniteScroll>
      </div>
    </div>
  );
}
let mapStateToProps=state=>{
  return{
    token:state.auth.token,
    nextUrl:state.feeds.nextUrl,
    userNextUrl:state.feeds.userNextUrl,
    userPosts:state.feeds.userPosts,
    userLoading:state.feeds.userLoading,
    posts:state.feeds.posts,
    loading:state.feeds.loading,
  }
}
let mapDispatchToProps=dispatch=>{
  return{
      onGetPosts:(token,nextUrl)=>dispatch(actions.getPosts(token,nextUrl)),
      onGetUserPosts:(token,nextUrl,perId)=>dispatch(actions.getUserPosts(token,nextUrl,perId)),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Feeds)
