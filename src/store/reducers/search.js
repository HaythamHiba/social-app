import * as actionTypes from '../actions/actionTypes';
let initialState={
    loading:false,
    data:[],
};
let reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.SEARCH_START:
            return{
                ...state,
                loading:true,
            }
            case actionTypes.SEARCH_RESULT:
                return{
                    ...state,
                    data:[...action.data],
                }
                default:return state;   
    }
}
export default reducer;