import type { Metadata } from "next";

import { BuildGuide } from "@/components/BuildGuide";
import { ToolPage } from "@/components/ToolPage";

export const metadata: Metadata = {
  title: "Build guide — BuildMaster Academy"
};

export default function Page() {
  return (
    <ToolPage>
      <BuildGuide />
    </ToolPage>
  );
}
