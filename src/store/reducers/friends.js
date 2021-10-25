import * as actionTypes from '../actions/actionTypes';

const initialState={
    data:[],
    loading:true,
    conversations:[],
    convLoading:true,
    fetchConvLoading:true,
    convMessages:[],
}
let reducer=(state=initialState,action)=>{
        switch(action.type){
            case actionTypes.FRIENDS_OF_USER_START:
                return{
                    ...state,
                    lodaing:true,
                }
                case actionTypes.FRIENDS_OF_USER_SUCCESS:
                    return{
                        ...state,
                        lodaing:false,
                        data:action.data,
                    }
                    case actionTypes.FRIENDS_OF_USER_FAILED:
                        return{
                            ...state,
                            lodaing:true,
                        }
                        case actionTypes.FRIENDS_OF_USER_CLOSE:
                            return{
                                ...state,
                                data:[]
                            }
                            case actionTypes.CONVERSATIONS_SUCCESS:
                                return{
                                    ...state,
                                    conversations:action.conversations,
                                    convLoading:false,
                                }
                                case actionTypes.CONVERSATIONS_CLOSE:
                                    return{
                                        ...state,
                                        conversations:[],
                                    }
                                    case actionTypes.CONVERSATIONS_START:
                                        return{
                                            ...state,
                                            convLoading:true,
                                            convMessages:[],

                                        }
                                        case actionTypes.FETCH_CONVERSATIONS_SUCCESS:
                                return{
                                    ...state,
                                    convMessages:action.convMessages,
                                    fetchConvLoading:false,
                                }
                                case actionTypes.FETCH_CONVERSATIONS_FAILED:
                                    return{
                                        ...state,
                                        convMessages:[],
                                        fetchConvLoading:false,
                                    }
                                    case actionTypes.FETCH_CONVERSATIONS_START:
                                        return{
                                            ...state,
                                            fetchConvLoading:true,
                                           
                                        }
                            
            
            default:return state;
        }
}
export default reducer;