import axios from '../../axios';
export const sendMessage=(token,message,id)=>{
    const data={
        text:message,
        conversation_id:id
    }
    return dispatch=>{
            axios.post('/api/sendMessage',data,
    { headers: {Authorization : `Bearer ${token}`} }
            ).then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err);
            })
    }
}