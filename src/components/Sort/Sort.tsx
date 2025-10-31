"use client";

import { SortList, SortTitle } from "@/app/lib/constans";
import React from "react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { SortValue } from "./type";
import { useSortStore } from "@/store";

function Sort() {
  const sortValue = useSortStore((state) => state.sortValue);
  const setSortValue = useSortStore((state) => state.setSortValue);
  const handleChange = (value: SortValue) => {
    setSortValue(value);
  };

  return (
    <div className="w-64 py-4">
      <p className="m-3 text-xl">{SortTitle}</p>
      <ToggleGroup
        className="flex-col pr-5"
        type="single"
        variant={"primary"}
        onValueChange={handleChange}
        value={sortValue}
        spacing={3}
      >
        {SortList.map((item) => (
          <ToggleGroupItem key={item.value} value={item.value}>
            {item.text}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
}

export default Sort;
