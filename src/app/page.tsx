"use client"
import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import ApiCreateForm from './_components/ApiCreateForm';
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import { ApiDetail } from './_components/ApiDetail';

type Route = {
  method: string;
  path: string;
};

type ApiDetail = {
  data: string;
}


export default function Home() {

  const fetchList = async () => axios.get('/api/mock-list');


  
  const { data: routes, isLoading, refetch: refetchList } = useQuery({
    queryKey: ['routes'],
    queryFn: fetchList,
  });

  

  return (
    <div className="min-h-screen grid grid-cols-[2fr_3fr] gap-4 py-10">
      <div>
        <ApiCreateForm refetchList={refetchList} />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Available APIs</h2>
        {isLoading && <div>Loading...</div>}
        <div className='flex w-100'>
          <Accordion type="single" collapsible className='w-full'>
            {routes?.data.map((route: Route, index: number) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{route.method} - {route.path}</AccordionTrigger>
                <AccordionContent>
                  <ApiDetail path={route.path} method={route.method} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
