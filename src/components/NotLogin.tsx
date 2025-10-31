"use client";
import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export type TNotAccountType = "login" | "register";

function NotLogin() {
  const [notAccountType, setNotAccountType] =
    useState<TNotAccountType>("login");
  return notAccountType === "login" ? (
    <Login setNotAccountType={setNotAccountType} />
  ) : (
    <Register setNotAccountType={setNotAccountType} />
  );
}

export default NotLogin;
