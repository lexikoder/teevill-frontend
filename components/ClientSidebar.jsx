"use client";

import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HamburgerIcon } from "@chakra-ui/icons";

import { MdDashboard, MdDocumentScanner, MdMessage } from "react-icons/md";
import { AiFillProject } from "react-icons/ai";
import { RiMoneyDollarBoxFill } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";

import { _COLORS } from "@/constant/colors";

export default function ClientSidebar() {
  const [mobile] = useMediaQuery("(max-width: 991px)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("#141414", "gray.800");
  const color = useColorModeValue("gray.800", "white");

  const pathname = usePathname(); 

  return (
    <Box h="auto" position="relative" flex={0.2}>
      {mobile ? (
        <>
          <IconButton
            icon={<HamburgerIcon />}
            aria-label="Open Menu"
            onClick={onOpen}
            position="fixed"
            top="10px"
            left="10px"
            zIndex="999"
          />
          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent bg={bg} color={color}>
              <DrawerCloseButton />
              <DrawerHeader>
                <Image maxW="150px" h="40px" alt="Logo" alignSelf="center" />
              </DrawerHeader>
              <DrawerBody>
                <Flex flexDir="column" w="100%" gap="10px">
                  {NAVS.map(({ title, to, icon: Icon }, idx) => {
                    const isActive = pathname === to; // ✅ check active route
                    return (
                      <Flex key={idx}>
                        <Link href={to} passHref>
                          <Flex
                            gap="5px"
                            alignItems="center"
                            fontWeight="600"
                            p="10px"
                            w="100%"
                            bg={isActive ? _COLORS.brand : "transparent"}
                            borderRadius="8px"
                            onClick={onClose}
                          >
                            <Icon fontSize="1rem" color="#fff" />
                            <Text fontSize=".8em" color="#fff">{title}</Text>
                          </Flex>
                        </Link>
                      </Flex>
                    );
                  })}
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        <Flex
          py="2%"
          pr="2%"
          flexDir="column"
          position="fixed"
          left="0"
          w="16%"
          h="100vh"
          zIndex="999"
          bg={bg}
        // bg="red"
          borderRight="1px solid #2C2C2C"
          color={color}
        >
          <Image
            maxW="150px"
            h="50px"
            alt="Logo"
            src={"/logo.png"}
            ml="40px"
            // alignSelf="center"
            mb="2rem"
          />
          <Flex flexDir="column" gap="10px">
            {NAVS.map(({ title, to, icon: Icon }, idx) => {
              const isActive = pathname === to; // ✅ active route check
              return (
                <Link key={idx} href={to} passHref>
                  <Flex
                    gap="15px"
                    alignItems="center"
                    fontWeight="600"
                    p="10px"
                    pl="40px"
                    w="100%"
                    borderLeft={isActive ? "5px solid #D39D12" : "none"}
                    bg={isActive ? "#2C2C2C" : "transparent"}
                     color={isActive ? "#fff" : "#504d4dff"}
                    borderTopRightRadius={isActive ? "8px" : "0"}
                    borderBottomRightRadius={isActive ? "8px" : "0"}
                  >
                    <Icon fontSize="1em" color={isActive ? "#fff" : "#504d4dff"} />
                    <Text fontSize="1em" fontWeight={700}>
                      {title}
                    </Text>
                  </Flex>
                </Link>
              );
            })}
          </Flex>
        </Flex>
      )}
    </Box>
  );
}

const NAVS = [
  { title: "Dashboard", to: "/client/dashboard", icon: MdDashboard },
  { title: "Job Management", to: "/client/dashboard/jobmanagement", icon: AiFillProject },
  { title: "Proposals", to: "/client/dashboard/proposals", icon: MdDocumentScanner },
  // { title: "Messages", to: "/client/dashboard/message", icon: MdMessage },
  { title: "Earns & Withdrawals", to: "/client/dashboard/payment", icon: RiMoneyDollarBoxFill },
  { title: "Settings", to: "/client/dashboard/setting", icon: FiSettings },
];
