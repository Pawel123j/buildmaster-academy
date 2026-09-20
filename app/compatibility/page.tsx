import type { Metadata } from "next";

import { CompatibilityChecker } from "@/components/CompatibilityChecker";
import { ToolPage } from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Compatibility checker — BuildMaster Academy"
};

export default function Page() {
  return (
    <ToolPage>
      <CompatibilityChecker />
    </ToolPage>
  );
}
