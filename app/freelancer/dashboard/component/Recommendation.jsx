import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { CustomBtn } from '@/components/CustomBtn'
import { useRouter } from 'next/navigation'



const Recommendation = ({jobDatas}) => {
    const router = useRouter()
    
  return (
    <Box mt={"70px"}>
        <Flex justify={"space-between"} gap={"30px"}>
            {jobDatas?.map((datum)=>(
                <Box key={datum?._id} bg="#2C2C2C" py="20px" px={"30px"} borderRadius={"20px"} flex={1}>
                    <Flex my="10px" gap={"10px"} align={"center"}>
                        <Avatar name={datum?.createdBy?.firstName + " " + datum?.createdBy?.lastName} src={datum?.createdBy?.profileImage}/>
                        <Box color={"#fff"}>
                            <Text fontWeight={"bold"} fontSize={"20px"}>{datum?.createdBy?.firstName + " " + datum?.createdBy?.lastName}</Text>
                            <Text fontSize={"13px"} opacity={"70%"}>{datum?.createdBy?.email}</Text>
                        </Box>
                    </Flex>
                    <Text color={"#fff"} fontSize={"23px"} fontWeight={700} py={"10px"}>{datum?.title}</Text>
                    <Text color={"#fff"} fontSize={"18px"}>{datum?.description}</Text>
                    <Box my="10px">
                      <CustomBtn text={"View Details"} color={"#FBBF24"} bg={"none"} p={"0px"} handleClick={()=>{
                        router.push("/freelancer/dashboard/job")
                      }}/>   
                    </Box>
                   
                </Box>
            ))}
        </Flex>

    </Box>
  )
}

export default Recommendation