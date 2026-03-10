import { Box, Flex, Text} from '@chakra-ui/react'
import React from 'react'
import { formatToNaira } from '@/utils/numberFormat'

const HistoryDetails = ({payment}) => {
    
  return (
    <Box>
        <Flex align="center" justify={"space-between"}>
            <Text fontSize="20px" fontWeight="bold">Amount:</Text>
            <Text>{formatToNaira(payment?.amount)}</Text>
        </Flex>
         <Flex align="center" justify={"space-between"} my="5px">
            <Text fontSize="20px" fontWeight="bold">Payment:</Text>
            <Text>{payment?.paymentType}</Text>
        </Flex>
         <Flex align="center" justify={"space-between"}>
            <Text fontSize="20px" fontWeight="bold">Payment Method:</Text>
            <Text>{payment?.method}</Text>
        </Flex>
         <Flex align="center" justify={"space-between"}>
            <Text fontSize="20px" fontWeight="bold">Status:</Text>
            <Text>{payment?.status}</Text>
        </Flex>
    </Box>
  )
}

export default HistoryDetails