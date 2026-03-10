/* eslint-disable react/prop-types */
import { _COLORS } from "@/constant/colors";
import { Button } from "@chakra-ui/react";


export const CustomBtn = ({
  childComp,
  bg,
  color,
  text,
  fontWeight,
  borderColor,
  border,
  width,
  height,
  handleClick,
  loading,
  radius,
  type,
  disabled,
  fontSize,
  p,
  boxShadow,
  rightIcon,
  ...props
}) => {
  return (
    <Button
      leftIcon={childComp}
      rightIcon={rightIcon}
      // width="100%"
      color={color || "white"}
      bg={bg || _COLORS.brand}
      fontWeight={fontWeight}
      borderRadius={radius || "7px"}
      p={p}
      boxShadow={boxShadow}
      height={height}
      width={width}
      fontSize={fontSize}
      border={border}
      borderColor={borderColor}
      type={type}
      _hover={{
        bg: bg,
      }}
      onClick={handleClick}
      isLoading={loading}
      isDisabled={disabled}
      {...props}
    >
      {text}
    </Button>
  );
};
