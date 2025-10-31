"use client";
import Link from "next/link";
import React, { Fragment } from "react";
import { Title, MenuList } from "../app/lib/constans";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/store";

function Header() {
  const cartList = useCartStore((state) => state.cartList);

  return (
    <div className="h-16 px-10 border-b bg-white">
      <div className="container flex items-center justify-between h-full">
        <h1 className="text-2xl">
          <Link href="/">{Title}</Link>
        </h1>
        <div className="flex justify-end gap-4 text-sm h-1/3">
          {MenuList.map((item, index) => (
            <Fragment key={item.href}>
              {item.text === "Cart" ? (
                <Link href={item.href}>
                  {item.text}
                  {`(${cartList.length})`}
                </Link>
              ) : (
                <Link href={item.href}>{item.text}</Link>
              )}
              {index < MenuList.length - 1 && (
                <Separator orientation="vertical" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
