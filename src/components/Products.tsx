"use client";

import { ProductsTitle } from "@/app/lib/constans";
import { IProduct } from "@/actions/product";
import { useSortStore } from "@/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface IProductProps {
  data: IProduct[];
}

function Products({ data }: IProductProps) {
  const sortValue = useSortStore((state) => state.sortValue);

  const products = [...data];

  if (sortValue === "high") {
    products.sort((a, b) => b.price - a.price);
  } else if (sortValue === "low") {
    products.sort((a, b) => a.price - b.price);
  }

  const router = useRouter();
  const handleClick = (id: number) => {
    router.push(`/detail/${id}`);
  };

  return (
    <div className="flex-1">
      <h2 className="mb-8 text-4xl">{ProductsTitle}</h2>
      <div className=" grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            className="bg-slate-50 p-4 rounded-lg shadow-md hover:bg-slate-200 transition duration-300 ease-in-out cursor-pointer"
            key={product.id}
            onClick={() => handleClick(product.id)}
          >
            <Image
              src={product.image}
              alt={product.name}
              priority
              width={300}
              height={300}
            />
            <div className="flex items-center justify-between mt-4">
              <h3 className="flex-2xl text-slate-700">{product.name}</h3>
              <p className="text-lg font-bold text-red-400">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
