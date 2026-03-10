"use client"

import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { CustomBtn } from "@/components/CustomBtn";
import { _COLORS } from "@/constant/colors";
import FormInput from "@/components/FormInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewSection } from "../services/Index";


const AddSectionModal = ({ onClose, projectData, refetch }) => {
  const queryClient = useQueryClient();
  const id = projectData?._id;
  const [formValues, setFormValues] = useState({
    title: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: addSectionMutation, isPending } = useMutation({
    mutationFn: createNewSection,
    onSuccess: async () => {
     await queryClient.invalidateQueries({ queryKey: ["project", id] });
      refetch?.();
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formValues,
      projectId: id,
    };
    addSectionMutation(payload);
  };

  return (
    <Box bg={"#2C2C2C"} color={"#fff"}>
      <FormInput
        label={"Title"}
        value={formValues?.title}
        focusBorderColor={_COLORS?.brand}
        handleChange={handleChange}
        name={"title"}
      />

      <Flex
        align={"center"}
        gap={"20px"}
        justify={"flex-end"}
        mt={"30px"}
        mb={"20px"}
      >
        <CustomBtn
          text={"Create Section"}
          color={"#000"}
          handleClick={handleSubmit}
          loading={isPending}
        />
        <CustomBtn
          text={"Cancel"}
          bg={"none"}
          border={"1px solid #fff"}
          handleClick={onClose}
        />
      </Flex>
    </Box>
  );
};

export default AddSectionModal;
