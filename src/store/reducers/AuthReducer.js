import * as TYPES from "../constants";
import { createReducer } from 'redux-create-reducer'

const initialState = {
    authErrorMessage: null,
    errorMessage: null,
    isLoading: false,
    userId: '',
    userMeta: {},
};


const AuthReducer = createReducer(initialState, {

    [TYPES.IS_LOADING]: (state, action) => {
        return {
            ...state,
            isLoading: true
        }
    },
    
    [TYPES.LOG_OUT]: (state, action) => {
        return {
            ...state,
            authErrorMessage: null,
            errorMessage: null,
            isLoading: false,
            userId: '',
            userMeta: {},
        }
    },
    [TYPES.FETCHING_LOGIN]: (state, action) => {
        return {
            ...state,
            isLoading: true
        }
    },
    [TYPES.FETCHING_LOGIN_FAILURE]: (state, action) => {
        return {
            ...state,
            isLoading: false,
            authErrorMessage: ''
        }
    },
    [TYPES.FETCHING_LOGIN_SUCCESS]: (state, action) => {
        return {
            ...state,
            isLoading: false,
        }
    },
    [TYPES.FETCHING_SIGNUP_REQUEST]: (state, action) => {
        return {
            ...state,
            isLoading: true,
            isSignuped: false,
        }
    },
    [TYPES.FETCHING_SIGNUP_FAILURE]: (state, action) => {
        return {
            ...state,
            isLoading: false,
            authErrorMessage: action.payload,
            isSignuped: false,
        }
    },
    [TYPES.FETCHING_SIGNUP_SUCCESS]: (state, action) => {
        return {
            ...state,
            isLoading: false,
            isSignuped: true,
            userId: action.payload,
        }
    }
});

export default AuthReducer;
