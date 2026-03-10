/* eslint-disable react/prop-types */
import { Children, cloneElement, isValidElement } from "react";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Flex,
  Text,
  useDisclosure,
  ModalCloseButton,
  ModalHeader,
  Divider,
} from "@chakra-ui/react";

const CustomModal = ({
  children,
  icon,
  header,
  title,
  cursor,
  color,
  headerColor,
  size,
  bg,
  width,
  textAlign,
  noCloseBtn,
  contentProps,
  contentProps2,

  ...props
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const btnRef = React.useRef();

  const childrenWithProps = Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a TS error too.
    if (isValidElement(child)) {
      return cloneElement(child, { onClose });
    }

    return child;
  });

  return (
    <>
      <Flex cursor="pointer" onClick={onOpen} align="center">
        {icon}
        <Text m="auto" color={color} cursor={cursor} textAlign={textAlign}>
          {title}
        </Text>
      </Flex>

      <Modal
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        size={size ? size : "md"}
        isCentered
        {...props}>
        <ModalOverlay {...contentProps} />
        <ModalContent bg={bg || "#fff"} {...contentProps2}>
          <ModalHeader color={headerColor}> {header}</ModalHeader>
          {/* <Divider /> */}
          {!noCloseBtn && <ModalCloseButton color={"#fff"}/>}

          <ModalBody mb="10px">{childrenWithProps}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
