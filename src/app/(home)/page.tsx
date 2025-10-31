import Products from "@/components/Products";
import Sort from "@/components/Sort/Sort";
import { getProducts } from "@/actions/product";

export default async function Home() {
  const res = await getProducts();
  const products = res.data;
  return (
    <div className="container flex">
      <Sort />
      <Products data={products} />
    </div>
  );
}
