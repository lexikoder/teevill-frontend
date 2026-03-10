"use state"

import { Box, Flex, Switch, Text } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { updateVisibility } from "./services/service";


const PublicProfile = ({ refetch }) => {
  const [visible, setVisible] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: toggleVisibility, isPending } = useMutation({
    mutationFn: (payload) => updateVisibility(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      refetch?.();
    },
    onError: (error) => {
      console.error("Error updating visibility:", error);
    },
  });

  const handleVisibility = (e) => {
    const newValue = e.target.checked;
    setVisible(newValue); // optimistically update UI
    toggleVisibility({ visible: newValue }); // send to backend
  };

  return (
    <Box my="50px">
      <Box bg="#2C2C2C" borderRadius="10px" p="30px 20px">
        <Text fontWeight={500}>Public Profile</Text>
        <Text py="10px" opacity="50%">
          When this is on, people on this platform can find and view your
          profile globally.
        </Text>
        <Flex align="center" gap="10px">
          <Switch
            onChange={handleVisibility}
            isChecked={visible}
            isDisabled={isPending}
          />
          <Text>
            {visible ? "You're currently visible" : "You're currently invisible"}
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default PublicProfile;
