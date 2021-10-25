import * as actionTypes from './actionTypes';
import axios from '../../axios';
export const userInfoStart=()=>{
return{
type:actionTypes.USER_INFO_START,
}
}
export const userInfoSuccess=(data)=>{
    return{
    type:actionTypes.USER_INFO_SUCCESS,
    data:data,
    }
    }
export const userInfo=(token,id)=>{
    const data={
        user_id:id,
    }
    return dispatch=>{
        console.log(token,id);
        dispatch(userInfoStart())
        axios.post('/api/user/profilePage',
        data,
        { headers: {Authorization : `Bearer ${token}`} }
        ).then(res=>{
           console.log(res.data)
            dispatch(userInfoSuccess(res.data))
           
        }).catch(err=>{
            console.log(err)
        })
    }
}
export const requestStart=()=>{
    return{
            type:actionTypes.REQUEST_START,
    }
}
export const requestSuccess=(text)=>{
    return {
        type:actionTypes.REQUEST_SUCCESS,
        text:text,
    }
}
export const sendFriendRequest=(token,id)=>{
    const data={
        id:id,
    }
    return dispatch=>{
           dispatch(requestStart())
           axios.post('api/relation/new',data,
           { headers: {Authorization : `Bearer ${token}`} }
           ).then(res=>{
               console.log(res.data)
               dispatch(requestSuccess(res.data))
           }).catch(err=>{
               console.log(err)
           })
    }
}
export const unFriend=(token,id)=>{
    const data={
        id:id,
    }
    return dispatch=>{
        dispatch(requestStart())
        axios.post('api/relation/unfriend',data,
        { headers: {Authorization : `Bearer ${token}`} }
        ).then(res=>{
            dispatch(requestSuccess(res.data))
        }).catch(err=>{
            console.log(err)
        })
    }
}
export const submitFriendRequest=(token,id)=>{
    const data={
        id:id,
    }
    return dispatch=>{
        dispatch(requestStart())
        axios.post('api/relation/accept',data,
        { headers: {Authorization : `Bearer ${token}`} }
        ).then(res=>{
            dispatch(requestSuccess(res.data))
        }).catch(err=>{
            console.log(err)
        })
        
    }
}
export const cancleRequest=(token,id)=>{
    const data={
        id:id,
    }
    return dispatch=>{
     
        dispatch(requestStart())
        axios.post('api/relation/cancel',data,
        { headers: {Authorization : `Bearer ${token}`} }
        ).then(res=>{
            
            dispatch(requestSuccess(res.data))
        }).catch(err=>{
            console.log(err)
        })
        
    }
}
export const rejectFriendRequest=(token,id)=>{
    const data={
        id:id,
    }
    return dispatch=>{
        dispatch(requestStart())
        axios.post('api/relation/reject',data,
        { headers: {Authorization : `Bearer ${token}`} }
        ).then(res=>{
            dispatch(requestSuccess(res.data))
        }).catch(err=>{
            console.log(err)
        })
        
    }
}
export const blockFriend=(token,id)=>{
    const data={
        id:id,
    }
    return dispatch=>{
        dispatch(requestStart())
        axios.post('api/relation/block',data,
        { headers: {Authorization : `Bearer ${token}`} }
        ).then(res=>{
            dispatch(requestSuccess(res.data))
        }).catch(err=>{
            console.log(err)
        })

    }
}
export const changeProfilePic=(token,image)=>{
    let form=new FormData();
    form.append('profilePhoto',image)
    return dispatch=>{
        axios.post('/api/user/updateProfilePic',form,
        { headers: {Authorization : `Bearer ${token}`} }
        ).then(res=>{
            window.location.reload()
            window.scrollTo(0, 0);
        }).catch(err=>{
            console.log(err);
        })
    }
}
export const changeCoverPic=(token,image)=>{
    let form=new FormData();
    form.append('coverPhoto',image)
    return dispatch=>{
        axios.post('/api/user/updateCoverPic',form,
        { headers: {Authorization : `Bearer ${token}`} }
        ).then(res=>{
            console.log(res)
            window.location.reload()
            window.scrollTo(0, 0);
        }).catch(err=>{
            console.log(err);
        })
    }
}