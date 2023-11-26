import React from 'react'
// import { ChatState } from '../../Context/ChatProvider'
import { Avatar, Box, Text } from '@chakra-ui/react';

const UserListItem = ({user,handleFunction}) => {


  return (
    <Box
    onClick={handleFunction}
    cursor="pointer"
    background='#E8E8E8'
    _hover={{
        background:"3882AC",
        color:"white"
    }}
    width="100%"
    display="flex"
    alignItems="center"
    color="black"
    px={3}
    py={2}
    marginBottom={2}
    borderRadius="large"
    >
        <Avatar
        mr={2}
        size='sm'
        cursor="pointer"
        name={user.name}
        src={user.pic}
        />

        <Box>

            <Text>{user.name}</Text>
            <Text fontSize="xs">
            <b>Email :</b>
            {user.email}
            </Text>

        </Box>

    </Box>
  )
}

export default UserListItem