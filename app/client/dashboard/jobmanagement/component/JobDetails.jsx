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
import React, { useState } from "react";
import { CustomBtn } from "@/components/CustomBtn";
import { _COLORS } from "@/constant/colors";
import { FaBagShopping } from "react-icons/fa6";
import { formatToNaira } from "@/utils/numberFormat";
import { postJobs } from "../service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const JobDetails = ({ data, isOpen, onClose, refetch, finalFocusRef }) => {
    const queryClient = useQueryClient();


    const [formValues, setFormValues] = useState({
        title: data?.title,
        description: data?.description,
        experience: data?.experience,
        jobType: data?.jobType,
        priceModel: data?.priceModel,
        budget: data?.budget,
        skill: data?.skill,
        responsibilities: data?.responsibilities
      });

  const { mutate: postClientJob, isPending } = useMutation({
    mutationFn: postJobs,
    mutationKey: ["job"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      refetch?.();
      onClose();
      setValue("");
      setFormValues({
        title: "",
        description: "",
        experience: "",
        jobType: "",
        priceModel: "",
        budget: "",
        skill: "",
      });
    },
    onError: (error) => {
      console.error("Job post failed:", error);
      alert("Something went wrong while posting the job.");
    },
  });
    const handleSubmit = () => {
  
    const payload = {
      ...formValues,

      budget: parseFloat(formValues.budget),
    };
    console.log(payload,"ppp")
    
      postClientJob(payload);
    
  };



  console.log(data, "Job Details Data");
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
          <DrawerHeader>{data?.status==="closed"?"Re-Post Job":"Job Details"}</DrawerHeader>

          <DrawerBody mt="40px">
            <Box
              bg={"#2C2C2C"}
              color={"#fff"}
              p={"20px"}
              borderRadius={"10px"}
              w={"250px"}
            >
              <Flex align={"center"} gap={"20px"}>
                <Box bg={"#E9FCFF"} borderRadius={"50px"} p={"10px"}>
                  {<FaBagShopping color="#000" />}
                </Box>
                <Text fontSize={"15px"}>{"Job Proposal Alert"}</Text>
              </Flex>
              <Flex
                mt="20px"
                fontWeight={800}
                fontSize={"25px"}
                justify={"space-between"}
                align={"baseline"}
              >
                <Text>{data?.proposals?.length}</Text>
                <CustomBtn
                  text={"View Proposal"}
                  bg={"none"}
                  color={_COLORS?.brand}
                />
              </Flex>
            </Box>
            <Box mt="30px">
              <Text fontSize={"25px"} fontWeight="bold">
                {data?.title}
              </Text>
              <Text maxW={"500px"} pt="10px">
               {data?.description}
              </Text>
              <Box my="20px">
                <Text fontWeight={"bold"}>Key Responsibilities:</Text>
                <Box mt="10px">
                 
                    {data?.responsibilities?.map((item, idx)=>( 
                      // <ul>
                      <li key={idx} >
                        {item}
                      </li>
                      // </ul>
                    ))}
                  
                </Box>
              </Box>
              <Box>
                <Text fontWeight={"bold"}>Required Skills:</Text>
                <Box mt="10px">
                  <Text>
                   {data?.skill}
                  </Text>
                </Box>
              </Box>
               <Box my="20px">
                <Text fontWeight={"bold"}>Exprienced Level:</Text>
                <Box mt="10px">
                  <Text>
                 {data?.experience}
                  </Text>
                </Box>
              </Box>
                <Box >
                <Text fontWeight={"bold"}>Job Type:</Text>
                <Box mt="10px">
                  <Text>
                   {data?.jobType}
                  </Text>
                </Box>
              </Box>
                <Box my="20px">
                <Text fontWeight={"bold"}>Pricing Model:</Text>
                <Box mt="10px">
                  <Text>
                   {data?.priceModel}
                  </Text>
                </Box>
              </Box>
                <Box>
                <Text fontWeight={"bold"}>Budget</Text>
                <Box mt="10px">
                  <Text>
                   {formatToNaira(data?.budget)}
                  </Text>
                </Box>
              </Box>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            {data?.status==="closed" ? (
              <Flex justify={"flex-end"} gap={"20px"}>
                <CustomBtn text={"Repost Job"} color={"#000"} handleClick={onClose}/>
                <CustomBtn text={"Cancel"} color={"#fff"} border={"1px solid #fff"} bg={"none"} handleClick={onClose}/>
              </Flex>
            ):data?.status==="drafted" ?(
               <Flex justify={"flex-end"} gap={"20px"}>
                <CustomBtn text={"Post Job"} color={"#000"} handleClick={handleSubmit}/>
                <CustomBtn text={"Cancel"} color={"#fff"} border={"1px solid #fff"} bg={"none"} handleClick={onClose}/>
              </Flex>
            ):(
               <CustomBtn text={"Close"} color={"#000"} handleClick={onClose}/>
            )
            }
          
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default JobDetails;
