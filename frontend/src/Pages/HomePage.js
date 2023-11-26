import { Box, Container ,Text ,Tabs,Tab,TabList,TabPanel,TabPanels } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react'

import Login from '../components/Authentication/Login'
import Signup from '../components/Authentication/Signup'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

const HomePage = () => {

  const history =useHistory();
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));
    
    if(user)history.push("/chats");
  },[history])
  return (
    <Container maxW ='xl' centerContent>
     <Box
      d="flex"
      justifyContent="center"
      p={3}
      bg={"white"}
      w="100%"
      m="40px 0 15px 0"
     >
      <Text fontSize="4xl" fontFamily='Work sans' color="black">Lets Chat</Text>
     </Box>
     <Box bg="white" w="100%" p={4} borderRadius='lg' borderWidth="1px">
      <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList>
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
     <Login/>
    </TabPanel>
    <TabPanel>
      <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>
     </Box>
    </Container>
  )
}

export default HomePage