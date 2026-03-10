import { Avatar, Box, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import dayjs from "dayjs";

const Todos = ({ tasksData }) => {
  console.log(tasksData, "YOUTI");
  return (
    <Box>
      <Text
        bg={"#FBBF2433"}
        p={"8px 20px"}
        // w={"fit-content"}
        textAlign={"center"}
        fontWeight={500}
        fontSize={"20px"}
        borderRadius={"8px"}
      >
        Todo
      </Text>

      {/* <Flex
        border={"1px dashed #fff"}
        justify={"center"}
        align={"center"}
        mt="20px"
        p="10px"
        borderRadius={"10px"}
      >
       
        <CustomModal
          size={"3xl"}
          bg={"#2C2C2C"}
          headerColor={"#fff"}
          header={""}
          icon={<Image src={plus} />}
        >
          <CreateTask />
        </CustomModal>
      </Flex> */}

      {
        tasksData?.length >=1 ? (
 <Box border={"1px dashed #fff"} mt="20px" p="10px" borderRadius={"10px"}>
        {tasksData?.map((datum) => (
          <Box bg={"#3D3D3D"} key={datum?._id} p="10px" mb="20px" borderRadius={"10px"}>
            <Text fontWeight={500} fontSize={"20px"}>
              {datum?.title}
            </Text>
            <Flex align={"center"} justifyContent={"space-between"} mt="10px">
              <Text color={"#9F9F9F"} fontSize={"12px"}>
                Assigned To:
              </Text>
              <HStack>
                <Text fontSize={"12px"}>
                  {datum?.assignedTo[0]?.firstName +
                    " " +
                    datum?.assignedTo[0]?.lastName}
                </Text>
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
              <Text color={"#9F9F9F"} fontSize={"12px"}>
                Due Date:
              </Text>

              <Text fontSize={"12px"}>
                {dayjs(datum?.dueDate).format("DD-MM-YYYY")}
              </Text>
            </Flex>
            <Flex align={"center"} justifyContent={"space-between"} mt="10px">
              <Text color={"#9F9F9F"} fontSize={"12px"}>
                Status:
              </Text>

              <Text
                bg={datum?.status==="todo"?"#FBBF2433":datum?.status==="in-progress"?"#3C5B60":"#2852299C"}
                // bg={"#FBBF2433"}
                px={"15px"}
                borderRadius={"10px"}
                fontSize={"12px"}
              >
                {datum?.status}
              </Text>
            </Flex>
            <Box w={"full"} h={"1px"} bg={"#fff"} my={"10px"} opacity={"50%"}></Box>
            
          </Box>
        ))}
      </Box>
        ):(
          <Text pt="20px" opacity={"50%"}>No Task Yet</Text>
        )
      }

     
    </Box>
  );
};

export default Todos;
