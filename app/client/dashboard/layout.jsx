"use client"

import ClientSidebar from '@/components/ClientSidebar'
import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import CardHeader from '@/components/CardHeader'
import { useAuthGuard } from '@/hooks/useAuthGuard'

const DashboardLayout = ({ children }) => {
  useAuthGuard(false)
  return (
    <Flex minH="100vh" bg="#141414">
      <ClientSidebar />
      <Box flex="1" p="4">
        <CardHeader />
        {children} 
      </Box>
    </Flex>
  )
}

export default DashboardLayout
