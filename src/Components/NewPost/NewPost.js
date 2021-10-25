import React from "react";
import classes from "./NewPost.css";
import {PermMedia,Label} from '@material-ui/icons'
import Image from '../../assets/images/Haitham.jpg'
import {useState,useRef} from 'react';
import {connect} from 'react-redux';
import Loader from 'react-loader-spinner';
import * as actions from '../../store/actions/index'
 function NewPost(props) {  
   let [photo,setPhoto]=useState(null);
  let eleRef=useRef();
  let setEleRef=()=>{
    eleRef.current.click();
  }
  const [data, setData] = useState(
   { image:null,
     text:'', 
    }

  )

  const onImageChange = (event) => {
   if (event.target.files && event.target.files[0]) {
     setPhoto(URL.createObjectURL(event.target.files[0]))
     setData({
      ...data, 
      image:event.target.files[0],
   })
  }}
  let loading=null;

  if(!props.loading){
    loading=(
      <React.Fragment>

     
       <div className={classes.newPostTop}>
      <img className={classes.newPostImg}  src={props.token?props.profilePic:Image} alt='' />
      <input ref={eleRef} style={{display:'none'}} type="file" onChange={onImageChange}  />

        <input onChange={(event)=>{
          setData({
            ...data,
            text:event.target.value,
          })
        }} placeholder={"What's in your mind? "} className={classes.newPostInput}/>
            <img src={photo} className={ data.image?classes.postImage:classes.none} alt="preview " />
    </div>
    <hr className={classes.newPostHr}/>
   
    <div className={classes.newPostBottom}>
        <div className={classes.newPostOptions}>
            <div onClick={setEleRef} className={classes.newPostOption}>
                <PermMedia htmlColor='tomato' className={classes.newPostIcon}/>
                <span  className={classes.newPostOptionText}>Photo or Video</span>
            </div>
            <div className={classes.newPostOption}>
                <Label htmlColor='blue' className={classes.newPostIcon}/>
                <span className={classes.newPostOptionText}>Tag</span>
            </div>
        </div>
        <button onClick={()=>{props.onNewPost(data,props.token)}} className={classes.newPostButton}>
          share
        </button>
    </div>
    </React.Fragment>
    );
  }else{
    loading=(<Loader type="Bars" color="#00BFFF" height={80} width={80} />);
  }
  return (
    <div className={classes.newPost}>
      <div className={classes.newPostWrapper}>  
       {loading}
      </div>
    </div>
  );
}
let mapStateToProps=state=>{
  return{
      token:state.auth.token,
      loading:state.newPost.loading,
      userName:state.auth.userName,
      profilePic:state.auth.profilePic,
  }
}
let mapDispatchToProps=dispatch=>{
  return{
    onNewPost:(data,token)=>dispatch(actions.newPost(data,token)),
  }
}
export default connect(mapStateToProps,mapDispatchToProps) (NewPost)