"use client";

import { useEffect, useRef } from "react";
import { Box, Flex, HStack, Avatar, Text } from "@chakra-ui/react";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useGlobalState } from "@/context/GlobalStateContext";
import { getUserDetails } from "@/context/getLoggedInVendor";
import { APP_CONSTANTS } from "@/constant/app";
import FullPageLoader from "@/components/FullPageLoader";
import { CustomBtn } from "@/components/CustomBtn";
import AccountManagement from "./components/AccountManagement";
import NotificationManagement from "./components/NotificationManagement";
import ChangePassword from "./components/ChangePassword";
import PublicProfile from "./components/PublicProfile";
import DeleteAccount from "./components/DeleteAccount";
import { updateProfileImage } from "./components/services/service";

const Setting = () => {
  const { user, setUser } = useGlobalState();

  const inputRef = useRef(null);

  // React Query to fetch user
  const {
    data: userData,
    isLoading,
    refetch: refetchUser,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserDetails(setUser),
  });
  

  // Sync query result into global state & sessionStorage
  useEffect(() => {
    if (userData) {
      setUser(userData);
      sessionStorage.setItem(APP_CONSTANTS.user, JSON.stringify(userData));
    }
  }, [userData, setUser]);


  const uploadMutation = useMutation({
    mutationFn: (file) => {
      const formData = new FormData();
      formData.append("file", file); // Make sure your backend expects this key
      return updateProfileImage(user._id, formData);
    },
    onSuccess: () => {
      refetchUser(); // Refetch user to update avatar globally
    },
  });





  // Avatar file input handlers
  const handleClick = () => inputRef.current?.click();
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
       uploadMutation.mutate(file);
      console.log("Selected file:", file);
      // TODO: Upload the file to server, then refetchUser()
      // refetchUser();
    }
  };

  if (isLoading) return <FullPageLoader />;

  const profile = user;

  return (
    <Box  color="#fff">
      {/* Profile Header */}
      <Flex align="center" justify="space-between" mt="70px">
        <HStack spacing={5}>
          <Avatar src={profile?.profileImage || "/default-avatar.png"} size="xl" />
          <Box>
            <Text fontWeight="bold" fontSize="25px">
              {profile?.firstName} {profile?.lastName}
            </Text>
            <Flex align="center" gap="30px">
              <Flex align="center" gap="10px">
                <FaEnvelope />
                <Text>{profile?.email}</Text>
              </Flex>
              <Flex align="center" gap="10px">
                <FaPhoneAlt />
                <Text>{profile?.phone || "No phone number set"}</Text>
              </Flex>
            </Flex>
          </Box>
        </HStack>

        <CustomBtn
          text="Upload Profile Image"
          handleClick={handleClick}
          bg="none"
          border="1px solid #fff"
        />
        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </Flex>

      {/* Settings Sections */}
      <Box mt="50px">
        <AccountManagement refetch={refetchUser} />
        <NotificationManagement />
        <ChangePassword refetch={refetchUser} />
        <Flex align="center" gap="50px">
          <PublicProfile refetch={refetchUser} />
          <DeleteAccount refetch={refetchUser} />
        </Flex>
      </Box>
    </Box>
  );
};

export default Setting;
