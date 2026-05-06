import { AppHeader } from "./AppHeader";
import { BudgetBuilder } from "./BudgetBuilder";
import { BuildGuide } from "./BuildGuide";
import { CompatibilityChecker } from "./CompatibilityChecker";
import { FeatureGrid } from "./FeatureGrid";
import { Footer } from "./Footer";
import { HeroWorkbench } from "./HeroWorkbench";
import { ProjectTeaser } from "./ProjectTeaser";
import { Quiz } from "./Quiz";

export function HomeExperience() {
  return (
    <>
      <AppHeader />
      <main>
        <HeroWorkbench />
        <FeatureGrid />
        <BuildGuide />
        <CompatibilityChecker />
        <BudgetBuilder />
        <Quiz />
        <ProjectTeaser />
      </main>
      <Footer />
    </>
  );
}
