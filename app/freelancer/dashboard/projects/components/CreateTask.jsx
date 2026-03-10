"use client"

import {
  Avatar,
  Box,
  Checkbox,
  Flex,
  FormLabel,
  Image,
  Select,
  Text,
  Input,
  IconButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import FormInput from "@/components/FormInput";
import { BsPlus } from "react-icons/bs";
import { FiTrash2 } from "react-icons/fi";
import { CustomBtn } from "@/components/CustomBtn";
import { _COLORS } from "@/constant/colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Select as ChakraReactSelect } from "chakra-react-select";
import { createNewTask } from "../services/Index";

const CreateTask = ({ datum, refetch, onClose, collaborator }) => {
  const queryClient = useQueryClient();

  const [formValues, setFormValues] = useState({
    title: "",
    content: "",
    priority: "",
    // status: "pending",
    section: datum?._id,
    assignedTo: [],
    project: datum?.project,
    dueDate: "",
    tasks: [], 
  });

  const [subTaskInput, setSubTaskInput] = useState(""); 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };


  const handleAddSubTask = () => {
    if (subTaskInput.trim() === "") return;
    setFormValues((prev) => ({
      ...prev,
      tasks: [...prev.tasks, subTaskInput], 
    }));
    setSubTaskInput("");
  };


  const handleRemoveSubTask = (index) => {
    setFormValues((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index),
    }));
  };

  
  const handleToggleComplete = (index) => {
    setFormValues((prev) => {
      const updatedTasks = [...prev.tasks];
      updatedTasks[index].completed = !updatedTasks[index].completed;
      return { ...prev, tasks: updatedTasks };
    });
  };

const { mutate: addTaskMutation, isPending } = useMutation({
  mutationFn: createNewTask,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["projects", datum?.project] });
    refetch?.();
    onClose?.();
  },
});

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formValues,
    };
    addTaskMutation(payload);
  };

  return (
    <Flex color={"#fff"} gap={"20px"}>
      <Box flex={2}>
        <Text fontSize={"20px"} fontWeight={500}>
          Create Task
        </Text>

        <FormInput
          label={"Task Title"}
          mt={"20px"}
          name={"title"}
          focusBorderColor={_COLORS?.brand}
          value={formValues?.title}
          handleChange={handleChange}
        />

        <FormInput
          lines={5}
          focusBorderColor={_COLORS?.brand}
          label={"Description"}
          mt={"20px"}
          name={"content"}
          value={formValues?.content}
          handleChange={handleChange}
        />

        <Box mt="30px">
          <Flex align={"center"} justify={"space-between"}>
            <Text fontSize={"18px"} fontWeight={400}>
              SUB-TASKS
            </Text>
          </Flex>

          <Box my={"20px"}>
            <Flex gap="10px" mt="10px">
              <Input
                placeholder="Add sub-task"
                focusBorderColor={_COLORS?.brand}
                value={subTaskInput}
                onChange={(e) => setSubTaskInput(e.target.value)}
              />
              <IconButton
                aria-label="Add sub-task"
                icon={<BsPlus size={24} />}
                onClick={handleAddSubTask}
              />
            </Flex>
            {formValues.tasks.map((task, index) => (
              <Flex key={index} align={"center"} gap={"10px"} my="10px">
                <Text flex={1}>{task}</Text>
                <IconButton
                  aria-label="Remove"
                  icon={<FiTrash2 />}
                  size="sm"
                  onClick={() => handleRemoveSubTask(index)}
                />
              </Flex>
            ))}
          </Box>
        </Box>
      </Box>

      <Flex flex={1.5} align={"start"} gap={"10px"}>
        <Box h={"100%"} w={"2px"} bg={"#3D3D3D"}></Box>
        <Box>
          <Text>Attributes</Text>

          <Box my="20px">
            <FormLabel>Priority</FormLabel>
            <Select
              color="white"
              // bg="black"
              focusBorderColor={_COLORS?.brand}
              name="priority"
              value={formValues?.priority}
              onChange={handleChange}
            >
              <option value="high" style={{ color: "black" }}>
                High
              </option>
              <option value="medium" style={{ color: "black" }}>
                Medium
              </option>
              <option value="low" style={{ color: "black" }}>
                Low
              </option>
               <option value="casual" style={{ color: "black" }}>
                Casual
              </option>
            </Select>
          </Box>

          <Box>
            <FormLabel>Assigned To</FormLabel>
           

            <ChakraReactSelect
              isMulti
              name="assignedTo"
              focusBorderColor={_COLORS?.brand}
              selectedOptionStyle="check"
              options={collaborator?.map((col) => ({
                label: `${col?.firstName} ${col?.lastName}`,
                value: col?._id,
              }))}
              value={collaborator
                ?.filter((col) => formValues.assignedTo?.includes(col._id))
                .map((col) => ({
                  label: `${col.firstName} ${col.lastName}`,
                  value: col._id,
                }))}
              onChange={(selected) =>
                setFormValues((prev) => ({
                  ...prev,
                  assignedTo: selected.map((s) => s.value),
                }))
              }
              chakraStyles={{
                dropdownIndicator: (provided) => ({
                  ...provided,
                  bg: "",
                  px: 2,
                  cursor: "pointer",
                }),
                option: (provided, state) => ({
                  ...provided,
                  bg: state.isSelected ? "#D39D12" : "",
                  color: "black",
                  _hover: { bg: "blue.600", color: "white" },
                }),
                multiValue: (provided) => ({
                  ...provided,
                  bg: "#D39D12",
                  color: "#000",
                  borderRadius: "md",
                  px: 2,
                }),
              }}
            />
          </Box>

          <Box my="20px">
            <FormInput
              type={"date"}
              label={"Due Date"}
              focusBorderColor={_COLORS?.brand}
              name={"dueDate"}
              value={formValues?.dueDate}
              handleChange={handleChange}
            />
          </Box>

          <Flex mt="200px" justify={"flex-end"} gap={"10px"}>
            <CustomBtn
              text={"Create Task"}
              color={"#000"}
              loading={isPending}
              handleClick={handleSubmit}
            />
            <CustomBtn
              text={"Cancel"}
              bg={"none"}
              border={"1px solid #fff"}
              handleClick={onClose}
            />
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};

export default CreateTask;
