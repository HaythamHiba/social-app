import React,{useState} from 'react'
import classes from './Comments.css'
import {withRouter} from 'react-router-dom'
import Image from '../../assets/images/Haitham.jpg'
import SendIcon from '@material-ui/icons/Send';
import Comment from './Comment/Comment';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
 function Comments(props) {
     const [comment,setComment]=useState('');
    const [comments,setComments]=useState({
        newComments:[...props.comments]
    })
     let sendComment=()=>{
        
                setComments({
                    newComments:comments.newComments.concat({text_body:comment,userProfilePic:props.profilePic,username:props.userName,id:Math.random()})
                })
            props.onNewComment(props.token,props.postId,comment)
            setComment('')
     }
    return (
        <div className={classes.commentsWrapper}>
            <div className={classes.commentsTop}>
                {
                comments.newComments.length>0?
               comments.newComments.map(ind=>
                <Comment
                key={ind.id}
                    text={ind.text_body}
                    userName={ind.username}
                    image={ind.userProfilePic}
                />
                    
                )
            :null
            }
               
            </div>
            
            <div className={classes.commetnsBottom}>

            <img  className={classes.ownerImg} alt=" " src={Image}/>
            

            <CameraAltIcon  onClick={props.clicked} className={classes.Camera}/>
            
          
            
            <input className={classes.commentsInput} onChange={(event)=>{setComment(event.target.value)}} placeholder='Place your Comment' />
                    
            
            <SendIcon  onClick={sendComment} className={classes.SendIcon} />
            </div>
        </div>
    )
}
let mapStateToProps=state=>{
    return{
        token:state.auth.token,
        fetchedComments:state.comment.fetchedComments,
        commentsLoading:state.comment.commentsLoading, 
        commentsLoaded:state.comment.commentsLoaded,
        profilePic:state.auth.profilePic,
        userName:state.auth.userName,
    }
}
let mapDispatchToProps=dispatch=>{
    return{
        onNewComment:(token,id,comment)=>dispatch(actions.newComment(token,id,comment))
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (withRouter(Comments)) ;
