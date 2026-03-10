import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'


const Card = ({flex, cardText, icon, subText, subText1, handleClick}) => {
  return (
    <Box bg={"#2C2C2C"} color={"#fff"} p={"20px"} borderRadius={"10px"} flex={flex}>
        <Flex align={"center"} gap={"20px"} >
            <Box bg={"#E9FCFF"} borderRadius={"50px"} p={"10px"}>{icon}</Box>
            <Text fontSize={"20px"}>{cardText}</Text>
        </Flex>
        <Flex mt="20px" fontWeight={800} fontSize={"25px"} justify={"space-between"} align={"baseline"}>
            <Text>{subText}</Text>
            <Text color={"#FBBF24"} fontSize={"16px"} fontWeight={500} onClick={handleClick} cursor={"pointer"}>{subText1}</Text>
        </Flex>

    </Box>
  )
}

export default Card