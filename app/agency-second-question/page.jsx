"use client"


import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Image,
  Input,
  Progress,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CustomBtn } from "@/components/CustomBtn";
import { _COLORS } from "@/constant/colors"
import FormInput from "@/components/FormInput";
import { FaCamera } from "react-icons/fa6";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getLocalStorageItem } from "@/utils/localStorage";
import { APP_CONSTANTS } from "@/constant/app";
import { uploadPicture } from "../thirdQuestion/services";
import { createExperince } from "../firstQuestion/service";

const AgencySecondQuestion = () => {
  const [imageFile, setImageFile] = useState(null); // Add state to store the image file
  const router = useRouter()
  const [image, setImage] = useState(null);

  const userAccount = getLocalStorageItem(APP_CONSTANTS.accountType);
  const id = userAccount?._id;
  const queryClient = useQueryClient();

  const [formValue, setFormValues] = useState({
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const { mutateAsync: sendBio, isPending: isUpdateMutating } = useMutation({
    mutationFn: (payload) => createExperince(payload),
    mutationKey: ["bio"],
    onSuccess: (data) => {
      console.log("data", data);
      queryClient.invalidateQueries({ queryKey: ["bio"] });
      // navigate("/login")
    },
    onError: (error) => {
      console.error("Update Profile Mutation error", error);
    },
  });

  const { mutateAsync: sendImage, isPending: isImageMutating } = useMutation({
    mutationFn: (imageFile) => uploadPicture(id,imageFile),
    mutationKey: ["image"],
    onSuccess: (data) => {
      console.log("Image uploaded successfully:", data);
    },
    onError: (error) => {
      console.error("Image upload error", error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        id: id,
        ...formValue,
      };

      // Bio submission
      const bioPromise = sendBio(payload);

      // Image submission
      let imagePromise = Promise.resolve(); // A resolved promise in case no image is selected
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        // formData.append("id", id);  
        console.log("Uploading file:", formData); // Add this to debug

        imagePromise = sendImage(formData);
      }

      // Wait for both to complete
      await Promise.all([bioPromise, imagePromise]);

      // Only navigate to login if both are successful
      router.push("/login");
    } catch (error) {
      console.error("Error submitting bio or image:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setImageFile(file); // Store the image file for submission
    }
  };

  return (
    <Box h={"100vh"}  bg={"#000"} color={"#fff"}>
      <Flex justify={"space-between"} flexDir={["column","column","column","row"]} gap={"50px"}>
        <Box p={["10px 30px","10px 30px","10px 30px","10px 50px"]} flex={1}>
          <Image src={"/logo.png"} h={"50px"} />
          <Box my="50px">
            <Text pb={"10px"}>2/2</Text>
          </Box>
          <Box>
            <Text pb="20px" fontWeight={500}>
              Upload Your Agency Logo
            </Text>
            <VStack spacing={4} align="start" mb={"20px"}>
              {/* Profile Image with Camera Icon */}
              <Box position="relative" w="120px" h="120px">
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

              {/* Hidden File Input */}
              <Input
                type="file"
                id="fileInput"
                accept="image/*"
                onChange={handleImageChange}
                display="none"
              />

              {/* Change Profile Button */}
              {/* <Button
                onClick={() => document.getElementById("fileInput").click()}
                colorScheme="blue"
              >
                Change Profile Picture
              </Button> */}
            </VStack>
          </Box>
          <Box>
            <Box mt="50px">
              <FormInput
                lines={5}
                label={"Tell us about yourself"}
                handleChange={handleChange}
                value={formValue?.bio}
                name={"bio"}
                color={"white"}
                focusBorderColor={_COLORS?.brand}
              />
            </Box>
          </Box>
          <Flex mt={"20px"} align={"center"} justifyContent={"space-between"}>
            <Box width={"150px"}>
              <Progress
               value={100} size="xs" 
               
                  sx={{
                  "& > div": {
                    bg: "#D39D12", // your custom color
                  },
                }}
               />
            </Box>
            <Flex align={"center"} gap={"20px"}>
              {/* <Text cursor={"pointer"} onClick={()=>{
                navigate("/login")
              }}>Skip For Now</Text> */}
              <CustomBtn
                text={"Proceed"}
                bg={_COLORS?.brand}
                width={"100px"}
                handleClick={handleSubmit}
                loading={isUpdateMutating || isImageMutating} // Disable button if either mutation is pending
                disabled={!formValue?.bio || (!image && !imageFile)}
              />
            </Flex>
          </Flex>
        </Box>

        <Box flex={1}>
          <Image src={"/clientImg.png"} h={["70vh","70vh","70vh","100vh"]} w="full" />
        </Box>
      </Flex>
    </Box>
  );
};

export default AgencySecondQuestion;
