import { createContext, useContext, useReducer } from "react";
import { todoReducer } from "./Reducers";

export const SnackBarContext = createContext({})
const MyTodo = createContext({})

export function TodoProvider ({children}){
    let [todo,dispatch] = useReducer(todoReducer,[])
    return(
        <MyTodo.Provider value={{todo,dispatch}}>
            {children}
        </MyTodo.Provider>
    )
}

export let useTodo = ()=>{
    return useContext(MyTodo)
}