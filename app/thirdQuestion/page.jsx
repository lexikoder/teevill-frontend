"use client";

import {
  Box,
  Flex,
  Image,
  Progress,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { CustomBtn } from "@/components/CustomBtn";
import { _COLORS } from "@/constant/colors";
import FormInput from "@/components/FormInput";
import { getLocalStorageItem } from "@/utils/localStorage";
import { APP_CONSTANTS } from "@/constant/app";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExperince } from "../firstQuestion/service";
import FreelanceProfilePicModal from "./FreelanceProfilePicModal";
import CustomModal from "@/components/CustomModal";

const ThirdQuestion = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userAccount = getLocalStorageItem(APP_CONSTANTS.accountType);
  const id = userAccount?._id;
  const queryClient = useQueryClient();

  const [formValue, setFormValues] = useState({
    bio: "",
    title: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: sendExperience, isPending: isUpdateMutating } = useMutation({
    mutationFn: (payload) => createExperince(payload),
    mutationKey: ["question"],
    onSuccess: (data) => {
      console.log("data", data);
      queryClient.invalidateQueries({ queryKey: ["question"] });
      onOpen();
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

  return (
    <Box h={"100vh"} bg={"#000"} color={"#fff"}>
      <CustomModal isOpen={isOpen} onClose={onClose} bg={"#3D3D3D"}>
        <FreelanceProfilePicModal />
      </CustomModal>

      <Flex justify={"space-between"} flexDir={"row"} gap={"50px"}>
        <Box p={"10px 50px"} flex={1}>
          <Image src={"/logo.png"} h={"50px"} />
          <Box my="20px">
            <Text pb={"10px"}>3/3</Text>
            <Text fontSize={"30px"}>
              Craft a compelling bio to introduce yourself to the world.
            </Text>
          </Box>

          <Box>
            <FormInput
              label={"Your Job Title"}
              value={formValue?.title}
              handleChange={handleChange}
              name="title"
              type={"text"}
              focusBorderColor={_COLORS?.brand}
            />
            <Box mt="20px">
              <FormInput
                lines={5}
                type={"text"}
                name="bio"
                value={formValue?.bio}
                handleChange={handleChange}
                label={"Bio"}
                focusBorderColor={_COLORS?.brand}
              />
            </Box>
          </Box>
          <Flex mt={"20px"} align={"center"} justifyContent={"space-between"}>
            <Box width={"150px"}>
              <Progress
                value={100}
                size="xs"
                colorScheme={"red"}
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
                disabled={!formValue?.bio || !formValue?.title}
                loading={isUpdateMutating}
                text={"Next"}
                bg={_COLORS?.brand}
                width={"100px"}
                handleClick={handleSubmit}
                
              />
            </Flex>
          </Flex>
        </Box>

        <Box flex={1}>
          <Image src={"/questionImg.png"} h={"100vh"} w={"full"} />
        </Box>
      </Flex>
    </Box>
  );
};

export default ThirdQuestion;
