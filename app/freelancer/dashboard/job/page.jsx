"use client";

import React, { useRef, useState } from "react";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  Flex,
  HStack,
  Image,
  Text,
  useDisclosure,
  GridItem,
  Checkbox,
} from "@chakra-ui/react";
import { FaFileAlt, FaRegClock } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "./services/Index";
import FullPageLoader from "@/components/FullPageLoader";
import JobComponent from "./components/JobComponent";
import { CustomBtn } from "@/components/CustomBtn";
import SearchField from "@/components/SearchField";
import dayjs from "dayjs";
import { _COLORS } from "@/constant/colors";
import { useParams } from "next/navigation";

const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isFilterOpen,
    onOpen: onFilterOpen,
    onClose: onFilterClose,
  } = useDisclosure();

  const btnRef = useRef(null);
  const filterBtnRef = useRef(null);

  const {
    data: allJobs,
    isLoading,
    refetch: fetchJobs,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
  });
  console.log(allJobs, "ppp");

  const jobData = allJobs?.data?.data || [];

  const filteredJobs = jobData?.filter((job) =>
    job.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <FullPageLoader />;

  return (
    <Box h="100%">
      <Flex mt="50px" justify="space-between">
        <CustomBtn
          text="Job Filter"
          color="#000"
          ref={filterBtnRef}
          handleClick={onFilterOpen}
          rightIcon={<Image src="/filter.png" />}
        />
        <HStack spacing="20px">
          <CustomBtn
            text="Newest"
            rightIcon={<Image src="/filterWhite.png" />}
            bg="none"
            border="1px solid #fff"
            color="#fff"
          />
          <SearchField
            placeholder="Job title or keyword"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </HStack>
      </Flex>

      <Flex gap={6} mt="50px" wrap="wrap">
        {filteredJobs.length === 0 ? (
          <Text
            margin={"0px auto"}
            textAlign={"center"}
            fontSize="25px"
            color="#fff"
          >
            No Job Found
          </Text>
        ) : (
          filteredJobs?.map((job) => {
            const daysAgo = dayjs().diff(dayjs(job.createdAt), "day");
            return (
              <GridItem key={job._id} bg="#2C2C2C" borderRadius="20px">
                <Box p="20px">
                  <Flex my="10px" flexWrap="wrap" gap="10px" align="center">
                    <Avatar
                      src={job.createdBy?.profileImage}
                      name={`${job.createdBy?.firstName} ${job.createdBy?.lastName}`}
                    />
                    <Box color="#fff">
                      <Text fontWeight="bold" fontSize="20px">
                        {job.createdBy?.firstName} {job.createdBy?.lastName}
                      </Text>
                      <Text fontSize="15px" opacity="60%">
                        {job.createdBy?.email}
                      </Text>
                    </Box>
                  </Flex>

                  <Text color="#fff" fontSize="20px" fontWeight={700} py="10px">
                    {job.title}
                  </Text>

                  <Text color="#fff" fontSize="15px" opacity="60%">
                    {job.description}
                  </Text>

                  <Flex gap="20px" mt="20px" color="#fff">
                    <Flex align="center" gap="3px" opacity="80%">
                      <FaFileAlt />
                      <Text>{job.proposals?.length || 0} Proposal sent</Text>
                    </Flex>
                    <Flex align="center" gap="3px" opacity="60%">
                      <FaRegClock />
                      <Text>
                        Posted {daysAgo} {daysAgo === 1 ? "day" : "days"} ago
                      </Text>
                    </Flex>
                  </Flex>
                </Box>

                <Divider />

                <Flex p="20px" justify="space-between">
                  <Flex align="center">
                    <Text color="#fff" fontWeight="bold" fontSize="20px">
                      ${job.budget}
                    </Text>
                    <Text color="#fff" opacity="60%">
                      /Hourly
                    </Text>
                  </Flex>
                  <CustomBtn
                    text="View Details"
                    ref={btnRef}
                    handleClick={() => {
                      setSelectedJob(job);
                      onOpen();
                    }}
                    color={_COLORS.brand}
                    bg="none"
                    p="0px"
                    fontSize="15px"
                  />
                </Flex>
              </GridItem>
            );
          })
        )}

        {selectedJob && (
          <JobComponent
            datum={selectedJob}
            isOpen={isOpen}
            refetch={fetchJobs}
            onClose={onClose}
            ref={btnRef}
          />
        )}
      </Flex>

      <Drawer
        isOpen={isFilterOpen}
        placement="right"
        onClose={onFilterClose}
        size="sm"
        ref={filterBtnRef}
      >
        <DrawerContent bg="#141414" color="#fff" px="50px">
          <DrawerCloseButton bg="#FBBF24" color="#000" />
          <DrawerHeader fontSize="25px">Job Filter</DrawerHeader>
          <DrawerBody mt="20px">
            {/* Job Type */}
            <Box mb="30px">
              <Text mb="10px" fontWeight="bold" fontSize="18px">
                Job Type
              </Text>
              <Flex direction="column">
                {["All Job Type", "Full Time", "Part Time", "Contract"].map(
                  (type) => (
                    <Checkbox
                      key={type}
                      size="lg"
                      colorScheme="orange"
                      // defaultChecked
                      mb="10px"
                      sx={{
                        ".chakra-checkbox__control": {
                          borderRadius: "md",
                          bg: "#2C2C2C", 
                          border: "1px solid #FBBF24",
                          _checked: {
                            bg: "#FBBF24",
                            borderColor: "#FBBF24",
                          },
                          _hover: {
                            bg: "#FACC15", 
                          },
                        },
                      }}
                    >
                      {type}
                    </Checkbox>
                  )
                )}
              </Flex>
            </Box>

          
            <Box mb="30px">
              <Text mb="10px" fontWeight="bold" fontSize="18px">
                Payment Model
              </Text>
              <Flex direction="column">
                {["Hourly Rate", "Fixed Price"].map((model) => (
                  <Checkbox
                    key={model}
                    size="lg"
                    colorScheme="orange"
                    // defaultChecked
                    mb="10px"
                    sx={{
                      ".chakra-checkbox__control": {
                        borderRadius: "md",
                        bg: "#2C2C2C",
                        border: "1px solid #FBBF24",
                        _checked: {
                          bg: "#FBBF24", 
                          borderColor: "#FBBF24",
                        },
                        _hover: {
                          bg: "#FACC15",
                        },
                      },
                    }}
                  >
                    {model}
                  </Checkbox>
                ))}
              </Flex>
            </Box>

            <Box mb="30px">
              <Text mb="10px" fontWeight="bold" fontSize="18px">
                Budget Range
              </Text>
              <Flex direction="column">
                {[
                  "$10 - $50",
                  "$51 - $100",
                  "$101 - $500",
                  "$500 - $1000",
                  "Above $1000",
                ].map((range) => (
                  <Checkbox
                    key={range}
                    size="lg"
                    colorScheme="orange"
                    // defaultChecked
                    mb="10px"
                      sx={{
                      ".chakra-checkbox__control": {
                        borderRadius: "md",
                        bg: "#2C2C2C",
                        border: "1px solid #FBBF24",
                        _checked: {
                          bg: "#FBBF24",
                          borderColor: "#FBBF24",
                        },
                        _hover: {
                          bg: "#FACC15",
                        },
                      },
                    }}
                  >
                    {range}
                  </Checkbox>
                ))}
              </Flex>
            </Box>

       
            <Box mb="30px">
              <Text mb="10px" fontWeight="bold" fontSize="18px">
                Experience Level
              </Text>
              <Flex direction="column">
                {["Entry-Level", "Intermediate", "Expert"].map((level) => (
                  <Checkbox
                    key={level}
                    size="lg"
                    colorScheme="orange"
                    // defaultChecked
                    mb="10px"
                      sx={{
                      ".chakra-checkbox__control": {
                        borderRadius: "md",
                        bg: "#2C2C2C", 
                        border: "1px solid #FBBF24",
                        _checked: {
                          bg: "#FBBF24", 
                          borderColor: "#FBBF24",
                        },
                        _hover: {
                          bg: "#FACC15",
                        },
                      },
                    }}
                  >
                    {level}
                  </Checkbox>
                ))}
              </Flex>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Page;
