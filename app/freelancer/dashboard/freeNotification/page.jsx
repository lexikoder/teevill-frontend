"use client"

import { Box, Tab, TabList, Tabs, Text} from "@chakra-ui/react";
import React, { useState } from "react";
import AllNotification from "./component/AllNotification";

import { useQuery } from "@tanstack/react-query"
import FullPageLoader from "@/components/FullPageLoader";
import { useGlobalState } from "@/context/GlobalStateContext";
import { getFreelancerNotification } from "./services";


const FreeNotification = () => {
    const { user} = useGlobalState();
  console.log(user,"UUU")
  const id = user?._id
  const [tabToShow, setTabToShow] = useState("all");

  const {data, isPending} = useQuery({
    queryFn: getFreelancerNotification,
    queryKey: ["notification"]
  })

  const notificationData = data?.data?.data  
  

  return isPending ? (
    <FullPageLoader />
  ):(
    <Box >
      
      <Box mt="50px">
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
              onClick={()=>{
                setTabToShow("all")
              }}
            >
              All Notification
            </Tab>
            <Tab
              _selected={{ color: "#000", bg: "#F5F5F5" }}
              borderRadius={"10px"}
              px="10px"
              fontWeight={"bold"}
              onClick={() => {
                setTabToShow("project");
              }}
            >
              Project & Proposal
            </Tab>
            <Tab
              _selected={{ color: "#000", bg: "#F5F5F5" }}
              borderRadius={"10px"}
              px="10px"
              fontWeight={"bold"}
              onClick={() => {
                setTabToShow("job");
              }}
            >
              Job Alert
            </Tab>
           
          </TabList>
        </Tabs>
      </Box>
      
      {tabToShow === "all" ? <AllNotification notificationData={notificationData} /> : ""}
      
    </Box>
  );
};

export default FreeNotification;
