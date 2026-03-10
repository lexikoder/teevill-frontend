import { Box, Flex, Switch, Text } from '@chakra-ui/react'
import React from 'react'

const NotificationManagement = () => {
  return (
   <Box my="50px">
        <Text>Notification Mangement</Text>
        <Box bg={"#2C2C2C"} borderRadius={"10px"} p={"10px 20px"}>
           <Flex align={"center"} justify={"space-between"}> 
            <Box>
                <Text>Announcement</Text>
                <Text color={"#F5F5F5"} opacity={"50%"}>Occasional announcement on new features</Text>
            </Box>
            <Box>
                <Switch />
            </Box>
           </Flex>
           <Box w={"full"} h={"2px"} bg={"#464646"}> </Box>

           <Flex mt="20px" align={"center"} justify={'space-between'}>
            <Box>
                <Text>Project Request</Text>
                <Text color={"#F5F5F5"} opacity={"50%"}>Occasional notification from clientreaching out to you</Text>
            </Box>
            <Box>
                <Switch />
            </Box>
           </Flex>
           <Box w={"full"} h={"2px"} bg={"#464646"}> </Box>
        </Box>

    </Box>
  )
}

export default NotificationManagement