import * as actionTypes from '../actions/actionTypes';
const initialState={
    token:null,
    loading:false,
    err:false,
    error:'',
    perId:null,
    profilePic:null,
    userName:'',

}
const  reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionTypes.SIGNIN_START:
            return{
                ...state,
                loading:true,
            }
            case actionTypes.SIGNIN_SUCCESS:
                return{
                    ...state,
                    token:action.token,
                    perId:action.perId,
                    loading:false,
                    userName:action.userName,
                    profilePic:action.profilePic,
                }
                case actionTypes.SIGNIN_FAILED:
                    return{
                        ...state,
                        error:action.error,
                        loading:false,
                        err:true,
                    }
                    case actionTypes.SIGNUP_START:
            return{
                ...state,
                loading:true,
            }
            case actionTypes.SIGNUP_SUCCESS:
                return{
                    ...state,
                    token:action.token,
                    perId:action.perId,
                    loading:false,
                    userName:action.userName,
                    profilePic:action.profilePic,
                }
                case actionTypes.SIGNUP_FAILED:
                    return{
                        ...state,
                        error:action.error,
                        loading:false,
                        err:true,
                    }   
                    case actionTypes.RECOVER_START:
                        return{
                            ...state,
                            loading:true,
                        }
                        case actionTypes.RECOVER_SUCCESS:
                            return{
                                ...state,
                                
                                loading:false,
                            }
                            case actionTypes.RECOVER_FAILED:
                                return{
                                    ...state,
                                    error:action.error,
                                    loading:false,
                                }   
                                case actionTypes.LOGOUT_SUCCESS:
                                    return{
                                        ...state,
                                        token:null,
                                        perId:null,
                                        profilePic:null,
                                        userName:'',

                                    }   
                    default : return state;
    }
}
export default reducer;