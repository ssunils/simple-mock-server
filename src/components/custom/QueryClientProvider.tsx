"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          retry: 0
        },
      },
});

/**
 * @description ReactQueryClientProvider - A custom provider that wraps the QueryClientProvider from react-query.
 * This component should be used at the root level of the application to manage React Query's context.
 * @param {React.ReactNode} children - The components that will be wrapped by the provider.
 * @returns {React.ReactNode} - The wrapped children within the QueryClientProvider context.
 * @example
 * <ReactQueryClientProvider>
 *   <App />
 * </ReactQueryClientProvider>
 */


export const ReactQueryClientProvider = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
