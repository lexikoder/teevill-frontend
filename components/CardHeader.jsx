"use client";
import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import React from "react";
import { _COLORS } from "@/constant/colors";
import { FaBell } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useGlobalState } from "@/context/GlobalStateContext";
import SearchField from "./SearchField";
import { TiArrowSortedDown } from "react-icons/ti";
import { IoMdLogOut } from "react-icons/io";

const clearLocalStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
};

const CardHeader = () => {
  const unreadCount = 2
  const router = useRouter();
  const { user, accountType, setUser, setAccountType } = useGlobalState();
  console.log(user, "ACCOUNT");

  const handleLogout = () => {
    clearLocalStorage();
    setUser(null);
    router.push("/login");
  };
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");

  return (
    <Flex align={"center"} justify={"space-between"} mt="0px">
      <Box w={"50%"}>
        <SearchField placeholder={"search project title"} />
      </Box>

      <Flex align={"center"} gap={"20px"}>
        {user?.accountType === "freelancer" ? (
          <Box cursor="pointer" position="relative">
            <FaBell
              size={25}
              color="#fff"
              onClick={() => router.push("/freelancer/dashboard/freeNotification")}
            />
            {unreadCount > 0 && (
              <Box
                position="absolute"
                top="-2px"
                right="-2px"
                w="10px"
                h="10px"
                bg="red.500"
                borderRadius="full"
              />
            )}
          </Box>
        ) : (
          <Box cursor={"pointer"} bg="#2C2C2C" p="10px" borderRadius={"full"}>
            <FaBell
              size={25}
              color="#fff"
              onClick={() => router.push("/client/dashboard/freeNotification")}
            />
          </Box>
        )}

        <Flex align={"center"} gap={"10px"}>
          <Avatar src={user?.profileImage} name={fullName} size={"md"} />
          <Box>
            <Text color={"#fff"} fontWeight={"bold"}>
              {fullName || "Loading..."}
            </Text>
            <Text color={"#fff"} fontSize={"13px"}>
              {user?.email || ""}
            </Text>
          </Box>
          <Box>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    as={IconButton}
                    icon={<TiArrowSortedDown size={25} />}
                    isActive={isOpen}
                    _hover={{ bg: "none" }}
                    bg="none"
                    color={_COLORS?.brand}
                  />
                  <MenuList>
                    <MenuItem
                      fontWeight={"bold"}
                      onClick={() => router.push("/profile-manager")}
                    >
                      Profile Manager
                    </MenuItem>
                    <MenuItem
                      fontWeight={"bold"}
                      icon={<IoMdLogOut size={25} color="#000" />}
                      onClick={handleLogout}
                    >
                      Log Out
                    </MenuItem>
                  </MenuList>
                </>
              )}
            </Menu>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CardHeader;
