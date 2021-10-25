import * as actionTypes from '../actions/actionTypes';

const initialState={
    loading:false,
    error:null,
}
let reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.SET_NEW_POST_START:
            return{
                ...state,
                loading:true,
            }
            case actionTypes.SET_NEW_POST_SUCCESS:
                return{
                    ...state,
                    loading:false,
                }
                case actionTypes.SET_NEW_POST_FAILED:
                    return{
                        ...state,
                        loading:false,
                        error:action.error,
                    }
                    default: return state;
            }
}
export default reducer;