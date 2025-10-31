import { getProductDetail, getProducts } from "@/actions/product";
import React from "react";
import Image from "next/image";
import AddCart from "@/components/AddCart";

/** 静态化 ssg */
export async function generateStaticPrams() {
  const res = await getProducts();
  return res.data.map((item) => ({
    id: item.id.toString(),
  }));
}

interface IDetailPageProps {
  params: Promise<{ id: string }>;
}
async function DetailPage({ params }: IDetailPageProps) {
  const { id } = await params;

  const res = await getProductDetail(Number(id));
  const product = res.data;

  return (
    <div className="container flex py-6">
      <div className="w-64">
        <h2 className="font-sans text-3xl leading-10 font-bold my-8">
          {product.name}
        </h2>
        <p className="leading-10">{product.description}</p>
      </div>
      <div className="h-[500px] flex-1 mx-10 bg-slate-50 p-4 rounded-lg shadow-md relative">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority
          sizes="300"
          style={{ objectFit: "cover" }}
        />
      </div>
      <AddCart data={product} />
    </div>
  );
}

export default DetailPage;
