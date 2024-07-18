import { createContext, useContext } from "react"; // initial
export const ThemeContext =  createContext({ 

})

export const ThemeProvider = ThemeContext.Provider; // this variable should be wrapped like a parent in app.jsx where you want to send props like data

export default function usecotextFunction(){ // this function will be use

    return useContext(ThemeContext)

}




