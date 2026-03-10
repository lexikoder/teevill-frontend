"use client"

import {
  Box,
  Flex,
  Image,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { CustomBtn } from "@/components/CustomBtn";
import { _COLORS } from "@/constant/colors";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClientType } from "./service";
import { getLocalStorageItem } from "@/utils/localStorage";
import { APP_CONSTANTS } from "@/constant/app";

const FirstQuestionClient = () => {
   const userAccount = getLocalStorageItem(APP_CONSTANTS.accountType);
    console.log(userAccount, "om;o");
    const id = userAccount?._id;
  const router = useRouter()


  const queryClient = useQueryClient();
  const [clientType, setClientType] = useState("");



  const { mutate: sendExperience, isPending: isUpdateMutating } = useMutation({
    mutationFn: (payload) => createClientType(payload),
    mutationKey: ["question"],
    onSuccess: (data) => {
      
      console.log("data", data);
      queryClient.invalidateQueries({ queryKey: ["question"] });
      router.push("/clientSecondQuestion");
    },
    onError: (error) => {
      console.error("Update Profile Mutation error", error);
    },
  });

  
  const { mutate: submitExperience, isPending: pending  } = useMutation({
    mutationFn: (payload) => createClientType(payload),
    mutationKey: ["question"],
    onSuccess: (data) => {
      
      console.log("data", data);
      queryClient.invalidateQueries({ queryKey: ["question"] });
      router.push("/agency-first-question");
    },
    onError: (error) => {
      console.error("Update Profile Mutation error", error);
    },
  });


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: id,
      clientType,
    };
    clientType==="single"? sendExperience(payload) : submitExperience(payload)
    console.log(payload,"0oi")
    
  };







  return (
    <Box>
      <Text fontWeight={"bold"} pb={"20px"} textAlign={["center","center","center","start"]}>
        How would you like your account to be addressed as?
      </Text>
      <Flex align={"center"} gap={["30px"]} justifyContent={"space-between"} flexDir={["column","column","column","row"]}>
        <Box
          border={"1px solid white"}
          h={"170px"}
         
          borderRadius={"10px"}
        >
          <Flex
            justifyContent={"space-between"}
            p={"15px"}
            align={"flex-start"}
            gap={"20px"}
          >
            <Flex flexDir={"column"} align={"center"} justifyContent={"center"}>
              <Image src={"/singleClient.png"} h={"100px"} />
              <Text fontWeight={500} textAlign={"center"} pt="10px">
                Single Client Account
              </Text>
            </Flex>
            <RadioGroup onChange={setClientType} value={clientType}>
              <Radio value={"single"} variant="groove"></Radio>
            </RadioGroup>
          </Flex>
        </Box>

        <Box
          border={"1px solid white"}
          h={"170px"}
          
          borderRadius={"10px"}
        >
          <Flex
            justifyContent={"space-between"}
            p={"15px"}
            align={"flex-start"}
            gap={"20px"}
          >
            <Flex flexDir={"column"} align={"center"} justifyContent={"center"}>
              <Image src={"/agency.png"} h={"100px"} />
              <Text fontWeight={500} pt="10px" textAlign={"center"}>
                Agency Account
              </Text>
            </Flex>
            <RadioGroup onChange={setClientType} value={clientType} borderColor={"red"}>
              <Radio value={"agency"} variant="groove"></Radio>
            </RadioGroup>
          </Flex>
        </Box>
      </Flex>



      
      <Box mt="20px">
        <CustomBtn
          text={"Let's Get You Started"}
          width={"full"}
          disabled={!clientType}
          loading={clientType==="single"? isUpdateMutating : pending}
          handleClick={handleSubmit}
        
        />
      </Box>
    </Box>
  );
};

export default FirstQuestionClient;
