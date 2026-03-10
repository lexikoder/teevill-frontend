"use client"

import { Box, Tab, TabList, Tabs, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import AllProposal from "./component/AllProposal";
import PendingProposals from "./component/PendingProposals";
import ReviewingProposals from "./component/ReviewingProposals";
import AcceptedProposals from "./component/AcceptedProposals";
import RejectedProposals from "./component/RejectedProposals";
import { getClientProposal } from "./services";
import { useQuery } from "@tanstack/react-query";
import { BiErrorCircle } from "react-icons/bi";
import FullPageLoader from "@/components/FullPageLoader";


const ProposalList = () => {
  const {data, isPending, refetch} = useQuery({
    queryKey: ["proposals"],
    queryFn: getClientProposal,
    enabled: true
  })
  const list = data?.data
  const proList = list?.data
  // console.log(proList,"proList")


  const pendings = proList?.filter((pay) => pay?.status === "pending");
  const reviewing = proList?.filter((pay) => pay?.status === "reviewing");
  const accepted = proList?.filter((pay) => pay?.status === "accepted");
   const rejected = proList?.filter((pay) => pay?.status === "rejected");

  const [tabToShow, setTabToShow] = useState("all");
  const allProposalCount = proList?.length;

  return isPending ? (
    <FullPageLoader />
  ):(
    <Box h={"100vh"}>
      
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
              onClick={() => {
                setTabToShow("all");
              }}
            >
              All Proposals ({allProposalCount})
            </Tab>
            <Tab
              _selected={{ color: "#000", bg: "#F5F5F5" }}
              borderRadius={"10px"}
              px="10px"
              fontWeight={"bold"}
              onClick={() => {
                setTabToShow("pending");
              }}
            >
              Pending({pendings?.length})
            </Tab>
        
            <Tab
              _selected={{ color: "#000", bg: "#F5F5F5" }}
              borderRadius={"10px"}
              px="10px"
              fontWeight={"bold"}
              onClick={() => {
                setTabToShow("accepted");
              }}
            >
              Accepted({accepted?.length})
            </Tab>
            <Tab
              _selected={{ color: "#000", bg: "#F5F5F5" }}
              borderRadius={"10px"}
              px="10px"
              fontWeight={"bold"}
              onClick={() => {
                setTabToShow("rejected");
              }}
            >
              Rejected({rejected?.length})
            </Tab>
          </TabList>
        </Tabs>
      </Box>
      {
        proList?.length >= 1 ? (
            <Box mt="30px">
        {tabToShow === "all" ? 
          <AllProposal payments={proList} refetch={refetch}/>
        : tabToShow === "pending" ? 
          <PendingProposals payments={pendings} />
        : tabToShow === "reviewing" ? 
          <ReviewingProposals data={reviewing}/>
        : tabToShow ==="accepted" ? 
            <AcceptedProposals payments={accepted}/>
        :<RejectedProposals payments={rejected}/>
        }
      </Box>
        ):(
          <Flex color={"#fff"} justifyContent={"center"} align={"center"} mt="70px" gap="30px">
            <BiErrorCircle size={50} color="gray"/>
            <Text color={"gray"} fontSize={"30px"}>No Data Present</Text>
            
          </Flex>
        )
      }
    
    </Box>
  );
};

export default ProposalList;
