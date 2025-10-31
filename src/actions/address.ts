"use server";
import { IAddress } from "@/components/Address";
import sql from "@/db";

import { revalidatePath } from "next/cache";

export const getAddresses = async (id: number) => {
  const res = (await sql.query("select * from addresses where userid = $1", [
    id,
  ])) as unknown as IAddress[];

  return {
    data: res,
    status: 200,
  };
};

export const getAddressById = async (id: number) => {
  const res = (await sql.query("select * from addresses where id = $1", [
    id,
  ])) as unknown as IAddress[];
  if (res.length) {
    return {
      data: res[0],
      status: 200,
    };
  }
  return {
    data: null,
    status: 401,
    message: "Address not found",
  };
};

interface IAddAddressParams {
  userId: number;
  name: string;
  city: string;
  phone: string;
  address: string;
}

export const addAddress = async (params: IAddAddressParams) => {
  const { userId, name, city, phone, address } = params;

  await sql.query(
    "INSERT INTO addresses (userid, name, city, phone, address) VALUES ($1, $2, $3, $4, $5)",
    [userId, name, city, phone, address]
  );

  revalidatePath("/account");

  return {
    status: 200,
    message: "Address added successfully",
  };
};

export const delAddress = async (id: number) => {
  await sql.query("DELETE FROM addresses WHERE id = $1", [id]);

  revalidatePath("/account");

  return {
    status: 200,
    message: "Address deleted successfully",
  };
};

export const updateAddress = async (
  params: Omit<IAddAddressParams, "userId">,
  id: number
) => {
  const { name, city, phone, address } = params;

  await sql.query(
    "UPDATE addresses SET name = $1, city = $2, phone = $3, address = $4 WHERE id = $5",
    [name, city, phone, address, id]
  );

  revalidatePath("/account");
  return {
    status: 200,
    message: "Address updated successfully",
  };
};
