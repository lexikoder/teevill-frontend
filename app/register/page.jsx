"use client"

import {
  Box,
  Button,
  Divider,
  Flex,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaApple } from "react-icons/fa";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { Tabs, TabList, Tab, } from "@chakra-ui/react";
import { CustomBtn } from "@/components/CustomBtn";
import FormInput from "@/components/FormInput";
import { _COLORS } from "@/constant/colors";
import useForm from "@/hooks/useForm";
import { useRouter } from "next/navigation";
import { registerClient, registerFreelancer } from "./service/register";




const Page = () => {
    const router = useRouter()
      const [tabToShow, setTabToShow] = useState("freelancer");
      const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [show1, setShow1] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    accountType: tabToShow === "freelancer" ? "freelancer" : "client",
    // confirmPassword: "",
  };
  const { handleChange, formValues, setFormValues } = useForm(initialValues);

  // Update formValues when tabToShow changes
  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      accountType: tabToShow === "freelancer" ? "freelancer" : "client",
    }));
  }, [tabToShow, setFormValues]);

   const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...formValues };
    const email = formValues?.email;
    console.log(payload,"og")
    tabToShow === "freelancer"
      ? await registerFreelancer(payload, setLoading, email, router)
      : await registerClient(payload, setLoading, email, router);
  };





  return (
    <Flex
      // h={"100vh"}
      justify={"space-between"}
      flexDir={["column", "column", "column", "row"]}
      // overflow={"hidden"}
      bg={"black"}
      // gap={["30px","30px","30px","0px"]}
      color={"#fff"}
    >
      <Box flex={1} px={["20px","20px","20px","100px"]} >
        <Box mt="20px">
          <Image src={"/logo.png"} alt="LOGO" h={"40px"} />
        </Box>

        <Tabs variant="unstyled" mt="10px">
          <TabList
            bg={"#2C2C2C"}
            p={"5px"}
            borderRadius={"10px"}
            w={"fit-content"}
            gap={"40px"}
          >
            <Tab
              _selected={{ color: "#000", bg: "#F5F5F5" }}
              borderRadius={"10px"}
              px="30px"
              fontWeight={"bold"}
              onClick={() => {
                setTabToShow("freelancer");
              }}
            >
              Freelancers
            </Tab>
            <Tab
              _selected={{ color: "#000", bg: "#F5F5F5" }}
              borderRadius={"10px"}
              px="30px"
              fontWeight={"bold"}
              onClick={() => {
                setTabToShow("client");
              }}
            >
              Clients
            </Tab>
          </TabList>
        </Tabs>

        <Box py={"10px"}>
          <Text fontSize={"30px"} fontWeight={"bold"} pb={"10px"}>
            Welcome To TeeVill
          </Text>
          {tabToShow === "freelancer" ? (
            <Text
              fontSize={"20px"}
              fontWeight={400}
              maxW={"700px"}
              color={"#E9FCFF7D"}
            >
              Kindly fill out your details and proceed to the next step. Your
              journey starts here
            </Text>
          ) : (
            <Text
              fontSize={"20px"}
              fontWeight={400}
              maxW={"700px"}
              color={"#E9FCFF7D"}
            >
              Kindly fill out your details and proceed to the next step. Get the
              right talent for your project
            </Text>
          )}

          <Box mt="10px">
            <Flex align={"center"} gap={"50px"}>
              <FormInput
                focusBorderColor={_COLORS?.brand}
                border={"1px solid #E9FCFF7D"}
                label={"First Name"}
                value={formValues?.firstName}
                handleChange={handleChange}
                name="firstName"
              />
              <FormInput
                focusBorderColor={_COLORS?.brand}
                border={"1px solid #E9FCFF7D"}
                label={"Last Name"}
                value={formValues?.lastName}
                handleChange={handleChange}
                name="lastName"
              />
            </Flex>
            <Flex align={"center"} gap={"50px"} mt="20px">
              <FormInput
                border={"1px solid #E9FCFF7D"}
                label={"Email Address"}
                focusBorderColor={_COLORS?.brand}
                value={formValues?.email}
                handleChange={handleChange}
                name="email"
              />
              <FormInput
                border={"1px solid #E9FCFF7D"}
                label={"Phone Number"}
                focusBorderColor={_COLORS?.brand}
                value={formValues?.phone}
                handleChange={handleChange}
                name="phone"
              />
            </Flex>
            <Flex align={"center"} gap={"50px"} mt="20px">
              <Box flex={1}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    focusBorderColor={_COLORS?.brand}
                    border={"1px solid #E9FCFF7D"}
                    placeholder="enter password"
                    type={show ? "text" : "password"}
                    value={formValues?.password}
                    onChange={handleChange}
                  />
                  <InputRightElement>
                    <Button bg={"none"} size={"40px"} onClick={handleClick}>
                      {show ? (
                        <IoIosEyeOff color={"#666666"} size={20} />
                      ) : (
                        <IoIosEye color={"#666666"} size={20} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box>
              {/* <Box flex={1}>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                  <Input
                    focusBorderColor={_COLORS?.brand}
                    border={"1px solid #E9FCFF7D"}
                    name="confirmPassword"
                    placeholder="confirm password"
                    type={show1 ? "text" : "password"}
                    value={formValues?.confirmPassword}
                    onChange={handleChange}
                  />
                  <InputRightElement>
                    <Button bg={"none"} size={"40px"} onClick={handleClick1}>
                      {show1 ? (
                        <IoIosEyeOff color={"#666666"} size={20} />
                      ) : (
                        <IoIosEye color={"#666666"} size={20} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Box> */}
            </Flex>
          </Box>
          <Flex mt={"30px"}>
            <CustomBtn
              text={"Register Now"}
              width={"full"}
              handleClick={handleRegister}
              loading={loading}
              disabled={
                !formValues?.firstName ||
                !formValues?.lastName ||
                !formValues?.email ||
                !formValues?.phone ||
                !formValues?.password
              }
            />
          </Flex>
          <Flex my="10px" align={"center"} gap={"20px"}>
            <Box h={"2px"} bg={"#E9FCFF7D"} w={"full"}></Box>
            <Box>
              <Text fontWeight={500} color={"#E9FCFF7D"}>
                Or
              </Text>
            </Box>
            <Box h={"2px"} bg={"#E9FCFF7D"} w={"full"}></Box>
          </Flex>
          <Flex align={"center"} flexDir={["column","column","column","row"]} gap={["20px","20px","20px","50px"]}>
            <CustomBtn
              childComp={<FcGoogle />}
              text={"Continue with Google"}
              width={"full"}
              bg={"none"}
              border={"1px solid #E9FCFF7D"}
            />
            <CustomBtn
              childComp={<FaApple />}
              text={"Continue with Apple"}
              width={"full"}
              bg={"none"}
              border={"1px solid #E9FCFF7D"}
            />
          </Flex>
          <Flex justifyContent={"center"} mt="20px" gap={"10px"}>
            <Text color={"#E9FCFF7D"} fontWeight={600}>
              Already have an Account ?{" "}
            </Text>
            <Text
              color={_COLORS?.brand}
              cursor={"pointer"}
              fontWeight={600}
              onClick={() => {
                router.push("/login");
              }}
            >
              Sign In
            </Text>
          </Flex>
        </Box>
      </Box>

      <Box flex={1}>
        <Image src={"/ImgBg.png"} h={["70vh","70vh","70vh","100vh"]} w={"full"} />
      </Box>
    </Flex>
  )
}

export default Page