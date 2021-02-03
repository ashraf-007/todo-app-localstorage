import React, { useState , useEffect , useRef , useContext } from "react";
import Form from "./Form";
import Item from "./Item";
import { TweenMax , Bounce , Power1 } from 'gsap';
import { TodoContext } from '../Context/TodoContext';
import { DragDropContext , Droppable , Draggable } from 'react-beautiful-dnd';
import { ThemeContext } from "../Context/ThemeContext";



export default function List() {

  const [ filter , setFilter ] = useState('');
  const [ newTodos , setNewTodos] = useState([])
  const [ left , setLeft ] = useState(0)
  const { todos , getTodos , addTodo ,  deleteCompleted , getItems } = useContext(TodoContext);
  const { dark } = useContext(ThemeContext);

 let list = useRef(null);
 let bottom = useRef(null);

useEffect(()=>{
 getTodos();
//  setNewTodos(todos)
TweenMax.fromTo( list , 2.2 , {opacity:0 , ease: Power1.easeOut}, { opacity:1 ,ease: Power1.easeOut } )
TweenMax.fromTo( bottom , 2.2, { y: 40 , ease:Bounce.easeOut},  { y:0 ,  ease:Bounce.easeOut } )

 // eslint-disable-next-line react-hooks/exhaustive-deps
},[])

useEffect(() => {
filtering();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [ filter ])

useEffect(() => {
  localStorage.setItem('todos' , JSON.stringify(todos))
  setNewTodos(todos)
  setLeft(todos.filter((todo) => todo.completed === false).length )

}, [todos])

  function filtering(){
    if ( filter === 'All'){
     setNewTodos(todos)
    }
    if (filter === 'Active'){
        setNewTodos(todos.filter(todo => !todo.completed))
    } 
    if (filter === 'Completed'){
       setNewTodos(todos.filter(todo => todo.completed))
    }
    }
    
  const handleOnDragEnd = (result) => {

    if(!result.destination) return ;
    const items = Array.from(newTodos)
    const [ reorderedItem ] = items.splice(result.source.index , 1)
    items.splice(result.destination.index , 0 , reorderedItem);
     getItems(items)
     setNewTodos(items)

   }
 
  return (
    <div>
      <Form dark={dark} onSubmit={addTodo} />
<div 
      ref={el=> list = el }
      style={{backgroundColor: dark ? 'hsl(235, 24%, 19%)': 'white'}} className="todo-list">
  <DragDropContext onDragEnd={handleOnDragEnd}>  

       <Droppable droppableId='main'>
        {(provided)=>(
         <div {...provided.droppableProps} ref={provided.innerRef} >
           
          {newTodos.map((todo , index) =>(
           <Draggable  key={todo.id} draggableId={todo.id} index={index} >
             {(provided)=>(
              <div {...provided.draggableProps}
                   {...provided.dragHandleProps}
                   ref={provided.innerRef}>

                <Item
                provided={provided}
                todo={todo}
                dark={dark}
                />
             </div>

              )}
          </Draggable>
              ))}   
              {provided.placeholder}

        </div>
        )}
      </Droppable>
  </DragDropContext>

</div>

        <div ref={el => bottom = el} style={{backgroundColor: dark ? 'hsl(235, 24%, 19%)': 'white'}} className="bottom-items">
          <p style={{color: dark ? 'hsl(236, 33%, 92%)' : 'hsl(237, 14%, 26%)'}}>
            {left} items left
          </p>
            <div className="btns">
              <button
                 onClick={() => {
                 setFilter('All');
                 }}
                 name="All" >
                 All
              </button>
            <button
                onClick={() => {
               setFilter('Active')
             
                }}
                name="Active" >
              Active
            </button>
            <button
                 onClick={() => {
                  setLeft(todos.filter((todo) => todo.completed === false).length );
                  setFilter('Completed');
                 }}
               name="Completed"
            >
              Completed
            </button>
          </div>
         <button onClick={() => deleteCompleted()} name="Clear Completed">
            Clear Completed
          </button> 
        </div>
      </div>
   
  );
}
