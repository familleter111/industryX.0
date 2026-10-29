import type { TextOverlay } from '@/lib/i18n'
import type { IndustryPageData } from '@/lib/data/industries/types'

/**
 * Version anglaise de la page electronics. Seuls les textes y figurent : les
 * chiffres, icônes et tracés viennent de electronics.ts (voir `overlay`).
 * L'ordre des éléments de chaque liste doit suivre celui du français.
 */
export const electronicsEn: TextOverlay<IndustryPageData> = {
  metaTitle: "CIPA for electronics & wiring | Industry X.0",
  metaDescription:
    "IPC-A-610 compliance, SMT traceability from reels to boards, wiring checks and OEE: CIPA digitizes electronics workshops.",

  headlinePrefix: '',
  headline: "electronics & wiring industry",
  intro:
    "CIPA offers a complete platform built specifically for the electronics and wiring industry to digitize, orchestrate and optimize key processes, strengthen compliance, boost efficiency and reduce scrap.",
  hero: { alt: "CIPA platform in an electronics workshop: quality dashboard, IPC-A-610 compliance and AI assistance" },
  indicators: ["Overall equipment effectiveness", "Guaranteed regulatory compliance", "Fewer defects & scrap"],

  overview:
    "From raw electronic components to finished printed circuit board assemblies, CIPA helps manufacturers make production more reliable, guarantee soldering standards and ensure full traceability.",
  useCasesTitle: "electronics and wiring operations",

  coreAccentLabel: "SMT operations",
  coreSlides: [
    {
      tag: "Compliance & standards",
      title: "Strengthen regulatory compliance and standards",
      desc: "Secure your compliance and ensure full traceability of your components. CIPA provides a centralized system to record inspection reports, document quality checks and track compliance indicators against demanding standards such as IPC-A-610.",
      before: [
        "Slow manual audit preparation",
        "High risk of transcription errors",
        "Traceability data scattered on paper",
        "Hard to prove batch compliance",
      ],
      after: [
        "Automated audit trails and reports",
        "Constant quality audit readiness",
        "Strict compliance with IPC-A-610 standards",
        "Secure, centralized documentation",
      ],
      kpis: [
        {
          label: "reduction in audit preparation time",
        },
        {
          label: "fewer non-compliance incidents",
        },
      ],
      visualCaption: "IPC-A-610 quality validation workflow: every compliance step is validated in CIPA.",
    },
    {
      tag: "Digitization & efficiency",
      title: "Greater efficiency by digitizing the shop floor",
      desc: "Replace slow manual procedures and paper reports with automated digital workflows. Track machine status in real time, manage operator tasks and collect data on the shop floor.",
      before: [
        "Bulky paper production records",
        "Slow manual data entry",
        "Limited visibility on line progress",
        "Long cycle times due to physical checks",
      ],
      after: [
        "Guided digital work instructions",
        "Real-time tracking of SMT progress",
        "Automatic, reliable data collection",
        "Shorter cycle times and higher productivity",
      ],
      kpis: [
        {
          label: "increase in operational productivity",
        },
        {
          label: "increase in overall equipment effectiveness (OEE)",
        },
      ],
      visualCaption: "CIPA operator interface: interactive wiring instructions and SMT step validation.",
    },
    {
      tag: "Analytics & AI",
      title: "Advanced analytics and AI for continuous improvement",
      desc: "Use your operational data to identify bottlenecks and anticipate quality drift. With built-in predictive AI models, make your processes more consistent and maximize yield.",
      before: [
        "Undetected drift in SMT soldering parameters",
        "Root-cause analysis only after an incident",
        "Corrective maintenance only",
        "High scrap rate at the end of the line",
      ],
      after: [
        "Real-time detection of process drift",
        "Predictive maintenance of SMT nozzles and ovens",
        "AI decision support for management",
        "Maximized first-pass yield",
      ],
      kpis: [
        {
          label: "reduction in scrap rate on your lines",
        },
        {
          label: "increase in overall production yield",
        },
      ],
      visualCaption: "Predictive thermal drift analysis: AI alert before any reflow defect.",
    },
    {
      tag: "SMT traceability",
      title: "Improve supply chain transparency and traceability",
      desc: "Trace every component from receipt of raw materials (solder paste batch, resistor reels) to final board assembly. Quickly isolate defective parts to limit the impact.",
      before: [
        "Real-time genealogy tracking impossible",
        "Tedious search for the defective component batch",
        "High risk of mixing reels on the feeders",
        "Slow response to a supplier recall",
      ],
      after: [
        "Instant upstream/downstream genealogy",
        "Built-in error-proof reel check (feeder setup)",
        "Targeted isolation of defective components in 3 min",
        "Full transparency toward end customers",
      ],
      kpis: [
        {
          label: "reduction in logistics processing times",
        },
        {
          label: "fewer supplier-related anomalies",
        },
      ],
      visualCaption: "Circuit board genealogy map: from SMT reel batch to finished product.",
    },
  ],

  performanceAccentLabel: "Sustainable SMT performance",
  performanceTitle: "product quality, innovation and sustainable performance",
  performanceSlides: [
    {
      tag: "Co-design & NPI",
      title: "Drive innovation by optimizing R&D and NPI",
      desc: "Speed up your product development cycles and simplify new product introduction (NPI). Centralize R&D lessons learned and enable effective two-way collaboration between engineering and production.",
      before: [
        "Manual transfer from CAD design to production",
        "Design changes not passed on to the shop floor",
        "Long, costly new product launches",
        "Assembly errors on the first prototypes",
      ],
      after: [
        "Direct integration of electronic CAD",
        "Seamless collaboration between R&D and engineering",
        "Fast time-to-market for new products",
        "Processes standardized from the first batch",
      ],
      kpis: [
        {
          label: "shorter time-to-market for launches",
        },
        {
          label: "more prototype introductions validated per year",
        },
      ],
      visualCaption: "NPI timeline: a dramatically shorter cycle from CAD design to mass production.",
    },
    {
      tag: "Product quality",
      title: "Ensure product quality and automatic inspection",
      desc: "Guarantee consistent quality with built-in inspection sheets and in-line validation points. CIPA structures your workstation audits and quality reports for a 100% reliable product.",
      before: [
        "Subjective manual optical inspections",
        "Defects detected only during final tests",
        "High cost of reworking soldered boards",
        "Slow, decentralized quality reports",
      ],
      after: [
        "Systematic validation of SMT checkpoints",
        "Defects detected at the source (paste, soldering, AOI)",
        "Drastically fewer final quality defects",
        "Automated, instant quality dashboards",
      ],
      kpis: [
        {
          label: "reduction in quality defects and scrap",
        },
        {
          label: "lower cost of quality (rework/repair)",
        },
      ],
      visualCaption: "CIPA quality dashboard: live tracking of defect rates and Pareto of SMT causes.",
    },
    {
      tag: "Sustainability",
      title: "Sustainability and lower environmental impact",
      desc: "Track your energy consumption and optimize resource use in your board and wiring workshops. CIPA tracks reflow oven consumption and identifies energy savings opportunities.",
      before: [
        "Reflow ovens running non-stop outside production",
        "Little visibility on electricity consumption",
        "High carbon footprint with no levers for action",
        "Solder and metal scrap poorly recovered",
      ],
      after: [
        "Smart scheduling of oven standby",
        "Real-time energy consumption tracking",
        "Significantly lower emissions and costs",
        "Green production practices that add value",
      ],
      kpis: [
        {
          label: "measured reduction in energy consumption",
        },
        {
          label: "less waste and metal scrap",
        },
      ],
      visualCaption: "Reflow oven energy tracking: profile optimized with CIPA.",
    },
  ],

  platform: {
    title: "One platform for IPC compliance, traceability and operational excellence.",
    desc: "CIPA unifies people, processes and data to deliver connected insights across the electronics assembly value chain — component reel traceability, visibility on SMT feeder loading and automated compliance audits.",
    features: [
      { label: "Connected data" },
      { label: "Shop-floor visibility" },
      { label: "Supplier visibility" },
      { label: "Standards compliance assurance" },
    ],
  },

  steps: [
    { title: "1. Connect", desc: "Unify data from SMT systems, equipment and operators." },
    { title: "2. Analyze", desc: "AI and analytics turn data into production insights." },
    { title: "3. Act", desc: "Automate quality workflows and flag drifts." },
    { title: "4. Improve", desc: "Monitor, measure and reduce SMT scrap." },
    { title: "5. Impact", desc: "Measurable results in SMT OEE, compliance and energy savings." },
  ],

  cta: {
    title: "Ready to digitize your electronics workshop?",
    text: "Join the industry leaders using CIPA to ensure compliance, maximize traceability and optimize OEE. Our experts are ready to give you a tailored demo based on your real constraints.",
  },

  visuals: {
    complianceFlow: [
      { title: "Component batch audit", sub: "Humidity & PCB condition check" },
      { title: "SMT soldering inspection entry", sub: "Visual solder (reflow) check in progress" },
      { title: "Declaration of conformity", sub: "Batch report generated & archived in the cloud" },
    ],
    tablet: {
      orderLabel: "Work order",
      instructionsLabel: "Wiring instructions",
      instructions: [
        "Connect ribbon cable J2 to the main port",
        "Secure the harness with cable ties",
        "Check resistance at test point TP-4",
      ],
      progressLabel: "Progress",
      ctaLabel: "Confirm wiring step",
    },
    predictiveChart: {
      thresholdLabel: "SMT nozzle alert threshold",
      annotation: { label: "Nozzle cleaning scheduled" },
      axisLabels: ["Batch 1", "Batch 20"],
    },
    supplyChain: {
      steps: [
        { title: "Reel A2", id: "Supplier" },
        { title: "SMT area", id: "SMT machine" },
        { title: "Report", id: "ATE test" },
      ],
      noteLabel: "Full traceability:",
      noteText: "Every board is genealogically linked to the solder paste batch and the SMT feeder reel.",
    },
    launchTimeline: [
      { name: "CAD import" },
      { name: "SMT prototype" },
      { name: "Workstation audits" },
      { name: "Pilot run" },
    ],
    dashboard: {
      tiles: [
        { label: "Overall SMT OEE" },
        { label: "PPM defects" },
        { label: "SMT nozzle drift" },
        { label: "Rework time" },
      ],
      activity: {
        label: "Components placed / hour (x1000)",
      },
    },
    energyChart: {
      baselineLabel: 'Baseline',
      xLabels: ['T0', 'Month 1', 'Month 3', 'Month 6', 'Month 12'],
    },
  },
}
