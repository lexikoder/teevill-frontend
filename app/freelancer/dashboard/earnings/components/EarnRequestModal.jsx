"use client"

import { Box, Flex, FormLabel, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import FormInput from "@/components/FormInput";
import { _COLORS } from "@/constant/colors";
import { BsCurrencyDollar } from "react-icons/bs";
import { CustomBtn } from "@/components/CustomBtn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { requestEarnings } from "../services";


const EarnRequestModal = ({ acceptJobs, refetch, onClose }) => {
    const queryClient = useQueryClient()
  const [formValues, setFormValues] = useState({
    amount: "",
    method: "",
    job: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

    const { mutate: requestEarninglMutation, isPending } = useMutation({
        mutationFn: requestEarnings,
        mutationKey: ["history"],
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["history"] });
         refetch?.();
          onClose();
        },
      });
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
          ...formValues,
          amount: Number(formValues.amount),
        };
        console.log("Submitting payload:", payload);
        requestEarninglMutation(payload);
      };


  return (
    <Box bg={"#2c2c2c"} mb="20px">
      <FormInput
        label={"Amount"}
        type={"number"}
        focusBorderColor={_COLORS?.brand}
        handleChange={handleChange}
        name="amount"
        value={formValues?.amount}
        labelColor={"#fff"}
        rightIcon={<BsCurrencyDollar color="#fff" />}
      />

      <Box my="20px">
        <FormLabel color={"#fff"}>Payment Method</FormLabel>
        <Select
          placeholder={"Select Payment Method"}
          focusBorderColor={_COLORS?.brand}
          color="#fff"
          onChange={handleChange}
          name="method"
          value={formValues?.method}
        >
          <option value={"bank-transfer"} style={{ color: "black" }}>
            Bank Transfer
          </option>
          <option value={"paypal"} style={{ color: "black" }}>
            PayPal
          </option>
          <option value={"stripe"} style={{ color: "black" }}>
            Stripe
          </option>
        </Select>
      </Box>

      <Box>
        <FormLabel color={"#fff"}>Select Job</FormLabel>
        <Select
          placeholder={"Select Job"}
          onChange={handleChange}
          name="job"
          value={formValues?.job}
          focusBorderColor={_COLORS?.brand}
          color="#fff"
        >
          {acceptJobs?.map((data) => (
            <option
              key={data?._id}
              style={{ color: "#000" }}
              value={data?.job?._id}
            >
              {data?.job?.title}
            </option>
          ))}
        </Select>
      </Box>

      <Flex mt="30px" justify="center">
        <CustomBtn text={"Submit"} color={"#000"} width={"full"} handleClick={handleSubmit} loading={isPending} />
      </Flex>
    </Box>
  );
};

export default EarnRequestModal;
