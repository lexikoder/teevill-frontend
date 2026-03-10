import React from "react";
import { Avatar, Box, Flex, HStack, Image, Text } from "@chakra-ui/react";

const Completed = ({ completed }) => {
  return (
    <Box>
      <Text
        bg={"#2852299C"}
        p={"8px 20px"}
      
        textAlign={"center"}
        borderRadius={"8px"}
        fontWeight={500}
        fontSize={"20px"}
      >
        Completed
      </Text>

      {completed?.length >=1 ? (
          <Box border={"1px dashed #fff"} mt="20px" p="10px" borderRadius={"10px"}>
        {completed?.map((datum) => (
          <Box bg={"#3D3D3D"} key={datum?._id} p="10px" borderRadius={"10px"}>
            <Text fontWeight={500} fontSize={"20px"}>
              {datum?.title}
            </Text>
            <Flex align={"center"} justifyContent={"space-between"} mt="10px">
              <Text color={"#9F9F9F"} fontSize={"12px"}>
                Assigned To:
              </Text>
              <HStack>
                <Text fontSize={"12px"}>Miriam Silia</Text>
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
              <Text color={"#9F9F9F"} fontSize="12px">
                Status:
              </Text>

              <Text
                bg={"#3C5B60"}
                px={"15px"}
                fontSize={"12px"}
                borderRadius={"10px"}
              >
                In progress
              </Text>
            </Flex>
            <Box w={"full"} h={"1px"} bg={"#000"} my={"10px"}></Box>
            <Flex align={"center"} gap={"30px"}>
              <HStack spacing={"10px"}>
                <Image src={"/chat.png"} />
                <Text>5</Text>
              </HStack>
              <HStack spacing={"10px"}>
                <Image src={"/files.png"} />
                <Text>0</Text>
              </HStack>
            </Flex>
          </Box>
        ))}
      </Box>
      ):(
        <Text pt="20px" opacity={"50%"}>No Completed Task</Text>
      )}

    
    </Box>
  );
};

export default Completed;
