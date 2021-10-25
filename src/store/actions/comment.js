import * as actionTypes from './actionTypes';
import axios from '../../axios'
export const newCommentStart=()=>{
    return{
        type:actionTypes.NEW_COMMENT_START,
    }
}
export const newCommentSuccess=()=>{
    return{
        type:actionTypes.NEW_COMMENT_SUCCESS,
    }
}
export const newCommentFailed=(err)=>{
    return{
        type:actionTypes.NEW_COMMENT_FAILED,
    }
}
export const newComment=(token,id,comment)=>{
    console.log(comment)
    let formData=new FormData();
    formData.append('post_id',id);
    formData.append('text_body',comment);
    return dispatch=>{
        dispatch(newCommentStart());
        axios.post('/api/post/newComment',formData,
        { headers: {Authorization : `Bearer ${token}`} }
        ).then(res=>{
            console.log(res);
            dispatch(newCommentSuccess());
            // dispatch(getPostComments(id,token))
        }).catch(err=>{
            console.log(err);
            dispatch(newCommentFailed(err));
        })
    }   
}
export const getPostCommentsStart=()=>{
    return{
        type:actionTypes.GET_POST_COMMENTS_START,
    }
}
export const getPostCommentsFailed=()=>{
    return{
        type:actionTypes.GET_POST_COMMENTS_FAILED,
    }
}
export const getPostCommentsSuccess=(data)=>{
    console.log(data);
    return{
        type:actionTypes.GET_POST_COMMENTS_SUCCESS,
        comments:data,
    }
}
export const getPostComments=(id,token)=>{
    const data={
        post_id:id,
    }
    return dispatch=>{
        dispatch(getPostCommentsStart())
        axios.post('/api/post/comments',data,
        { headers: {Authorization : `Bearer ${token}`} }
        ).then(res=>{
            dispatch(getPostCommentsSuccess(res.data))
        }).catch(err=>{
            console.log(err);
            dispatch(getPostCommentsFailed())
        })
    }
}
export const closeComments=()=>{
    return{
        type:actionTypes.CLOSE_COMMENTS,
        
    }
}