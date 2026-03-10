"use client"

import {
  Box,
  Flex,
  FormLabel,
  Image,
  Progress,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { CustomBtn } from "@/components/CustomBtn";
import { _COLORS } from "@/constant/colors";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FullPageLoader from "@/components/FullPageLoader";
import { useRouter } from "next/navigation";
import { getLocalStorageItem } from "@/utils/localStorage";
import { APP_CONSTANTS } from "@/constant/app";
import { getClientQuestion } from "../clientSecondQuestion/service";
import { createExperince } from "../firstQuestion/service";

const AgencyFirstQuestion = () => {
  const router = useRouter()
  const userAccount = getLocalStorageItem(APP_CONSTANTS.accountType);
  const id = userAccount?._id;
  const queryClient = useQueryClient();
  const [formValue, setFormValues] = useState({
    agencyStaffNo: "",
    projectSize: "",
    hireType: "",
  });
  const {
    isLoading,
    data,
    refetch: fetchTasks,
  } = useQuery({
    queryKey: ["client-agency-question"],
    queryFn: () => getClientQuestion("agencyStaffNo"),
  });
  const staffNo = data?.data;

  const { data: projectSizeData } = useQuery({
    queryKey: ["size"],
    queryFn: () => getClientQuestion("projectSize"),
  });

  const { data: hireTypeData } = useQuery({
    queryKey: ["hire-type"],
    queryFn: () => getClientQuestion("hireType"),
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: sendClientAgencyQuestion, isPending: isUpdateMutating } =
    useMutation({
      mutationFn: (payload) => createExperince(payload),
      mutationKey: ["question"],
      onSuccess: (data) => {
        console.log("data", data);
        queryClient.invalidateQueries({ queryKey: ["question"] });
        router.push("/agency-second-question");
      },
      onError: (error) => {
        console.error("Update Profile Mutation error", error);
      },
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: id,
      ...formValue,
    };

    sendClientAgencyQuestion(payload);
    // console.log(payload, "ry/");
  };

  return  isLoading ? (
    <FullPageLoader />
  ):(
    <Box h={"100vh"}  bg={"#000"} color={"#fff"}>
      <Flex justify={"space-between"} flexDir={["column","column","column","row"]} gap={["20px","20px","20px","50px"]}>
        <Box p={["10px 30px","10px 30px","10px 30px","10px 50px"]} flex={1}>
          <Image src={"/logo.png"} h={"50px"} />
          <Box my="50px">
            <Text pb={"30px"}>1/2</Text>
            <Text fontSize={"30px"} fontWeight={"bold"}>
              Let's know you a little bit more
            </Text>
          </Box>
          <Box>
            <Box>
              <FormLabel> How many staffs do you have in your agancy</FormLabel>

              <Select
                focusBorderColor={_COLORS?.brand}
                color={_COLORS?.brand}
                name="agencyStaffNo"
                value={formValue.agencyStaffNo}
                onChange={handleChange}
                placeholder="Select Staff No"
              >
                {staffNo?.map((staff) => (
                  <option value={staff?._id}>{staff?.agencyStaffNo}</option>
                ))}
              </Select>
            </Box>

            <Box my="30px">
              <FormLabel>What's the size of your typical project?</FormLabel>
              <Select
                focusBorderColor={_COLORS?.brand}
                color={_COLORS?.brand}
                name="projectSize"
                value={formValue.projectSize}
                onChange={handleChange}
                placeholder="Select Project Size"
              >
                {projectSizeData?.data?.map((project) => (
                  <option value={project?._id}>{project?.projectSize}</option>
                ))}
              </Select>
            </Box>
            <Box>
              <FormLabel>
                Are you looking to hire for contract or full time job?
              </FormLabel>
              <Select
                focusBorderColor={_COLORS?.brand}
                color={_COLORS?.brand}
                name="hireType"
                value={formValue.hireType}
                onChange={handleChange}
                placeholder="Select Hire Type"
              >
                {hireTypeData?.data?.map((hire) => (
                  <option value={hire?._id}>{hire?.hireType}</option>
                ))}
              </Select>
            </Box>
          </Box>
          <Flex mt={"70px"} align={"center"} justifyContent={"space-between"}>
            <Box width={"150px"}>
              <Progress 
              value={70} 
              size="xs" 
             
                 sx={{
                  "& > div": {
                    bg: "#D39D12", // your custom color
                  },
                }} 
              />
            </Box>
            <Flex align={"center"} gap={"20px"}>
              <Text
                cursor={"pointer"}
                onClick={() => {
                  router.push("/login");
                }}
              >
                Skip For Now
              </Text>
              <CustomBtn
                text={"Next"}
                bg={_COLORS?.brand}
                loading={isUpdateMutating}
                disabled={
                  !formValue?.agencyStaffNo ||
                  !formValue?.hireType ||
                  !formValue?.projectSize
                }
                width={"100px"}
                handleClick={handleSubmit}
              />
            </Flex>
          </Flex>
        </Box>

        <Box flex={1}>
          <Image src={"/clientImg.png"} h={["70vh","70vh","70vh","100vh"]} w={"full"} />
        </Box>
      </Flex>
    </Box>
  );
};

export default AgencyFirstQuestion;
