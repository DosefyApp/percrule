# PERC Rule Calculator

## Objetivo

Aplicar a Pulmonary Embolism Rule-out Criteria (PERC) em pacientes com baixo risco clinico pre-teste para apoiar exclusao de TEP sem exames adicionais, quando apropriado.

## Logica

PERC so pode ser aplicado quando o paciente ja foi considerado de baixo risco clinico pre-teste.

O resultado e negativo apenas se todos os 8 criterios forem negativos:

- idade < 50 anos
- FC < 100 bpm
- saturacao O2 > 94%
- sem trauma ou cirurgia recente
- sem edema unilateral de perna
- sem TVP/TEP previo
- sem uso de estrogenio
- sem hemoptise

## Referencias

- ACEP Clinical Policy on Suspected Acute Venous Thromboembolic Disease
- Prospective multicenter evaluation of the pulmonary embolism rule-out criteria

## Rodar localmente

```bash
npm install
npm run dev
```

## Testes

```bash
npm run test
```

## Build

```bash
npm run build
```

## Deploy

```bash
vercel deploy
```

## Aviso legal

Ferramenta de apoio a decisao. Nao substitui julgamento clinico. Nao usar PERC isoladamente sem avaliacao pre-teste de baixo risco.
