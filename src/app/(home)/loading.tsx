import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { SortList } from "../lib/constans";

function loading() {
  return (
    <div className="container flex">
      <div className="w-64 py-4">
        <div className="flex w-full">
          <Skeleton className="m-3 text-xl w-full h-13"></Skeleton>
        </div>
        <div className="flex flex-col  w-full gap-3 pr-5">
          {SortList.map((item) => (
            <Skeleton key={item.value} className="w-full h-10"></Skeleton>
          ))}
        </div>
      </div>
      <div className="flex-1">
        <Skeleton className="mb-8 h-10 w-full"></Skeleton>
        <div className="grid grid-cols-3 gap-4">
          <Skeleton className="bg-slate-50 rounded-lg  h-100" />
          <Skeleton className="bg-slate-50 rounded-lg  h-100" />
          <Skeleton className="bg-slate-50 rounded-lg  h-100" />
          <Skeleton className="bg-slate-50 rounded-lg  h-100" />
        </div>
      </div>
    </div>
  );
}

export default loading;
