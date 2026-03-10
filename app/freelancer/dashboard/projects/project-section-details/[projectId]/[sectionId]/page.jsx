
"use client"

import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import {  BsArrowLeft } from "react-icons/bs";
import Todos from "../../../components/Todos";
import InProgress from "../../../components/InProgress";
import Completed from "../../../components/Completed";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getSpecificProject, getTask } from "../../../services/Index";

const ProjectSectionDetails = () => {
  const { projectId, sectionId } = useParams();
  
  const { data: project } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getSpecificProject(projectId),
  });
 console.log(project,"ooo")

  const { data: tasks } = useQuery({
    queryKey: ["tasks", sectionId],
    queryFn: () => getTask(sectionId),
  });
  
  
  const tasksData = tasks?.data?.data
  const pending = tasksData?.filter((datum)=>datum?.status==="in-progress")
   const completed = tasksData?.filter((datum)=>datum?.status==="completed")


  return (
    <Box h={"100%"} color={"#fff"}>
      
      <Flex align={"flex-start"} gap={"50px"} mt="50px">
      <Box flex={2}>
        <Flex align={"center"} gap={"10px"}>
          <BsArrowLeft size={30} />
          <Text fontSize={"30px"} fontWeight={500}>
            {tasksData[0]?.section?.title}
          </Text>
        </Flex>

        <Flex mt={"50px"} gap={"70px"} >
          <Box flex={1}>
            <Todos tasksData = {tasksData}/>
          </Box>
          <Box flex={1}>
            <InProgress pending={pending}/>
          </Box>
          <Box flex={1}>
            <Completed completed={completed}/>
          </Box>
        </Flex>
      </Box>

      <Flex gap={"20px"} h={"100%"} flex={1}>
      <Box h={"100vh"} bg={"#2C2C2C"} w={"1px"}></Box>
       <Box mt="30px">
        <Text fontSize={"20px"} fontWeight={500}>Task Details</Text>
        <Flex align={"center"} gap={"30px"} mt="20px">
          <Box>
            <Text fontSize={"18px"} textAlign={"center"} fontWeight={500}>{tasksData?.length}</Text>
            <Text>Tasks created</Text>
          </Box>
          <Box>
            <Text fontSize={"18px"} fontWeight={500} textAlign={"center"}>{pending?.length}</Text>
            <Text>In Progress</Text>
          </Box>
          <Box>
            <Text fontSize={"18px"} fontWeight={500} textAlign={"center"}>{completed?.length}</Text>
            <Text>Completed</Text>
          </Box>
        </Flex>

       </Box>
       
       </Flex>
      
      </Flex>
    </Box>
  );
};

export default ProjectSectionDetails;
