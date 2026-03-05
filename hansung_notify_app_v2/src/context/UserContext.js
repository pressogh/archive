import React, {createContext, useReducer, useContext} from 'react';
import * as api from '../service/Api'
import { createAsyncDispatcher, createAsyncHandler, initialAsyncState } from './AsyncActionUtils';

const initialState = {
    user: initialAsyncState,
  };

const userHandler = createAsyncHandler("GET_USER", "user");

const userReducer = (state, action) => {
    console.log(`Usercontext Reducer`, state);
    
    switch (action.type) {
        case 'GET_USER':
        case 'GET_USER_SUCCESS':
        case 'GET_USER_ERROR':
            return userHandler(state, action);
        default:
            throw new Error(`Unhanded action type: ${action.type}`);
    }
};

const UserStateContext = createContext(null);
const UserDispatchContext = createContext(null);

export const getUser = createAsyncDispatcher('GET_USER', api.getUserCookie);

export const UserProvider = ({children}) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    )
};

export const useUserState = () => {
    const state = useContext(UserStateContext);

    if (!state) {
        throw new Error(`Cannot find UserProvider`);
    }
    return state;
}

export const useUserDispatch = () => {
    const dispatch = useContext(UserDispatchContext);

    if (!dispatch) {
        throw new Error(`Cannot find UserProvider`);
    }
    return dispatch;
}