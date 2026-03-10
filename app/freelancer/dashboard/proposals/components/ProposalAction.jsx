"use client"

import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import { _COLORS } from "@/constant/colors";
import CustomModal from "@/components/CustomModal";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'

const ProposalAction = ({data}) => {
  console.log(data,"SCOTT")
    const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  
  return (
    <Box>

    
    <Popover>
      <PopoverTrigger>
        <Button
          bg="transparent"
          _hover={{ background: "transparent" }}
          _focus={{ background: "transparent" }}
        >
          <BsThreeDots fontSize={"2em"} color={"#fff"} />
        </Button>
      </PopoverTrigger>
      <PopoverContent w={"100%"} bg="#2C2C2C">
        <PopoverArrow bg={"#2C2C2C"} />
        <PopoverBody gap="3px" display={"flex"} flexDir={"column"} px={"20px"}>
          <Text  cursor={"pointer"}  ref={btnRef}  onClick={onOpen}>
            View Proposal
          </Text>
        </PopoverBody>
      </PopoverContent>
    </Popover>


      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"md"}
        
      >
        <DrawerOverlay />
        <DrawerContent bg="#2C2C2C">
          <DrawerCloseButton color={"#fff"}/>
          <DrawerHeader color={"#fff"}>Proposal Details</DrawerHeader>

          <DrawerBody color="#fff">
           <Text fontSize={"15px"}> {data?.title}</Text>

           <Box my="30px">
            <Text fontSize={"20px"} pb="5px">Time-Line</Text>
            <Text fontSize={"13px"} opacity={"60%"}>{data?.timeLine}</Text>
           </Box>

           <Box>
            <Text fontSize={"20px"} pb="5px">Budget</Text>
            <Text fontSize={"13px"} opacity={"60%"}>${data?.bidAmount}</Text>
           </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose} color={"#fff"}>
              Cancel
            </Button>
            {/* <Button colorScheme='blue'>Save</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    
   
    </Box>
  );
};

export default ProposalAction;
