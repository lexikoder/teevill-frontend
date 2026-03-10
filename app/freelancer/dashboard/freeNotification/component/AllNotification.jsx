import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import React from "react";
import { BsClock } from "react-icons/bs";

const AllNotification = ({notificationData}) => {
  return (
    <Box bg={"#2C2C2C"} borderRadius="10px" p="20px" mt="30px" color={"#fff"}>

      {
        notificationData?.map((datum)=>(

         <Box my="20px" key={datum?._id}>
        <Flex justify={"space-between"} align={"center"}  mb="7px">
          <Text px={"10px"} py="3px" borderRadius={"7px"} bg={"#3D3D3D"}>
           {datum?.title}
          </Text>
          <Flex align={"center"} gap={"8px"}>
            <BsClock />
            <Text>{dayjs(datum?.createdAt).format("DD-MM-YYYY")}</Text>
          </Flex>
        </Flex>
        <Text>{datum?.content}</Text>
        <Box my="20px">
          <Divider />
        </Box>
      </Box>
    
        ))
      }
    
    </Box>
  );
};

export default AllNotification;
