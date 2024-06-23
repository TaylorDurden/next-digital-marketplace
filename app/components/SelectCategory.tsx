"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { categoryItems } from "@/lib/categoryItems";
import { useState } from "react";

export const SelectCategory = () => {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <input type="hidden" name="category" value={selected || ""} />
      {categoryItems.map((item) => (
        <div key={item.id} className="cursor-pointer">
          <Card
            className={
              selected === item.name
                ? "border-primary border-2"
                : "border-2 border-primary/10"
            }
            onClick={() => setSelected(item.name)}
          >
            <CardHeader>
              {item.icon}
              <h3 className="font-medium">{item.title}</h3>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
};
