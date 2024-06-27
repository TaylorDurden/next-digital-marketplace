import { notFound } from "next/navigation";
import prisma from "../utils/db";
import { LoadingProductCard, ProductCard } from "./ProductCard";
import Link from "next/link";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface IProductCategory {
  category: "newest" | "templates" | "uikits" | "icons";
}

const selectFields = {
  price: true,
  name: true,
  summary: true,
  id: true,
  images: true,
};
const take = 3;

async function getRecent3ProductsByCategory({ category }: IProductCategory) {
  switch (category) {
    case "icons": {
      const data = await prisma.product.findMany({
        where: {
          category: "icon",
        },
        select: selectFields,
        take: take,
      });

      return {
        data: data,
        title: "Icons",
        link: "/products/icon",
      };
    }
    case "newest": {
      const data = await prisma.product.findMany({
        select: selectFields,
        orderBy: {
          createdAt: "desc",
        },
        take: take,
      });

      return {
        data: data,
        title: "Newest Products",
        link: "/products/all",
      };
    }
    case "templates": {
      const data = await prisma.product.findMany({
        where: {
          category: "template",
        },
        select: selectFields,
        take: take,
      });

      return {
        title: "Templates",
        data: data,
        link: "/products/template",
      };
    }
    case "uikits": {
      const data = await prisma.product.findMany({
        where: {
          category: "uikit",
        },
        select: selectFields,
        take: take,
      });

      return {
        title: "Ui Kits",
        data: data,
        link: "/products/uikit",
      };
    }
    default: {
      return notFound();
    }
  }
}

export function ProductRow({ category }: IProductCategory) {
  return (
    <section className="mt-12">
      <Suspense fallback={<LoadingSkeleton />}>
        <LoadRows category={category} />
      </Suspense>
    </section>
  );
}

async function LoadRows({ category }: IProductCategory) {
  const data = await getRecent3ProductsByCategory({ category: category });
  return (
    <>
      <div className="md:flex md:items-center md:justify-between">
        <Link
          href={data.link}
          className="text-sm hidden font-medium text-primary hover:text-primary/90 md:block"
        >
          <h2 className="text-2xl font-extrabold tracking-tighter ">
            {data.title}
          </h2>
        </Link>
      </div>

      <div className="grid gird-cols-1 lg:grid-cols-3 sm:grid-cols-2 mt-4 gap-10">
        {data.data.map((product) => (
          <ProductCard
            images={product.images}
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            summary={product.summary}
          />
        ))}
      </div>
    </>
  );
}

function LoadingSkeleton() {
  return (
    <div>
      <Skeleton className="h-8 w-56" />
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-10 lg:grid-cols-3">
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </div>
  );
}
