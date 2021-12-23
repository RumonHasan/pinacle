import React,{useReducer, createContext} from 'react';
import Cookies from 'js-cookie';

export const TaskContext = createContext();

const initialStates = {
    darkMode: Cookies.get('darkMode')=== 'ON'? true: false,
    searchValue: '',
    taskLength: null,
    delete:{
        deleteBox: false,
        deleteId: '',
        deleteTitle: '',
    },
    comment:'',
    archiveTasks:0,
    // user info
    userInfo: Cookies.get('userInfo')?
    JSON.parse(Cookies.get('userInfo')): {},

    userToken: '',
    userTheme: '',

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
        case 'LOAD_USER_THEME':
            return{
                ...state,
                userTheme: action.payload,
            }
       // add archives
       case 'ADD_TO_ARCHIVE':
           return{
               ...state,
               archiveTasks: action.payload
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
            // custom User

        case 'ADD_USER_INFO_CUSTOM':
            return{
                ...state,
                userInfo: action.payload,
            }
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
                userToken: '',
                taskLength: '',
            }
        
        // default 
        default :
        return {
            ...state
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
