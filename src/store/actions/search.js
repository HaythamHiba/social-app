import * as actionTypes from './actionTypes';
import axios from '../../axios';
export const searchStart=()=>{

    return{
        type:actionTypes.SEARCH_START,
    }
}

export const serachResult=(data)=>{
    return{
        type:actionTypes.SEARCH_RESULT,
        data:data,
    }
}

export const search=(token,body)=>{
    return dispatch=>{
        dispatch(searchStart());
        console.log(body,token);
        axios.post('/api/search',
        body,
        { headers: {Authorization : `Bearer ${token}`} }
        ).then(res=>{
            dispatch(serachResult(res.data))
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })

    }
}