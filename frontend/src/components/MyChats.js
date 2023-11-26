import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Text,Box, Button, Stack, useToast } from '@chakra-ui/react';
import axios from 'axios'
import { AddIcon } from '@chakra-ui/icons';
import Chatloading from "./Chatloading"
import { getSender } from '../config/ChatLogic';
import GroupChatModal from './Authentication/miscell/GroupChatModal';

const MyChats = ({fetchAgain}) => {
    const [loggedUser, setLoggedUser] = useState();
    const {selectedChat,setselectedChat,user,chats,setchats}=ChatState();

    const toast=useToast();

        const fetchChats = async()=>{
        try{
            const config ={
                headers: {
                    Authorization:`Bearer ${user.token}`,

                },
            }
            const{data}=await axios.get("/api/chat",config);
            console.log(data)
            setchats(data)
        } catch (error){
           toast({
            title:"Error Occurred",
            description:"Failed to Load the Chats",
            status:"error",
            duration:5000,
            isClosable:true,
            position:"bottom-left",
           })
        }
    }

    useEffect(()=>{
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")))
        fetchChats();
        
    },[fetchAgain])

  return <Box

  d={{base: selectedChat ? "none": "flex" ,md:"flex"}}
  flexDir="column"
  alignItems="center"
  padding={3}
  background ="white"
  w={{base: "100%", md:"31%"}}
  borderRadius="large"
  borderWidth="1px"
  
  >

    <Box
    pb={3}
    px={3}
    fontSize={{base: "28px",md: "30px"}}
    fontFamily="Work Sans"
    display='flex'
    width="100%"
    justifyContent='space-between'
    alignItems="center"
    
    >

        My Chats

        <GroupChatModal>
        
        <Button
        d="flex"
        fontSize={{base: "17px",md: "10px",lg: "17px"}}
        rightIcon={<AddIcon/>}
         >
        New Group Chat
        </Button>
        </GroupChatModal>
    </Box>

    <Box
    display="flex"
    flexDir="column"
    padding={3}
    background='#F8F8F8'
    width ="100%"
    height="100%"
    borderRadius="large"
    overflowY="hidden"
    
    >

        {chats ? (
          <Stack overflowY='scroll'>
            {chats.map((chat)=>(
                <Box
                onClick={()=>setselectedChat(chat)}
                cursor="pointer"
                background={selectedChat=== chat ? "#38B2AC": "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
                >

                    <Text>

                        {!chat.isGroupChat ? getSender(loggedUser,chat.users):chat.chatName}
                    </Text>

                    {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}

                </Box>
            ))}

          </Stack>
        ):(
            <Chatloading/>
        )}
    </Box>

  </Box>
}

export default MyChats