import * as actionTypes from '../actions/actionTypes';

const initialState={
    likes:0,
    likesLodaing:true,
    likesErr:null,
    comments:[],
    liked:null,
    commentsLoading:true,
}
let reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.GET_POST_LIKES_START:
            return{
                ...state,
                likesLodaing:true,
            }
            case actionTypes.GET_POST_LIKES_SUCCESS:
            return{
                ...state,
                likes:action.likes,
                liked:action.liked,
                likesLodaing:false,
            }
            case actionTypes.GET_POST_LIKES_FAILED:
                return{
                    ...state,
                    likesLodaing:false,
                    likesErr:action.errr,
                }
                default: return state;
    }
}
export default reducer;