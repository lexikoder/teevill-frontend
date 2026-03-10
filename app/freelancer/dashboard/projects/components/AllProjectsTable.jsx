"use client"

import React, { useState } from "react";
import {
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
import AllProjectsAction from "./AllProjectsAction";

import dayjs from "dayjs";
import { CustomBtn } from "@/components/CustomBtn";
import { getProjects } from "../services/Index";
import { useQuery } from "@tanstack/react-query";

const statusColor = {
  completed: "#285229ED",
  "in-progress": "#2270EE38",
  review: "#FF5A5F6B",
};

const  AllProjectsTable = ({ payments, refetch }) => {

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

  const headerNames = [
    "project Title",
    "Project Deadline",
    "Sections",
    "Project Status",
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
              <Tr key={payment?._id}>
                <Td>{payment?.title}</Td>
                <Td px="30px">
                  {dayjs(payment?.createdAt).format("DD-MM-YYYY")}
                </Td>

                <Td>{payment?.sections?.length}</Td>
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
                  <AllProjectsAction data={payment} refetch={refetch} />
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

export default AllProjectsTable;
