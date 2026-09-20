import type { Metadata } from "next";

import { BudgetBuilder } from "@/components/BudgetBuilder";
import { ToolPage } from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Budget builds — BuildMaster Academy"
};

export default function Page() {
  return (
    <ToolPage>
      <BudgetBuilder />
    </ToolPage>
  );
}
