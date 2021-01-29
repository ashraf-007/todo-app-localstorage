import React , { createContext , useReducer }from 'react';
import { AppReducer }from './AppReducer.js';
import axios from 'axios';
export const TodoContext = createContext();

 const initialState = {
     todos: [] ,
     todoCount : 0
 }


export const TodoProvider = ({children})=> {
   const [ state , dispatch ] = useReducer(AppReducer , initialState );
   //Actions 
   async function getTodos() {
    try {
        const { data } = await axios.get('https://todo-app-server1.herokuapp.com/todos');

        dispatch({
            type:'GET_TODOS',
            payload : data
        })
       
    } catch (error) {
        console.log("Error in Geting Todos from Server : " , error)
    }
}
async function  addTodo(todo) {
    const config = {
        headers : {
          'Content-type':'application/json'
        }
    }
          try {

         await axios.post('https://todo-app-server1.herokuapp.com/todos' , todo , config );
         dispatch({
            type:'ADD_TODO',
            payload : todo
        })
       
    } catch (error) {
        console.log("Post error message : " , error)
    }
}
async function deleteTodo(id) {
try {
    await axios.delete(`https://todo-app-server1.herokuapp.com/todos/${id}`)
    dispatch({
     type:'DELETE_TODO',
     payload: id
    })
} catch (error) {
    console.log('Error in deleting a Todo ' , error)
}
}
async function toggleCompleted(id , update){
    const config = {
        headers : {
          'Content-type':'application/json'
        }
    }

    try {
       const { data } =  await axios.patch( `https://todo-app-server1.herokuapp.com/todos/${id} `, update , config);

        dispatch({
            type:'TOGGLE_COMPLETED',
            payload: data.data
        })

    } catch (error) {
        console.log("Updating completed error : " , error)
    }
}
function getItems(items){
    try {
        dispatch({
            type:'NEW',
            payload : items
        })
    } catch (error) {
        console.log('Error in getting items from onDragEnd : ' , error)
    }
    
}
 async function deleteCompleted(){
    try {
         const response = await axios.delete('https://todo-app-server1.herokuapp.com/todos');
         dispatch({
             type:'DELETE_ALL',
             payload: response 
         })
    } catch (error) {
        console.log('Error in deleting All ...' , error)
        
    }
}


    return (
       <TodoContext.Provider value={{
        todos : state.todos ,
        getTodos ,
        addTodo ,
        deleteTodo,
        toggleCompleted,
        getItems,
        deleteCompleted
       }}>
           {children}
       </TodoContext.Provider>
    )

}