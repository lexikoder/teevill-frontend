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
  pending:"#FBBF2433",
  reviewing:"#2270EE38",
  rejected:"#8834348F",
};

export default function RejectedProposals({payments}) {
   const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedPayments = payments?.slice(startIndex, endIndex);
  
    const totalPages = Math.ceil((payments?.length || 0) / itemsPerPage);
  
    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () =>
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    
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
                  {[
                    "Freelancer Name",
                    "Job Title",
                    "Proposal Date",
                    "Budget",
                    "Timeline",
                    "Bid Price",
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
                          name={
                            payment?.submittedBy?.firstName +
                            " " +
                            payment?.submittedBy?.lastName
                          }
                          src={payment?.submittedBy?.profileImage || ""}
                        />
                        <Box>
                          <Text fontWeight="bold">
                            {payment?.submittedBy?.firstName +
                              " " +
                              payment?.submittedBy?.lastName}
                          </Text>
                          <Text fontSize="sm" color="gray.400">
                            {payment?.submittedBy?.email || ""}
                          </Text>
                        </Box>
                      </Flex>
                    </Td>
                    <Td px="30px">{payment?.title || ""}</Td>
                    <Td>{dayjs(payment?.createdAt).format("DD-MM-YYYY") || ""}</Td>
    
                    <Td>{formatToNaira(payment?.job?.budget) || ""}</Td>
                    <Td>
                      {payment.timeLine?.charAt(0)?.toUpperCase() +
                        "" +
                        payment?.timeLine?.slice(1) +
                        " " +
                        "months" || ""}
                    </Td>
    
                    <Td>{formatToNaira(payment?.bidAmount) || ""}</Td>
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
                        {payment.status || ""}
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