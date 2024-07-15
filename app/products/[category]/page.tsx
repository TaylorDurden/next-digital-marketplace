import { unstable_noStore as noStore } from "next/cache";
import ProductList from "@/app/components/ProductList";
import { getProductsByCategory } from "@/app/utils/product";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  noStore();
  const data = await getProductsByCategory(params.category);
  return <ProductList products={data} />;
}
