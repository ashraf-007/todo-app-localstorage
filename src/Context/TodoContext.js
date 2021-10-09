import React , { createContext , useState }from 'react';
import { v4 as uuid } from 'uuid';
export const TodoContext = createContext();

export const TodoProvider = ({children})=> {
const [ todos , setTodos ] = useState([]);

   //Actions 
 
  function  addTodo(todo) {
  setTodos((pre)=> {
      return [ todo , ...pre ]
  }) ;
   localStorage.setItem('todos' , JSON.stringify(todos))

}
 function deleteTodo(id) {
setTodos(todos.filter((todo)=> todo.id !== id))
localStorage.setItem('todos' , JSON.stringify(todos))
}

 function toggleCompleted(id){

   setTodos(todos.map((todo)=> {
        if (todo.id === id ){
        return  { 
                  id: todo.id,
                  text : todo.text,
                  completed : !todo.completed 
                }
         }
        else {
            return todo;
        }
    }

))

  }

function getItems(items){
   setTodos(items)

}
  function deleteCompleted(){
    setTodos(todos.filter((todo)=> !todo.completed))

}
function getTodos() {
  const localData = localStorage.getItem('todos')
  if(!localData){
    setTodos([{
      id:uuid(),
      text : 'Complete online JavaScript course',
      completed : true
    },
    {
      id:uuid(),
      text : 'Jog around the park 3x',
      completed : false 
    },
    {
      id:uuid(),
      text :  '10 minutes meditation',
      completed : false 
    },
    {
      id:uuid(),
      text :'Read for 1h',
      completed : false 
    },
    {
      id:uuid(),
      text :'Pick up groceries',
      completed : false 
    }])
  } else {
    setTodos(JSON.parse(localData))
  }
   
}

    return (
       <TodoContext.Provider value={{
        todos ,
        setTodos,
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