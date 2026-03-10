"use client"

import { Box, Flex, HStack, Tab, TabList, Tabs, Text,  } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaBagShopping } from "react-icons/fa6";
import { formatToNaira } from "@/utils/numberFormat";
import { CustomBtn } from "@/components/CustomBtn";
import History from "./component/History";
// import axiosInstance from "../../../service/api";
import CustomModal from "@/components/CustomModal";
import InitiatePaymentModal from "./component/InitiatePaymentModal";
import { useQuery } from "@tanstack/react-query";
// import { getClientProposal } from "../proposalList/services";
// import { getAllProject } from "../projects/service";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getEscrow, getPaymentHistory } from "./service";
import FullPageLoader from "@/components/FullPageLoader";
import Request from "./component/Request";
import { getClientProposal } from "../proposals/services";

const stripePromise = loadStripe("pk_test_51MXt1nAX4icpUpylgMHKjEqr26OcjHnokICi9wSolBy1AsDQi2IMgJNWmhRhSAZ8nhNHVqDe31ZVQWfoqqbDuXa400XDGfxmFw")
const Payment = () => {
    const status ="pending"

    const {data: historyData, isPending: isHistoryPending} = useQuery({
      queryFn:()=>getPaymentHistory(status),
      queryKey: ["payment"]
    })
  
    const historyDatas = historyData?.data?.data
    

    // const confirmedHistory = historyDatas?.filter((his)=>his?.status==="confirmed")
    // const pendingRequest = historyDatas?.filter((pending)=>pending?.status==="pending")
  


    // const { isOpen, onOpen, onClose } = useDisclosure();
  const [tabToShow, setTabToShow] = useState("history");
  

  // const {data, isPending, refetch: fetchProposals} = useQuery({
  //   queryKey: ["jobs"],
  //   queryFn: getSingleClientJobs
  // })
  // const list = data?.data
  // const proList = list?.data
  // console.log(proList,"09o")



  const {data:proposalList, isPending} = useQuery({
      queryKey: ["proposals"],
      queryFn: getClientProposal,
      enabled: true
    })
    const proList = proposalList?.data?.data
    const realProList = proList?.filter((data)=>data?.status==="accepted")
    



   const {data:escrow} = useQuery({
    queryKey: ["escrow"],
    queryFn: getEscrow
  })


  


  return isHistoryPending ? (
    <FullPageLoader />
  ):(
    <Box h={"100vh"}>
      <Flex mt="50px" justify={"space-between"} alignItems="start">
        <Flex gap={"20px"}>
          <Flex>
            <Box p={"20px"} borderRadius={"10px"} bg={"#2C2C2C"}>
              <HStack spacing={4}>
                <Box bg={"#E9FCFF"} p={"8px"} borderRadius={"full"}>
                  <FaBagShopping size={20} />
                </Box>
                <Text color={"#FFFFFF"}>Total Payment Request</Text>
              </HStack>
              <Text
                pt={"20px"}
                fontSize={"25px"}
                fontWeight={"bold"}
                color={"#FFFFFF"}
              >
               {historyDatas?.length}
              </Text>
            </Box>
          </Flex>
          <Flex>
            <Box p={"20px"} borderRadius={"10px"} bg={"#2C2C2C"}>
              <HStack spacing={4}>
                <Box bg={"#E9FCFF"} p={"8px"} borderRadius={"full"}>
                  <FaBagShopping size={20} />
                </Box>
                <Text color={"#FFFFFF"}>Total Escrow Funds</Text>
              </HStack>
              <Text
                pt={"20px"}
                fontSize={"25px"}
                fontWeight={"bold"}
                color={"#FFFFFF"}
              >
                {formatToNaira(escrow?.data?.escrowBalance) || escrow?.data?.escrowBalance}
              </Text>
            </Box>
          </Flex>
        </Flex>

        <CustomModal
         header={"Make Payment"}
         
         headerColor={"#fff"}
          bg={"#2C2C2C"}
          icon={
            <CustomBtn
              text={"Make Escrow Payment"}
              color={"black"}
              // handleClick={handlePayment}
            />
          }
        >
          <Elements stripe={stripePromise}>
          <InitiatePaymentModal data = {realProList} isPending={isPending}/>
          </Elements>

        </CustomModal>
      </Flex>

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
                setTabToShow("history");
              }}
            >
              Payment Request({historyDatas?.length})
            </Tab>
            <Tab
              _selected={{ color: "#000", bg: "#F5F5F5" }}
              borderRadius={"10px"}
              px="10px"
              fontWeight={"bold"}
              onClick={() => {
                setTabToShow("request");
              }}
            >
              Payment History()
            </Tab>
          </TabList>
        </Tabs>
      </Box>
      {/* the history is actually the request and the request is the history in the below i dont habe the time to start changing  */}
      <Box mt="30px">{tabToShow === "history" ? <History payments={historyDatas}/> : <Request />}</Box>
    </Box>
  );
};

export default Payment;
