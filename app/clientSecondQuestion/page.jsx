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
import {  getSingleClientQuestion, sendClientSecondQuestions } from "./service";
import { getLocalStorageItem } from "@/utils/localStorage";
import { APP_CONSTANTS } from "@/constant/app";
import { formatToNaira } from "@/utils/numberFormat";

const ClientSecondQuestion = () => {
  const router= useRouter()
  const userAccount = getLocalStorageItem(APP_CONSTANTS.accountType);
  const id = userAccount?._id;
  const queryClient = useQueryClient();

  const [formValue, setFormValues] = useState({
    clientProjectType: "",
    clientWorkPreference: "",
    clientBudget: "",
  });
  const {
    isLoading,
    data,
    // refetch: fetchTasks,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: () => getSingleClientQuestion("clientProjectType"),
  });
  const projectType = data?.data;

  const { data: arrangementData } = useQuery({
    queryKey: ["preference"],
    queryFn: () => getSingleClientQuestion("clientWorkPreference"),
  });
  
  const { data: budgetData } = useQuery({
    queryKey: ["budget"],
    queryFn: () => getSingleClientQuestion("clientBudget"),
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: sendClientQuestion, isPending: isUpdateMutating } =
    useMutation({
      mutationFn: (payload) => sendClientSecondQuestions(payload),
      mutationKey: ["client-s-question"],
      onSuccess: (data) => {
        console.log("data", data);
        queryClient.invalidateQueries({ queryKey: ["client-s-question"] });
        router.push("/clientThirdQuestion");
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

    sendClientQuestion(payload);
    console.log(payload, "ry/");
  };

  return isLoading ? (
    <FullPageLoader />
  ) : (
    <Box h={"100vh"}  bg={"#000"} color={"#fff"}>
      <Flex justify={"space-between"} flexDir={["column","column","column","row"]} gap={["15px","20px","20px","50px"]}>
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
              <FormLabel>
                What type of project are you looking to hire for
              </FormLabel>
              <Select
                focusBorderColor={_COLORS?.brand}
                color={_COLORS?.brand}
                name="clientProjectType"
                value={formValue?.clientProjectType}
                onChange={handleChange}
                placeholder="Select Project Type"
              >
                {projectType?.map((project) => (
                  <option value={project?._id} style={{fontWeight:"bold"}}>{project?.clientProjectType}</option>
                ))}
              </Select>
            </Box>

            <Box my="30px">
              <FormLabel>
                What's your preferred working arrangement with freelancers?
              </FormLabel>
              <Select
                focusBorderColor={_COLORS?.brand}
                color={_COLORS?.brand}
                name="clientWorkPreference"
                value={formValue?.clientWorkPreference}
                onChange={handleChange}
                placeholder="Select a suitable arrangement"
              >
                {arrangementData?.data?.map((arr) => (
                  <option value={arr?._id} style={{fontWeight:"bold"}}>{arr?.clientWorkPreference}</option>
                ))}
              </Select>
            </Box>
            <Box>
              <FormLabel>
                What's your estimated budget for your project?
              </FormLabel>
              <Select
                focusBorderColor={_COLORS?.brand}
                color={_COLORS?.brand}
                name="clientBudget"
                value={formValue?.clientBudget}
                onChange={handleChange}
                placeholder="Select a Budget"
              >
                {budgetData?.data?.map((budget) => (
                  <option value={budget?._id} style={{fontWeight:"bold"}}>{formatToNaira(budget?.clientBudget)}</option>
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
                loading={isUpdateMutating}
                disabled={
                  !formValue?.clientBudget ||
                  !formValue?.clientProjectType ||
                  !formValue?.clientWorkPreference
                }
                bg={_COLORS?.brand}
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

export default ClientSecondQuestion;
