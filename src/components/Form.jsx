import React, { useState , useEffect , useRef , useContext} from "react";
import shortid from "shortid";
import { TweenMax , Bounce } from 'gsap';
import { TodoContext } from '../Context/TodoContext.js';
export default function Form(props) {

const { addTodo } = useContext(TodoContext);
const [text, setText] = useState("");

 let input = useRef(null);

useEffect(()=>{
      TweenMax.fromTo( input , 2.2 , {y:-30 , ease:Bounce.easeOut} , {y:0 , ease:Bounce.easeOut})
   },[])

 const inputStyle = {
  backgroundColor : props.dark ? 'hsl(235, 24%, 19%)': 'hsl(0, 0%, 98%)',
  color : props.dark ? 'hsl(236, 33%, 92%)' : 'hsl(235, 19%, 35%)',
  transition : 'background 0.4s ease'

}

  const handleChange = (e) => {
    const input = e.target.value;
    const newInput = input.slice(0,1).toUpperCase() + input.substring(1);
    setText(newInput);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({
      id: shortid.generate(),
      text,
      completed: false
    });
    setText("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
      spellCheck="false"
      autoComplete="off" 
      ref={el => input = el  }
        onChange={handleChange}
        className="main-input"
        style={inputStyle}
        type="text"
        name="text"
        id='input'
        value={text}
        placeholder="Create new Todo..."
      />
    </form>
  );
}
