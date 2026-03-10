import { FormControl, FormLabel, Input, InputGroup, InputLeftElement, InputRightElement, Select, Textarea } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useRef } from "react";

function FormInput({
  label,
  name,
  handleChange,
  value,
  type,
  mt,
  mb,
  color,
  key,
  focusBorderColor,
  lines,
  labelColor,
  rightIcon,
  ...props
}) {

  const inputRef = useRef(null);

  const openDatePicker = () => {
    if (inputRef.current?.showPicker) {
      inputRef.current.showPicker(); // ✅ Opens the native date picker
    } else {
      inputRef.current?.focus(); // fallback
    }
  };

  return (
    <FormControl mt={mt} mb={mb}>
      <FormLabel fontSize={"1em"} color={labelColor}>
        {label}
      </FormLabel>
      <InputGroup>
       {/* <InputLeftElement width="5.5rem">
          <Select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            border="none"
            fontSize="sm"
            bg="transparent"
          >
            <option value="₦">₦ NGN</option>
            <option value="$">$ USD</option>
            <option value="€">€ EUR</option>
          </Select>
        </InputLeftElement> */}
      {!lines ? (
        <Input
          type={type}
          ref={inputRef}
          w={"full"}
          key={key}
          name={name}
          // style={{ accentColor: "white" }} 
          value={value}
          focusBorderColor={focusBorderColor}
          onChange={handleChange}
          color={color || "white"}
          {...props}
        />
      ) : (
        <Textarea
          color={color || "white"}
          type={type}
          focusBorderColor={focusBorderColor}
          name={name}
          value={value}
          rows={lines}
          onChange={handleChange}
          {...props}
        />
      )}
          {rightIcon && (
          <InputRightElement onClick={openDatePicker} cursor="pointer">
            {rightIcon}
          </InputRightElement>
        )}
      </InputGroup>
    </FormControl>
  );
}

export default FormInput;

FormInput.propTypes = {
  mt: PropTypes.string,
  mb: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  labelColor: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
};
