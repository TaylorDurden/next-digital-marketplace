"use client";
import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NavbarLink } from "./NavbarLink";
import { MobileMenu } from "./MobileMenu";
import { UserNav } from "./UserNav";
import ConnectButton from "./web3/ConnectButton";
import { useEffect } from "react";
import { useAccount } from "wagmi";

export const Navbar = () => {
  // const { getUser } = getKindeServerSession();
  // const user = await getUser();
  const { address, isConnected } = useAccount();
  useEffect(() => {
    if (isConnected && address) {
      // Call your local API with the wallet account information
      fetch("/api/auth/creation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ account: address }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [isConnected, address]);
  return (
    <nav className="relative max-w-screen-2xl w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7">
      <div className="md:col-span-3">
        <Link href="/">
          <h1 className="text-2xl font-semibold">
            Digi <span className="text-primary">Market</span>
          </h1>
        </Link>
      </div>
      <NavbarLink isConnected={isConnected} />
      <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
        {/* {user ? (
          <div>
            <UserNav
              email={user.email}
              name={user.given_name}
              image={user.picture}
            />
          </div>
        ) : (
          <div>
            <Button asChild>
            <LoginLink>Sign in</LoginLink>
            </Button>
            <Button asChild variant="secondary">
              <RegisterLink>Sign up</RegisterLink>
            </Button>
          </div>
        )} */}
        <ConnectButton />
      </div>
      <div className="md:hidden">
        <MobileMenu />
      </div>
    </nav>
  );
};
