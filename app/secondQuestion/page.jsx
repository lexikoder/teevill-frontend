"use client";

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
import { getQuestion } from "./service/second";
import FullPageLoader from "@/components/FullPageLoader";
import { useRouter } from "next/navigation";
import { getLocalStorageItem } from "@/utils/localStorage";
import { APP_CONSTANTS } from "@/constant/app";
import { createExperince } from "../firstQuestion/service";

const SecondQuestion = () => {
  const router = useRouter();
  const userAccount = getLocalStorageItem(APP_CONSTANTS.accountType);
  const id = userAccount?._id;
  const queryClient = useQueryClient();

  const [formValue, setFormValues] = useState({
    primarySkills: "",
    interest: "",
    paymentType: "",
  });

  const {
    isLoading,
    data,
    // refetch,
  } = useQuery({
    queryKey: ["question"],
    queryFn: () => getQuestion("primarySkill"),
  });

  const skillResult = data?.data;
  const skilled = skillResult?.slice(0, 6);

  const { data: interestData } = useQuery({
    queryKey: ["question"],
    queryFn: () => getQuestion("interest"),
  });

  const { data: paymentData } = useQuery({
    queryKey: ["question"],
    queryFn: () => getQuestion("payment"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: sendExperience, isPending: isUpdateMutating } = useMutation({
    mutationFn: (payload) => createExperince(payload),
    mutationKey: ["question"],
    onSuccess: (data) => {
      router.push("/thirdQuestion");
      console.log("data", data);
      queryClient.invalidateQueries({ queryKey: ["question"] });
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

    sendExperience(payload);
    console.log(payload, "ry/");
  };

  return isLoading ? (
    <FullPageLoader />
  ) : (
    <Box h={"100vh"} bg={"#000"} color={"#fff"}>
      <Flex
        justify={"space-between"}
        flexDir={["column", "column", "column", "row"]}
        gap={["20px", "20px", "20px", "50px"]}
      >
        <Box p={["10px 30px", "10px 30px", "10px 30px", "10px 50px"]} flex={1}>
          <Image src={"/logo.png"} h={"50px"} />
          <Box my="50px">
            <Text pb={"30px"}>2/3</Text>
            <Text fontSize={"30px"}>
              What best describes your primary skill and service?
            </Text>
          </Box>
          <Box>
            <Box>
              <FormLabel>Choose a skill</FormLabel>

              <Select
                focusBorderColor={_COLORS?.brand}
                name="primarySkills"
                value={formValue?.primarySkills}
                onChange={handleChange}
                placeholder="Enter Skill"
              >
                {skilled?.map((skil) => (
                  <option key={skil?._id} value={skil?._id} style={{color:"black"}}>{skil.skill}</option>
                ))}
              </Select>
            </Box>

            <Box my="30px">
              <FormLabel>What type of work are you interested in?</FormLabel>
              <Select
                focusBorderColor={_COLORS?.brand}
                name="interest"
                value={formValue?.interest}
                onChange={handleChange}
                placeholder="Enter Interest"
              >
                {interestData?.data?.map((int) => (
                  <option key={int?._id} style={{color:"black"}} value={int?._id}>{int?.interest}</option>
                ))}
              </Select>
            </Box>
            <Box>
              <FormLabel>How would you like to get paid?</FormLabel>
              <Select
                focusBorderColor={_COLORS?.brand}
                color={_COLORS?.white}
                name="paymentType"
                value={formValue?.paymentType}
                onChange={handleChange}
                placeholder="Enter Payment Type"
              >
                {paymentData?.data?.map((pay) => (
                  <option key={pay?._id} value={pay?._id} style={{color:"black"}}>{pay?.paymentType}</option>
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
                    bg: "#D39D12",
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
                width={"100px"}
                loading={isUpdateMutating}
                disabled={
                  !formValue?.primarySkills ||
                  !formValue?.interest ||
                  !formValue?.paymentType
                }
                handleClick={handleSubmit}
              />
            </Flex>
          </Flex>
        </Box>

        <Box flex={1}>
          <Image
            src={"/questionImg.png"}
            h={["70vh", "70vh", "70vh", "100vh"]}
            w={"full"}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default SecondQuestion;
