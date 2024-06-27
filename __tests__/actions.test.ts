import { SellProduct, UpdateUserSettings } from "../app/actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prismaMock } from "../singleton";
import { CategoryType } from "@prisma/client";
import { redirect } from "next/navigation";

// 模拟相关依赖
// jest.mock("@kinde-oss/kinde-auth-nextjs/server");
// jest.mock("./utils/db");

// mock getUser function
const userId = "user-id";
(getKindeServerSession as jest.Mock).mockReturnValue({
  getUser: jest.fn().mockResolvedValueOnce({ id: userId }),
});

// 测试 SellProduct 函数
// describe("SellProduct", () => {

// });

test("should validate product form data and return success state", async () => {
  // mock prisma.user.findUnique
  prismaMock.user.findUnique.mockRejectedValueOnce({ id: userId });
  // arrange
  const product = {
    id: "1",
    name: "Product Name",
    category: CategoryType.template,
    price: 10,
    summary: "123333",
    description: JSON.parse("{id:123, name:text}"),
    images: ["image1.jpg"],
    productFile: "product.zip",
    userId: userId,
    createdAt: new Date(),
  };
  prismaMock.product.create.mockResolvedValueOnce(product);

  // 调用 SellProduct 函数
  // const result = await SellProduct(null, product as unknown as FormData);

  // 断言结果
  await expect(SellProduct(null, objectToFormData(product))).resolves.toEqual(
    redirect(`/product/product-id`)
  );
});

// 测试 UpdateUserSettings 函数
// describe("UpdateUserSettings", () => {
//   it("should validate user settings and update user data", async () => {
//     // 模拟 getUser 函数
//     (getKindeServerSession as jest.Mock).mockReturnValue({
//       getUser: jest.fn().mockResolvedValueOnce({ id: "user-id" }),
//     });

//     // 模拟 prisma.user.update
//     prismaMock.user.update.mockResolvedValueOnce({
//       id: userId,
//       firstName: "John",
//       lastName: "Doe",
//     });

//     // 准备模拟的 formData 对象
//     const mockFormData = {
//       get: jest
//         .fn()
//         .mockReturnValueOnce("John") // firstName
//         .mockReturnValueOnce("Doe"), // lastName
//     };

//     // 调用 UpdateUserSettings 函数
//     const result = await UpdateUserSettings(null, mockFormData as FormData);

//     // 断言结果
//     expect(result).toEqual({
//       status: "success",
//       message: "Your Settings have been updated",
//     });
//   });

//   // 可以添加更多的测试用例来覆盖不同的场景，例如验证失败或用户未认证的情况
// });

function objectToFormData(obj: any, form = new FormData()): FormData {
  const appendValue = (key: string, value: any) => {
    if (value instanceof File) {
      form.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        // 对数组中的每个项添加索引以区分它们
        form.append(`${key}[${index}]`, item);
      });
    } else if (value instanceof Date) {
      // 将 Date 对象转换为时间戳
      form.append(key, value.toISOString());
    } else {
      // 对于其他类型，直接添加
      form.append(key, value);
    }
  };

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object" && value !== null) {
      // 对象可能是嵌套对象或 Date 对象
      if (value instanceof Date) {
        appendValue(key, value);
      } else {
        // 递归调用 objectToFormData 以处理嵌套对象
        objectToFormData(value, form);
      }
    } else {
      // 基本类型或数组
      appendValue(key, value);
    }
  }

  return form;
}
