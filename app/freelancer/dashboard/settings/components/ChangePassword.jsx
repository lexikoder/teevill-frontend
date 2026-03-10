"use client"

import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import FormInput from '@/components/FormInput'
import { CustomBtn } from '@/components/CustomBtn'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { changePassword } from './services/service'

const ChangePassword = () => {


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
        mutationFn: (payload) => changePassword(payload),
        mutationKey: ["user"],
        onSuccess: (data) => {
          console.log("data", data);
          queryClient.invalidateQueries({ queryKey: ["user"] });
          setState((prev) => ({ ...prev, updated: !prev.updated }));
          setFormValues({"oldPassword": "", "newPassword": "" });
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
    <Box my="50px">
        <Text>Change Password</Text>
        <Box bg={"#2C2C2C"} borderRadius={"10px"} p={"10px 20px"}>
            <Flex align={"center"} gap={"50px"}>
                <FormInput label={"Current Password"} handleChange={handleChange} name={"oldPassword"} value={formData?.oldPassword}/>
                <FormInput label={"New Password"}  handleChange={handleChange} name={"newPassword"} value={formData?.newPassword}/>
            </Flex>

             <Flex align={"flex-end"} justify={"space-between"} mt="20px" gap={"50px"}>
                <FormInput label={"Confirm New Password"} />
                <CustomBtn text={"Save Changes"} color={"#000"} width={"full"} handleClick={handleUpdatePassword} loading={isUpdateMutating}/>
            </Flex>
        </Box>

    </Box>
  )
}

export default ChangePassword