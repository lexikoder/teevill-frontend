"use client"

import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input as ChakraInput,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { FaSlidersH } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { _COLORS } from "@/constant/colors";


const DateFilterPopup = ({ isOpen, onClose, setFilter, filter }) => {
  const [fromDate, setFromDate] = useState(filter.fromDate || "");
  const [toDate, setToDate] = useState(filter.toDate || "");

  const handleApply = () => {
    setFilter({ ...filter, fromDate, toDate });
    onClose();
  };

  const handleClear = () => {
    setFilter({ ...filter, fromDate: "", toDate: "" });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Date Filters</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Start Date</FormLabel>
            <ChakraInput
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>End Date</FormLabel>
            <ChakraInput
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleApply}>
            Apply
          </Button>
          <Button variant="ghost" onClick={handleClear}>
            Clear
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

// const SearchField = ({ handleSearch, placeholder, bg, searchQuery, value, onChange }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const handleChange = (event) => {

//     setFilter({ ...filter, [searchKey]: event.target.value });
//   };


//   return (
//     <>
//       <InputGroup bg={"#D3F9FF17"} borderRadius={"10px"} width={["100%", "100%", "100%"]}>
//         <InputLeftElement pointerEvents="none">
//           <IoSearch color={_COLORS.textGrey} />
//         </InputLeftElement>
//         <Input
//           placeholder={placeholder || "Search..."}
//           _focus={{
//             border: "none",
//           }}
//           border={"none"}
//           borderRadius={"10px"}
//           focusBorderColor='transparent'
//           color={"#fff"}
//           bg={bg}
//           value={value}
//           onChange={onChange}
//           // focusBorderColor="none"
//         />
//         <InputRightElement cursor="pointer" onClick={onOpen}>
//           {/* <FaSlidersH color={_COLORS.brand} /> */}
//         </InputRightElement>
//       </InputGroup>
//       {/* <DateFilterPopup isOpen={isOpen} onClose={onClose} setFilter={setFilter} filter={filter} /> */}
//     </>
//   );
// };

const SearchField = ({ handleSearch, placeholder, bg, searchKey, filter, setFilter, value, onChange }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <InputGroup bg={bg || "#D3F9FF17"} borderRadius="10px" width="100%">
        <InputLeftElement pointerEvents="none">
          <IoSearch color={_COLORS.textGrey} />
        </InputLeftElement>
        <Input
          placeholder={placeholder || "Search..."}
          _focus={{ border: "none" }}
          border="none"
          borderRadius="10px"
          focusBorderColor="transparent"
          color="#fff"
          bg={bg}
          value={value}
          onChange={onChange}
        />
        {/* <InputRightElement cursor="pointer" onClick={onOpen}>
          <FaSlidersH color={_COLORS.brand} />
        </InputRightElement> */}
      </InputGroup>

      {/* Optional date filter modal */}
      {/* {setFilter && filter && (
        <DateFilterPopup
          isOpen={isOpen}
          onClose={onClose}
          setFilter={setFilter}
          filter={filter}
        />
      )} */}
    </>
  );
};






SearchField.propTypes = {
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.object,
  placeholder: PropTypes.string,
  searchKey: PropTypes.string.isRequired,
};

export default SearchField;