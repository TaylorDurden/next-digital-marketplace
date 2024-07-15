"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navbarLinks = [
  {
    id: 0,
    name: "Home",
    href: "/",
  },
  {
    id: 1,
    name: "Templates",
    href: "/products/template",
  },
  {
    id: 2,
    name: "UI-Kits",
    href: "/products/uikit",
  },
  {
    id: 3,
    name: "Icons",
    href: "/products/icon",
  },
  {
    id: 4,
    name: "Sell",
    href: "/sell",
  },
];

export const NavbarLink = ({
  isConnected = true,
}: {
  isConnected: boolean;
}) => {
  const location = usePathname();
  console.log(location);
  return (
    <div className="hidden md:flex justify-center items-center col-span-6 gap-x-2">
      {navbarLinks.map((item) => {
        if (!isConnected && item.name == "Sell") {
          return <></>;
        }
        return (
          <Link
            href={item.href}
            key={item.id}
            className={cn(
              location === item.href
                ? "bg-muted"
                : "hover:bg-muted hover:bg-opacity-60",
              "group flex items-center px-2 py-2 font-medium rounded-md"
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};
