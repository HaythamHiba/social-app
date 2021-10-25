import * as actionTypes from '../actions/actionTypes';
const initialState={
    loading:true,
    userInfo:null,
    text:'',

}
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.USER_INFO_START:
            return{
               ...state,
               loading:true,
            }
            case actionTypes.USER_INFO_SUCCESS:
                    let data=null
                    action.data.map(ind=>{
                            data={...ind}
                    })
                    console.log(data)
                return{
                    ...state,
                    loading:false,
                    userInfo:{...data}
                    
                }
                case actionTypes.REQUEST_START:
                    return{...state,
                    requestLoading:true,
                    }
                    case actionTypes.REQUEST_SUCCESS:
                        return{
                            ...state,
                            requestLoading:false,
                            text:action.text,
                        }
                default : return state;
    }
   
}
export default reducer;