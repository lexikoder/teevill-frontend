"use client"

import { Box, Flex, Tab, TabList, Tabs } from "@chakra-ui/react";
import React, { useState } from "react";
// import CardHeader from "../../component/CardHeader";
import Card from "../component/Card";
import { FaBagShopping } from "react-icons/fa6";
import { MdAnalytics } from "react-icons/md";
import { formatToNaira } from "@/utils/numberFormat";
import { CustomBtn } from "@/components/CustomBtn";
import PaymentTable from "./components/PaymentTable";
import { useQuery } from "@tanstack/react-query"

import WithdrawHistory from "./components/WithdrawHistory";
import { getJobs } from "../job/services/Index";
import { getProposals } from "../proposals/components/services";
import CustomModal from "@/components/CustomModal";
import EarnRequestModal from "./components/EarnRequestModal";
import { getFreelancerWithdrawal } from "./services";
import { getFreelancerCard } from "../service/dashboard";

const Earn = () => {
    const [tabToShow, setTabToShow] = useState("payment")
  const status = "pending"
    const {data} = useQuery({
      queryKey:["payments"],
      queryFn:()=>getFreelancerWithdrawal(status)
    })

    const withdrawHistory = data?.data?.data
        console.log("DATA", withdrawHistory)

 
    const {data: approve} = useQuery({
      queryKey:["payments"],
      queryFn:()=>getFreelancerWithdrawal("approved")
    })

    const paymentHistory = approve?.data?.data
        console.log("DATAS", paymentHistory)


  
  


    const {data:acceptedJobs, refetch} = useQuery({
    queryKey:["jobs"],
    queryFn: getProposals,
  })
  const approvedJobs = acceptedJobs?.data?.data
 const acceptJobs =approvedJobs?.filter((datum)=>datum?.status==="accepted")

 const { data:card } = useQuery({
    queryKey: ["freelancerCards"],
    queryFn: getFreelancerCard
    // enabled: !!user && accountType === "freelancer", // only fetch if freelancer
  });
  console.log(card?.data,"CARD")



  return (
    <Box h={"100%"} color={"#fff"}>
     

      <Flex mt={"50px"} gap={"20px"} align={"start"}>
        <Card
          flex={1}
          icon={<FaBagShopping color="black" size={25} />}
          cardText={"Total Earns"}
          subText={formatToNaira(card?.data?.totalEarnings) || card?.data?.totalEarnings}
        />
        <Card
          flex={1}
          icon={<MdAnalytics color="black" size={25} />}
          cardText={"Available balance"}
          subText={formatToNaira(card?.data?.availableBalance) || card?.data?.availableBalance}
          //   subText1={"View Projects"}
        />
        <Card
          flex={1}
          icon={<MdAnalytics color="black" size={25} />}
          cardText={"Total Withdrawn Amount"}
          subText={formatToNaira(card?.data?.totalWithdrawnAmount) || card?.data?.totalWithdrawnAmount}
        />
        <CustomModal bg={"#2c2c2c"} headerColor={"#fff"} header={"Make Earning Request"} icon={<CustomBtn text={"Make Earning Withdrawal"} color={"#000"} />}>
        <EarnRequestModal acceptJobs={acceptJobs} refetch={refetch}/>
        </CustomModal>
        
      </Flex>

      <Tabs variant="unstyled" mt="60px">
        <TabList
          bg={"#2C2C2C"}
          p={"5px"}
          borderRadius={"10px"}
          w={"fit-content"}
          gap={"40px"}
        >
          <Tab
            _selected={{ color: "#000", bg: "#F5F5F5" }}
            borderRadius={"10px"}
            px="30px"
            fontWeight={"bold"}
            onClick={() => {
              setTabToShow("payment");
            }}
          >
            Payment History
          </Tab>
          <Tab
            _selected={{ color: "#000", bg: "#F5F5F5" }}
            borderRadius={"10px"}
            px="30px"
            fontWeight={"bold"}
            onClick={() => {
              setTabToShow("withdraw");
            }}
          >
            Withdraw History
          </Tab>
        </TabList>
      </Tabs>

      <Box mt="20px">
        {tabToShow==="payment"?<PaymentTable payments={paymentHistory} />:<WithdrawHistory payments={withdrawHistory} />}
      </Box>
    </Box>
  );
};

export default Earn;
