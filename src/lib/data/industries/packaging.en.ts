import type { TextOverlay } from '@/lib/i18n'
import type { IndustryPageData } from '@/lib/data/industries/types'

/**
 * Version anglaise de la page packaging. Seuls les textes y figurent : les
 * chiffres, icônes et tracés viennent de packaging.ts (voir `overlay`).
 * L'ordre des éléments de chaque liste doit suivre celui du français.
 */
export const packagingEn: TextOverlay<IndustryPageData> = {
  metaTitle: "CIPA for packaging & plastics | Industry X.0",
  metaDescription:
    "Food-contact compliance, injection and extrusion lines, resin traceability and predictive maintenance: CIPA digitizes packaging and plastics.",

  headline: "packaging & plastics industry",
  intro:
    "Across plastic injection, extrusion and packaging lines, the packaging and plastics industry has to combine high output, quality requirements and regulatory pressure. CIPA offers a complete digital platform to digitize production, secure compliance and manage industrial performance end to end.",
  hero: { alt: "CIPA platform in a plastics workshop: quality dashboard, injection, extrusion and AI assistance" },
  indicators: ["Fewer compliance errors", "Lower storage costs", "Lower energy consumption"],

  overview:
    "From raw resin to packaged finished product, CIPA helps packaging and plastics manufacturers secure regulatory compliance, make injection/extrusion lines more reliable and speed up material traceability.",
  useCasesTitle: "packaging & plastics operations",

  coreAccentLabel: "Packaging & plastics operations",
  coreSlides: [
    {
      tag: "Compliance & regulation",
      title: "Strengthen regulatory compliance",
      desc: "The packaging and plastics industries face strict regulatory requirements: safety, food contact, environmental standards and quality. A non-compliance can lead to penalties, recalls and reputational damage. CIPA automates compliance processes to guarantee reliable documentation and constant regulatory compliance.",
      before: [
        "Manual compliance tracking with a 20% error rate",
        "Frequent, long, time-consuming audits",
        "Quality documentation scattered across lines",
        "Risk of non-compliance with food-contact standards",
      ],
      after: [
        "Fully automated compliance processes",
        "90% fewer compliance errors",
        "50% fewer regulatory non-conformities",
        "Audit costs down 40%",
      ],
      kpis: [
        {
          label: "reduction in compliance errors",
        },
        {
          label: "savings on audit costs",
        },
      ],
      visualCaption: "Packaging compliance workflow: dual quality check and audit-trail archiving in CIPA.",
    },
    {
      tag: "Digitization & planning",
      title: "Boost efficiency by digitizing production",
      desc: "Digital transformation is essential for modern plastics processing, enabling real-time data access and streamlined operations. CIPA digitizes the scheduling of injection, extrusion and packaging lines, reducing material waste and optimizing resource allocation.",
      before: [
        "Paper processes causing 25% scheduling inefficiency",
        "Little visibility on mold and line utilization",
        "Slow, manual production adjustments",
        "Resources poorly spread across lines",
      ],
      after: [
        "Fully digitized scheduling and resources",
        "30 to 40% gain in operational efficiency",
        "Real-time adjustments based on demand",
        "Better use of molds and packaging lines",
      ],
      kpis: [
        {
          label: "improvement in operational efficiency",
        },
      ],
      visualCaption: "CIPA digital work order: guided instructions and real-time injection line tracking.",
    },
    {
      tag: "Predictive analytics & AI",
      title: "Advanced analytics and AI for continuous improvement",
      desc: "In a competitive plastics environment, using data is essential for continuous improvement. CIPA uses advanced analytics and AI to monitor the performance of injection presses and extrusion lines, optimize processes and strengthen quality control.",
      before: [
        "Unexpected equipment failures causing 5 to 10% production losses",
        "Line stoppages disrupting delivery schedules",
        "Costly reactive maintenance",
        "Late quality control on molded parts",
      ],
      after: [
        "Predictive maintenance of presses and extrusion lines",
        "Downtime cut by 40 to 60%",
        "Optimized production efficiency",
        "Early detection of quality drift",
      ],
      kpis: [
        {
          label: "reduction in downtime",
        },
        {
          label: "savings on maintenance costs",
        },
      ],
      visualCaption: "Predictive injection press monitoring: pressure/temperature drift detected before scrap.",
    },
    {
      tag: "Material & stock traceability",
      title: "Improve supply chain transparency",
      desc: "Supply chain visibility is crucial to control costs, risks and delivery lead times. CIPA strengthens transparency with real-time tracking of raw materials (resins, pellets) and components, for a responsive, resilient supply chain.",
      before: [
        "Lack of visibility raising storage costs by 30%",
        "Higher risk of resin supply shortages",
        "Unreliable material batch tracking",
        "Frequent delivery delays",
      ],
      after: [
        "Real-time tracking of raw materials and stock",
        "Inventory costs cut by 30%",
        "20% fewer supply chain disruptions",
        "Reliable deliveries that meet quality standards",
      ],
      kpis: [
        {
          label: "reduction in inventory costs",
        },
        {
          label: "fewer supply chain disruptions",
        },
      ],
      visualCaption: "Material traceability chain: from supplier resin to packaged finished product.",
    },
  ],

  performanceAccentLabel: "Sustainable packaging & plastics performance",
  performanceTitle: "product quality, innovation and sustainable performance",
  performanceSlides: [
    {
      tag: "Innovation & R&D",
      title: "Accelerate product innovation",
      desc: "In a constantly evolving packaging market, agility and collaboration speed up product development and adaptation to market needs. CIPA streamlines design data and mold trial management to shorten innovation cycles.",
      before: [
        "Development data processing adding 15 to 20% to lead times",
        "Poorly documented mold trials and validations",
        "Delayed market entry for new packaging",
        "Limited collaboration between design office and production",
      ],
      after: [
        "Optimized, centralized data management",
        "Time-to-market cut by 30 to 50%",
        "Faster, traced innovation cycles",
        "Seamless collaboration between design and production lines",
      ],
      kpis: [
        {
          label: "shorter time-to-market for new products",
        },
      ],
      visualCaption: "Packaging development timeline: shorter lead time from design to commercial launch.",
    },
    {
      tag: "Quality & reliability",
      title: "Guarantee product quality and reliability",
      desc: "Maintaining high quality and reliability is crucial in packaging and plastics. CIPA strengthens quality assurance with continuous monitoring and automated reporting, reducing defects and improving customer satisfaction.",
      before: [
        "Manual quality checks with 5 to 10% defect rates",
        "Frequent rework and customer complaints",
        "Late detection of dimensional non-conformities",
        "Tedious, poorly consolidated quality reporting",
      ],
      after: [
        "Real-time quality monitoring and automated reporting",
        "Defect rates cut by 50 to 70%",
        "30% fewer complaints and warranty costs",
        "Stronger product reliability on every line",
      ],
      kpis: [
        {
          label: "reduction in defect rates",
        },
        {
          label: "savings on warranty costs",
        },
      ],
      visualCaption: "CIPA line quality dashboard: compliant parts, non-conformities and live alerts.",
    },
    {
      tag: "Sustainability & energy",
      title: "Optimize resource use and reduce waste",
      desc: "Sustainability is a growing challenge for packaging and plastics. CIPA helps organizations optimize resource use, reduce plastic waste and align operations with environmental goals, while lowering operating costs.",
      before: [
        "Poorly optimized resource management on injection lines",
        "Up to 10 to 15% extra costs from energy and waste",
        "Little visibility on consumption per line",
        "High material scrap rate",
      ],
      after: [
        "Fine-grained control of energy and material use",
        "Energy consumption down 20 to 30%",
        "Lower operating costs and less material scrap",
        "Greater credibility on sustainability commitments",
      ],
      kpis: [
        {
          label: "reduction in energy consumption and costs",
        },
      ],
      visualCaption: "Injection/extrusion line energy profile: consumption curve optimized by CIPA.",
    },
  ],

  platform: {
    title: "One platform for quality, traceability and regulatory compliance.",
    desc: "CIPA unifies people, processes and data across the packaging & plastics value chain — food-contact and environmental compliance, material-to-finished-product traceability, predictive press maintenance and automated audits.",
    features: [
      { label: "Connected data" },
      { label: "Shop-floor visibility" },
      { label: "Supplier visibility" },
      { label: "Regulatory compliance assurance" },
    ],
  },

  steps: [
    { title: "1. Connect", desc: "Unify data from presses, extrusion lines and operators." },
    { title: "2. Analyze", desc: "AI and analytics predict process drift and material scrap." },
    { title: "3. Act", desc: "Automate quality workflows and corrective actions on the line." },
    { title: "4. Improve", desc: "Monitor, measure and reduce downtime and scrap." },
    { title: "5. Impact", desc: "Measurable results in compliance, quality and energy efficiency." },
  ],

  cta: {
    title: "Ready to digitize your packaging & plastics operations?",
    text: "Join the packaging and plastics manufacturers using CIPA to secure compliance, make their lines more reliable and cut energy and material costs. Our experts are ready to give you a tailored demo based on your real constraints.",
  },

  visuals: {
    complianceFlow: [
      { title: "Food-contact specification approval", sub: "Quality & environmental requirements approved" },
      { title: "Operator & quality double check", sub: "Inspection record active on the line" },
      { title: "Regulatory audit-trail archiving", sub: "Report generated and time-stamped automatically" },
    ],
    tablet: {
      orderLabel: "Digital work order",
      instructionsLabel: "Injection press instructions",
      instructions: [
        "Check the injection nozzle temperature (station 4)",
        "Check the molded part weight before packaging",
        "Confirm the resin batch scan and station time stamp",
      ],
      progressLabel: "Progress",
      ctaLabel: "Confirm molding/packaging step",
    },
    predictiveChart: {
      thresholdLabel: "Pressure/temperature alert threshold",
      annotation: { label: "Predictive press maintenance triggered" },
    },
    supplyChain: {
      steps: [
        { title: "Resin supplier" },
        { title: "Injection / Extrusion" },
        { title: "Final inspection / Packaging" },
      ],
      noteLabel: "Full traceability:",
      noteText: "Instant resin-batch-to-finished-product genealogy to meet quality and recall requirements.",
    },
    launchTimeline: [
      { name: "Packaging design" },
      { name: "Mold trials & validation" },
      { name: "Industrial pre-series" },
      { name: "Commercial launch" },
    ],
    dashboard: {
      tiles: [
        { label: "Compliant parts" },
        { label: "Open non-conformities" },
        { label: "Line quality alerts" },
        { label: "Inspection review" },
      ],
      auditLabel: "Audit trail report:",
      auditText: "Quality checks locked, operator sign-off time-stamped and compliant with packaging standards.",
    },
    energyChart: {
      baselineLabel: 'Baseline',
      xLabels: ['T0', 'Month 1', 'Month 3', 'Month 6', 'Month 12'],
    },
  },
}
