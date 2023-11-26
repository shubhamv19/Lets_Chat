import React, { createContext, useContext } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { useEffect } from "react";
const ChatContext = createContext();

const ChatProvider = ({children })=>{

    const[user,setUser]=useState();
    const[selectedChat, setselectedChat]=useState();
    const[chats,setchats]=useState();

    const history = useHistory();

    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"))

      setUser(userInfo);

      if(!userInfo){
        history.push('/');
      }
    }, [history])
    
    return (
        <ChatContext.Provider value={{user,setUser,selectedChat, setselectedChat,chats,setchats}}>

            {children}
        </ChatContext.Provider>
    )
}
export const ChatState= ()=>{
  return useContext(ChatContext);
}


export default ChatProvider;



