"use client";

import {
  Box,
  Flex,
  Image,
  Progress,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { CustomBtn } from "@/components/CustomBtn";
import { _COLORS } from "@/constant/colors";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExperince } from "./service";
import { getLocalStorageItem } from "@/utils/localStorage";
import { APP_CONSTANTS } from "@/constant/app";

const FirstQuestion = () => {
  const userAccount = getLocalStorageItem(APP_CONSTANTS.accountType);
  const id = userAccount?._id;
  const router = useRouter();
  const queryClient = useQueryClient();
  const [previousExperience, setExperience] = useState("");

  

const { mutate: sendExperience, isLoading: isUpdateMutating } = useMutation({
  mutationFn: (payload) => createExperince(payload),
  mutationKey: ["question"],
  onSuccess: (data) => {
    console.log("data", data);
    queryClient.invalidateQueries({ queryKey: ["question"] });
    router.push("/secondQuestion");
  },
  onError: (error) => {
    console.error("Update Profile Mutation error", error);
  },
});



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!id) return;

    const payload = {
      id,
      experience: previousExperience, 
    };

    sendExperience(payload);
  };

  return (
    <Box h="100vh" bg="#000" color="#fff">
      <Flex
        justify="space-between"
        flexDir={["column", "column", "column", "row"]}
        gap="50px"
      >
        <Box p={["10px 30px", "10px 50px"]} flex={1}>
          <Image src="/logo.png" h="50px" />
          <Box my={["30px", "70px"]}>
            <Text pb="30px">1/3</Text>
            <Text fontSize="30px">
              Just a few quick questions to get started! First, have you worked
              as a freelancer before?
            </Text>
          </Box>

 
          <RadioGroup onChange={setExperience} value={previousExperience}>
            <Flex
              align="center"
              justifyContent="space-between"
              gap={["20px", "0px"]}
            >
              <Box border="1px solid white" h="170px" borderRadius="10px">
                <Flex justify="space-between" p="15px" gap="20px">
                  <Box>
                    <Image src="/newImg.png" />
                    <Text fontWeight={500}>I'm new to this</Text>
                  </Box>
                  <Radio value="i am new to this" variant="groove"></Radio>
                </Flex>
              </Box>

              <Box border="1px solid white" h="170px" borderRadius="10px">
                <Flex justify="space-between" p="15px" gap="20px">
                  <Box>
                    <Image src="/experienceImg.png" h="100px" />
                    <Text fontWeight={500} pt="10px">
                      I have experience
                    </Text>
                  </Box>
                  <Radio value="i have experience" variant="groove"></Radio>
                </Flex>
              </Box>

              <Box border="1px solid white" h="170px" borderRadius="10px">
                <Flex justify="space-between" p="15px" gap="20px">
                  <Box>
                    <Image src="/ppleImg.png" />
                    <Text pt="30px" fontWeight={500}>
                      This is what I do
                    </Text>
                  </Box>
                  <Radio value="this is what i do" variant="groove"></Radio>
                </Flex>
              </Box>
            </Flex>
          </RadioGroup>

          <Flex mt="70px" align="center" justify="space-between">
            <Box width="150px">
              <Progress 
              value={45} 
              size="xs"
              sx={{
    "& > div": {
      bg: "#D39D12", 
    },
  }}
              
              />
            </Box>
            <Flex align="center" gap="20px">
              <Text cursor="pointer" onClick={() => router.push("/login")}>
                Skip For Now
              </Text>
              <CustomBtn
                text="Next"
                bg={_COLORS?.brand}
                loading={isUpdateMutating}
                disabled={!previousExperience}
                width="100px"
                handleClick={handleSubmit}
              />
            </Flex>
          </Flex>
        </Box>

        <Box flex={1}>
          
          <Image src="/questionImg.png" h={["70vh", "100vh"]} w="full" />
        </Box>
      </Flex>
    </Box>
  );
};

export default FirstQuestion;
