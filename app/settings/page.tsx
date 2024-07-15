import { Card } from "@/components/ui/card";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { SettingsForm } from "../components/form/SettingsForm";
import { unstable_noStore as noStore } from "next/cache";
import { getUserById } from "../utils/user";

export default async function SetttingsPage() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    throw new Error("Not Authorized");
  }

  const data = await getUserById(user.id);
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <Card>
        <SettingsForm
          firstName={data?.firstName as string}
          lastName={data?.lastName as string}
          email={data?.email as string}
        />
      </Card>
    </section>
  );
}
