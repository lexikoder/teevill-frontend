"use client"

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FormInput from "@/components/FormInput";
import { CustomBtn } from "@/components/CustomBtn";
import { _COLORS } from "@/constant/colors";
import { MdCalendarToday } from "react-icons/md";
import { BsPlus, BsTrash } from "react-icons/bs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewProject } from "../services/Index";


const CreateProject = ({ data, isOpen, onClose, finalFocusRef, refetch }) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) {
      const updatedSections = data?.section || [""];
      setFormValues({
        title: data.title || "",
        description: data.description || "",
        projectType: data.projectType || "personal",
        deadline: data.deadline
          ? new Date(data.deadline).toISOString().split("T")[0]
          : "",
        section: updatedSections,
      });
      setInputs(updatedSections);
    }
  }, [data]);

  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    projectType: "",
    deadline: "",
    section: [""],
  });
  const [inputs, setInputs] = useState(formValues.section);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddInput = () => {
    const updatedInputs = [...inputs, ""];
    setInputs(updatedInputs);
    setFormValues((prev) => ({ ...prev, section: updatedInputs }));
  };

  const handleSectionChange = (index, value) => {
    const updatedInputs = [...inputs];
    updatedInputs[index] = value;
    setInputs(updatedInputs);
    setFormValues((prev) => ({ ...prev, section: updatedInputs }));
  };
  const handleDeleteInput = (index) => {
    const updatedInputs = [...inputs];
    updatedInputs.splice(index, 1);
    setInputs(updatedInputs);
    setFormValues((prev) => ({ ...prev, section: updatedInputs }));
  };

  const { mutate: createProjectMutation, isPending } = useMutation({
    mutationFn: createNewProject,
    mutationKey: ["projects"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      refetch?.();
      onClose();
    },
  });

  const handleSubmit = () => {
    const payload = {
      ...formValues,
    };

    if (data?._id) {
      createProjectMutation({ ...payload, isEdit: true, projectId: data?._id });
    } else {
      createProjectMutation(payload);
    }
  };

  return (
    <Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={"lg"}
        finalFocusRef={finalFocusRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="#141414" color="#fff">
          <DrawerCloseButton bg="#FBBF24" color="#000" />
          <DrawerHeader>
            {!data ? "Add New Project" : "Edit Project"}
          </DrawerHeader>

          <DrawerBody mt="40px">
            <FormInput
              label={"Project Title"}
              focusBorderColor={_COLORS?.brand}
              type={"text"}
              name="title"
              value={formValues?.title}
              handleChange={handleChange}
            />
            <FormInput
              mt="30px"
              label={"Project Type"}
              focusBorderColor={_COLORS?.brand}
              type={"text"}
              name="projectType"
              value={formValues?.projectType}
              handleChange={handleChange}
            />
            <FormInput
              lines={5}
              label={"Project Description"}
              mt={"30px"}
              focusBorderColor={_COLORS?.brand}
              name="description"
              value={formValues?.description}
              handleChange={handleChange}
            />
            <FormInput
              label={"Project Deadline"}
              mt={"30px"}
              name="deadline"
              focusBorderColor={_COLORS?.brand}
              type={"date"}
              rightIcon={<MdCalendarToday color={_COLORS?.brand} />}
              value={formValues?.deadline}
              handleChange={handleChange}
            />
            <Box mt={"30px"}>
              <Flex align={"center"} justify={"space-between"}>
                <Text fontSize={"1em"} fontWeight={500}>
                  Project Section
                </Text>

                <CustomBtn
                  text={"Add More"}
                  childComp={<BsPlus size={30} />}
                  handleClick={handleAddInput}
                  color={"#FBBF24"}
                  bg={"none"}
                />
              </Flex>

              {inputs.map((value, index) => (
                <Flex key={index} gap={2} mb={3} align={"center"}>
                  <FormInput
                    focusBorderColor={_COLORS?.brand}
                    mb="10px"
                    value={value}
                    placeholder={`Product Section ${index + 1}`}
                    handleChange={(e) =>
                      handleSectionChange(index, e.target.value)
                    }
                  />

                  <Flex justify={"flex-end"}>
                    <CustomBtn
                      childComp={<BsTrash size={20} />}
                      color={"#FBBF24"}
                      bg={"none"}
                      handleClick={() => handleDeleteInput(index)}
                    />
                  </Flex>
                </Flex>
              ))}
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Flex align={"center"} justify={"flex-end"} gap={"20px"}>
              <CustomBtn
                color="#000"
                handleClick={handleSubmit}
                text={!data ? "Create Project" : "Update Project"}
                loading={isPending}
              />
              <CustomBtn
                text={"Cancel"}
                bg="none"
                border={"1px solid #fff"}
                handleClick={onClose}
              />
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default CreateProject;
