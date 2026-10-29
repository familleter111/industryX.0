import type { TextOverlay } from '@/lib/i18n'
import type { IndustryPageData } from '@/lib/data/industries/types'

/**
 * Version anglaise de la page food. Seuls les textes y figurent : les
 * chiffres, icônes et tracés viennent de food.ts (voir `overlay`).
 * L'ordre des éléments de chaque liste doit suivre celui du français.
 */
export const foodEn: TextOverlay<IndustryPageData> = {
  metaTitle: "CIPA for food & beverage | Industry X.0",
  metaDescription:
    "HACCP, food safety, in-line quality checks and farm-to-fork traceability: CIPA digitizes food and beverage operations.",

  headline: "food & beverage industry",
  intro:
    "CIPA transforms food and FMCG operations through smart automation, AI, traceability and advanced analytics — improving food safety, quality, compliance and performance across your entire value chain.",
  hero: { alt: "CIPA platform in a food plant: quality dashboard, HACCP compliance and AI assistance" },
  indicators: ["Operational efficiency", "Fewer compliance errors", "Fewer quality deviations"],

  overview:
    "From raw materials to finished products, CIPA helps food organizations improve quality, compliance, speed and resilience — across seven value areas.",
  useCasesTitle: "core food operations",

  coreAccentLabel: "Core operations",
  coreSlides: [
    {
      tag: "Food safety & compliance",
      title: "Automated compliance and food safety documentation",
      desc: "Ensure HACCP, FSMA and ISO 22000 compliance with end-to-end digital documentation. Every critical control point (CCP) is recorded, time-stamped and audit-ready — with no paper.",
      before: [
        "Manual logs and paper records",
        "Incomplete or inconsistent documentation",
        "Findings and deviations during audits",
        "Slow response to incidents and recalls",
      ],
      after: [
        "Automated HACCP compliance",
        "Real-time, audit-ready records",
        "Faster inspections and audits",
        "Full confidence in food safety",
      ],
      kpis: [
        {
          label: "reduction in audit preparation time",
        },
        {
          label: "of CCPs traced and time-stamped digitally",
        },
      ],
      visualCaption: "Digital HACCP workflow: every critical control point is validated in real time in CIPA.",
    },
    {
      tag: "Production & quality",
      title: "Digital production and quality control",
      desc: "Standardize production and quality checks with real-time visibility and control. Operators follow guided digital instructions and deviations are detected immediately.",
      before: [
        "Manual quality checks",
        "Inconsistent batch quality",
        "Limited visibility on production in progress",
        "High scrap and waste rates",
      ],
      after: [
        "Real-time SPC and quality alerts",
        "Consistent quality, batch after batch",
        "Full traceability of every batch",
        "Much less rework and scrap",
      ],
      kpis: [
        {
          label: "reduction in scrap and material waste",
        },
        {
          label: "improvement in batch consistency",
        },
      ],
      visualCaption: "CIPA app on an industrial tablet: guided instructions and in-line quality checks.",
    },
    {
      tag: "AI & predictive maintenance",
      title: "Predictive analytics for quality and maintenance",
      desc: "Use AI to predict problems and prevent breakdowns before they hit production. CIPA models detect process drift and anticipate equipment failures.",
      before: [
        "Unexpected equipment breakdowns",
        "Purely reactive maintenance",
        "Quality problems detected too late",
        "Unplanned downtime",
      ],
      after: [
        "Predictive maintenance schedules",
        "Early detection of quality risks",
        "Better machine availability",
        "Smoother production flow",
      ],
      kpis: [
        {
          label: "availability of critical equipment",
        },
        {
          label: "unplanned downtime",
        },
      ],
      visualCaption: "Machine health score: drift is detected and corrected before the breakdown.",
    },
    {
      tag: "Farm-to-fork traceability",
      title: "Traceability of ingredients and raw materials",
      desc: "End-to-end traceability for ingredients, allergens and finished products. Every batch is genealogically linked to its raw materials, suppliers and destinations.",
      before: [
        "Limited supplier visibility",
        "Manual traceability processes",
        "Slow recalls and investigations",
        "Imprecise batch genealogy",
      ],
      after: [
        "Full farm-to-fork traceability",
        "Visibility on suppliers and incoming batches",
        "Targeted recalls and root-cause analysis",
        "Precise, instant batch genealogy",
      ],
      kpis: [
        {
          label: "time to execute a product recall",
        },
        {
          label: "upstream / downstream genealogy per batch",
        },
      ],
      visualCaption: "Batch genealogy chain: from ingredient supplier all the way to distribution.",
    },
  ],

  performanceAccentLabel: "Sustainable performance",
  performanceTitle: "quality, innovation and sustainable performance",
  performanceSlides: [
    {
      tag: "Innovation & go-to-market",
      title: "Faster product development and market launch",
      desc: "Streamline formulation, testing and approvals to launch products faster. R&D, quality and production work together on a single repository of recipes and trials.",
      before: [
        "R&D and quality in silos",
        "Endless validation cycles",
        "Slow, scattered approvals",
        "Missed market opportunities",
      ],
      after: [
        "Centralized formulation data",
        "Faster testing and validation",
        "Smooth digital approvals",
        "Shorter time-to-market",
      ],
      kpis: [
        {
          label: "reduction in time-to-market",
        },
        {
          label: "more recipe iterations tested per year",
        },
      ],
      visualCaption: "Product launch cycle: every phase is shortened by digital collaboration.",
    },
    {
      tag: "Automated reporting",
      title: "Continuous quality monitoring with automated reporting",
      desc: "Automate data capture and generate real-time reports for inspections and management. No more retyping: dashboards build themselves.",
      before: [
        "Manual data entry",
        "Time-consuming reporting",
        "Delayed visibility on quality",
        "Audit preparation under pressure",
      ],
      after: [
        "Automatic data capture",
        "Real-time reports and dashboards",
        "Instant alerts on deviations",
        "Always inspection-ready",
      ],
      kpis: [
        {
          label: "real-time quality visibility",
        },
        {
          label: "less time spent on manual reporting",
        },
      ],
      visualCaption: "CIPA quality dashboard: live indicators, alerts and automatic trends.",
    },
    {
      tag: "Sustainability & resources",
      title: "Lower energy consumption and less waste",
      desc: "Optimize resources and reduce waste for more sustainable operations. CIPA tracks energy, water and material losses in real time and identifies savings opportunities.",
      before: [
        "High energy and water consumption",
        "Excessive material waste",
        "Limited visibility on losses",
        "High waste disposal costs",
      ],
      after: [
        "Real-time energy and resource tracking",
        "Lower consumption and emissions",
        "Less wasted energy and water",
        "More sustainable, more profitable operations",
      ],
      kpis: [
        {
          label: "reduction in waste generated",
        },
        {
          label: "energy consumption per tonne produced",
        },
      ],
      visualCaption: "Energy consumption profile: the curve optimized by CIPA pulls away from the historical baseline.",
    },
  ],

  platform: {
    title: "One platform for quality, traceability and operational excellence.",
    desc: "CIPA unifies people, processes and data to deliver connected insights across the food value chain — food safety, shop-floor visibility, supplier visibility and continuous improvement.",
    features: [
      { label: "Connected data" },
      { label: "Shop-floor visibility" },
      { label: "Supplier visibility" },
      { label: "Food safety assurance" },
    ],
  },

  steps: [
    { title: "1. Connect", desc: "Unify data from systems, equipment and operators." },
    { title: "2. Analyze", desc: "AI and analytics turn data into actionable insights." },
    { title: "3. Act", desc: "Automate workflows and trigger the best action." },
    { title: "4. Improve", desc: "Monitor, measure and optimize continuously." },
    { title: "5. Impact", desc: "Measurable results in quality, efficiency and sustainable growth." },
  ],

  cta: {
    title: "Ready to transform your food operations?",
    text: "See how CIPA by Industry X.0 can help you guarantee food safety, improve efficiency and drive sustainable growth. Our experts will give you a tailored demo based on your lines and your real constraints.",
  },

  visuals: {
    complianceFlow: [
      { title: "Raw material receipt", sub: "Temperature check & supplier certificate" },
      { title: "CCP — Pasteurization 72°C / 15s", sub: "Automatic sensor reading + operator sign-off" },
      { title: "Allergen labeling & release", sub: "Automatic check before shipping" },
    ],
    tablet: {
      orderLabel: "Work order",
      instructionsLabel: "In-line quality checks",
      checks: [
        { label: "Sauce pH: 4.2 (target 4.0–4.4)" },
        { label: "Net weight: 502 g (± 3 g)" },
        { label: "Metal detection: in progress…" },
      ],
      progressLabel: "Batch compliant",
      ctaLabel: "Confirm batch quality check",
    },
    predictiveChart: {
      thresholdLabel: "AI alert threshold",
      annotation: { label: "Maintenance planned here" },
      axisLabels: ["Wk 1", "Wk 12"],
    },
    supplyChain: {
      steps: [
        { title: "Supplier" },
        { title: "Receipt" },
        { title: "Production" },
        { title: "Distribution" },
      ],
      noteLabel: "Simulated recall:",
      noteText: "batch ING-2214 (peanut allergen) is isolated — within 3 minutes CIPA identifies the 2 finished batches and 14 points of sale affected.",
    },
    launchTimeline: [
      { name: "Formulation" },
      { name: "Pilot trials" },
      { name: "Quality validation" },
      { name: "Industrialization" },
    ],
    launchTimelineNote: "Relative phase duration (%)",
    dashboard: {
      tiles: [
        { label: "Compliance rate" },
        { label: "Open deviations" },
        { label: "Allergen alerts" },
        { label: "Customer complaints" },
      ],
      activity: {
        label: "Checks completed / day",
        note: "Auto report — every morning 06:00",
        days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    },
    energyChart: {
      baselineLabel: 'Baseline',
      xLabels: ['T0', 'Month 1', 'Month 3', 'Month 6', 'Month 12'],
    },
  },
}
