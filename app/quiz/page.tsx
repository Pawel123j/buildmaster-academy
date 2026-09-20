import type { Metadata } from "next";

import { Quiz } from "@/components/Quiz";
import { ToolPage } from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Knowledge quiz — BuildMaster Academy"
};

export default function Page() {
  return (
    <ToolPage>
      <Quiz />
    </ToolPage>
  );
}
