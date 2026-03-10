"use client"

import React, { useState } from 'react'
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { CustomBtn } from "@/components/CustomBtn";
import FormInput from "@/components/FormInput";
import { _COLORS } from "@/constant/colors";
import useForm from "@/hooks/useForm";
import { GoArrowLeft } from "react-icons/go";
import { useRouter } from 'next/navigation';
import { forgotPassword } from './service';

const Page = () => {
  const [loading, setLoading] = useState(false)
    const router = useRouter()
      const initialValues = {
    email: "",
  };
  const { handleChange, formValues } = useForm(initialValues);

   const handleSubmit = async () => {
      setLoading(true);
      const payload = { ...formValues };
        await forgotPassword(payload, setLoading)
    };
  



  return (
     <Flex
      h={"100vh"}
      flexDir={["column", "column", "column", "row"]}
      justify={"space-between"}
      // overflow={"hidden"}
      bg={"#000"}
      color={"#fff"}
    >
      <Box flex={1} px={["20px", "20px", "20px", "100px"]}>
        <Box mt="20px">
          <Image src={"/logo.png"} h={"50px"} />
        </Box>
        <Flex align={"center"} gap={"20px"} cursor={"pointer"}  onClick={() => {
              router.push("/login");
            }}> 
          <GoArrowLeft size={25}/>
          <Text
            py={"30px"}
            cursor={"pointer"}
            fontWeight={"bold"}
            fontSize={"24px"}
           
          >
            Back To Login
          </Text>
        </Flex>
        <Box py={["20px", "20px", "20px", "50px"]}>
          <Text fontSize={"30px"} fontWeight={"bold"} pb={"20px"}>
            Forgotten Password
          </Text>
          <Text fontSize={"20px"} fontWeight={400} maxW={"700px"}>
            Kindly provide the email relating with this account, a dummy
            password would be sent to that email. Use the password in log in
          </Text>
          <Box mt="50px">
            <Flex align={"center"} gap={"50px"}>
              <Box flex={1}>
                <FormInput
                  label={"Email Address"}
                  focusBorderColor={_COLORS.brand}
                  value={formValues?.email}
                  handleChange={handleChange}
                  name={"email"}
                />
              </Box>
            </Flex>

            <Flex mt={"70px"}>
              <CustomBtn
                text={"Proceed"}
                width={"full"}
                handleClick={handleSubmit}
                loading={loading}
                disabled={!formValues?.email}
              />
            </Flex>
          </Box>
        </Box>
      </Box>

      <Box flex={1}>
        <Image src={"/loginBg.png"} w={"full"} h={["70vh", "70vh", "70vh", "100vh"]} />
      </Box>
    </Flex>
  )
}

export default Page