import React,{useReducer, createContext} from 'react';
import Cookies from 'js-cookie';

export const TaskContext = createContext();

const initialStates = {
    darkMode: Cookies.get('darkMode')=== 'ON'? true: false
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
    }
}


export const TaskProvider = (props) =>{
    const [state, dispatch] = useReducer(reducer, initialStates)
    const value = {state, dispatch};
    return <TaskContext.Provider value={value}>
        {props.children}
    </TaskContext.Provider>
}
