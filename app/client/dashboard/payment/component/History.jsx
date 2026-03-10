"use client"

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
import PaymentAction from "./PaymentAction";
// import Action from "../../dashboard/components/Action"
import { useState } from "react";
import { CustomBtn } from "@/components/CustomBtn";
import dayjs from "dayjs";
import { formatToNaira } from "@/utils/numberFormat";



const statusColor = {
  confirmed: "#285229ED",
 pending: "#FBBF2433",
  failed: "#FF5A5F6B",
};

export default function History({payments}) {
  
   const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPayments = payments?.slice(startIndex, endIndex);
  
    const totalPages = Math.ceil((payments?.length || 0) / itemsPerPage);
  
    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () =>
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));

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
              {["Date", "Job Title", "Freelancer Details", "Amount", "Method", "Status", ""].map((heading) => (
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
            {paginatedPayments?.map((payment, index) => (
              <Tr key={index}>
                <Td px="30px">{dayjs(payment?.createdAt).format("DD-MM-YYYY")}</Td>
                <Td>{payment?.job?.title}</Td>
                <Td>
                  <Flex align="center" gap={3}>
                    <Avatar size="sm" name={payment?.freelancer?.firstName +" " + payment?.freelancer?.lastName } src={payment?.freelancer?.avatar} />
                    <Box>
                      <Text fontWeight="bold">{payment?.freelancer?.firstName +" " + payment?.freelancer?.lastName }</Text>
                      <Text fontSize="sm" color="gray.400">
                        {payment?.freelancer?.email}
                      </Text>
                    </Box>
                  </Flex>
                </Td>
                <Td>{formatToNaira(payment?.amount)}</Td>
                <Td>{payment?.method}</Td>
                
                <Td>
                  <Badge
                    // colorScheme={statusColor[payment.status]}
                    color="white"
                    bg={statusColor[payment.approvalStatus]}
                    px={2}
                    py={1}
                    borderRadius="md"
                  >
                    {payment?.approvalStatus}
                  </Badge>
                </Td>
                <Td>
                 
                  <PaymentAction payment={payment}/>
                  </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
       <Flex justify="flex-end" mt={4} gap={4}>
                    <CustomBtn
                      handleClick={handlePrev}
                      disabled={currentPage === 1}
                      size="sm"
                      text={"prev"}
                    />
                    <Text>
                      Page {currentPage} of {totalPages}
                    </Text>
                    <CustomBtn
                      handleClick={handleNext}
                      disabled={currentPage === totalPages}
                      size="sm"
                      text={"next"}
                    />
                  </Flex>
    </Box>
  );
}