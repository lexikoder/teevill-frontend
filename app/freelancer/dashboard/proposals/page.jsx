"use client"

import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { CustomBtn } from "@/components/CustomBtn";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import ProposalTable from "./components/ProposalTable";
import { useQuery } from "@tanstack/react-query";
import { getProposals } from "./components/services";
import FullPageLoader from "@/components/FullPageLoader";

const Proposal = () => {
   const {
    data: allProposals,
    isLoading,
    refetch: fetchProposal,
  } = useQuery({
    queryKey: ["allproposals"],
    queryFn: getProposals,
  });
  const proposals = allProposals?.data?.data
 
 



  return isLoading ? (
    <FullPageLoader />
  ):(
    <Box >


      <Box mt="50px">
        <Flex justify={"flex-end"}>
          <CustomBtn
            rightIcon={<MdOutlineKeyboardArrowDown size={20} />}
            text={"All Proposal Status"}
            bg={"#2C2C2C"}
          />
        </Flex>

        <Box mt="50px">
          <ProposalTable payments = {proposals} refetch={fetchProposal}/>
        </Box>
      </Box>
    </Box>
  );
};

export default Proposal;
