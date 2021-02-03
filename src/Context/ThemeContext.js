import React , { useState , createContext } from 'react';

export const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
const localTheme = localStorage.getItem('theme')
const  [ dark , setDark ] = useState(JSON.parse(localTheme));

    return(
           <ThemeContext.Provider value={{ dark , setDark } }>
               {children}
           </ThemeContext.Provider>
    )
}