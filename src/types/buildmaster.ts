export type GuideStep = {
  id: string;
  title: string;
  stage: string;
  duration: string;
  difficulty: "Easy" | "Medium" | "Careful";
  summary: string;
  actions: string[];
  mistakes: string[];
};

export type Motherboard = {
  id: string;
  name: string;
  socket: string;
  chipset: string;
  formFactor: string;
  ramType: "DDR4" | "DDR5";
  notes: string;
};

export type CompatibilityData = {
  sockets: string[];
  ramTypes: Array<"DDR4" | "DDR5">;
  motherboards: Motherboard[];
};

export type BudgetPart = {
  category: string;
  name: string;
  price: number;
};

export type BudgetBuild = {
  id: string;
  label: string;
  budget: number;
  audience: string;
  focus: string;
  parts: BudgetPart[];
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
};
