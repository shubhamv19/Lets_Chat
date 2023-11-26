import React from 'react'
import {  useDisclosure } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/button';
import { Text,Modal,ModalCloseButton,ModalContent,ModalOverlay,ModalBody,ModalFooter,ModalHeader,Button,Image } from '@chakra-ui/react';
const ProfileModel = ({user,children}) => {

    const {isOpen, onOpen,onClose}=useDisclosure();
  return (
   <>
        
        {children ?( 
        <span onClick={onOpen}>{children}</span>) :(
            <IconButton d={{base: "flex"}} icon={<ViewIcon/>} onClick={onOpen}/>

        )}

<Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent height="410px">
          <ModalHeader
          fontSize="40px"
          fontFamily="Work sans"
          d="flex"
          justifyContent="center"

          
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody

          d="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          
          
          >
            <Image
            borderRadius="full"
            boxSize="150px"
            src={user.pic}
            alt={user.name}

            />
            <Text 
            fontSize ={{ base: "28px",md: "30px"}}
            fontFamily="Work sans"
            >
                Email: {user.email}
            </Text>


            
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>

           
        
        
    </>
    )
  
}

export default ProfileModel