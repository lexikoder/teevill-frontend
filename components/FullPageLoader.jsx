import { Flex, Spinner } from "@chakra-ui/react";

export default function FullPageLoader({ bg, h }) {
  return (
    <Flex
      bg={bg ? bg : "#f6f4f9"}
      justifyContent="center"
      alignItems="center"
      height={h ? h : "100vh"}
      width="100%"
    >
      <Spinner color={"#403058"} w="50px" h="50px" speed="0.65s" />
    </Flex>
  );
}
