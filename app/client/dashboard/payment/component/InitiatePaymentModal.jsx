"use client";

import { Box, Flex, FormLabel, Input, Select, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import FormInput from "@/components/FormInput";
import { CustomBtn } from "@/components/CustomBtn";
import { _COLORS } from "@/constant/colors";
import axiosInstance from "@/service/api";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { errorNotifier, successNotifier } from "@/components/notifier";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51MXt1nAX4icpUpylgMHKjEqr26OcjHnokICi9wSolBy1AsDQi2IMgJNWmhRhSAZ8nhNHVqDe31ZVQWfoqqbDuXa400XDGfxmFw")

const InitiatePaymentModal = ({ data }) => {
  const { onClose } = useDisclosure();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const [selectedJobId, setSelectedJobId] = useState("");
  const [formValues, setFormValues] = useState({
    freelancer: "",
    job: "",
    amount: "",
  });

  // Find the selected job
  const selectedJob = data?.find((datum) => datum?.job?._id === selectedJobId);

  const handleProjectSelect = (e) => {
    const jobId = e.target.value;
    const selected = data?.find((datum) => datum?.job?._id === jobId);

    setSelectedJobId(jobId);

    const freelancer = selected?.submittedBy || selected?.usersAdded?.[0]; // pick freelancer source

    setFormValues((prev) => ({
      ...prev,
      job: jobId,
      freelancer: freelancer?._id || "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    setLoading(true);
    if (!stripe || !elements) {
      return errorNotifier("Stripe has not loaded yet. Please try again.");
    }

    try {
      const response = await axiosInstance.post("/transaction/initiate", {
        freelancer: formValues.freelancer,
        job: formValues.job,
        amount: Number(formValues.amount),
      });

      const clientSecret = response.data?.data?.clientSecret;

      if (!clientSecret) {
        return errorNotifier("Missing client secret from backend");
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        errorNotifier(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        successNotifier("Payment Successful");
        onClose();
      } else {
        errorNotifier("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Stripe Error:", error);
      errorNotifier("An error occurred. Try again later.");
    } finally {
      setLoading(false);
    }
  };

// const handlePayment = async () => {
//     const stripe = await stripePromise;


//     const { data } = await axiosInstance.post("/transaction/initiate", {
//       freelancer: formValues?.freelancer,
//       job: formValues?.job,
//       amount: Number(formValues.amount),
//     });
//     successNotifier("Payment Initiated")
//     return data;

   
//     const { error } = await stripe.redirectToCheckout({
//       sessionId: data.sessionId,
//     });

//     if (error) {
//       errorNotifier( error.message);
//     }
//   };




  return (
    <Box color={"#fff"}>
      
      <Box>
        <FormLabel>Job Title</FormLabel>
        <Select
          placeholder="Select job"
          onChange={handleProjectSelect}
          value={selectedJobId}
          fontWeight={"bold"}
          focusBorderColor={_COLORS?.brand}
        >
          {data?.map((datum) => (
            <option key={datum?._id} value={datum?.job?._id} style={{ color: "#000" }}>
              {datum?.job?.title}
            </option>
          ))}
        </Select>
      </Box>

      {/* Freelancer */}
      <Box my="20px">
        <FormLabel>Payment To</FormLabel>
        <Input
          isDisabled
          value={
            selectedJob?.submittedBy
              ? `${selectedJob?.submittedBy?.firstName} ${selectedJob?.submittedBy?.lastName}`
              : selectedJob?.usersAdded?.[0]
              ? `${selectedJob?.usersAdded[0].firstName} ${selectedJob?.usersAdded[0].lastName}`
              : ""
          }
          fontWeight="bold"
          focusBorderColor={_COLORS?.brand}
        />
      </Box>

     
      <FormInput
        name="amount"
        label="Amount To Send"
        value={formValues.amount}
        onChange={handleChange}
        fontWeight={"bold"}
        focusBorderColor={_COLORS?.brand}
      />

   
      <Box my="20px">
        <FormLabel>Card Details</FormLabel>
        <Box
          p="10px"
          border="1px solid #CBD5E0"
          borderRadius="md"
          background="white"
          color="black"
        >
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#000",
                  "::placeholder": {
                    color: "#a0aec0",
                  },
                },
                invalid: {
                  color: "#e53e3e",
                },
              },
            }}
          />
        </Box>
      </Box>

      <Flex justify={"flex-end"} my="20px">
        <CustomBtn
          text={"Make Payment"}
          color="#000"
          loading={loading}
          handleClick={handlePayment}
        />
      </Flex>
    </Box>
  );
};

export default InitiatePaymentModal;
