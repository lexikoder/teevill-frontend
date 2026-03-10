"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { GlobalStateProvider } from "@/context/GlobalStateContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function Providers({ children }) {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider>
      <GlobalStateProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </GlobalStateProvider>
    </ChakraProvider>
  );
}
