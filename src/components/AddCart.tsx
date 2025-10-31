"use client";
import React, { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { IProduct } from "@/actions/product";
import { Button } from "./ui/button";
import { useCartStore } from "@/store";

interface IAddCartProps {
  data: IProduct;
}

function AddCart({ data }: IAddCartProps) {
  const [value, setValue] = useState(data.variant[0]);

  const store = useCartStore((state) => state);

  const { addCartItem, getCartItemIndex, updateCartItem, cartList } = store;

  console.log(cartList);

  const handleAdd = () => {
    const index = getCartItemIndex(data.id, value);
    if (index < 0) {
      addCartItem({
        id: data.id,
        name: data.name,
        price: data.price,
        variant: value,
        image: data.image,
        count: 1,
      });
    } else {
      const item = { ...cartList[index] };
      item.count++;
      updateCartItem(item);
    }
  };

  return (
    <div className="w-80 py-12">
      <h3>Select</h3>
      <ToggleGroup
        type="single"
        className="justify-start py-6 "
        variant="primary"
        value={value}
        spacing={4}
        size={"sm"}
        onValueChange={(value) => setValue(value)}
      >
        {data.variant.map((item) => (
          <ToggleGroupItem key={item} value={item}>
            {item}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div className="border mb-6"></div>
      <h3>Price</h3>
      <p className="text-2xl font-bold text-red-400 mb-6">${data.price}</p>
      <Button disabled={value ? false : true} onClick={handleAdd}>
        Add To Cart
      </Button>
    </div>
  );
}

export default AddCart;
