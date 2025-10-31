import { SortList } from "@/app/lib/constans";

// Utility type: 从一个 readonly 列表中推断出所有 item.value 的联合类型
export type ValuesFromList<T extends readonly { value: unknown }[]> =
  T[number]["value"];

export type SortValue = ValuesFromList<typeof SortList>;
