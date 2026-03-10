"use client"

import { Box, Flex, Switch, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { CustomBtn } from '@/components/CustomBtn'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAccount } from './services/service';
import CustomModal from '@/components/CustomModal';
import FormInput from '@/components/FormInput';
import { _COLORS } from '@/constant/colors';

const DeleteAccount = ({refetch}) => {


   
      const [formData, setFormData] = useState({
         password: "",
         // confirmPassword: "",
       });
       const handleChange = (e) => {
         const { name, value } = e.target;
         setFormData((prev) => ({ ...prev, [name]: value }));
       };
       const queryClient = useQueryClient();
       const { mutate: deleteAccountMutation, isPending: isUpdateMutating } =
         useMutation({
           mutationFn: (payload) => deleteAccount(payload),
           mutationKey: ["user"],
           onSuccess: (data) => {
             console.log("data", data);
             refetch?.()
             queryClient.invalidateQueries({ queryKey: ["user"] });
            //  setState((prev) => ({ ...prev, updated: !prev.updated }));
            //  setFormValues({"oldPassword": "", "newPassword": "" });
           },
           onError: (error) => {
             console.error("Update Profile Mutation error", error);
           },
         });
           const handleDelete = (e) => {
             e.preventDefault();
             const payload = {
               ...formData,
             };
             deleteAccountMutation(payload);
           };
   







  return (
     <Box my="50px">
        
        <Box bg={"#2C2C2C"} borderRadius={"10px"} p={"30px 20px"}>
           <Text fontWeight={500}>Delete Your Account</Text> 
           <Text py="10px" opacity={"50%"}>
            Before deleting your account, please note that if you delete your account, Dash cannot recover it.
           </Text>
           <Flex align={"center"} gap={"10px"} justifyContent={"flex-end"}>
            <CustomModal header={"Delete Account"} headerColor={"#fff"} bg={"#2C2C2C"} icon={<CustomBtn text={"Delete"} bg={"none"} border={"1px solid #FF5A5F"}/>}>
               <Flex flexDirection={"column"} gap={"20px"} color={"#FFF"}>
                  <Text>Are you sure you want to delete your account?</Text>
                  <FormInput label={"Enter Password"} focusBorderColor={_COLORS?.brand} handleChange={handleChange} name={"password"} value={formData?.password}/>
                  <CustomBtn text={"Delete Account"} color={"#000"} width={"full"} handleClick={handleDelete} loading={isUpdateMutating}/>
               </Flex>

            </CustomModal>
            
           </Flex>
        </Box>

    </Box>
  )
}

export default DeleteAccount