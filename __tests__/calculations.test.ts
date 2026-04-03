import { describe, expect, it } from "vitest";
import { percRuleEngine } from "@/features/clinical-calculators/engines/engine";

const basePayload = {
  lowRiskPretest: "yes",
  age: 35,
  heartRate: 88,
  oxygenSaturation: 98,
  recentTraumaOrSurgery: "no",
  unilateralLegSwelling: "no",
  priorDvtPe: "no",
  estrogenUse: "no",
  hemoptysis: "no",
} as const;

describe("percRuleEngine", () => {
  it("retorna PERC negativo quando todos os critérios são negativos em baixo risco", () => {
    const parsed = percRuleEngine.parse(basePayload);
    expect(parsed.success).toBe(true);
    if (!parsed.success) return;

    const result = percRuleEngine.compute(parsed.data);
    expect(result.headline.value).toBe("PERC negativo");
  });

  it("retorna PERC positivo com FC 101", () => {
    const parsed = percRuleEngine.parse({ ...basePayload, heartRate: 101 });
    expect(parsed.success).toBe(true);
    if (!parsed.success) return;

    const result = percRuleEngine.compute(parsed.data);
    expect(result.headline.value).toBe("PERC positivo");
  });

  it("retorna PERC positivo com hemoptise", () => {
    const parsed = percRuleEngine.parse({ ...basePayload, hemoptysis: "yes" });
    expect(parsed.success).toBe(true);
    if (!parsed.success) return;

    const result = percRuleEngine.compute(parsed.data);
    expect(result.headline.status).toContain("1 critério");
  });

  it("bloqueia conclusão quando não há baixo risco pré-teste", () => {
    const parsed = percRuleEngine.parse({ ...basePayload, lowRiskPretest: "no" });
    expect(parsed.success).toBe(true);
    if (!parsed.success) return;

    const result = percRuleEngine.compute(parsed.data);
    expect(result.headline.value).toBe("Não aplicável");
  });
});
