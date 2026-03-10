"use client"


import {
  Avatar,
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
  Badge,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ProposalAction from "./ProposalAction";
import dayjs from "dayjs";
import { CustomBtn } from "@/components/CustomBtn";

const ProposalTable = ({ payments, refetch }) => {
 

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

  const statusColor = {
    accepted: "#285229ED",
    "under-review": "#2270EE38",
    rejected: "#FF5A5F6B",
    pending: "#FBBF2433",
  };

  const headerNames = [
    "Client Name",
    "Project Title",
    "Date Submitted",
    "Status",
    "Bid Amount",
    "",
  ];

  return (
    <Box w="100%" color="white">
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
              {headerNames?.map((heading) => (
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
          <Tbody mt="100px">
            {paginatedPayments?.map((payment, index) => (
              <Tr key={index}>
                <Td>
                  <Flex alignItems="center" gap={2}>
                    <Avatar
                      name={payment?.job?.createdBy?.firstName + " " + payment?.job?.createdBy?.lastName}
                      src={payment?.job?.createdBy?.profileImage}
                      size="sm"
                    />
                    <Box>
                      <Text>{payment?.job?.createdBy?.firstName  + " " + payment?.job?.createdBy?.lastName}</Text>
                      <Text fontSize="sm" color="gray.400">
                        {payment?.job?.createdBy?.email}
                      </Text>
                    </Box>
                  </Flex>
                </Td>

                <Td>{payment?.title}</Td>
                <Td px="30px">
                  {dayjs(payment?.createdAt ).format("DD-MM-YYYY")}
                </Td>

                  <Td>
                  <Badge
                    
                    color="white"
                    bg={statusColor[payment.status]}
                    px={2}
                    py={1}
                    borderRadius="md"
                  >
                    {payment.status }
                  </Badge>
                </Td>
              
                <Td>${payment?.bidAmount}</Td>
              
                <Td>
                  <ProposalAction data={payment} refetch={refetch} />
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
};

export default ProposalTable;
