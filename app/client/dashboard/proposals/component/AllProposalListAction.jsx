"use client";

import {
  Avatar,
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
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { _COLORS } from "@/constant/colors";
import { CustomBtn } from "@/components/CustomBtn";
import { useRouter } from "next/navigation";
import CustomModal from "@/components/CustomModal";
import { formatToNaira } from "@/utils/numberFormat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { createNewProposal } from "../../../proposals/components/services";
import { approveProposal } from "../services";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import EscrowPayment from "./EscrowPayment";




const stripePromise = loadStripe("pk_test_51MXt1nAX4icpUpylgMHKjEqr26OcjHnokICi9wSolBy1AsDQi2IMgJNWmhRhSAZ8nhNHVqDe31ZVQWfoqqbDuXa400XDGfxmFw")

const AllProposalListAction = ({ data, refetch }) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const id = data?._id;
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const btnRef = useRef();

  const [formValue] = useState({
    status: "accepted",
  });

  const [formValues] = useState({
    status: "rejected",
  });

  const { mutate: approveProposalMutation, isPending } = useMutation({
    mutationFn: (payload) => approveProposal(payload),
    mutationKey: ["proposals"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposals"] });

      refetch?.();
      onClose();
    },
  });

  const handleAccept = (e) => {
    e.preventDefault();
    const payload = {
      id,
      ...formValue,
    };
    approveProposalMutation({ payload, id });
  };

  const { mutate: rejectProposalMutation, isPending: Pending } = useMutation({
    mutationFn: (payload) => approveProposal(payload),
    mutationKey: ["proposals"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["proposals"] });
      fetchProposals?.();
      onClose();
    },
  });

  const handleReject = (e) => {
    e.preventDefault();
    const payload = {
      id,
      ...formValues,
    };
    rejectProposalMutation({ payload, id });
  };

  return (
    <Box>
      <Popover>
        <PopoverTrigger>
          <Button
            bg="transparent"
            _hover={{ background: "transparent" }}
            _focus={{ background: "transparent" }}
          >
            <BsThreeDots fontSize={"1.4em"} color={_COLORS.white} />
          </Button>
        </PopoverTrigger>
        <PopoverContent w={"100%"} bg="#2C2C2C">
          <PopoverArrow bg={"#2C2C2C"} />
          <PopoverBody
            gap="3px"
            display={"flex"}
            flexDir={"column"}
            px={"20px"}
          >
            <Text cursor={"pointer"} onClick={onOpen}>
              View Proposal
            </Text>

            {
              data?.status==="accepted" && (
                <CustomModal
                 header={"Make Payment"}
         headerColor={"#fff"}
          bg={"#2C2C2C"}
                 textAlign={"start"} 
                 icon={<CustomBtn text="Make Escrow Payment" 
                 bg="none"/>}>
                   <Elements stripe={stripePromise}>
                  {/* <EscrowPayment data={data} /> */}
                  <EscrowPayment />
                  </Elements>
                </CustomModal>
              )
            }
            
          </PopoverBody>
        </PopoverContent>

           
      </Popover>






      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={"lg"}>
        <DrawerOverlay />
        <DrawerContent bg="#141414" color="#fff">
          <DrawerCloseButton bg="#FBBF24" color="#000" />
          <DrawerHeader>Proposal Details</DrawerHeader>

          <DrawerBody mt="40px">
            <Box my="30px">
              <Flex justify={"space-between"} align="center">
                <Flex align="center" gap={"10px"}>
                  <Avatar
                    src={data?.submittedBy?.profileImage}
                    name={
                      data?.submittedBy?.firstName +
                      " " +
                      data?.submittedBy?.lastName
                    }
                  />
                  <Box>
                    <Text fontSize="15px">
                      {data?.submittedBy?.firstName +
                        " " +
                        data?.submittedBy?.lastName}
                    </Text>
                    <Text fontSize="12px">{data?.submittedBy?.email}</Text>
                  </Box>
                </Flex>
                <Box>
                  <CustomBtn
                    text={"Message"}
                    handleClick={() => {
                      router.push("/messages");
                    }}
                    bg="none"
                    border={"1px solid #fff"}
                  />
                </Box>
              </Flex>
              <Box mt="50px">
                <Text fontSize="30px" fontWeight="bold">
                  Cover Letter:
                </Text>
                <Text maxW={"500px"} pt="10px">
                  {data?.body}
                </Text>
              </Box>

              <Flex my="30px" align="start" flexDir={"column"} gap={"px"}>
                <Text fontSize="30px" fontWeight="bold">
                  TimeLine:
                </Text>

                <Text fontWeight={"semi-bold"} fontSize="20px">
                  {data?.timeLine?.charAt(0)?.toUpperCase() +
                    "" +
                    data?.timeLine?.slice(1)}{" "}
                  months
                </Text>
              </Flex>

              <Box>
                <Text fontSize="30px" fontWeight="bold">
                  Bid Amount:
                </Text>
                <Text fontWeight={"semi-bold"} fontSize="20px">
                  {formatToNaira(data?.bidAmount)}
                </Text>
              </Box>
            </Box>
            <Flex justify={"flex-end"} align="center" gap="30px" mt="30px">
              <CustomBtn
                text={"Approve"}
                disabled={data?.status === "accepted"}
                bg={"#1CBD2142"}
                handleClick={handleAccept}
                loading={isPending}
              />

              <CustomModal
                header={"Reject Proposal"}
                bg={"#2c2c2c"}
                headerColor={"#fff"}
                color={"#fff"}
                icon={
                  <CustomBtn
                    text={"Reject"}
                    bg={"none"}
                    border={"1px solid red"}
                    color={"red"}
                  />
                }
              >
                <Box color="#fff">
                  <Text textAlign="center" fontWeight="bold">
                    Are you sure you want to reject this proposal?{" "}
                  </Text>
                  <Text textAlign={"center"} py="10px">
                    Once rejected, the freelancer will be notified and this
                    action cannot be undone.
                  </Text>
                  <Flex justify="center" mt="20px" gap="20px">
                    <CustomBtn
                      text="Reject Proposal"
                      bg="red"
                      handleClick={handleReject}
                      loading={Pending}
                    />
                    <CustomBtn
                      text="Cancel"
                      bg="none"
                      border={"1px solid white"}
                      handleClick={onClose}
                    />
                  </Flex>
                </Box>
              </CustomModal>
            </Flex>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default AllProposalListAction;
