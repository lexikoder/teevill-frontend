"use client"

import {
  Box,
  Flex,
  Tab,
  TabList,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import SearchField from "@/components/SearchField";
import { CustomBtn } from "@/components/CustomBtn";
import { FaPlus } from "react-icons/fa6";
import ActiveJob from "./component/ActiveJob";
import ClosedJob from "./component/ClosedJob";
import DraftedJob from "./component/DraftedJob";
import PostJob from "./component/PostJob";
// import { getSingleClientJobs } from ".";
import { getSingleClientJobs } from "./service";
import { useQuery} from "@tanstack/react-query";
// import { useGetState } from "../../../GlobalStateContext/useGetState";
import { useGlobalState } from "@/context/GlobalStateContext";

import FullPageLoader from "@/components/FullPageLoader";


const JobManagement = () => {
   const [search, setSearch] = useState("");
    const [filter, setFilter] = useState({ fromDate: "", toDate: "", name: "" });
  
    const handleSearchChange = (e) => {
      setSearch(e.target.value);
      setFilter((prev) => ({
        ...prev,
        name: e.target.value, 
      }));
    };
  const {user,setUser}= useGlobalState()
  const id = user?._id
  console.log(id, "id");
  // const closeData = payments?.filter((pay) => pay?.status === "closed");


  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [tabToShow, setTabToShow] = useState("active");

  const {
    data: allClientJobS,
    isLoading,
    refetch: fetchProjects,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: getSingleClientJobs,
  });

  const alljobs = allClientJobS?.data?.data;
  console.log(alljobs, "alljobs");

   const filteredJobs = alljobs?.filter((job) =>
  job?.title?.toLowerCase().includes(filter.name.toLowerCase())
);
  // const drafted = alljobs?.filter((job) => job?.status === "drafted");
  const drafted = filteredJobs?.filter((job) => job?.status === "drafted");
    const closed = filteredJobs?.filter((job) => job?.status === "closed");

  return isLoading ? (
    <FullPageLoader />
  ) : (
    <Box h={"100vh"}>
      <Flex mt="40px" mb="20px" justify={"space-between"} align={"center"}>
        <Box w="500px">
          <SearchField
            bg={"#3D3D3D"}
            placeholder={"search by job title"}
            value={search}
            onChange={handleSearchChange}
            // searchKey={alljobs?.map((item)=>item?.title)}
            filter={filter}
            setFilter={setFilter}
          />
        </Box>

        <Flex align={"baseline"} gap={"20px"}>
          <Box>
            <Tabs variant="unstyled" mt="10px">
              <TabList
                bg={"#2C2C2C"}
                p={"5px"}
                borderRadius={"10px"}
                w={"fit-content"}
                color={"#B5B5B5"}
                gap={"0px"}
              >
                <Tab
                  _selected={{ color: "#000", bg: "#F5F5F5" }}
                  borderRadius={"10px"}
                  px="10px"
                  fontWeight={"bold"}
                  onClick={() => {
                    setTabToShow("active");
                  }}
                >
                  Active Job
                </Tab>
                <Tab
                  _selected={{ color: "#000", bg: "#F5F5F5" }}
                  borderRadius={"10px"}
                  px="10px"
                  fontWeight={"bold"}
                  onClick={() => {
                    setTabToShow("closed");
                  }}
                >
                  Closed Jobs
                </Tab>
                <Tab
                  _selected={{ color: "#000", bg: "#F5F5F5" }}
                  borderRadius={"10px"}
                  px="10px"
                  fontWeight={"bold"}
                  onClick={() => {
                    setTabToShow("draft");
                  }}
                >
                  Drafted Jobs
                </Tab>
              </TabList>
            </Tabs>
          </Box>
          <CustomBtn
            text={"Post New Job"}
            ref={btnRef}
            handleClick={onOpen}
            color={"#000"}
            childComp={<FaPlus />}
          />
        </Flex>
      </Flex>

      <Box>
        {tabToShow === "active" ? (
          <ActiveJob
            payments={filteredJobs}
            refetch={fetchProjects}
            onClose={onClose}
          />
        ) : tabToShow === "closed" ? (
          <ClosedJob payments={closed} />
        ) : (
          <DraftedJob payments={drafted} />
        )}
      </Box>

      <PostJob
        isOpen={isOpen}
        finalFocusRef={btnRef}
        onClose={onClose}
        refetch={fetchProjects}
      />
    </Box>
  );
};

export default JobManagement;
