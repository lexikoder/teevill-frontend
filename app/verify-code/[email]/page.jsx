"use client";

import { Box, Flex, Image, Input, Text } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { CustomBtn } from "@/components/CustomBtn";
import { useRouter, useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { resendOTP, sendOtp, sendClientOtp } from "../services/Index";
import { _COLORS } from "@/constant/colors";
import { APP_CONSTANTS } from "@/constant/app";
import { getLocalStorageItem } from "@/utils/localStorage"; 

const VerifyCode = () => {
  const router = useRouter();
  const params = useParams();
  const email = decodeURIComponent(params?.email || "");

  const queryClient = useQueryClient();
  const [verificationCode, setVerificationCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !verificationCode[index]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const otpCode = verificationCode.join("");
  const userAccount = getLocalStorageItem(APP_CONSTANTS.accountType);

  const { mutate: sendEmail, isPending: isUpdateMutating } = useMutation({
    mutationFn: sendOtp,
    mutationKey: ["otp"],
    onSuccess: () => {
      router.push("/congratulation");
      queryClient.invalidateQueries({ queryKey: ["otp"] });
    },
    onError: (error) => {
      console.error("Freelancer OTP verification error", error);
    },
  });

  const { mutate: sendClientEmail, isPending: clientPending } = useMutation({
    mutationFn: sendClientOtp,
    mutationKey: ["otp"],
    onSuccess: () => {
      router.push("/congratulation");
      queryClient.invalidateQueries({ queryKey: ["otp"] });
    },
    onError: (error) => {
      console.error("Client OTP verification error", error);
    },
  });

  const handleSubmit = () => {
    const payload = { otp: otpCode, email };

    if (userAccount?.accountType === "freelancer") {
      sendEmail(payload);
    } else if (userAccount?.accountType === "client") {
      sendClientEmail(payload);
    } else {
      console.error("No valid accountType found in localStorage");
    }
  };

  const handleResend = async () => {
    await resendOTP({ email });
  };

  return (
    <Flex
      h="100vh"
      justify="space-between"
      flexDir={["column", "column", "column", "row"]}
      bg="#000"
      color="#fff"
    >
      <Box flex={1}>
        <Box px={["20px", "50px"]} mt="20px">
          <Image src={"/logo.png"} h="50px" alt="Logo" />
        </Box>

        <Box px={["20px", "50px"]} py={["50px", "100px"]}>
          <Text fontSize="30px" fontWeight="bold" pb="20px">
            Email Verification
          </Text>
          <Text fontSize="20px" fontWeight={400} maxW="700px" color="#E9FCFF7D">
            We have sent a verification code to <b>{email}</b>.  
            Please enter the code below to confirm your email address and proceed.
          </Text>

          <Flex align="center" justify="center" my={[10, 20]}>
            {verificationCode.map((value, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                focusBorderColor={_COLORS.brand}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                width={["60px", "80px"]}
                height={["60px", "80px"]}
                textAlign="center"
                marginX={["10px", "20px"]}
                fontWeight="bold"
                color={_COLORS.brand}
                fontSize="24px"
                border="3px solid #ccc"
              />
            ))}
          </Flex>

          <Flex>
            <CustomBtn
              text="Verify Email"
              width="full"
              loading={userAccount?.accountType ==="freelancer" ? isUpdateMutating : clientPending}
              handleClick={handleSubmit}
            />
          </Flex>

          <Flex
            mt={["20px", "50px"]}
            justify="center"
            fontWeight={500}
            gap="10px"
            fontSize="20px"
            color="#E9FCFF7D"
          >
            Didn’t receive any code?{" "}
            <Text
              cursor="pointer"
              textDecor="underline"
              onClick={handleResend}
              color={_COLORS.brand}
            >
              Resend Code
            </Text>
          </Flex>
        </Box>
      </Box>

      <Box flex={1}>
        <Image src={"/ImgBg.png"} w="full" h={["70vh", "100vh"]} alt="Verification background" />
      </Box>
    </Flex>
  );
};

export default VerifyCode;
