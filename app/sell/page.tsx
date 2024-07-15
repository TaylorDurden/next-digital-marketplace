"use client";
import { Card } from "@/components/ui/card";
import SellForm from "../components/form/SellForm";
import { unstable_noStore as noStore } from "next/cache";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SellRoute() {
  // noStore();
  // const { getUser } = getKindeServerSession();
  // const user = await getUser();
  const { address, isConnected } = useAccount();
  const router = useRouter();
  console.log("isConnected: ", isConnected);
  console.log("address: ", address);

  useEffect(() => {
    if (!isConnected) {
      router.push("/");
    }
  }, [isConnected, router]);

  return (
    <section className="max-w-screen-2xl mx-auto px-4 md:px-8">
      <Card>
        <SellForm />
      </Card>
    </section>
  );
}
