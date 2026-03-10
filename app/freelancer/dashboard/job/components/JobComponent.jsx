import {
  Box,
  Button,
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
import React from "react";
// import FormInput from "@/components/FormInput";
import { CustomBtn } from "@/components/CustomBtn";
import CustomModal from "@/components/CustomModal";
import SendProposal from "./SendProposal";
import { MdKeyboardCommandKey } from "react-icons/md";
import { SiHyperskill } from "react-icons/si";
import { GiLevelThree } from "react-icons/gi";
import { IoBagCheckOutline } from "react-icons/io5";
import { HiOutlineCash } from "react-icons/hi";

const JobComponent = ({ isOpen, onClose, btnRef, refetch, datum }) => {
  console.log(datum, "SHAQsss");
  return (
    <Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={"lg"}
        ref={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="#141414" color="#fff">
          <DrawerCloseButton bg="#FBBF24" color="#000" />
          <DrawerHeader fontSize={"25px"}>Job Details</DrawerHeader>

          <DrawerBody mt="20px">
            {/* <Input placeholder='Type here...' /> */}

            <Box mt={"30px"}>
              <Box>
                <Text fontSize={"20px"} fontWeight={500}>
                  {datum?.title?.charAt(0)?.toUpperCase() +
                    datum?.title?.slice(1)}
                </Text>
                <Text pt={"5px"} fontSize={"15px"} pb={"20px"} opacity={"60%"}>
                  {datum?.description?.charAt(0)?.toUpperCase() +
                    datum?.description?.slice(1)}
                </Text>

                <Flex align={"center"} gap={"5px"}>
                  <MdKeyboardCommandKey size={25} color="green" />
                  <Text fontSize={"20px"} fontWeight={500}>
                    Key Responsibilties:
                  </Text>
                </Flex>
                <Box mt={"5px"} ml={"20px"}>
                  <ul>
                    {datum?.responsibilities?.map((res, index) => (
                      <li
                        key={index}
                        style={{ opacity: 0.6, marginBottom: "5px" }}
                      >
                        {res.charAt(0).toUpperCase() + res.slice(1)}
                      </li>
                    ))}
                  </ul>
                </Box>

                <Flex mt="20px" mb={"5px"} align={"center"} gap={"5px"}>
                  <SiHyperskill size={20} color="green" />
                  <Text fontSize={"20px"} fontWeight={500}>
                    Required Skills
                  </Text>
                </Flex>
                <Text opacity={"60%"} pb={"20px"}>
                  {datum?.skill?.charAt(0)?.toUpperCase() +
                    datum?.skill?.slice(1)}
                </Text>

                <Box>
                  <Flex align={"center"} gap={"5px"} mb="5px">
                    <GiLevelThree color="green" size={20} />
                    <Text fontSize={"20px"} fontWeight={500}>
                      Experience Level:
                    </Text>
                  </Flex>
                  <Text fontSize={"15px"} opacity={"60%"}>
                    {datum?.experience?.charAt(0)?.toUpperCase() +
                      datum?.experience?.slice(1)}
                  </Text>
                </Box>

                <Box my="20px">
                  <Flex align={"center"} gap={"5px"} mb="5px">
                    <IoBagCheckOutline size={20} color="green" />
                    <Text fontSize={"25px"} fontWeight={500}>
                      Job Type:
                    </Text>
                  </Flex>
                  <Text fontSize={"15px"} opacity={"60%"}>
                    {datum?.jobType?.charAt(0)?.toUpperCase() +
                      datum?.jobType?.slice(1)}
                  </Text>
                </Box>

                <Box>
                  <Text fontSize={"20px"} fontWeight={500}>
                    Pricing Model:
                  </Text>
                  <Text fontSize={"15px"} opacity={"60%"}>
                    {datum?.priceModel?.charAt(0)?.toUpperCase() +
                      datum?.priceModel?.slice(1)}
                  </Text>
                </Box>

                <Box my="20px">
                  <Flex align={"center"} gap="5px" mb="5px">
                    <HiOutlineCash size={20} color="green" />
                    <Text fontSize={"20px"} fontWeight={500}>
                      Budget:
                    </Text>
                  </Flex>
                  <Text fontSize={"15px"} opacity={"60%"}>
                    ${datum?.budget}
                  </Text>
                </Box>

                <Flex
                  justifyContent={"flex-end"}
                  align={"center"}
                  gap={"20px"}
                  my="30px"
                >
                  {datum?.proposals < 1 ? (
                    <CustomModal
                      bg={"#2C2C2C"}
                      headerColor={"#fff"}
                      size="lg"
                      header={"Send Your Proposal on this Project"}
                      icon={<CustomBtn text={"Send Proposal"} color={"#000"} />}
                    >
                      <SendProposal datum={datum} refetch={refetch} />
                    </CustomModal>
                  ) : (
                    <CustomBtn
                      text={"Proposal Already Sent"}
                      color={"#000"}
                      disabled={true}
                    />
                  )}

                  <CustomBtn
                    text={"Cancel"}
                    border={"1px solid #fff"}
                    bg={"none"}
                  />
                </Flex>
              </Box>
            </Box>
          </DrawerBody>

          {/* <DrawerFooter>
                    <Flex align={"center"} gap={"40px"}>
                     
                      <Button variant="outline" mr={3} onClick={onClose} color={"#fff"}>
                        Cancel
                      </Button>
                    </Flex>
                  </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default JobComponent;
