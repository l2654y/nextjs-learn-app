import { getAddresses } from "@/actions/address";
import { getAuthData } from "@/actions/users";
import Account from "@/components/Account";
import { IAddress } from "@/components/Address";
import NotLogin from "@/components/NotLogin";
import React from "react";

export interface IAuthData {
  id: string;
  name: string;
  email: string;
}

async function AccountPage() {
  const res = await getAuthData();

  let authData: IAuthData | undefined;
  let addresses: IAddress[] = [];

  if (res.status === 200) {
    authData = res.data as IAuthData;
    const addrRes = await getAddresses(Number(authData.id));
    addresses = addrRes.data as IAddress[];
  }

  return authData ? (
    <Account authData={authData} addresses={addresses} />
  ) : (
    <NotLogin />
  );
}

export default AccountPage;
