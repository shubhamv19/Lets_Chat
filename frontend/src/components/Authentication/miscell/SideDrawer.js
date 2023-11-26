import { Input, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Tooltip, useToast, Spinner} from '@chakra-ui/react';
import React,{useState} from 'react'
import { Box,Text } from '@chakra-ui/layout';
import {Button} from '@chakra-ui/button'
import {useDisclosure} from '@chakra-ui/hooks';
import {BellIcon,ChevronDownIcon} from '@chakra-ui/icons'
import { ChatState } from '../../../Context/ChatProvider';
import ProfileModel from './ProfileModel';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import axios from 'axios';
import Chatloading from '../../Chatloading';
import { Avatar } from '@chakra-ui/avatar';
import UserListItem from '../../UserAvatar/UserListItem';
const SideDrawer = () => {

    const [search,setSearch]=useState("");
    const [searchResult,setSearchResult]=useState([]);
    const [loading,setloading]=useState(false);
    const [loadingChat,setloadingChat]=useState(false);

    const {user,suser,setselectedChat,chats,setchats}=ChatState();
    const history=useHistory();
    const {isOpen,onOpen,onClose}=useDisclosure();

    const logouthandler=()=>{
        localStorage.removeItem("userInfo");
        history.push("/")
    }
    const toast=useToast()

    const handleSearch= async()=>{
        if(!search){
            toast({
                title: "Please Enter something",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            })
            return;
        }

        try{
            setloading(true)

            const config={

                headers:{
                    Authorization:`Bearer ${user.token}`,
                }
            }
            const {data} = await axios.get(`/api/user?search=${search}`,config);
            setloading(false);
            setSearchResult(data);

        } catch(error){
            toast({
                title: "Error Occured",
                description: "Failed to load the search results",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom-left",
            })
        }
    }

    const accessChat= async(userId)=>{

        console.log(userId);
       try{
        setloadingChat(true)
        const config= {
            headers: {
                "Content-type":"application/json",
                Authorization:`Bearer ${user.token}`,
            },
        }
        const {data}=await axios.post(`/api/chat`,{userId},config);
         
        if(!chats.find((c)=>c._id===data._id))setchats([data, ...chats])
          

        setselectedChat(data);
        setloadingChat(false);
        onClose();
       } catch (error){
          toast({
            title: "Error fetching the chat",
            description:error.message,
            status:"error",
            duration:5000,
            isClosable:true,
            position: "bottom-left",
          })
       }
    }

  return (
  <>
   <Box
   display="flex"
   justifyContent="space-between"
   alignItems='center'
   bg='white'
   width='100%'
   padding="5px 10px 5px 5px"
   borderWidth="5px"
   >
    <Tooltip label="Search Users to chat" 
    hasArrow 
    placement='bottom-end'
    >

        <Button variant="ghost" onClick={onOpen}>
        <i class="fas fa-search"></i>
        <Text display={{base:"none",medium:'flex'}} px='4'>Search User</Text>

        </Button>
    </Tooltip>
    
    <Text fontSize="2xl" fontFamily="Work sans">
       <center>Lets Chat</center>
    </Text>
    <div>
        <Menu>
            <MenuButton p={1}>
                <BellIcon fontsize= "2xl" m={1}/>
            </MenuButton>
            {/* <MenuList></MenuList> */}

            <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                <Avatar size='sm' cursor="pointer" name={user.name} />
            </MenuButton>

            <MenuList>
                <ProfileModel user={user}>
                    <MenuItem>My Profile</MenuItem>{" "}
                    </ProfileModel>
                <MenuDivider/>
                <MenuItem onClick={logouthandler}>Logout</MenuItem>
            </MenuList>
                
            </Menu>
        </Menu>
    </div>

  </Box>

  <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay/>
        <DrawerContent>
           <DrawerHeader borderBottomWidth="1px">Search Users
           
          
           </DrawerHeader>
           <DrawerBody>
            <Box display='flex' pb={2}>

                <Input
                placeholder="search by name or email"
                mr={2}
                value={search}
                onChange={(e)=>setSearch(e.target.value)}


                
                />

                <Button onClick={handleSearch}>GO </Button>

            </Box>


            {loading ? 
                <Chatloading/> 
            :
            
                (
                    
                    searchResult?.map((suser) =>(
                    
                     <UserListItem
                     key={suser._id}
                     user={suser}
                     handleFunction={()=>accessChat(suser._id)}
                     />
                    )
                ))
                

}

        {loadingChat && <Spinner ml="auto" d="flex"/>}
        </DrawerBody>

        </DrawerContent>

  
    
  </Drawer>
  </>
  )
  
}

export default SideDrawer