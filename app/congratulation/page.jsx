"use client";

import { Box, Flex, Text, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";

const Congratulation = () => {
  const router = useRouter();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/welcome"); 
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <Box
      h="100vh"
      justify="space-between"
      overflow="hidden"
      bg="black"
      color="#fff"
    >
  
      {dimensions.width > 0 && (
        <Confetti
          width={dimensions.width}
          height={dimensions.height}
          colors={["#D39D12", "#FFD700", "#F5C542"]}
          numberOfPieces={150}
          recycle={true}
        />
      )}

      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        h="100vh"
      >
        <Image src="/hand.png" alt="Hand" />
        <Text fontSize="30px" fontWeight="bold" pb="10px" textAlign="center">
          Congratulations! Your Account Is Ready
        </Text>
        <Text textAlign="center" maxW="450px" color="#E9FCFF7D">
          You’ve successfully created your account. Now, let’s get you set up.
        </Text>
      </Flex>
    </Box>
  );
};

export default Congratulation;
