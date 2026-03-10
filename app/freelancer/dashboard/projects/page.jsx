"use client"

import { Box, Flex, Tabs, TabList, Tab, useDisclosure } from "@chakra-ui/react";
import React, { useState, useRef, useMemo } from "react";
import AllProjectsTable from "./components/AllProjectsTable";
import { CustomBtn } from "@/components/CustomBtn";
import { BsPlus } from "react-icons/bs";
import FullPageLoader from "@/components/FullPageLoader";
import {  useQuery } from "@tanstack/react-query";
import CreateProject from "./components/CreateProject";
import { getProjects } from "./services/Index";

const Page = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const {
    data: allProjects,
    isLoading,
    refetch: fetchProjects
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  console.log("allProjects", allProjects);

  const projectData = allProjects?.data?.data || [];
  const shared = projectData?.filter(
    (dataum) => dataum?.projectType === "shared"
  );
  const personal = projectData?.filter(
    (dataum) => dataum?.projectType === "personal"
  );
  const client = projectData?.filter(
    (dataum) => dataum?.projectType === "client"
  );

  const [tabToShow, setTabToShow] = useState("all");

  const filteredProjects = useMemo(() => {
    if (tabToShow === "all") return projectData;
    if (tabToShow === "shared")
      return projectData.filter((data) => data?.shared === true);
    if (tabToShow === "personal")
      return projectData.filter((data) => data?.projectType === "personal");
    if (tabToShow === "client")
      return projectData.filter((data) => data?.projectType === "client");
    return projectData;
  }, [tabToShow, projectData]);

 

 

  return isLoading ? (
    <FullPageLoader />
  ) : (
    <Box h="100vh">
      
      <Flex my={"50px"} align={"center"} justify={"space-between"}>
        <Tabs variant="unstyled" mt="10px">
          <TabList
            bg={"#2C2C2C"}
            p={"5px"}
            color={"#fff"}
            borderRadius={"10px"}
            w={"fit-content"}
            gap={"10px"}
          >
            <Tab
              _selected={{ color: "#000", bg: "#F5F5F5" }}
              borderRadius={"10px"}
              fontWeight={"bold"}
              onClick={() => setTabToShow("all")}
            >
              All Projects ({projectData.length})
            </Tab>
            <Tab
              _selected={{ color: "#000", bg: "#F5F5F5" }}
              borderRadius={"10px"}
              fontWeight={"bold"}
              onClick={() => setTabToShow("shared")}
            >
              Shared Projects ({shared?.length})
            </Tab>
            <Tab
              _selected={{ color: "#000", bg: "#F5F5F5" }}
              borderRadius={"10px"}
              fontWeight={"bold"}
              onClick={() => setTabToShow("personal")}
            >
              My Projects ({personal?.length})
            </Tab>
            <Tab
              _selected={{ color: "#000", bg: "#F5F5F5" }}
              borderRadius={"10px"}
              fontWeight={"bold"}
              onClick={() => setTabToShow("client")}
            >
              Clients Projects ({client?.length})
            </Tab>
          </TabList>
        </Tabs>

        <Box>
          <CustomBtn
            childComp={<BsPlus size={30} />}
            ref={btnRef}
            handleClick={onOpen}
            text={"Add New Project"}
            color={"#000"}
            fontWeight={"bold"}
          />
        </Box>
      </Flex>

      <Box>
        <AllProjectsTable payments={filteredProjects} refetch={fetchProjects} />
      </Box>

      <CreateProject
        isOpen={isOpen}
        finalFocusRef={btnRef}
        onClose={onClose}
        refetch={fetchProjects}
      />
    </Box>
  );
};

export default Page;
