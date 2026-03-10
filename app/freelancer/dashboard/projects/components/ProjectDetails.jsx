"use client"


import React from "react";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { CustomBtn } from "@/components/CustomModal";
import CustomModal from "@/components/CustomModal";
import {  BsArrowLeft, BsPlus, BsTrash } from "react-icons/bs";
import { _COLORS } from "@/constant/colors";
import AddSectionModal from "./AddSectionModal";
import AddCollaborators from "./AddCollaborators";
import CreateTask from "./CreateTask";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import FullPageLoader from "@/components/FullPageLoader";
import SectionCard from "./Section";
import { Grid } from "@chakra-ui/react";
import { deleteSection, getCollaborators, getSpecificProject } from "../services/Index";

const ProjectDetails = () => {
  const { onClose } = useDisclosure();
  const router = useRouter();
  const { id } = useParams();

  const {
    data: singleProject,
    isPending,
    refetch: fetchProject,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getSpecificProject(id),
  });
  const projectData = singleProject?.data;

  const { data } = useQuery({
    queryKey: ["collaborators"],
    queryFn: () => getCollaborators(id),
  });

  const collabs = data?.data;

   const queryClient = useQueryClient();

    
  const { mutate: deleteProjectMutation, isPending: isDeleteMutating } =
    useMutation({
      mutationFn: (datumId) => deleteSection(datumId),
      mutationKey: ["project"],
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["project"] });
       refetch?.();
      onClose();
      },
      onError: (error) => {
        console.error("Update Profile Mutation error", error);
      },
    });

  

  const handleDelete = (datumId) => {
    deleteProjectMutation(datumId);
  };







  return isPending ? (
    <FullPageLoader />
  ) : (
    <Box height={"100%"} color={"#fff"}>

      <Flex mt={"50px"} justify={"space-between"} align={"center"}>
        <Flex align={"center"} gap={"20px"}>
          <BsArrowLeft
            size={20}
            cursor={"pointer"}
            onClick={() => {
              router.push("/dashboard/projects");
            }}
          />
          <Text fontWeight={500} fontSize={"30px"}>
            {projectData?.title}
          </Text>
        </Flex>
        <Flex align={"center"} gap={"20px"}>
          <Box>
            <CustomModal
              header={"Create Section"}
              onClose={onClose}
              size={"2xl"}
              bg={"#2C2C2C"}
              headerColor={"#fff"}
              icon={
                <CustomBtn
                  childComp={<BsPlus size={30} />}
                  text={"Add Sections"}
                  color={"#000"}
                  fontSize={"20px"}
                />
              }
            >
              <AddSectionModal
             
                projectData={projectData}
                refetch={fetchProject}
              />
            </CustomModal>
          </Box>
          <Box>
            <CustomModal
              size={"2xl"}
              bg={"#2C2C2C"}
              headerColor={"#fff"}
              header={"Add Collaborators"}
              icon={
                <CustomBtn
                  childComp={<BsPlus size={30} />}
                  text={"Add Collaborators"}
                  color={"#fff"}
                  bg={"none"}
                  border={"1px solid #fff"}
                  fontSize={"20px"}
                />
              }
            >
              <AddCollaborators
                data={projectData}
                refetch={fetchProject}
              />
              {/* <ShareProject /> */}
            </CustomModal>
          </Box>
          {/* <Box>
            <CustomModal
              header={"Progress"}
              bg={"#2c2c2c"}
              headerColor={"#fff"}
              icon={
                <CustomBtn
                  //   childComp={<BsPlus size={30} />}
                  rightIcon={<BsArrowDown />}
                  text={"In Progress"}
                  color={"#22D3EE"}
                  bg={"none"}
                  border={"1px solid #fff"}
                  fontSize={"20px"}
                />
              }
            ></CustomModal>
          </Box> */}
        </Flex>
      </Flex>

      <Grid
        templateColumns="repeat(5, 1fr)"
        gap={6}
        mt="50px"
        mb={"50px"}
        justify={"space-between"}
        flexWrap={"wrap"}
        align={"start"}
      >
        {projectData?.sections?.map((datum) => (
          <Box
            flex={1}
            key={datum?._id}
            bg={"#2C2C2C"}
            borderRadius={"10px"}
            p={"20px"}
          >
            <Flex
              align={"center"}
              fontSize={"20px"}
              flexDirection={"row"}
              justify={"space-between"}
              fontWeight={700}
            >
              <Text>{datum?.title}</Text>

              <CustomModal
                size={"3xl"}
                bg={"#2C2C2C"}
                headerColor={"#fff"}
                header={""}
                icon={<BsPlus size={30} />}
              >
                <CreateTask
                  datum={datum}
                  refetch={fetchProject}
              
                  collaborator={collabs}
                />
              </CustomModal>
            </Flex>
            <Box mt={"30px"}>
              <Text fontSize={"20px"} fontWeight={400}>
                Collaborators
              </Text>
              <Flex
                bg={"#3D3D3D"}
                p="10px"
                mt="10px"
                borderRadius={"10px"}
                align={"center"}
                justifyContent={"space-between"}
              >
                <Image src={"/two.png"} />
                <Text fontSize={"20px"} fontWeight={500}>
                  2+
                </Text>
              </Flex>
            </Box>

            <Box mt="30px">
              <Text fontSize={"20px"} fontWeight={500}>
                Recently added task
              </Text>
              <SectionCard
                section={datum}
                onClose={onClose}
                refetch={fetchProject}
              />
            </Box>

            <Flex align={"center"} justify={"space-between"}>
              <Text
                color={_COLORS?.brand}
                fontWeight={700}
                fontSize={"15px"}
                onClick={() => {
                  router.push(
                    `/project-section-details/${projectData?._id}/${datum?._id}`
                  );
                }}
              
                cursor={"pointer"}
                py="20px"
              >
                View Section Details
              </Text>


              <BsTrash color="#ca4a3eff" cursor="pointer" onClick={() => handleDelete(datum?._id)}/>
            </Flex>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default ProjectDetails;
