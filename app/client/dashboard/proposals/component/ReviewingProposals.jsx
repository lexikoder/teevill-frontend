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
import Action from "../../components/Action";
import { CustomBtn } from "@/components/CustomBtn";
import { useState } from "react";

const statusColor = {
  accepted: "#1CBD2142",
  pending: "#FBBF2433",
  reviewing: "#2270EE38",
  rejected: "#8834348F",
};

export default function ReviewingProposals({ data }) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPayments = data?.slice(startIndex, endIndex);
  
    const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
  
    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () =>
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <Box w="100%" color="white">
      {/* <Flex justify={"space-around"} borderRadius="10px" px="30px" py="10px" bg="#2C2C2C" align="center" mb="20px">
        <Text>Date</Text>
        <Text>Project Name</Text>
        <Text>Freelancer Name </Text>
        <Text>Amount</Text>
        <Text>Status</Text>
        <Text></Text>
      </Flex> */}

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
              {[
                "Freelancer Name",
                "Job Title",
                "Proposal Date",
                "Budget",
                "Timeline",
                "Status",
                "",
              ].map((heading) => (
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
                  <Flex align="center" gap={3}>
                    <Avatar
                      size="sm"
                      name={payment.freelancer.name}
                      src={payment.freelancer.avatar}
                    />
                    <Box>
                      <Text fontWeight="bold">{payment.freelancer.name}</Text>
                      <Text fontSize="sm" color="gray.400">
                        {payment.freelancer.email}
                      </Text>
                    </Box>
                  </Flex>
                </Td>
                <Td px="30px">{payment.jobTitle}</Td>
                <Td>{payment.proposalDate}</Td>

                <Td>{payment.budget}</Td>
                <Td>{payment.timeLine}</Td>
                {/* <Td>{payment.section}</Td> */}
                <Td>
                  <Badge
                    // colorScheme={statusColor[payment.status]}
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
                  <Action />
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
