import react, { ReactNode } from "react";
import { ChefHat, Globe, PartyPopper } from "lucide-react";

interface iAppProps {
  name: string;
  title: string;
  icon: ReactNode;
  id: number;
}

export const categoryItems: iAppProps[] = [
  {
    id: 0,
    name: "template",
    title: "Template",
    icon: react.createElement(Globe),
  },
  {
    id: 1,
    name: "uikit",
    title: "UI Kit",
    icon: react.createElement(ChefHat),
  },
  {
    id: 2,
    name: "icon",
    title: "Icon",
    icon: react.createElement(PartyPopper),
  },
];
