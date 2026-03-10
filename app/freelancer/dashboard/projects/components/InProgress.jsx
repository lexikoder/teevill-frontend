import { Avatar, Box, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";

import dayjs from "dayjs";

const InProgress = ({ pending }) => {
  console.log(pending, "PENDING");
  return (
    <Box>
      <Text
        bg={"#3C5B60"}
        p={"8px 20px"}
        // w={"fit-content"}
        textAlign={"center"}
        fontWeight={500}
        fontSize={"20px"}
        borderRadius={"8px"}
      >
        In Progress
      </Text>


      {
        pending?.length>=1 ? (
           <Box border={"1px dashed #fff"} mt="20px" p="10px" borderRadius={"10px"}>
        {pending?.map((datum) => (
          <Box bg={"#3D3D3D"} key={datum?._id} p="10px" borderRadius={"10px"}>
            <Text fontWeight={500} fontSize={"20px"}>
              {datum?.title}
            </Text>
            <Flex align={"center"} justifyContent={"space-between"} gap={"20px"} mt="10px">
              <Text color={"#9F9F9F"} fontSize={"12px"}>
                Assigned To:
              </Text>
              <HStack>
                <Text fontSize={"12px"}>{
                    datum?.assignedTo[0]?.firstName +
                    " " +
                    datum?.assignedTo[0]?.lastName
                  }</Text>
                <Avatar
                  size={"sm"}
                  name={
                    datum?.assignedTo[0]?.firstName +
                    " " +
                    datum?.assignedTo[0]?.lastName
                  }
                />
              </HStack>
            </Flex>
            <Flex align={"center"} justifyContent={"space-between"} mt="10px">
              <Text color={"#9F9F9F"} fontSize={"12px"}>Due Date:</Text>

              <Text fontSize={"12px"}>{dayjs(datum?.dueDate).format("DD-MM-YYYY")}</Text>
            </Flex>
            <Flex align={"center"} justifyContent={"space-between"} mt="10px">
              <Text color={"#9F9F9F"} fontSize="12px">Status:</Text>

              <Text bg={"#3C5B60"} px={"15px"} fontSize={"12px"} borderRadius={"10px"}>
                In progress
              </Text>
            </Flex>
            <Box w={"full"} h={"1px"} bg={"#fff"} my={"10px"} opacity={"50%"}></Box>
            {/* <Flex align={"center"} gap={"30px"}>
              <HStack spacing={"10px"}>
                <Image src={chat} />
                <Text>5</Text>
              </HStack>
              <HStack spacing={"10px"}>
                <Image src={files} />
                <Text>0</Text>
              </HStack>
            </Flex> */}
          </Box>
        ))}
      </Box>
        ):(
          <Text pt="20px" opacity={"50%"}>No Task In Progress</Text>
        )
      }

     

      
    </Box>
  );
};

export default InProgress;
