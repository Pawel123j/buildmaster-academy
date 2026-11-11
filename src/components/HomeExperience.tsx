import { AppHeader } from "./AppHeader";
import { FeatureGrid } from "./FeatureGrid";
import { Footer } from "./Footer";
import { HeroWorkbench } from "./HeroWorkbench";
import { ProjectTeaser } from "./ProjectTeaser";

export function HomeExperience() {
  return (
    <>
      <AppHeader />
      <main>
        <HeroWorkbench />
        <FeatureGrid />
        <ProjectTeaser />
      </main>
      <Footer />
    </>
  );
}
