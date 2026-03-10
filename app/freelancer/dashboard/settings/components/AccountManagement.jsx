"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import FormInput from "@/components/FormInput";
import { CustomBtn } from "@/components/CustomBtn";
import { useGlobalState } from "@/context/GlobalStateContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editUser } from "./services/service";
import { _COLORS } from "@/constant/colors";

const AccountManagement = ({ refetch }) => {
  const queryClient = useQueryClient();
  const { user, setUser } = useGlobalState();
  console.log(user,"USER")
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    accountType: user?.accountType,
  });

  // Initialize form values from global state
  useEffect(() => {
    if (user) {
      setFormValues({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        accountType: user.accountType || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

// const { mutate: updateUserMutation, isPending } = useMutation({
//   mutationFn: (payload) => editUser(user?._id, payload),
//   onSuccess: async () => {
//     const latestUser = await getUserDetails(); // fetch from API
//     if (latestUser) {
//       setUser(latestUser);
//       sessionStorage.setItem("user", JSON.stringify(latestUser));
//     }
//     refetch?.();
//   },
// });

const { mutate: updateUserMutation, isPending } = useMutation({
  mutationFn: (payload) => editUser(user?._id, payload),
  mutationKey: ["user"],
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      sessionStorage.setItem("user", JSON.stringify(updatedUser));
      queryClient.invalidateQueries({ queryKey: ["user"] });
      refetch?.();
    }
});


  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserMutation(formValues);
  };

  return (
    <Box my="50px">
      <Text fontSize="2xl" fontWeight="bold">
        Account Management
      </Text>
      <Box bg="#2C2C2C" borderRadius="10px" p="20px">
        <Flex align="center" gap="50px">
          <FormInput
            label="Firstname"
            focusBorderColor={_COLORS.brand}
            name="firstName"
            value={formValues.firstName}
            handleChange={handleChange}
          />
          <FormInput
            label="Lastname"
            focusBorderColor={_COLORS.brand}
            name="lastName"
            value={formValues.lastName}
            handleChange={handleChange}
          />
        </Flex>

        <Flex align="flex-end" justify="space-between" mt="20px" gap="50px">
          <FormInput
            label="Email Address"
            focusBorderColor={_COLORS.brand}
            name="email"
            value={formValues.email}
            handleChange={handleChange}
          />
          <FormInput
            label="Phone"
            focusBorderColor={_COLORS.brand}
            name="phone"
            value={formValues.phone}
            handleChange={handleChange}
          />
          <CustomBtn
            text="Save Changes"
            color="#000"
            width="full"
            handleClick={handleSubmit}
            loading={isPending}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default AccountManagement;

