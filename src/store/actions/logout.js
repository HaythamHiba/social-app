import * as acionTypes from './actionTypes';
import axios from '../../axios';
export const logoutSuccess=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('userName');
    localStorage.removeItem('profilePic');
    return{
        type:acionTypes.LOGOUT_SUCCESS,
        
    }
}
export const logout=token=>{
   
    return dispatch=>{
        console.log(token);
        axios.post('/api/logout',null,
        { headers: {Authorization : `Bearer ${token}`} }
        ).then(res=>{
            console.log(res);
            dispatch(logoutSuccess());
        })
        .catch(err=>{
            console.log(err)
            
        })
    }
}