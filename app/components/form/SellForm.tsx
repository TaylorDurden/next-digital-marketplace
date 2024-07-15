"use client";

import { SellProduct, State } from "@/app/actions";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { JSONContent } from "@tiptap/react";
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { TipTapEditor } from "../Editor";
import { ErrorLabel } from "../ErrorLabel";
import { SelectCategory } from "../SelectCategory";
import { SubmitButton } from "../SubmitButtons";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UploadDropzone } from "../../utils/uploadthing";

export default function SellForm() {
  const initialState: State = {
    message: "",
    status: undefined,
  };
  const [state, formAction] = useFormState(SellProduct, initialState);
  const [json, setJson] = useState<null | JSONContent>(null);
  const [images, setImages] = useState<null | string[]>(null);
  const [productFile, setProductFile] = useState<null | string>(null);
  console.log(state?.errors);

  useEffect(() => {
    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>Sell your product</CardTitle>
        <CardDescription>Please input the product details</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-10">
        <div className="flex flex-col gap-y-2">
          <Label>Product Name</Label>
          <Input
            type="text"
            minLength={3}
            name="name"
            placeholder="Product Name"
          />
          <ErrorLabel name="name" state={state} />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Category</Label>
          <SelectCategory />
          <ErrorLabel name="category" state={state} />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Price</Label>
          <Input type="number" name="price" placeholder="100$" />
          <ErrorLabel name="price" state={state} />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Summary</Label>
          <Textarea name="summary" placeholder="Input summary of product" />
          <ErrorLabel name="summary" state={state} />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Description</Label>
          <input
            type="hidden"
            name="description"
            value={json ? JSON.stringify(json) : ""}
          />
          <TipTapEditor json={json} setJson={setJson} />
          <ErrorLabel name="description" state={state} />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Product Images</Label>
          <input type="hidden" name="images" value={JSON.stringify(images)} />
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImages(res.map((x) => x.url));
              toast.success("Your images have been uploaded");
            }}
            onUploadError={(e) => {
              toast.error(`Something went wrong: ${e.toString()}, try again`);
            }}
          />
          <ErrorLabel name="images" state={state} />
        </div>
        <div className="flex flex-col gap-y-2">
          <Label>Product Zip File</Label>
          <input type="hidden" name="productFile" value={productFile ?? ""} />
          <UploadDropzone
            endpoint="zipUploader"
            onClientUploadComplete={(res) => {
              setProductFile(res[0]?.url);
              toast.success("Your product zip file has been uplaoded!");
            }}
            onUploadError={(e) => {
              toast.error(`Something went wrong: ${e.toString()}, try again`);
            }}
          />
          <ErrorLabel name="productFile" state={state} />
        </div>
      </CardContent>
      <CardFooter className="mt-5">
        <SubmitButton>Submit</SubmitButton>
      </CardFooter>
    </form>
  );
}
