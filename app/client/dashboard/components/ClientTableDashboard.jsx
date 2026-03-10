import {
  Avatar,
  Badge,
  Box,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
// import Action from "./Action";
// import { getPaymentHistory } from "../../../earns/services";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { formatToNaira } from "@/utils/numberFormat";
import { getPaymentHistory } from "../services";



const statusColor = {
  confirmed: "#285229ED",
  pending: "#FBBF2433",
  failed: "#FF5A5F6B",
};

export default function ClientTableDashboard() {

  const {data: historyData, isPending: isHistoryPending} = useQuery({
      queryFn: getPaymentHistory,
      queryKey: ["payment"]
    })

const payments=historyData?.data?.data?.slice(0,5)



  return ( 
    <Box  w="100%" color="white">
    
    

      <TableContainer
        maxH="500px"
        overflowY="auto"
        borderRadius="md"
        border="1px solid"
        borderColor="#2C2C2C"
        bg={"#2C2C2C"}
      >
        <Table variant={"simple"}>
          <Thead>
            <Tr mb="70px">
              {["Date", "Job Title", "Freelancer Name", "Amount", "Status",""].map((heading) => (
                <Th
                  key={heading}
                  position="sticky"
                  top={0}
                  bottom={500}
                  zIndex={1}
                  bg="#2C2C2C"
                  color="white"
                >
                  {heading}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody mt="100px" >
            {payments?.map((payment, index) => (
              <Tr key={index}>
                <Td px="30px">{dayjs(payment.createdAt).format("DD-MM-YYYY")}</Td>
                <Td>{payment.job?.title}</Td>
                <Td>
                  <Flex align="center" gap={3}>
                    <Avatar size="sm" name={payment?.freelancer?.firstName + " " + payment?.freelancer?.lastName } src={payment.freelancer.profileImage} />
                    <Box>
                      <Text fontWeight="bold">{payment?.freelancer?.firstName + " " + payment?.freelancer?.lastName}</Text>
                      <Text fontSize="sm" color="gray.400">
                        {payment.freelancer.email}
                      </Text>
                    </Box>
                  </Flex>
                </Td>
                <Td>{formatToNaira(payment.amount)}</Td>
                <Td>
                  <Badge
                    colorScheme={statusColor[payment.approvalStatus]}
                    color="white"
                    bg={statusColor[payment.approvalStatus]}
                    px={2}
                    py={1}
                    borderRadius="md"
                  >
                    {payment.approvalStatus}
                  </Badge>
                </Td>
                <Td>
                 
                  {/* <Action /> */}
                  </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}