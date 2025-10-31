"use client";
import React from "react";
import { Button } from "./ui/button";
import { IAuthData } from "@/app/account/page";
import { logoutAction } from "@/actions/users";
import Address, { IAddress } from "./Address";

interface IAccountProps {
  authData: IAuthData;
  addresses: IAddress[];
}

function Account({ authData, addresses }: IAccountProps) {
  const handleClick = () => {
    logoutAction();
  };

  return (
    <div className="container2 py-10">
      <div className="border-b py-4">
        <h2 className="text-lg leading-10 font-bold">Account</h2>
        <div className="flex justify-between items-center">
          <div>
            <p>Hello: {authData.name}</p>
            <p>Signed in as: {authData.email}</p>
          </div>
          <Button onClick={handleClick}>Logout</Button>
        </div>
      </div>
      <div className="border-b py-4">
        <h2 className="text-lg leading-10 font-bold">Addresses</h2>
        <div>
          <p>
            View and update your shipping addresses, you can add as many as you
            like.
          </p>
          <p>Saving your addresses will make them available during checkout.</p>
        </div>
        <Address authData={authData} addresses={addresses} />
      </div>
      <div className="py-4">
        <h2 className="text-lg leading-10 font-bold">Orders</h2>
        <div>
          <p>There is currently no order information available</p>
        </div>
      </div>
    </div>
  );
}

export default Account;
