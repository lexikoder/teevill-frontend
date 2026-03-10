"use client"

import {
  Avatar,
  Box,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BsTrash } from "react-icons/bs";
import dayjs from "dayjs";
import { deleteTask, getTask } from "../services/Index";

const SectionCard = ({ section, refetch, onClose }) => {
  const queryClient = useQueryClient();


  const { data: tasksData, isLoading } = useQuery({
    queryKey: ["tasks", section._id],
    queryFn: () => getTask(section._id),
  });

  const { mutate: deleteTaskMutation, isPending: isDeleteMutating } = useMutation({
    mutationFn: (taskId) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", section._id] });
      refetch?.();
      onClose?.();
    },
    onError: (error) => {
      console.error("Delete Task error:", error);
    },
  });

  const handleDelete = (taskId) => {
    deleteTaskMutation(taskId);
  };

  const tasks = tasksData?.data?.data?.slice(0,2) || [];

  return isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <Box flex={1} bg="#2C2C2C" borderRadius="10px" py="10px">
      {tasks.map((task) => (
        <Box
          key={task?._id}
          border={"1px dashed #fff"}
          mt="10px"
          p="10px"
          borderRadius={"10px"}
        >
          <Box bg={"#3D3D3D"} p="10px" borderRadius={"10px"}>
            <Flex align={"center"} justify={"space-between"}>
              <Text fontWeight={500} fontSize={"20px"}>
                {task?.title}
              </Text>
              <BsTrash
                fill="#ca4a3eff"
                cursor="pointer"
                onClick={() => handleDelete(task?._id)}
              />
            </Flex>

            <Flex align={"center"} justifyContent={"space-between"} mt="10px">
              <Text color={"#9F9F9F"} fontSize={"12px"}>
                Assigned To:
              </Text>
              <HStack spacing={2}>
                <Text fontSize="12px">{task?.assignedTo[0]?.firstName}</Text>
                <Avatar size={"sm"} name={task?.assignedTo[0]?.firstName} />
              </HStack>
            </Flex>

            <Flex align={"center"} justifyContent={"space-between"} mt="10px">
              <Text color={"#9F9F9F"}>Due Date:</Text>
              <Text fontSize="12px">
                {dayjs(task?.dueDate).format("DD-MM-YYYY")}
              </Text>
            </Flex>

            <Flex align={"center"} justifyContent={"space-between"} mt="10px">
              <Text color={"#9F9F9F"}>Status:</Text>
              <Text
                bg={"#2DAAD391"}
                px={"10px"}
                borderRadius={"5px"}
                fontSize="12px"
              >
                {task?.status}
              </Text>
            </Flex>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default SectionCard;
