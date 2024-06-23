"use client";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { JSONContent } from "@tiptap/react";
import { SelectCategory } from "../components/SelectCategory";
import { TipTapEditor } from "../components/Editor";
import { UploadDropzone } from "../utils/uploadthing";
import { State, SellProduct } from "../actions";
import { SubmitButton } from "../components/SubmitButtons";

export default function SellRoute() {
  const initialState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(SellProduct, initialState);
  const [json, setJson] = useState<null | JSONContent>(null);
  const [images, setImages] = useState<null | string[]>(null);
  const [productFile, setProductFile] = useState<null | string>(null);
  console.log(state?.errors);
  const errorDisplay = (name: string) =>
    state?.errors?.[name]?.[0] && (
      <p className="text-destructive">{state?.errors?.[name]?.[0]}</p>
    );

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <Card>
        <form action={formAction}>
          <CardHeader>
            <CardTitle>Sell your product</CardTitle>
            <CardDescription>Please input the product details</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-2">
              <Label>Product Name</Label>
              <Input type="text" name="name" placeholder="Product Name" />
              {errorDisplay("name")}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Category</Label>
              <SelectCategory />
              {errorDisplay("category")}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Price</Label>
              <Input type="number" name="price" placeholder="100$" />
              {errorDisplay("price")}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Summary</Label>
              <Textarea name="summary" placeholder="Input summary of product" />
              {errorDisplay("summary")}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Description</Label>
              <input
                type="hidden"
                name="description"
                value={json ? JSON.stringify(json) : ""}
              />
              <TipTapEditor json={json} setJson={setJson} />
              {errorDisplay("description")}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Product Images</Label>
              <input
                type="hidden"
                name="images"
                value={JSON.stringify(images)}
              />
              <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  setImages(res.map((x) => x.url));
                  toast.success("Your images have been uploaded");
                }}
                onUploadError={(e) => {
                  toast.error(
                    `Something went wrong: ${e.toString()}, try again`
                  );
                }}
              />
              {errorDisplay("images")}
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Product Zip File</Label>
              <input
                type="hidden"
                name="productFile"
                value={productFile ?? ""}
              />
              <UploadDropzone
                endpoint="zipUploader"
                onClientUploadComplete={(res) => {
                  setProductFile(res[0]?.url);
                  toast.success("Your product zip file has been uplaoded!");
                }}
                onUploadError={(e) => {
                  toast.error(
                    `Something went wrong: ${e.toString()}, try again`
                  );
                }}
              />
              {errorDisplay("productFile")}
            </div>
          </CardContent>
          <CardFooter className="mt-5">
            <SubmitButton>Submit</SubmitButton>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
