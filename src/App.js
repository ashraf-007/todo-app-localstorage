import React , {  useContext , useEffect } from 'react';
import "./style/styles.css";
import List from "./components/List";
import { TodoProvider } from './Context/TodoContext.js';
import { ThemeContext } from './Context/ThemeContext';


function App() {
   const { dark  , setDark  } = useContext(ThemeContext);


  useEffect(() => {
    localStorage.setItem('theme' , JSON.stringify(dark));
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dark])

 

 const backgroundStyle={

  display:'flex',
  justifyContent:'center',
  alignItems:'center',
    backgroundColor : dark ? 'hsl(235, 21%, 11%)': 'hsl(236, 33%, 92%)',
    position:'relative',
     width:'100%',
     minHeight:'100vh',
    zIndex : '40' 
 }
  return (
    <>

    <div style={backgroundStyle} >
      
      <img style={{transition : "all 0.8s ease"}} className="bg-image" src={ dark ? './images/bg-desktop-dark.jpg' : './images/bg-desktop-light.jpg' } alt=""/>
    
       <div className="main">
        <div className="header">
          <h1>TODO</h1>
      <img style={{zIndex : '40'}} onClick={()=>{setDark(!dark)}} id="switch" className="image" src={ dark ? 'images/icon-sun.svg' : 'images/icon-moon.svg'}  alt="" />
         
        </div>

        <div className="todo-section" style={{zIndex : '40'}}>
          <TodoProvider>
           <List dark={dark} />
           </TodoProvider>
        </div>

       
   
        <div style={{
           marginTop:'20px'
        }}className="attribution">
           <h5 style={{color:'hsl(235, 19%, 35%)' }}>Drag and drop to reorder list</h5>
             <p style={{color:'hsl(235, 19%, 35%)' }}>Challenge Coded by </p>  
           <p style={{color:'hsl(235, 19%, 35%)' }} >Ashraf Ben Moumou </p>
            {/* <a href="https://www.frontendmentor.io?ref=challenge" target="blank">
            Frontend Mentor
          </a> */}
        </div>
      </div>
    </div>


    </>
  );
}

export default App;
