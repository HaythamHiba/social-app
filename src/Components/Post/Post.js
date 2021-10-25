import React,{useState,useEffect,useRef} from 'react'
import classes from './Post.css';
import { withRouter } from 'react-router';
import {MoreVert} from '@material-ui/icons'
import likeImg from '../../assets/images/like.png'
import disLikeImg from '../../assets/images/red-thumbs-down.png';
import Comments from '../Comments/Comments';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
 function Post(props) {
     const [likes,setLikes]=useState(0);
     const [liked,setLiked]=useState(false)
     useEffect(()=>{

             setLikes(props.likes);
             setLiked(props.liked);
         
     },[])
    const [comments,setComments]=useState(false);
    let gotoComments=()=>{
        setComments(!comments);
    }
    let commentCameraClicked=()=>{
        elementRef.current.click();
    }
    let elementRef=useRef();
    let showComments = null;
    let gotoHomePage=()=>{
        props.history.push('/MainAccount',{id:props.postable_id})
        window.location.reload()
        window.scrollTo(0, 0);
    }
    if(comments){
        console.log(props.comments);
        showComments=(
            <Comments postId={props.id} comments={props.comments} clicked={commentCameraClicked}/>
        )
    }
    let image=null;
    if(props.postImg){
        props.postImg.map(ind=>
            image=ind.url
            )
    
    }

    return (
        <div className={classes.post}>
            <div className={classes.postWrapper}>
                <div className={classes.postTop}>
                    <div className={classes.postTopLeft}>
                        <img onClick={gotoHomePage} alt=" " className={classes.postProfileImage} src={props.userImg}/>
                        <span onClick={gotoHomePage} className={classes.postUserName}>{props.name}</span>
                        <span className={classes.postDate}> {props.time} </span>
                    </div>
                    {props.profile?<div className={classes.postTopRight}>
                        <MoreVert/> 
                    </div> :null}
                    
                </div>
                <div className={classes.postCenter}>
                    <span className={classes.postText}>{props.postText} </span>
                    {
                        
                        image?<img className={classes.postImage} alt=" " src={image}/>:null
                    }
                    

                </div>
                <div className={classes.postBottom}>
                   <div className={classes.postBottomLeft}>
                            {
                                liked?
                           <img onClick={
                          

                            ()=>{
                                props.onUnLike(props.id,props.token)
                                setLikes(likes-1);
                                setLiked(!liked)
                        }} className={classes.likeIcon} alt='' src={disLikeImg}/>
                            :<img onClick={()=>{
                                setLikes(likes+1);
                                setLiked(!liked)
                                props.onLike(props.id,props.token)}} className={classes.likeIcon} alt=" " src={likeImg}/>
                          
                            }

                          
                           <span className={classes.postLikeCounter}>{likes} people like it</span>


                       </div> 
                       <div className={classes.postBottomRight}>
                           <span onClick={gotoComments} className={classes.postCommentText}>
                               {props.comments.length} comments
                           </span>
                       </div> 
                </div>
                <hr/>
                <input ref={elementRef} type='file' style={{display:'none'}}/>
                {showComments}
            </div>
        </div>
    )
}
let mapStateToProps=state=>{
    return{
        token:state.auth.token,
    }
}
let mapDispatchToProps=dispatch=>{
    return{
        onLike:(id,token)=>dispatch(actions.like(id,token)),
        onUnLike:(id,token)=>dispatch(actions.unLike(id,token))   
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Post)) ; 
