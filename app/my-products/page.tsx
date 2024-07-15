import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import { getProductsByUserId } from "../utils/product";
import ProductList from "../components/ProductList";

export default async function MyProduct() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const products = await getProductsByUserId(user?.id);

  if (!user) {
    throw new Error("Unauthorized");
  }
  return <ProductList products={products} />;
}
