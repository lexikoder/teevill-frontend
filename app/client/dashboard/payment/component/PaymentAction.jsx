import { Button, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react'
import React from 'react'
import { BsEye, BsThreeDots } from 'react-icons/bs'
// import { _COLORS } from '../../../../constants/colors'
import { _COLORS } from "@/constant/colors";
import CustomModal from '@/components/CustomModal';
import HistoryDetails from './HistoryDetails';

// import { deleteClientInvoice, deleteTransaction } from '../services/Index'
// import { QueryClient, useMutation } from '@tanstack/react-query'
// import DeleteClientTransaction from './DeleteClientTransaction'
// import ClientTransactionDetails from './ClientTransactionDetails'
// import { useNavigate } from 'react-router-dom'

const PaymentAction = ({payment}) => {

  
  //   const queryClient = new QueryClient();
  //   const { mutate: deleteTransactionMutation, isPending: isDeleteMutating } =
  //   useMutation({
  //     mutationFn: () => deleteTransaction(event?._id),
  //     mutationKey: ["delete-transaction"],
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["transaction"] });
  //       refetch && refetch();
  //       onClose();
  //     },
  //     onError: (error) => {
  //       console.error("Update Profile Mutation error", error);
  //     },
  //   });

  // const handleDelete = () => {
  //   deleteTransactionMutation();
  // };
  return (
    <Popover >
      <PopoverTrigger >
        <Button
          bg="transparent"
          _hover={{ background: "transparent" }}
          _focus={{ background: "transparent" }}
        >
          <BsThreeDots fontSize={"1.4em"} color={_COLORS.white} />
        </Button>
      </PopoverTrigger>
      <PopoverContent w={"100%"} bg="#2C2C2C">
        <PopoverArrow bg={"#2C2C2C"}/>
        <PopoverBody gap="3px" display={"flex"} flexDir={"column"} px={"20px"} >
        <CustomModal
            header="Payment Details"
            maxH={"500px"}
            size={"md"}
            overflow={"scroll"}
            icon={<Text>View Details</Text>}
           
          >
          <HistoryDetails payment={payment}/>
           
          </CustomModal>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default PaymentAction