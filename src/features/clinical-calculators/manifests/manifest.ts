import type { CalculatorManifest } from "@/features/clinical-calculators/types";

const yesNoOptions = [
  { label: "Selecione...", value: "" },
  { label: "Sim", value: "yes" },
  { label: "Não", value: "no" },
];

export const percRuleManifest: CalculatorManifest = {
  slug: "perc-rule",
  title: "PERC Rule",
  shortTitle: "PERC Rule",
  description: "Exclusão clínica de TEP em paciente com baixo risco pré-teste.",
  seoTitle: "PERC Rule | Dosefy",
  seoDescription: "Aplique a regra PERC para apoiar exclusão de TEP em paciente de baixo risco pré-teste.",
  heroEyebrow: "Estratificação clínica de TEP",
  heroDescription:
    "Ferramenta para aplicar a Pulmonary Embolism Rule-out Criteria com transparência sobre o pré-requisito mais importante: o paciente já precisa ser de baixo risco clínico pré-teste.",
  heroHighlights: [
    "Bloqueia a conclusão quando baixo risco pré-teste não foi estabelecido.",
    "Mostra exatamente quais critérios ficaram positivos.",
    "Evita uso indevido do PERC fora do cenário validado.",
  ],
  resultMetricLabel: "Resultado PERC",
  actionLabel: "Calcular PERC",
  note: "Ferramenta de apoio à decisão. Não substitui julgamento clínico. O PERC não deve ser usado isoladamente em paciente sem avaliação pré-teste de baixo risco.",
  limitations: [
    "Não aplicar em paciente sem baixo risco clínico pré-teste.",
    "Não substitui avaliação clínica, Wells, YEARS, d-dímero ou imagem quando indicados.",
    "A regra foi desenhada para exclusão, não para confirmar diagnóstico de TEP.",
  ],
  references: [
    {
      label: "ACEP Clinical Policy: Suspected Acute Venous Thromboembolic Disease",
      href: "https://www.acep.org/siteassets/sites/acep/media/equal-documents/webinar_imagingw4_policy_avt.pdf",
    },
    {
      label: "Prospective multicenter evaluation of the pulmonary embolism rule-out criteria",
      href: "https://pubmed.ncbi.nlm.nih.gov/18318689/",
    },
  ],
  sections: [
    {
      id: "context",
      title: "Contexto clínico",
      description: "Defina primeiro se o paciente é de baixo risco clínico pré-teste.",
    },
    {
      id: "criteria",
      title: "Critérios do PERC",
      description: "Todos os oito critérios precisam ficar negativos para o PERC ser negativo.",
    },
  ],
  fields: [
    {
      name: "lowRiskPretest",
      label: "Paciente é de baixo risco clínico pré-teste?",
      type: "select",
      sectionId: "context",
      options: yesNoOptions,
      colSpan: 2,
      description: "Sem esse pré-requisito, o app não libera exclusão de TEP pelo PERC.",
    },
    {
      name: "age",
      label: "Idade",
      type: "number",
      sectionId: "context",
      inputMode: "numeric",
      placeholder: "Ex.: 42",
      min: 18,
      max: 120,
      suffix: "anos",
    },
    {
      name: "heartRate",
      label: "Frequência cardíaca",
      type: "number",
      sectionId: "criteria",
      inputMode: "numeric",
      placeholder: "Ex.: 88",
      min: 20,
      max: 250,
      suffix: "bpm",
    },
    {
      name: "oxygenSaturation",
      label: "Saturação O2",
      type: "number",
      sectionId: "criteria",
      inputMode: "numeric",
      placeholder: "Ex.: 98",
      min: 50,
      max: 100,
      suffix: "%",
    },
    {
      name: "recentTraumaOrSurgery",
      label: "Trauma ou cirurgia recente",
      type: "select",
      sectionId: "criteria",
      options: yesNoOptions,
    },
    {
      name: "unilateralLegSwelling",
      label: "Edema unilateral de perna",
      type: "select",
      sectionId: "criteria",
      options: yesNoOptions,
    },
    {
      name: "priorDvtPe",
      label: "TVP ou TEP prévio",
      type: "select",
      sectionId: "criteria",
      options: yesNoOptions,
    },
    {
      name: "estrogenUse",
      label: "Uso de hormônio ou estrogênio",
      type: "select",
      sectionId: "criteria",
      options: yesNoOptions,
    },
    {
      name: "hemoptysis",
      label: "Hemoptise",
      type: "select",
      sectionId: "criteria",
      options: yesNoOptions,
    },
  ],
  initialValues: {
    lowRiskPretest: "",
    age: "",
    heartRate: "",
    oxygenSaturation: "",
    recentTraumaOrSurgery: "",
    unilateralLegSwelling: "",
    priorDvtPe: "",
    estrogenUse: "",
    hemoptysis: "",
  },
};

export const calculatorManifest = percRuleManifest;
