"use client"

import {
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { BsThreeDots } from "react-icons/bs";

import { _COLORS } from "@/constant/colors";
import CustomModal from "@/components/CustomModal"
import DeleteProject from "./DeleteProject";
import ShareProject from "./ShareProject";
import { useRouter } from "next/navigation";
import CreateProject from "./CreateProject";

const AllProjectsAction = ({data, refetch}) => {
  const {onClose} = useDisclosure()
    const router = useRouter()

  const id = data?._id;
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const btnRef = useRef();

  return (
    
    <Box>
      <Popover>
        <PopoverTrigger>
          <Button
            bg="transparent"
            _hover={{ background: "transparent" }}
            _focus={{ background: "transparent" }}
          >
            <BsThreeDots fontSize={"2em"} color={_COLORS.brand} />
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
            <Text
              cursor={"pointer"}
              onClick={() => {
                router.push(`/freelancer/dashboard/projects/${id}`);
              }}
            >
              View Details
            </Text>

            <Text cursor={"pointer"} ref={btnRef} onClick={onEditOpen}>
              Edit
            </Text>

            <CustomModal
              header="Add Collaborators"
              headerColor={"#fff"}
              maxH={"500px"}
              bg={"#2C2C2C"}
              size={"xl"}
              overflow={"scroll"}
              onClose={onClose}
              color={"#fff"}
              icon={<Text>Share</Text>}
            >
              <ShareProject datum={data} refetch={refetch}/>
            </CustomModal>
            
            <CustomModal
              header="Delect Project"
              headerColor={"#fff"}
              maxH={"500px"}
              bg={"#2C2C2C"}
              size={"xl"}
              overflow={"scroll"}
              icon={<Text>Delete</Text>}
            >
              <DeleteProject datum={data} refetch={refetch} />
            </CustomModal>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <CreateProject
        isOpen={isEditOpen}
        finalFocusRef={btnRef}
        onClose={onEditClose}
        data={data}
      />
    </Box>
  );
};

export default AllProjectsAction;
