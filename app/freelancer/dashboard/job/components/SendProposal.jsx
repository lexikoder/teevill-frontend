"use client"

import { Box, Flex, FormLabel, Input, InputGroup, InputRightAddon, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import FormInput from "@/components/FormInput";
import { CustomBtn } from "@/components/CustomBtn";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
import { _COLORS } from "@/constant/colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewProposal } from "../services/Index";

const SendProposal = ({datum, refetch, onClose}) => {
  const queryClient = useQueryClient();
    console.log(datum,"KEnn")
    
     const [formValues, setFormValues] = useState({
        title: datum?.title,
        body: "",
        timeLine: "",
        bidAmount: "",
        job: datum?._id,
      });
     const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
      const { mutate: createProposalMutation, isPending } = useMutation({
        mutationFn: createNewProposal,
        mutationKey: ["jobs"],
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["jobs"] });
         refetch?.();
          onClose();
        },
      });
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
          ...formValues,
        };
        console.log("Submitting payload:", payload);
        createProposalMutation(payload);
      };



  return (
    <Box color={"#fff"}>
      <FormInput lines={5} label={"Cover letter"} focusBorderColor={_COLORS?.brand}  handleChange={handleChange} name="body" value={formValues?.body}/>
      <Flex my="20px" gap={"20px"}>
        <Box flex={1}>
          <FormLabel>Time-line</FormLabel>
          <Select focusBorderColor={_COLORS?.brand} onChange={handleChange} name="timeLine" value={formValues?.timeLine} color={"#fff"}>
            <option value={"one"} style={{color:"#000"}}>1 months</option>
            <option value={"two"}  style={{color:"#000"}}>2 months</option>
          </Select>
        </Box>

        <Box flex={1}>
          <FormLabel>Bid-Amount</FormLabel>
          <InputGroup>
            
            <Input type="number"  focusBorderColor={_COLORS?.brand} placeholder="0.00" onChange={handleChange} name="bidAmount" value={formValues?.bidAmount} />
            <InputRightAddon color={"#000"} fontWeight={"bold"} fontSize={"20px"}>
             $
            </InputRightAddon>
          </InputGroup>
        </Box>

        
      </Flex>
      <Flex align={"center"} mt="50px" justifyContent={"flex-end"} gap={"20px"}>
            <CustomBtn text={"Submit Proposal"} color={"#000"} handleClick={handleSubmit} loading={isPending}/>
            <CustomBtn text={"Cancel"} border={"1px solid #ffff"} bg={"none"} handleClick={onClose}/>
        </Flex>
    </Box>
  );
};

export default SendProposal;
