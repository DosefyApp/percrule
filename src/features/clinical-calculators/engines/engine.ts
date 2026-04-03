import { z } from "zod";
import { buildEngine } from "@/features/clinical-calculators/engines/helpers";

const yesNoSchema = z.string().refine((value) => value === "yes" || value === "no", {
  message: "Selecione uma opção.",
});

const schema = z.object({
  lowRiskPretest: yesNoSchema,
  age: z.coerce.number().int().min(18, "Informe idade entre 18 e 120 anos.").max(120, "Informe idade entre 18 e 120 anos."),
  heartRate: z.coerce.number().int().min(20, "Informe FC entre 20 e 250 bpm.").max(250, "Informe FC entre 20 e 250 bpm."),
  oxygenSaturation: z.coerce.number().int().min(50, "Informe SatO2 entre 50% e 100%.").max(100, "Informe SatO2 entre 50% e 100%."),
  recentTraumaOrSurgery: yesNoSchema,
  unilateralLegSwelling: yesNoSchema,
  priorDvtPe: yesNoSchema,
  estrogenUse: yesNoSchema,
  hemoptysis: yesNoSchema,
});

export const percRuleEngine = buildEngine(schema, (values) => {
  const failedCriteria = [
    values.age >= 50 ? "Idade >= 50 anos" : null,
    values.heartRate >= 100 ? "FC >= 100 bpm" : null,
    values.oxygenSaturation <= 94 ? "Saturação O2 <= 94%" : null,
    values.recentTraumaOrSurgery === "yes" ? "Trauma ou cirurgia recente" : null,
    values.unilateralLegSwelling === "yes" ? "Edema unilateral de perna" : null,
    values.priorDvtPe === "yes" ? "TVP ou TEP prévio" : null,
    values.estrogenUse === "yes" ? "Uso de estrogênio ou hormônio" : null,
    values.hemoptysis === "yes" ? "Hemoptise presente" : null,
  ].filter(Boolean) as string[];

  const criteriaRows = [
    { label: "Idade < 50 anos", value: values.age < 50 ? "Negativo" : "Positivo" },
    { label: "FC < 100 bpm", value: values.heartRate < 100 ? "Negativo" : "Positivo" },
    { label: "SatO2 > 94%", value: values.oxygenSaturation > 94 ? "Negativo" : "Positivo" },
    { label: "Sem trauma ou cirurgia recente", value: values.recentTraumaOrSurgery === "no" ? "Negativo" : "Positivo" },
    { label: "Sem edema unilateral de perna", value: values.unilateralLegSwelling === "no" ? "Negativo" : "Positivo" },
    { label: "Sem TVP/TEP prévio", value: values.priorDvtPe === "no" ? "Negativo" : "Positivo" },
    { label: "Sem uso de hormônio/estrogênio", value: values.estrogenUse === "no" ? "Negativo" : "Positivo" },
    { label: "Sem hemoptise", value: values.hemoptysis === "no" ? "Negativo" : "Positivo" },
  ];

  if (values.lowRiskPretest === "no") {
    return {
      headline: {
        label: "Resultado PERC",
        value: "Não aplicável",
        status: "Exige baixo risco pré-teste",
        tone: "warning",
        description: "A regra PERC não deve ser usada isoladamente para excluir TEP sem antes definir baixo risco clínico pré-teste.",
      },
      interpretation: {
        title: "Interpretação clínica",
        tone: "warning",
        description: "Neste contexto, o PERC não pode ser usado para exclusão segura de TEP. Siga o algoritmo clínico habitual com estimativa pré-teste e exames conforme necessidade.",
      },
      calculation: {
        title: "Como foi calculado",
        rows: criteriaRows,
        bullets: [
          "O paciente não foi classificado como baixo risco clínico pré-teste.",
          "Sem esse pré-requisito, a conclusão de exclusão pelo PERC fica bloqueada.",
        ],
      },
      extraPanels: [
        {
          title: "Critérios positivos encontrados",
          tone: failedCriteria.length ? "warning" : "info",
          bullets: failedCriteria.length ? failedCriteria : ["Nenhum critério do PERC ficou positivo, mas a regra continua não aplicável sem baixo risco pré-teste."],
        },
      ],
    };
  }

  const negative = failedCriteria.length === 0;

  return {
    headline: {
      label: "Resultado PERC",
      value: negative ? "PERC negativo" : "PERC positivo",
      status: negative ? "8 de 8 critérios negativos" : `${failedCriteria.length} critério(s) positivo(s)`,
      tone: negative ? "success" : "warning",
      description: negative
        ? "Em paciente de baixo risco clínico pré-teste, o PERC negativo apoia exclusão de TEP sem investigação adicional."
        : "PERC positivo não exclui TEP e deve ser seguido do algoritmo diagnóstico habitual.",
    },
    interpretation: {
      title: "Interpretação clínica",
      tone: negative ? "success" : "warning",
      description: negative
        ? "Todos os oito critérios ficaram negativos em um paciente de baixo risco pré-teste."
        : "Pelo menos um critério do PERC ficou positivo, então a regra deixa de servir como exclusão.",
      bullets: negative
        ? ["A exclusão só é apropriada quando a avaliação clínica prévia realmente define baixo risco."]
        : ["Considere d-dímero, imagem e reavaliação clínica conforme o fluxo assistencial local."],
    },
    calculation: {
      title: "Como foi calculado",
      rows: criteriaRows,
      bullets: [
        "PERC é negativo apenas quando todos os 8 critérios ficam negativos.",
        negative ? "Nenhum critério ficou positivo." : `Critérios positivos: ${failedCriteria.join("; ")}.`,
      ],
    },
    extraPanels: [
      {
        title: negative ? "Leitura prática" : "Critérios que impediram exclusão",
        tone: negative ? "info" : "warning",
        bullets: negative
          ? [
              "Resultado compatível com exclusão clínica de TEP somente em baixo risco pré-teste.",
              "Se o quadro clínico mudar, reavalie o paciente e não use o PERC como decisão definitiva.",
            ]
          : failedCriteria,
      },
    ],
  };
});

export const calculatorEngine = percRuleEngine;
