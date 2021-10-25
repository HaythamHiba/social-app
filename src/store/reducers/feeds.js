import * as actionTypes from '../actions/actionTypes';
const initialState={
     posts:[],
     userPosts:[],
     loading:true,
     userLoading:true,
     userNextUrl:null,
     nextUrl:null,
}
let reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.GET_FIRST_POSTS_START:
            return{
                ...state,
                loading:true,
            }
            case actionTypes.GET_FIRST_POSTS_SUCCESS:
                
                return{
                    ...state,
                    loading:false,
                    posts:state.posts.concat(action.data),
                    nextUrl:action.next_page_url,
                }
                case actionTypes.GET_POSTS_SUCCESS:
                
                return{
                    ...state,
                    posts:state.posts.concat(action.data),
                    nextUrl:action.next_page_url,
                }
                case actionTypes.GET_USER_FIRST_POSTS_START:
            return{
                ...state,
                userLoading:true,
            }
          
            case actionTypes.GET_USER_FIRST_POSTS_SUCCESS:
                
                return{
                    ...state,
                    userLoading:false,
                    userPosts:state.userPosts.concat(action.data),
                    userNextUrl:action.nextUrl,
                }
                case actionTypes.GET_USER_POSTS_SUCCESS:
                
                return{
                    ...state,
                    userPosts:state.userPosts.concat(action.data),
                    userNextUrl:action.nextUrl,
                }
                case actionTypes.CLEAR_POSTS:
                    return{
                        ...state,
                        posts:[],
                        nextUrl:null,
                        userPosts:[],
                            userNextUrl:null,
                    }
                   
                default:return state;
    }
}
export default reducer;