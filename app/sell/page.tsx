"use client";
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
import { SelectCategory } from "../components/SelectCategory";
import { TipTapEditor } from "../components/Editor";
import { useState } from "react";
import { JSONContent } from "@tiptap/react";
import { UploadDropzone } from "../utils/uploadthing";

export default function SellRoute() {
  const [json, setJson] = useState<null | JSONContent>(null);
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <Card>
        <form>
          <CardHeader>
            <CardTitle>Sell your product</CardTitle>
            <CardDescription>Please input the product details</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-y-10">
            <div className="flex flex-col gap-y-2">
              <Label>Product Name</Label>
              <Input type="text" placeholder="Product Name" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Category</Label>
              <SelectCategory />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Price</Label>

              <Input type="number" placeholder="100$" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Summary</Label>
              <Textarea placeholder="Input summary of product" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Description</Label>
              <TipTapEditor json={json} setJson={setJson} />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Product Images</Label>
              <UploadDropzone endpoint="imageUploader" />
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Product File Zip</Label>
              <UploadDropzone endpoint="zipUploader" />
            </div>
          </CardContent>
          <CardFooter className="mt-5">
            <Button>Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
