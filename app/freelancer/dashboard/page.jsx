"use client";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import Card from "./component/Card";
import { FaBagShopping } from "react-icons/fa6";
import { MdAnalytics } from "react-icons/md";
import { IoBagHandle } from "react-icons/io5";
import { formatToNaira } from "@/utils/numberFormat";
import { useQuery } from "@tanstack/react-query";
import { getFreelancerCard, getJobs} from "./service/dashboard";
import FullPageLoader from "@/components/FullPageLoader";
import Charts from "./component/Charts";
import Recommendation from "./component/Recommendation"
import Conversation from "./component/Conversation";




export default function FreelancerDashboardPage() {
 
  const { user,  loading } = useGlobalState();
  const router = useRouter();


  const { data } = useQuery({
    queryKey: ["freelancerCards"],
    queryFn: getFreelancerCard,
  });
  const cardData = data?.data;

  const {
    data: allJobs,
    // refetch: fetchProjects,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });

  const jobDatas = allJobs?.data?.data;


  useEffect(() => {
  if (!loading) {
    if (!user) {
      router.push("/login"); 
    } else if (user?.accountType !== "freelancer") {
      router.push("/");
    }
  }
}, [user, loading, router]);



  return loading ? (
    <FullPageLoader />
  ):(
    <Box>
      
      <Flex mt="50px" gap="20px" align="center" wrap="wrap">
        <Card
          flex={1}
          icon={<FaBagShopping color="black" size={25} />}
          cardText="Total Earns"
          subText={
            cardData?.totalEarnings
              ? formatToNaira(cardData.totalEarnings)
              : "No Earnings"
          }
        />
        <Card
          flex={1}
          icon={<MdAnalytics color="black" size={25} />}
          cardText="Total Ongoing Projects"
          subText={cardData?.totalProjects ?? "0"}
          handleClick={() => router.push("/project")}
          subText1="View Projects"
        />
        <Card
          flex={1}
          icon={<MdAnalytics color="black" size={25} />}
          cardText="Total Completed Projects"
          subText={cardData?.totalCompletedProjects ?? "0"}
        />
        <Card
          flex={1}
          icon={<IoBagHandle color="black" size={25} />}
          cardText="Total Applied Jobs"
          subText={cardData?.totalAppliedJobs ?? "0"}
        />
      </Flex>


       <Flex my="50px" gap={"50px"}>
        <Box flex={1}>
          <Text pb="10px" color={"#fff"}>
            Project Anaytics
          </Text>
          <Charts />
        </Box>
        <Box flex={1}>
          <Conversation />
        </Box>
      </Flex>
      <Box>
        <Recommendation jobDatas={jobDatas} />
      </Box>

    </Box>
  );
}
