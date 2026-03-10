"use client"

import { Box, Flex, Grid, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useGlobalState } from "@/context/GlobalStateContext";
import Card from "@/app/freelancer/dashboard/component/Card";
import { FaBagShopping } from "react-icons/fa6";
// import { formatToNaira } from "../../../utils/numberFormat";
import { MdAnalytics } from "react-icons/md";
import { IoBagHandle } from "react-icons/io5";
import ClientChart from "./components/ClientChart";
import { CustomBtn } from "@/components/CustomBtn";
import { _COLORS } from "@/constant/colors";
import ClientChat from "./components/ClientChat";
import ClientTableDashboard from "./components/ClientTableDashboard";
import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "./services";
import { useRouter } from "next/navigation";
// import complete from "../../../assets/complete.png";
// import pend from "../../../assets/pend.png"
// import progress from "../../../assets/progress.png"

const Dashboard = () => {
  const router = useRouter()
  const {user, setUser} = useGlobalState()
  

  const {data, isLoading}=useQuery({
    queryKey:[ "dashboard"],
    queryFn: getDashboard
  })
 
  const cardData = data?.data

  const handleClick=()=>{
    router.push("./dashboard/proposals")
  }



  return (
    <Box >
      
      <Flex mt={"50px"} gap={"20px"} align={"center"}>
        <Card
          flex={1}
          icon={<FaBagShopping color="black" size={25} />}
          cardText={"Total Job Created"}
          subText={cardData?.totalJobs}
        />
        <Card
          flex={1}
          icon={<MdAnalytics color="black" size={25} />}
          cardText={"Total Proposal Alerts"}
          subText={cardData?.totalProposals}
          subText1={"View Proposals"}
          handleClick={handleClick}
        />
        <Card
          flex={1}
          icon={<MdAnalytics color="black" size={25} />}
          cardText={"Active Projects"}
          subText={cardData?.totalActiveProject}
        />
        <Card
          flex={1}
          icon={<IoBagHandle color="black" size={25} />}
          cardText={"Completed Projects"}
          subText={cardData?.totalCompletedProjects}
        />
      </Flex>

      <Box my="30px">
        <Flex gap={"30px"} align={""}>
          <Box flex={2}>
            <Flex align={"center"} justify={"space-between"}>
              <Flex align={"center"} gap={"30px"}>
                <Text color={"#fff"}>Project Task Project</Text>
                <Flex
                  color={"#fff"}
                  align={"center"}
                  fontSize={"13px"}
                  gap={"20px"}
                >
                  <HStack>
                    <Image src={"/progress.png"}/>
                    <Text>In Progress</Text>
                  </HStack>
                  <HStack>
                     <Image src={"/pend.png"}/>
                    <Text>Pending</Text>
                  </HStack>
                  <HStack>
                     <Image src={"/complete.png"}/>
                    <Text>Completed</Text>
                  </HStack>
                </Flex>
              </Flex>
              <CustomBtn
                text={"View More"}
                bg={"none"}
                color={_COLORS?.brand}
              />
            </Flex>



            
            <Flex
              bg={"#2C2C2C"}
              px={"20px"}
              borderRadius={"10px"}
              align={"start"}
              gap={"30px"}
            >
              <ClientChart
                textCenter={"70%"}
                header={"E-commerce Website Redesign"}
                labels={["Used", "Remaining","Others"]}
                values={[30, 40, 30]}
                colors={["#0A644E", "#FBBF24", "#2CAEC2"]}
              />
              <ClientChart
                textCenter={"67%"}
                header={"Mobile App Development"}
                labels={["Completed", "Pending", "Overdue"]}
                values={[50, 30, 20]}
               colors={["#0A644E", "#FBBF24","#2CAEC2"]}
              />
              <ClientChart
                textCenter={"50%"}
                header={"Social Media Campaign"}
                labels={["Male", "Female","Others"]}
                values={[40, 50, 10]}
                colors={["#0A644E", "#FBBF24","#2CAEC2"]}
                />
            </Flex>
          </Box>
          

          <Box flex={1}>
             <ClientChat />
          </Box>
        </Flex>
      </Box>


      <Box>
        <Flex justify={"space-between"} align={"center"}>
          <Text color={_COLORS?.white}>Recent Transactions</Text>
          <CustomBtn text={"View more"} bg="none" color={_COLORS?.brand} handleClick={()=>{
            router.push("/client/dashboard/payment")
          }}/>
        </Flex>
        <Box w="full">
          <ClientTableDashboard />
        </Box>
      </Box>

      




    </Box>
  );
};

export default Dashboard;
