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

/** Generacja pamięci. Wydzielony alias, bo typ powtarzał się w trzech miejscach. */
export type RamType = "DDR4" | "DDR5";

export type Motherboard = {
  id: string;
  name: string;
  socket: string;
  chipset: string;
  formFactor: string;
  ramType: RamType;
  notes: string;
};

export type CompatibilityData = {
  sockets: string[];
  ramTypes: RamType[];
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
