import * as actionTypes from'./actionTypes';
import axios from '../../axios';
export const submitStart=()=>{
    return{
        type:actionTypes.SET_NEW_POST_START
    }
}
export const submitFailed=(error)=>{
    return{
        type:actionTypes.SET_NEW_POST_FAILED,
        error:error,
    }
}
export const submitSucces=()=>{
    return{
        type:actionTypes.SET_NEW_POST_SUCCESS,
    }
}
export const newPost=(data,token)=>{
    let form=new FormData();
    form.append('text_body',data.text);
    if(data.image!==null){

        form.append('photo',data.image);
    }
    return dispatch=>{
       dispatch(submitStart());
       axios.post('/api/post/new',form,{
        headers: {
            Authorization : `Bearer ${token}`
        
        }
       }
       ).then(res=>{
           dispatch(submitSucces());
           console.log(res)
       })
       .catch(err=>{
           dispatch(submitFailed(err))
           console.log(err)
       })
    }
}