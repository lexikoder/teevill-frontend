"use client"

import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaCamera } from "react-icons/fa6";
import { CustomBtn } from "@/components/CustomBtn";
import { _COLORS } from "@/constant/colors";
import { useRouter } from "next/navigation";
import { getLocalStorageItem } from "@/utils/localStorage";
import { APP_CONSTANTS } from "@/constant/app";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadPicture } from "./services";
import { errorNotifier } from "@/components/notifier";


const FreelanceProfilePicModal = () => {
  const userAccount = getLocalStorageItem(APP_CONSTANTS.accountType);
  const id = userAccount?._id;
  const queryClient = useQueryClient();
  const router = useRouter()
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setFile(file)
    }
  };
  const { mutate: sendPicture, isPending: isUpdateMutating } = useMutation({
    mutationFn: (payload) => uploadPicture(id,payload),
    mutationKey: ["picture"],
    onSuccess: (data) => {
      console.log("data", data);
      queryClient.invalidateQueries({ queryKey: ["picture"] });
      router.push("/login");
    },
    onError: (error) => {
      console.error("Update Profile Mutation error", error);
    },
  });


  const handleSubmit = () => {
    if (!file) {
     errorNotifier("Please select an image to upload");
      return;
    }
    const formData = new FormData();
    formData.append("file", file); 
    sendPicture(formData);
    console.log(formData,"hhhdh")
  };


  return (
    <Box zIndex={9999}>
      <Box color={"#fff"}>
        <Text textAlign={"center"} fontSize={"25px"} fontWeight={500} pb="50px">
          One last step, add a presentable profile image.
        </Text>
        <VStack spacing={4} align="center" mb={"20px"}>
        
          <Box position="relative" w="180px" h="180px">
            <Avatar size="full" src={image} name="" />
            <IconButton
              aria-label="Change Profile Picture"
              icon={<FaCamera />}
              position="absolute"
              bottom="0"
              right="0"
              borderRadius="full"
              bg="gray.100"
              size="md"
              colorScheme="gray"
              _hover={{ bg: "gray.200" }}
              onClick={() => document.getElementById("fileInput").click()}
            />
          </Box>

          
          <Input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleImageChange}
            display="none"
          />

          <Flex justify={"space-between"} gap={"30px"} mt="50px" w={"100%"}>
            <CustomBtn
              text={"skip for now"}
              handleClick={() => {
                router.push("/login");
              }}
              bg={"none"}
              border={"1px solid #fff"}
              width={"full"}
            />
            <CustomBtn
              text={"upload image"}
              bg={_COLORS?.brand}
              loading={isUpdateMutating}
              
              handleClick={handleSubmit}
              width={"full"}
            />
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};

export default FreelanceProfilePicModal;
