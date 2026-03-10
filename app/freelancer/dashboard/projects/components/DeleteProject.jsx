import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { CustomBtn } from '@/components/CustomBtn';
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProjects } from '../services/Index';


const DeleteProject = ({datum, onClose, refetch}) => {
    const queryClient = useQueryClient();

    
  const { mutate: deleteProjectMutation, isPending: isDeleteMutating } =
    useMutation({
      mutationFn: () => deleteProjects(datum?._id),
      mutationKey: ["projects"],
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["projects"] });
       refetch?.();
      onClose();
      },
      onError: (error) => {
        console.error("Update Profile Mutation error", error);
      },
    });

  const handleDelete= () => {
    deleteProjectMutation();
  };
  return (
    <Box >
        <Text textAlign={"center"} fontWeight={600} fontSize={"20px"} color="#fff">Are You sure you want to delete this project ?</Text>
        <Flex justify={"center"} my="30px" gap={"10px"}>
            <CustomBtn text={"Yes, Delete"} handleClick={handleDelete} loading={isDeleteMutating}/>
            <CustomBtn text={"No, Cancel"} bg={"red.500"} handleClick={onClose}/>
        </Flex>
    </Box>
  )
}

export default DeleteProject