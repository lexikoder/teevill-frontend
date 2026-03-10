"use client"

import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { _COLORS } from "@/constant/colors";
import CustomModal from "@/components/CustomModal";
import PostJob from "./PostJob";
import JobDetails from "./JobDetails";
import DeleteJob from "./DeleteJob";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { closeJob, deleteJobs } from "../service";
import { CustomBtn } from "@/components/CustomBtn";

const JobAction = ({ data, refetch, onClose }) => {
  const queryClient = useQueryClient();

  const [formValues] = useState({
    status: "closed",
  });

  
  const {
    isOpen: isCloseJobOpen,
    onOpen: onCloseJobOpen,
    onClose: onCloseJobClose,
  } = useDisclosure();

  
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();


  const {
    isOpen: isDetailOpen,
    onOpen: onDetailOpen,
    onClose: onDetailClose,
  } = useDisclosure();


  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const btnRef = useRef();
  const detailRef = useRef();

 
  const { mutate: deleteTransactionMutation, isPending: isDeleteMutating } =
    useMutation({
      mutationFn: () => deleteJobs(data?._id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["jobs"] });
        onClose?.();
        refetch?.();
        onDeleteClose();
      },
      onError: (error) => {
        console.error("Delete Job Mutation error", error);
      },
    });

  const handleDelete = () => {
    deleteTransactionMutation();
  };


  const { mutate: closeJobMutation, isPending: isClosing } = useMutation({
    mutationFn: (payload) => closeJob(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      onClose?.();
      refetch?.();
      onCloseJobClose();
    },
    onError: (error) => {
      console.error("Close Job Mutation error", error);
    },
  });

  const handleClose = (e) => {
    e.preventDefault();
    const payload = {
      id: data?._id,
      ...formValues,
    };
    closeJobMutation(payload);
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
            <Text cursor={"pointer"} ref={detailRef} onClick={onDetailOpen}>
              View Details
            </Text>
            <Text ref={btnRef} onClick={onEditOpen} cursor={"pointer"}>
              Edit
            </Text>

            {data?.status === "open" ? (
              <Text cursor={"pointer"} onClick={onCloseJobOpen}>
                Close Job
              </Text>
            ) : data?.status === "drafted" ? (
              <Text cursor={"pointer"} onClick={onEditOpen}>
                Post
              </Text>
            ) : null}

            <Text cursor={"pointer"} onClick={onDeleteOpen}>
              Delete
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>

     
      <CustomModal
        header="Close Job"
        headerColor={"#fff"}
        maxH={"500px"}
        bg={"#2C2C2C"}
        size={"xl"}
        overflow={"scroll"}
        color={"#fff"}
        isOpen={isCloseJobOpen}
        onClose={onCloseJobClose}
      >
        <Box>
          <Text
            color={"#fff"}
            fontSize={"20px"}
            fontWeight={"bold"}
            textAlign={"center"}
          >
            Are you sure you want to close this job?
          </Text>
          <Flex mt="50px" gap={"30px"} justify={"center"} w={"full"}>
            <CustomBtn
              width={"full"}
              text={"Close"}
              color={"#000"}
              handleClick={handleClose}
              loading={isClosing}
            />
            <CustomBtn
              handleClick={onCloseJobClose}
              width={"full"}
              text={"Cancel"}
              bg={"none"}
              border={"1px solid white"}
            />
          </Flex>
        </Box>
      </CustomModal>

  
      <CustomModal
        header="Delete Job"
        maxH={"500px"}
        color={"#fff"}
        bg={"#2C2C2C"}
        size={"xl"}
        overflow={"scroll"}
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
      >
        <DeleteJob
          onClose={onDeleteClose}
          handleDelete={handleDelete}
          loading={isDeleteMutating}
        />
      </CustomModal>

     
      <PostJob
        isOpen={isEditOpen}
        finalFocusRef={btnRef}
        onClose={onEditClose}
        data={data}
      />

      <JobDetails
        refetch={refetch}
        isOpen={isDetailOpen}
        finalFocusRef={detailRef}
        onClose={onDetailClose}
        data={data}
      />
    </Box>
  );
};

export default JobAction;
