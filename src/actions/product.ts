"use server";

import sql from "@/db";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  variant: string[];
}

export const getProducts = async () => {
  const res = (await sql`SELECT * FROM products`) as IProduct[];
  return { data: res, status: 200 };
};

export const getProductDetail = async (id: number) => {
  const res = (await sql.query("select * from products where id = $1", [
    id,
  ])) as IProduct[];
  return { data: res[0], status: 200 };
};
