import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { NavbarLink } from "./NavbarLink";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./MobileMenu";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserNav } from "./UserNav";

export const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  return (
    <nav className="relative max-w-7xl w-full flex md:grid md:grid-cols-12 items-center px-4 md:px-8 mx-auto py-7">
      <div className="md:col-span-3">
        <Link href="/">
          <h1 className="text-2xl font-semibold">
            Marshal <span className="text-primary">UI</span>
          </h1>
        </Link>
      </div>
      <NavbarLink />
      <div className="flex items-center gap-x-2 ms-auto md:col-span-3">
        {user ? (
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
        )}
      </div>
      <div className="md:hidden">
        <MobileMenu />
      </div>
    </nav>
  );
};
