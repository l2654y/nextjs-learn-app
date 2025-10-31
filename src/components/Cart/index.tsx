"use client";
import React, { ChangeEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, Trash2 } from "lucide-react";
import Link from "next/link";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useCartStore } from "@/store";

function Cart() {
  const cartList = useCartStore((state) => state.cartList);
  const getCartItemIndex = useCartStore((state) => state.getCartItemIndex);
  const updateCartItem = useCartStore((state) => state.updateCartItem);
  const deleteCartItem = useCartStore((state) => state.deleteCartItem);

  const handleCountChange = (count: string, id: number, variant: string) => {
    const index = getCartItemIndex(id, variant);

    if (index >= 0) {
      const item = { ...cartList[index] };
      item.count = Number(count);
      updateCartItem(item);
    }
  };

  return (
    <div className="container">
      {cartList.length ? (
        <div className="py-24 px-2 flex">
          <div className="flex-1 mr-14">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[400px]">Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartList.map((item) => (
                  <TableRow key={item.id + item.variant}>
                    <TableCell>
                      <div className="flex items-center">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={64}
                          height={64}
                          priority
                          style={{
                            width: "64px",
                            height: "64px",
                            objectFit: "cover",
                          }}
                        />
                        <div className="ml-4 space-y-3">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-gray-400">
                            {item.variant}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Trash2
                          className="mr-1"
                          color="gray"
                          cursor="pointer"
                          onClick={() => {
                            deleteCartItem(item.id, item.variant);
                          }}
                        />
                        <Input
                          className="w-20"
                          type="number"
                          value={item.count}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleCountChange(
                              e.target.value,
                              item.id,
                              item.variant
                            )
                          }
                        />
                      </div>
                    </TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell className="text-right">
                      ${item.price * item.count}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="w-56">
            <h2 className="font-sans font-medium flex flex-row text-2xl mb-6">
              Total
            </h2>
            <p className="text-2xl font-bold text-red-400 mb-6">
              $
              {cartList.reduce((acc, item) => acc + item.price * item.count, 0)}
            </p>
            {true ? (
              <Link href="/checkout">
                <Button className="w-full">Checkout</Button>
              </Link>
            ) : (
              <>
                <Link href="/account">
                  <Button className="w-full">Login</Button>
                </Link>
                <p className="text-sm text-slate-500 text-center mt-1">
                  You need to login to checkout
                </p>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="py-48 px-2">
          <h2 className="text-2xl font-bold">Cart</h2>
          <p className="text-sm w-[400px] mb-6 mt-4">
            You don&#39;t have anything in your cart. Let&#39;s change that, use
            the link below to start browsing our products.
          </p>
          <div className="flex text-sm items-center underline text-orange-400">
            <Link href="/">Start Shopping</Link>
            <ArrowUpRight width={18} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
