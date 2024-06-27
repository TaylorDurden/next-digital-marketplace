"use server";
import { z } from "zod";
import prisma from "./utils/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CategoryType } from "@prisma/client";
import { redirect } from "next/navigation";

export type State = {
  status: "error" | "success" | undefined;
  errors?: Record<string, string[]>;
  message?: string | null;
};

const productValidationSchema = z.object({
  name: z.string().min(3, "Name min length is 3."),
  category: z.string().min(1, "Category is required"),
  price: z.number().min(0.01, "The price must large than 0.01"),
  summary: z.string().min(10, "Please input more product summary"),
  description: z.string().min(1, "Description required"),
  images: z.array(z.string(), { message: "Images required" }),
  productFile: z.string().min(1, "Please upload a zip file of your product"),
});

const updateUserSettingsValidationSchema = z.object({
  firstName: z
    .string()
    .min(3, "First Name minimum length of 3 required")
    .or(z.literal(""))
    .optional(),

  lastName: z
    .string()
    .min(3, "Last Name minimum length of 3 required")
    .or(z.literal(""))
    .optional(),
});

export async function SellProduct(prevState: any, formData: FormData) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      throw new Error("Something went wrong");
    }
    console.log(`price: ${Number(formData.get("price"))}`);
    console.log(`description: ${formData.get("description")}`);
    console.log(`summary: ${formData.get("summary")}`);
    const validateFields = productValidationSchema.safeParse({
      name: formData.get("name"),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      summary: formData.get("summary"),
      description: formData.get("description"),
      images: JSON.parse(formData.get("images") as string),
      productFile: formData.get("productFile"),
    });

    if (!validateFields.success) {
      const state: State = {
        status: "error",
        errors: validateFields.error.flatten().fieldErrors,
        message: "Oops, I think there is a mistake with your inputs.",
      };

      return state;
    }

    const authUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });

    if (!authUser) {
      return {
        status: "error",
        errors: { authentication: "user not authenticated" },
        message: "User not authenticated.",
      };
    }

    const data = await prisma.product.create({
      data: {
        name: validateFields.data.name,
        category: validateFields.data.category as CategoryType,
        summary: validateFields.data.summary,
        price: validateFields.data.price,
        images: validateFields.data.images,
        productFile: validateFields.data.productFile,
        userId: authUser.id,
        description: JSON.parse(validateFields.data.description),
      },
    });

    return redirect(`/product/${data.id}`);
  } catch (e) {
    throw e;
  }
}

export async function UpdateUserSettings(prevState: any, formData: FormData) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
      throw new Error("something went wrong");
    }

    const validateFields = updateUserSettingsValidationSchema.safeParse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
    });

    if (!validateFields.success) {
      const state: State = {
        status: "error",
        errors: validateFields.error.flatten().fieldErrors,
        message: "Oops, I think there is a mistake with your inputs.",
      };

      return state;
    }

    const data = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        firstName: validateFields.data.firstName,
        lastName: validateFields.data.lastName,
      },
    });

    const state: State = {
      status: "success",
      message: "Your Settings have been updated",
    };

    return state;
  } catch (e) {
    throw e;
  }
}
