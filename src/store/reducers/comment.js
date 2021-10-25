import * as actionTypes from '../actions/actionTypes';
const initialState={
    fetchedComments:[],
    loadingNewComment:false,
    loadingComments:true,
    commentsLoaded:false
}
let reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.NEW_COMMENT_START:
            return{
                ...state,
                loadingNewComments:true,
            }
            case actionTypes.NEW_COMMENT_SUCCESS:
            return{
                ...state,
                loadingNewComments:false,
            }
            case actionTypes.NEW_COMMENT_FAILED:
            return{
                ...state,
                loadingNewComments:false,
            }
            case actionTypes.GET_POST_COMMENTS_START:
                return{
                    ...state,

                    loadingComments:true,
                }
                case actionTypes.GET_POST_COMMENTS_SUCCESS:
                    return{
                        ...state,
                        commentsLoaded:true,
                        loadingComments:false,
                        fetchedComments:action.data,
                    }
                    case actionTypes.GET_POST_COMMENTS_FAILED:
                        return{
                            ...state,
                            loadingComments:false,
                        }
                        case actionTypes.CLOSE_COMMENTS:
                            return{
                                ...state,
                                commentsLoaded:false,
                                loadingComments:false,
                                fetchedComments:[],
                            }
                            default :return state;
    }
}
export default reducer;