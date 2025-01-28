// _app.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// NEVER DO THIS:
// const queryClient = new QueryClient()
//
// Creating the queryClient at the file root level makes the cache shared
// between all requests and means _all_ data gets passed to _all_ users.
// Besides being bad for performance, this also leaks any sensitive data.

import { AppProps } from 'next/app';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {

    console.log('MyApp')
  // Instead do this, which ensures each request has its own cache:
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 0
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}