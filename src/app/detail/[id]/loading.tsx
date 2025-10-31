import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <div className="container flex py-6">
      <div className="w-64">
        <h2 className="l my-8">
          <Skeleton className="w-full h-10" />
        </h2>
        <div>
          <Skeleton className="w-full h-30" />
        </div>
      </div>
      <div className="h-[500px] flex-1 mx-10 p-4 rounded-lg">
        <Skeleton className="w-full h-full" />
      </div>
      <div>
        <Skeleton className="w-80 h-[500px]" />
      </div>
    </div>
  );
}

export default loading;
