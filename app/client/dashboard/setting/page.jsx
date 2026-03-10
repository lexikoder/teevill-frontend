"use client"

import { Avatar, Box, Divider, Flex, HStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { IoMail } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { CustomBtn } from "@/components/CustomBtn";
import FormInput from "@/components/FormInput";
import { Switch } from "@chakra-ui/react";
// import { useGetState } from "../../../GlobalStateContext/useGetState";
import { useGlobalState } from "@/context/GlobalStateContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeClientPassword } from "./components/services/service";

const Setting = () => {


    const { user, accountType, setUser, setAccountType } = useGlobalState();
    


  
   const [formData, setFormData] = useState({
      oldPassword: "",
      newPassword: "",
      // confirmPassword: "",
    });
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const queryClient = useQueryClient();
    const { mutate: updatePasswordMutation, isPending: isUpdateMutating } =
      useMutation({
        mutationFn: (payload) => changeClientPassword(payload),
        mutationKey: ["client-profile"],
        onSuccess: (data) => {
          console.log("data", data);
          queryClient.invalidateQueries({ queryKey: ["client-profile"] });
          setState((prev) => ({ ...prev, updated: !prev.updated }));
          setFormValues({});
        },
        onError: (error) => {
          console.error("Update Profile Mutation error", error);
        },
      });
        const handleUpdatePassword = (e) => {
          e.preventDefault();
          // if (formData?.newPassword !== formData?.confirmPassword)
          //   return errorNotifier("Password mismatch");
          const payload = {
            // id: state?._id,
            ...formData,
          };
          updatePasswordMutation(payload);
        };







  return (
    <Box color={"#fff"}>

      <Flex mt="50px" color={"#fff"} justify={"space-between"} align={"center"}>
        <HStack spacing={4}>
          <Avatar size={"xl"} name={user?.firstName + " " + user?.lastName} src={user?.profileImage}/>
          <Box>
            <Text>{user?.firstName + " " + user?.lastName}</Text>
            <Flex gap={"40px"}>
              <HStack>
                <IoMail />
                <Text>{user?.email}</Text>
              </HStack>

              <HStack>
                <FaPhone />
                <Text>{user?.phone}</Text>
              </HStack>
            </Flex>
          </Box>
        </HStack>

        <CustomBtn
          text={"Upload Profile Image"}
          bg={"none"}
          border={"1px solid #fff"}
        />
      </Flex>
      <Box my="30px">
        <Text fontWeight={"bold"}>Change Password</Text>
        <Box py="20px" px="30px" borderRadius={"10px"} bg={"#2C2C2C"} mt="10px">
          <Flex gap={"20px"} maxW={"700px"}>
            <FormInput label={"Old Password"} name={"oldPassword"} value={formData?.oldPassword} handleChange={handleChange}/>
            <FormInput label={"New Password"} name={"newPassword"} value={formData?.newPassword} handleChange={handleChange}/>
          </Flex>
          <Flex align={"center"} maxW={"700px"} my="20px" >
            <FormInput label={"Confirm New Password"} name={"confirmPassword"} value={formData?.confirmPassword} handleChange={handleChange}/>
          </Flex>
          <Flex justify={"flex-end"}>
            <CustomBtn text={"Update Password"} color={"#000"} handleClick={handleUpdatePassword} loading={isUpdateMutating}/>
          </Flex>
        </Box>
      </Box>

      <Box>
        <Text fontWeight={"bold"}>Notification Management</Text>
        <Box py="20px" px="30px" borderRadius={"10px"} bg={"#2C2C2C"} mt="10px">
          <Flex gap={"20px"} justify={"space-between"} align={"center"}>
            <Box>
              <Text fontWeight={"bold"}>Annoucement</Text>
              <Text color={"#F5F5F5"} fontSize={"15px"} pt="8px">
                Occasional annoucement of new features
              </Text>
            </Box>
            <Box>
              <Switch />
            </Box>
          </Flex>
          <Box my="20px">
            <Divider />
          </Box>
          <Flex gap={"20px"} justify={"space-between"} align={"center"}>
            <Box>
              <Text fontWeight={"bold"}>Escroe Funding</Text>
              <Text color={"#F5F5F5"} fontSize={"15px"} pt="8px">
                Occasional notification from Teevil escrow payment
              </Text>
            </Box>
            <Box>
              <Switch />
            </Box>
          </Flex>
          <Box my="20px">
            <Divider />
          </Box>
        </Box>
      </Box>
      <Box py="20px" px="30px" borderRadius={"10px"} bg={"#2C2C2C"} mt="30px" w={"400px"}>
        <Text fontWeight={"bold"}>Delete your account</Text>
        <Text fontSize={"15px"} py="8px">Before deleting your account, please note that if you delete your 
            account, ou cannot recover it.
        </Text>
        <Flex mt="10px" justify={"flex-end"}>
            <CustomBtn text={"Delete"} bg={"none"} border={"1px solid #FF5A5F"}/>
        </Flex>
      </Box>
    </Box>
  );
};

export default Setting;
