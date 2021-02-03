import React , { useContext } from "react";
import { TodoContext } from '../Context/TodoContext';
import { ThemeContext } from '../Context/ThemeContext';

function Item({ todo , provided }) {
const { toggleCompleted  , deleteTodo } = useContext(TodoContext);
 const { dark } = useContext(ThemeContext);

  const todoStyle = {
    backgroundColor: dark ? 'hsl(235, 24%, 19%)': 'white',
    transition : 'background 0.4s ease'
  
  }
  
  return (
          <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={todoStyle}
          className="todo-item" >
           <div className="todo-text">
             <div className="container">
              <label className='con'>
               <input
               onClick={()=> toggleCompleted(todo.id)}
               defaultChecked={todo.completed}
               type="checkbox"
               name="checkbox"
               id='checkbox'
              />
               <span className="checkmark"></span>
               </label>
             <p id="paragraph"
               style={{
                 textDecoration: todo.completed ? "line-through" : "none"
               ,opacity : todo.completed ? 0.3 : 1 ,
               color : dark ? 'hsl(233, 11%, 84%)' : 'hsl(235, 19%, 35%)'}}
             >
               {todo.text}
             </p>
             </div>

           </div>
           <img onClick={()=>{
             deleteTodo(todo.id)
             }} className="iconx" src="./images/icon-cross.svg" alt=""/> 
         </div>
 
  );
}
export default Item;
