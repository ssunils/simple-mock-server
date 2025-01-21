"use client"
import { useState, FormEvent, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ApiCreateForm from './_components/ApiCreateForm';


type Route = {
  method: string;
  path: string;
};

export default function Home() {
  const [routes, setRoutes] = useState<Route[]>([]);



  const fetchRoutes = async () => {
    const res = await fetch('/api/mock');
    const data = await res.json();
    setRoutes(data);
  };


  useEffect(() => {
    fetchRoutes();
  }, []);

  function handleOpenChange(id: string): void {
    console.log(id);
  }
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Mock Server UI</h1>

        <ApiCreateForm />
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Current Routes:</h2>
        <div className='flex w-9/12'>
          <Accordion type="single" collapsible className='w-full'>
            {routes.map((route, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger onClick={() => handleOpenChange(route.path)}>{route.method} - {route.path}</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </QueryClientProvider>
  );
}
