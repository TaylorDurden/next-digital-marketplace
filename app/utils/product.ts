import { notFound } from "next/navigation";
import prisma from "./db";
import { CategoryType } from "@prisma/client";

export async function getProductsByCategory(category: string) {
  let input;

  switch (category) {
    case "template": {
      input = "template";
      break;
    }
    case "uikit": {
      input = "uikit";
      break;
    }
    case "icon": {
      input = "icon";
      break;
    }
    case "all": {
      input = undefined;
      break;
    }
    default: {
      return notFound();
    }
  }

  const data = await prisma.product.findMany({
    where: {
      category: input as CategoryType,
    },
    select: {
      id: true,
      images: true,
      summary: true,
      name: true,
      price: true,
    },
  });

  return data;
}

export async function getProductsByUserId(userId?: string) {
  const data = await prisma.product.findMany({
    where: {
      userId: userId,
    },
    select: {
      name: true,
      images: true,
      price: true,
      summary: true,
      id: true,
    },
  });

  return data;
}
