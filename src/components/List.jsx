import React, { useState , useEffect , useRef , useContext } from "react";
import Form from "./Form";
import Item from "./Item";

import { TweenMax , Bounce , Power1 } from 'gsap';
import { TodoContext } from '../Context/TodoContext';
import { DragDropContext , Droppable , Draggable } from 'react-beautiful-dnd';



export default function List({dark}) {
const { todos , getTodos , addTodo , deleteTodo , toggleCompleted , deleteCompleted , getItems} = useContext(TodoContext);
const [ filter , setFilter ] = useState('');
const [ newTodos , setNewTodos] = useState([])
const [ left , setLeft ] = useState(0)
 let list = useRef(null);
 let bottom = useRef(null);
useEffect(()=>{
 getTodos();

TweenMax.fromTo( list , 2.2 , {opacity:0 , ease: Power1.easeOut}, { opacity:1 ,ease: Power1.easeOut } )
TweenMax.fromTo( bottom , 2.2, { y: 40 , ease:Bounce.easeOut},  { y:0 ,  ease:Bounce.easeOut } )

 // eslint-disable-next-line react-hooks/exhaustive-deps
},[])

useEffect(() => {
filtering();
 setLeft(todos.filter((todo) => todo.completed === false).length )
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [ filter ])
useEffect(() => {
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
    console.log(` Displaying ${filter} Todos  ` )
    }


  
  const todoStyle = {
    backgroundColor: dark ? 'hsl(235, 24%, 19%)': 'white',
    borderRadius : '0 0 5px 5px',
    transition : 'background 0.4s ease',
    boxShadow:'0 3px 10px -5px black',
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
    <div style={{zIndex : '677' }} >
      <Form dark={dark} onSubmit={addTodo} />

      <div 
      ref={el=> list = el }
      style={{backgroundColor: dark ? 'hsl(235, 24%, 19%)': 'white', transition : 'background 0.4s ease'  , boxShadow:'0 5px 12px -5px black'}} className="todo-list">
      <DragDropContext onDragEnd={handleOnDragEnd}>  

    <Droppable droppableId='main'>
     {(provided)=>(
       <div {...provided.droppableProps} ref={provided.innerRef} >
          
     {newTodos.map((todo , index) =>(
     <Draggable  key={todo._id} draggableId={todo._id} index={index} >
      {(provided)=>(
    // ***********Item
    <div {...provided.draggableProps}
    {...provided.dragHandleProps}
    ref={provided.innerRef}>

 <Item
 provided={provided}
dark={dark}
todo={todo}
deleteTodo={deleteTodo}
onComplete={() => {
toggleCompleted(todo._id , {...todo , completed : !todo.completed})
}} />
    </div>

 // ***********Item
  )}
</Draggable>
))}   
  {provided.placeholder}

</div>

)}
 </Droppable>
 </DragDropContext>

</div>

        <div ref={el => bottom = el} style={todoStyle} className="bottom-items">
          <p style={{color: dark ? 'hsl(236, 33%, 92%)' : 'hsl(237, 14%, 26%)',
        fontWeight:'600'}}>
            {left} items left
          </p>
          <div className="btns">
            <button
                onClick={() => {
               setFilter('All');
                }}
               name="All"
            >
              All
            </button>
            <button
                onClick={() => {
               setFilter('Active')
             
                }}
                name="Active"
            >
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
         <button style={{ fontWeight:'600' }} onClick={() => deleteCompleted()} name="Clear Completed">
            Clear Completed
          </button> 
        </div>
      </div>
   
  );
}
