import React from "react";
import { IProductCard } from "./types/productType";
import { ProductCard } from "./ProductCard";

interface ProductListType {
  products: IProductCard[];
}

export default async function ProductList({ products }: ProductListType) {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            images={product.images}
            price={product.price}
            name={product.name}
            id={product.id}
            summary={product.summary}
          />
        ))}
      </div>
    </section>
  );
}
