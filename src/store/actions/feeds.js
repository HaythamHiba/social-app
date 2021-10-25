import axios from '../../axios';
import * as actionTypes from './actionTypes';
export const getFirstPostsSuccess=(data,next_page_url)=>{
    return{
        type:actionTypes.GET_FIRST_POSTS_SUCCESS,
        data:data,
        next_page_url:next_page_url,
    }
}
export const getFirstPostsStart=()=>{
return{
    type:actionTypes.GET_FIRST_POSTS_START,

}
}

export const getPostsSuccess=(data,next_page_url)=>{
    console.log(data);
    return{
        type:actionTypes.GET_FIRST_POSTS_SUCCESS,
        data:data,
        next_page_url:next_page_url,
    }
}
export const getPostsStart=(data)=>{
return{
    type:actionTypes.GET_FIRST_POSTS_START,

}
}

export const getPosts=(token,nextUrl)=>{
    return dispatch=>{
        if(nextUrl){
            axios.post(nextUrl,null,
                { headers: {Authorization : `Bearer ${token}`} }
                ).then(res=>{
                    console.log(res.data)
                    console.log('lkdfha.dsfhgfdskjgsflkjfgskljfskdfjhkj')
                    dispatch(getPostsSuccess(res.data.data,res.data.next_page_url))
                })
                .catch(err=>{
                    console.log(err)
                })
        }else{
            dispatch(getFirstPostsStart());
            axios.post('/api/user/timeline',null,
            { headers: {Authorization : `Bearer ${token}`} }
            ).then(res=>{
                console.log(res.data.data);
                console.log(res.data.next_page_url);
                dispatch(getFirstPostsSuccess(res.data.data,res.data.next_page_url));;
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }

}




        export const getUserPostsStart=()=>{
            return{
                type:actionTypes.GET_USER_POSTS_START,
            }
        }
        export const getUserPostsFailed=(err)=>{
            return{
                type:actionTypes.GET_USER_FIRST_POSTS_START,
                loading:true,
                err:err,
            }
        }
        export const getUserPostsSuccess=(data,nextUrl)=>{
            return{
                type:actionTypes.GET_USER_FIRST_POSTS_SUCCESS,
                data:data,
                nextUrl:nextUrl,
            }
        }
        export const getUserFirstPostsStart=()=>{
            return{
                type:actionTypes.GET_USER_FIRST_POSTS_START,
            }
        }
        export const getUserFirstPostsFailed=(err)=>{
            return{
                type:actionTypes.GET_USER_FIRST_POSTS_START,

                err:err,
            }
        }
        export const getUserFirstPostsSuccess=(data,nextUrl)=>{
            return{
                type:actionTypes.GET_USER_FIRST_POSTS_SUCCESS,
                data:data,
                nextUrl:nextUrl,
                loading:false,
            }
        }
export const getUserPosts=(token,nextUrl,perId)=>{
    return dispatch=>{
        const data={
            user_id:perId,
        }
        if(nextUrl){
            dispatch(getUserPostsStart())
            axios.post(nextUrl,data,
                { headers: {Authorization : `Bearer ${token}`} }
                ).then(res=>{
                    console.log(res.data.data,res.data.next_page_url);
                        dispatch(getUserPostsSuccess(res.data.data,res.data.next_page_url))
                }).catch(err=>{
                    dispatch(getUserPostsFailed(err))
                    console.log(err);
                })
        }else{
            dispatch(getUserFirstPostsStart())
            axios.post('/api/user/posts',data,
                { headers: {Authorization : `Bearer ${token}`} }
                ).then(res=>{
                    console.log(res.data.data,res.data.next_page_url);
                        dispatch(getUserFirstPostsSuccess(res.data.data,res.data.next_page_url))
                }).catch(err=>{
                    dispatch(getUserFirstPostsFailed(err))
                    console.log(err);
                })
        }
    }
}
export const clearPosts=()=>{
    return {
        type:actionTypes.CLEAR_POSTS
    }
}
