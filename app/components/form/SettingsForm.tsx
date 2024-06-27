"use client";

import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useFormState } from "react-dom";

import { useEffect } from "react";
import { toast } from "sonner";
import { type State, UpdateUserSettings } from "@/app/actions";
import { SubmitButton } from "../SubmitButtons";
import { ErrorLabel } from "../ErrorLabel";

interface iAppProps {
  firstName: string;
  lastName: string;
  email: string;
}

export function SettingsForm({ email, firstName, lastName }: iAppProps) {
  const initalState: State = { message: "", status: undefined };
  const [state, formAction] = useFormState(UpdateUserSettings, initalState);

  useEffect(() => {
    if (state?.status === "error") {
      toast.error(state.message);
    } else if (state?.status === "success") {
      toast.success(state.message);
    }
  }, [state]);
  return (
    <form action={formAction}>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Here you will find settings regarding your account
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-2">
          <Label>First Name</Label>
          <Input name="firstName" type="text" defaultValue={firstName} />
          <ErrorLabel name="firstName" state={state} />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Last Name</Label>
          <Input name="lastName" type="text" defaultValue={lastName} />
          <ErrorLabel name="lastName" state={state} />
        </div>

        <div className="flex flex-col gap-y-2">
          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            disabled
            value={
              email.slice(0, Math.min(3, email.length)) +
              "******" +
              email.slice(-Math.min(4, email.length))
            }
            defaultValue={"jan@alenix.de"}
          />
        </div>
      </CardContent>
      <CardFooter>
        <SubmitButton>Update your settings</SubmitButton>
      </CardFooter>
    </form>
  );
}
