import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from './Context/ThemeContext';


const rootElement = document.getElementById("root");
ReactDOM.render(
<ThemeProvider>
     <App />
</ThemeProvider>

, rootElement);


