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
import JobAction from "./JobAction";
import dayjs from "dayjs";
import { CustomBtn } from "@/components/CustomBtn";
import { useState } from "react";



const statusColor = {
  active: "#285229ED",
  drafted: "#FBBF2433",
  closed: "#FF5A5F6B",
};

export default function DraftedJob({payments}) {
   const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPayments = payments?.slice(startIndex, endIndex);
  
    const totalPages = Math.ceil((payments?.length || 0) / itemsPerPage);
  
    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () =>
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    console.log(payments, "payments");
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
              {["Date Posted", "Job Title", "Proposals", "Budget", "Status",""].map((heading) => (
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
                <Td px="30px">{dayjs(payment?.createdAt).format('DD-MM-YYYY')}</Td>
                <Td>{payment.title}</Td>

                 <Td>{payment.proposals?.length}</Td>
                <Td>{payment.budget}</Td>
                <Td>
                  <Badge
                   
                    color="white"
                    bg={statusColor[payment.status]}
                    px={2}
                    py={1}
                    borderRadius="md"
                  >
                    {payment.status}
                  </Badge>
                </Td>
                <Td>
                 
                  <JobAction />
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