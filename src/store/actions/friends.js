import * as actionTypes from './actionTypes';
import axios from '../../axios'
export const friendOfUserStart=()=>{
return{
    type:actionTypes.FRIENDS_OF_USER_START,
}    
}
export const friendOfUserSuccess=(data)=>{
return{
    type:actionTypes.FRIENDS_OF_USER_SUCCESS,
    data:data,
}    
}
export const friendOfUserFailed=()=>{
return{
    type:actionTypes.FRIENDS_OF_USER_FAILED
}    
}
export const friendOfUserclose=()=>{
return {
    type:actionTypes.FRIENDS_OF_USER_CLOSE
}    
}
export const friendsOfUser=(token)=>{
return dispatch=>{
    dispatch(friendOfUserStart())
    axios.post('/api/relation/friends',null,
    { headers: {Authorization : `Bearer ${token}`} }
    ).then(res=>{
        dispatch(friendOfUserSuccess(res.data))
    }).catch(err=>{
        console.log(err);
        dispatch(friendOfUserFailed(err))
    })
}    
}
export const getConversationsSuccess=(data)=>{
    return {
        type:actionTypes.CONVERSATIONS_SUCCESS,
        conversations:data,
    }
}
export const getConversationsStart=()=>{
    return {
        type:actionTypes.CONVERSATIONS_START,

    }
}
export const getConversations=(token)=>{
    return dispatch=>{
        dispatch(getConversationsStart())
        axios.post('/api/user/conversations',null,
    { headers: {Authorization : `Bearer ${token}`} }
        
        ).then(res=>{
            console.log(res.data);
                    dispatch(getConversationsSuccess(res.data));
        })
    }
}
export const fetchConvStart=()=>{
    return{
        type:actionTypes.FETCH_CONVERSATIONS_START,
        
    }
}
export const fetchConvSuccess=(data)=>{
    return{
        type:actionTypes.FETCH_CONVERSATIONS_SUCCESS,
        convMessages:data,
    }
}
export const fetchConvFailed=(err)=>{
    return{
        type:actionTypes.FETCH_CONVERSATIONS_FAILED,
        error:err,
    }
}
export const fetchConv=(token,id)=>{
    const data={
        conversation_id:id
    }
    return dispatch=>{
        dispatch(fetchConvStart())
        axios.post('api/user/conversations/messages',data,
    { headers: {Authorization : `Bearer ${token}`} }
        
        ).then(res=>{
            console.log(res.data);
            dispatch(fetchConvSuccess(res.data))
        }).catch(err=>{
            console.log(err)
            dispatch(fetchConvFailed(err))
        })
    }
}