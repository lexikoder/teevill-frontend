"use client"
import { Avatar, Box, Flex, HStack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import React from 'react'
import { BsChatLeftTextFill } from "react-icons/bs";

const Conversation = () => {
  const router = useRouter()
  return (
    <Box>
        <Flex align={"center"} justify={"space-between"} mb="10px">
            <Text color={"#fff"}>Recent Conversation</Text>
            <Text color={"#FBBF24"} cursor={"pointer"} onClick={()=>{
              router.push("/messages")
            }}>View All</Text>
        </Flex>
        <Box bg={"#2C2C2C"} borderRadius={"10px"} p={"10px 20px"} >
          <Flex align={"center"} justify={"space-between"}>
            <HStack color={"#fff"} spacing={5}>
                <Avatar name="samuel jackson"/>
                <Box>
                    <Text fontWeight={"bold"}>Vanessa Kent</Text>
                    <Text fontSize="small" opacity={"70%"}>vanessa@gmail.com</Text>
                </Box>
            </HStack>

            <Box>
                <BsChatLeftTextFill size={20} color='#fff'/>
            </Box>

          </Flex>
          <Flex align={"center"} justify={"space-between"} my={"20px"}>
            <HStack color={"#fff"} spacing={5}>
                <Avatar name="John Micheal"/>
                <Box>
                    <Text fontWeight={"bold"}>Vanessa Kent</Text>
                    <Text fontSize="small" opacity={"70%"}>vanessa@gmail.com</Text>
                </Box>
            </HStack>

            <Box>
                <BsChatLeftTextFill size={20} color='#fff'/>
            </Box>

          </Flex>
          <Flex align={"center"} justify={"space-between"}>
            <HStack color={"#fff"} spacing={5}>
                <Avatar name="Tommy Philip"/>
                <Box>
                    <Text fontWeight={"bold"}>Vanessa Kent</Text>
                    <Text fontSize="small" opacity={"70%"}>vanessa@gmail.com</Text>
                </Box>
            </HStack>

            <Box>
                <BsChatLeftTextFill size={20} color='#fff'/>
            </Box>

          </Flex>
          <Flex align={"center"} justify={"space-between"}  my={"20px"}>
            <HStack color={"#fff"} spacing={5}>
                <Avatar name="yinka Wilson"/>
                <Box>
                    <Text fontWeight={"bold"}>Vanessa Kent</Text>
                    <Text fontSize="small" opacity={"70%"}>vanessa@gmail.com</Text>
                </Box>
            </HStack>

            <Box>
                <BsChatLeftTextFill size={20} color='#fff'/>
            </Box>

          </Flex>
        </Box>
        
    </Box>
  )
}

export default Conversation