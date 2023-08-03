import { PropsWithChildren } from "react";
import { Feedback } from "./feedback";

export function Main({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Feedback />
    </>
  );
}
