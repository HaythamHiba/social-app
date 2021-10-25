import * as actionTypes from './actionTypes';
import axios from '../../axios';
import {logoutSuccess} from './logout'
export const signinStart=()=>{
    return{
        type:actionTypes.SIGNIN_START
    }
}
export const signinSucess=(token,id,userName,profilePic)=>{
        localStorage.setItem('token',token);
        localStorage.setItem('userName',userName);
        localStorage.setItem('profilePic',profilePic);
        localStorage.setItem('id',id);
    return{
        type:actionTypes.SIGNIN_SUCCESS,
        token:token,
        perId:id,
        userName:userName,
        profilePic:profilePic,
    }
}
export const signinFailed=(error)=>{
    return{
        type:actionTypes.SIGNIN_FAILED,
        error:error
    }
}
export const auth=(email,password)=>{
    const data={
        email:email,
        password:password,
        
    }
    return dispatch=>{
        dispatch(signinStart());
        axios.get('/sanctum/csrf-cookie').then(res=>{
            
            axios.post('/api/login',data).then(res=>{
                console.log(res.data);
                dispatch(signinSucess(res.data.token,res.data.id,res.data.userName,res.data.profilePic))
            })
            .catch(err=>{
                console.log(err);
                dispatch(signinFailed(err.message))
            })
        })
       
    }
}
export const recoverStart=()=>{
    return{
        type:actionTypes.RECOVER_START
    }
}
export const recoverSuccess=()=>{
    return{
        type:actionTypes.RECOVER_SUCCESS
    }
}
export const recoverFailed=(error)=>{
    return{
        type:actionTypes.RECOVER_FAILED,
        error:error
    }
}
export const recover=(email)=>{
    const data={
        email:email,
    }
    return dispatch=>{
      dispatch(recoverStart());
      console.log(email);
      axios.get('/sanctum/csrf-cookie').then(res=>{
      axios.post('/api/forgotPassword',data).then(res=>{
          console.log(res)
          dispatch(recoverSuccess(res));
      })
      .catch(err=>{
          dispatch(recoverFailed(err))
      })
    })
    };
}
export const checkAuth=()=>{
 const token=localStorage.getItem('token');
 console.log(token);
 return dispatch=>{
    if(token){
        const id=localStorage.getItem('id');
        const userName=localStorage.getItem('userName');
        const profilePic=localStorage.getItem('profilePic');
        console.log(profilePic);
        dispatch(signinSucess(token,id,userName,profilePic));
        dispatch(onSignupSuccess(token,id,userName,profilePic));
    }else{
        dispatch(logoutSuccess());
        
       

    }
 }
 
}
export const onSignupStart=()=>{
    return{
        type:actionTypes.SIGNUP_START,
    }
}
export const onSignupSuccess=(token,id,userName,profilePic)=>{
    localStorage.setItem('token',token);
    localStorage.setItem('id',id);
    localStorage.setItem('userName',userName);
    localStorage.setItem('profilePic',profilePic);
    console.log(token,id,userName,profilePic);
    return{
        type:actionTypes.SIGNUP_SUCCESS,
        token:token,
        perId:id,
        userName:userName,
        profilePic:profilePic,
    }
}
export const onSignupFailed=(error)=>{
    return{
        type:actionTypes.SIGNUP_FAILED,
        error:error,
    }
}
export const signup=(values)=>{
   return dispatch=>{
       dispatch(onSignupStart())
      
      axios.get('/sanctum/csrf-cookie').then(res=>{
          console.log(res.data);
          axios.post('/api/register',values).then(res => {
            console.log(res.data)
            dispatch(onSignupSuccess(res.data.token,res.data.id,res.data.userName,res.data.profilePic))
         
 })
 .catch(err=>{
     console.log(err)
     dispatch(onSignupFailed(err))
 })
 
      })
       
   
   }
}
