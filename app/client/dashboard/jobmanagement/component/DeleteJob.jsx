import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { CustomBtn } from "@/components/CustomBtn";

const DeleteJob = ({onClose, handleDelete, loading}) => {
    // const {onClose} = useDisclosure()
  return (
    <Box color={"#fff"}>
      <Text textAlign={"center"} fontSize="18px" fontWeight="bold">
        Are you sure you want to delete this job post
      </Text>
      <Text fontSize="14px" textAlign={"center"} color={"#E6E6E6"} py="10px">
        This action is permanent and cannot be undone. Freelancers who applied
        will no longer see this job, and any associated proposals or messages
        will be archived.
      </Text>
      <Flex justify={"center"} gap={"30px"} my="20px">
        <CustomBtn text={"Delete"} bg={"#FF5A5F"} handleClick={handleDelete} loading={loading}/>
        <CustomBtn text={"Cancel"} bg={"none"} border={"1px solid #fff"} handleClick={onClose}/>
      </Flex>
    </Box>
  );
};

export default DeleteJob;
