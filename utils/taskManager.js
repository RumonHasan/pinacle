import React,{useReducer, createContext} from 'react';
import Cookies from 'js-cookie';

export const TaskContext = createContext();

const initialStates = {
    darkMode: Cookies.get('darkMode')=== 'ON'? true: false,
    searchValue: '',
    taskLength: {},
    delete:{
        deleteBox: false,
        deleteId: '',
        deleteTitle: '',
    },
    comment:'',
    // user info
    userInfo: {},

    userToken: '',
}

const reducer = (state, action)=>{
    switch(action.type){
        case 'DARKMODE_OFF':
            return {
                ...state,
                darkMode: false,
            }
        case 'DARKMODE_ON':
            return{
                ...state,
                darkMode:true
            }
        // search value
        case 'UPDATE_SEARCH_VALUE':
            return{
                ...state,
                searchValue: action.payload
            }
        // total tasls
        case 'TOTAL_TASKS':
            const length = action.payload
            return {
                ...state,
                taskLength: length
            }
        // delete box
        case 'OPEN_DELETE_BOX':
            const {id, title} = action.payload;
            return {
                ...state,
                delete:{
                    ...state.delete,
                    deleteBox: true,
                    deleteId: id,
                    deleteTitle: title,
                }
            }
        case 'CLOSE_DELETE_BOX':
            return{
                ...state,
                delete:{
                    ...state.delete,
                    deleteBox:false,
                }
            }
        // add comment
        case 'ADD_COMMENT':
            return{
                ...state,
                comment: action.payload
            }
        case 'CLEAR_COMMENT_FIELD':
            return{
                ...state,
                comment: '',
            }
        // USER INFO
        case 'ADD_USER_INFO':
            return {
                ...state,
                userInfo: action.payload.result,
                userToken: action.payload.token,
            }
        case 'LOGOUT_USER':
            return{
                ...state,
                userInfo: null,
                userToken: null,
            }
    }
}


export const TaskProvider = (props) =>{
    const [state, dispatch] = useReducer(reducer, initialStates)
    const value = {state, dispatch};
    return <TaskContext.Provider value={value}>
        {props.children}
    </TaskContext.Provider>
}
