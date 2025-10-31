import { SortList } from "@/app/lib/constans";
import { SortValue } from "@/components/Sort/type";
import { create } from "zustand";

interface ISortStore {
  sortValue: SortValue;
  setSortValue: (value: SortValue) => void;
}

const useSortStore = create<ISortStore>((set) => ({
  sortValue: SortList[0].value,
  setSortValue(sortValue) {
    set({ sortValue });
  },
}));

export default useSortStore;
