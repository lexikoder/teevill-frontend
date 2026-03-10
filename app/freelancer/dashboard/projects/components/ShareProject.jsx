"use client";

import React, { useState } from "react";
import FormInput from "@/components/FormInput";
import { Box, Flex, FormLabel, Select } from "@chakra-ui/react";
import { CustomBtn } from "@/components/CustomBtn";
import { _COLORS } from "@/constant/colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { shareProject } from "../services/Index";

const ShareProject = ({ datum, refetch, onClose }) => {
  const queryClient = useQueryClient();
  const project = datum?.sections;
  const [formValues, setFormValues] = useState({
    email: "",
    projectId: datum?._id,
    sections: [""],
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: name === "sections" ? [value] : value, // always array for 'sections'
    }));
  };
 const { mutate: shareProjectMutation, isPending } = useMutation({
  mutationFn: shareProject,
  mutationKey: ["shareProject"],
  onSuccess: async () => {
    queryClient?.invalidateQueries({ queryKey: ["projects"] });
    refetch();
    onClose();
  },
});


  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formValues,
    };
    shareProjectMutation(payload);
  };

  return (
    <Box color={"#fff"}>
      <FormInput
        label={"Email"}
        focusBorderColor={_COLORS?.brand}
        name={"email"}
        value={formValues?.email}
        handleChange={handleChange}
      />

      <Box my="30px">
        <FormLabel>Access to what Section</FormLabel>
        <Select
          placeholder="All Sections"
          onChange={handleChange}
          focusBorderColor={_COLORS?.brand}
          name="sections"
          value={formValues.sections[0] || ""}
        >
          {project.map((project) => (
            <option
              key={project?._id}
              value={project?._id}
              style={{ color: "#000" }}
            >
              {project?.title}
            </option>
          ))}
        </Select>
      </Box>
      <Flex justifyContent={"flex-end"} gap={"20px"}>
        <CustomBtn
          text={"Share Invite"}
          bg={_COLORS?.brand}
          color="#000"
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

export default ShareProject;
