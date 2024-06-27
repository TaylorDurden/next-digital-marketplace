import { State } from "../actions";

interface ErrorLabelType {
  name: string;
  state:
    | State
    | {
        status: string;
        errors: {
          authentication: string;
        };
        message: string;
      };
}

export const ErrorLabel = ({ name, state }: ErrorLabelType) => {
  if (!state) {
    return <></>;
  }
  return (
    <p className="text-destructive">
      {state.errors?.[name as keyof typeof state.errors]?.[0]}
    </p>
  );
};
