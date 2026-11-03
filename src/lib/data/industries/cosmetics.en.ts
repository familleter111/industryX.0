import type { TextOverlay } from '@/lib/i18n'
import type { IndustryPageData } from '@/lib/data/industries/types'

export const cosmeticsEn: TextOverlay<IndustryPageData> = {
  metaTitle: 'Quality software for cosmetics and medical devices',
  metaDescription:
    'ISO 22716 and ISO 13485 compliance, cleanroom work, UDI traceability and quality checks: CIPA digitizes cosmetics and medical device production. Book a demo.',

  headline: 'cosmetics & medical device industry',
  intro:
    'Manufacturing medical devices and cosmetics demands operational rigor and full traceability. CIPA provides a complete digital platform to standardize your sterile cleanroom operations.',
  hero: { alt: 'CIPA platform in a cosmetics cleanroom: quality dashboard, compliance and AI assistance' },
  indicators: ['Operational efficiency', 'Constant audit readiness', 'Lower in-line scrap rate'],

  overview:
    'From raw syringe or implant components to the final sterile seal, CIPA helps manufacturers guarantee ISO and FDA compliance, speed up release and manage efficiency.',
  useCasesTitle: 'cosmetics & medical device operations',

  coreAccentLabel: 'Cosmetics & MD operations',
  coreSlides: [
    {
      tag: 'ISO & FDA compliance',
      title: 'Strengthen ISO 13485 & 22716 regulatory compliance',
      desc: 'Meet the strict requirements of ISO 13485 (medical devices) and ISO 22716 (cosmetics GMP). Follow FDA requirements (21 CFR Part 820) by centralizing and tracing execution data.',
      before: [
        'Complex manual preparation for ISO/FDA audits',
        'High risk of missing paper documentation',
        'Disconnected tracking of non-conformities and CAPA',
        'Audit trail hard to rebuild on the spot',
      ],
      after: [
        'Instant readiness for ISO and FDA audits',
        'Complete, tamper-proof digital audit trail',
        'Automated management of deviations and CAPA plans',
        'Documentation that meets medical-grade standards',
      ],
      kpis: [{ label: 'audit readiness' }, { label: 'reduction in preparation time' }],
      visualCaption: 'Regulatory compliance workflow: ISO 13485 and ISO 22716 requirements validated in CIPA.',
    },
    {
      tag: 'Cleanroom digitization',
      title: 'Greater efficiency by digitizing the shop floor',
      desc: 'Digitize your work instructions and self-inspection checklists. Guide cleanroom operators step by step for precision device assembly or cosmetic dosing.',
      before: [
        'Cumbersome paper batch records in the sterile area',
        'Slow manual entry prone to dosing errors',
        'No error-proofing when scanning components',
        'Operator downtime caused by paper reviews',
      ],
      after: [
        'Guided instructions on cleanroom tablets',
        'Real-time scanning and checking of sterile components',
        'Recorded tank cleaning verifications',
        'Higher productivity and faster release cycle',
      ],
      kpis: [{ label: 'increase in operational efficiency' }, { label: 'reduction in batch release cycle' }],
      visualCaption: 'CIPA operator interface: guided sterile assembly checklist on an industrial tablet.',
    },
    {
      tag: 'AI & maintenance',
      title: 'Advanced analytics and AI for continuous improvement',
      desc: 'Use AI to monitor physical drift in your vacuum cosmetic mixers or medical extrusion lines, anticipate breakdowns and prevent micro-stoppages.',
      before: [
        'Undetected drift in extrusion pressure or speed',
        'Frequent undocumented micro-stoppages on the lines',
        'Reactive maintenance causing delivery delays',
        'High waste of premium raw materials',
      ],
      after: [
        'AI predictive monitoring of extrusion and mixing parameters',
        'Immediate alert on vibration or overheating',
        'Maintenance planned at the right time',
        'Optimized process stability and yield',
      ],
      kpis: [{ label: 'fewer unplanned line stoppages' }, { label: 'increase in production yield' }],
      visualCaption: 'Predictive extruder monitoring: AI alert on die pressure before an anomaly.',
    },
    {
      tag: 'Traceability & UDI',
      title: 'Improve supply chain transparency and traceability',
      desc: 'Keep full batch-by-batch traceability from raw polymer or cosmetic material all the way to serialized UDI (Unique Device Identifier) labeling.',
      before: [
        'Fragmented, manual genealogy tracking',
        'Slow reconstruction of part genealogy',
        'Risk of errors on medical UDI labels',
        'Slow handling of device batch recalls',
      ],
      after: [
        'Instant upstream and downstream batch genealogy',
        'Automatic UDI check and scan',
        'Reliable raw-material supplier traceability',
        'Fast, targeted product recall management',
      ],
      kpis: [{ label: 'shorter delivery lead times' }, { label: 'lower storage costs' }],
      visualCaption: 'UDI batch genealogy: continuous traceability from raw material to packaged device.',
    },
  ],

  performanceAccentLabel: 'Sustainable performance',
  performanceTitle: 'product quality, innovation and sustainable performance',
  performanceSlides: [
    {
      tag: 'Innovation & NPI',
      title: 'Accelerate innovation and optimize R&D transfer',
      desc: 'Ease the industrial transfer of your cosmetic formulas or medical device designs to mass production lines by centralizing your recipes.',
      before: [
        'R&D-to-engineering recipe transfer on paper',
        'Scale-up that is hard to document',
        'Slow, rigid new product introduction (NPI)',
        'Errors when adapting formulations for production',
      ],
      after: [
        'Centralized repository of standard digital recipes',
        'Live collaboration between R&D, quality and engineering',
        'Scale-up documented step by step',
        'Dramatically shorter time-to-market',
      ],
      kpis: [{ label: 'shorter time-to-market for launches' }, { label: 'more formulations tested and industrialized per year' }],
      visualCaption: 'NPI timeline: faster transfer cycle from R&D design to production.',
    },
    {
      tag: 'Quality & reliability',
      title: 'Ensure product quality and reliability',
      desc: 'Deliver zero-defect finished products with in-line visual inspections and automated leak-test capture, protecting your customers and your brand.',
      before: [
        'Subjective manual quality inspections',
        'Seal or label defects discovered late',
        'High device rework and scrap costs',
        'Hard to consolidate non-conformity reports',
      ],
      after: [
        'Automated in-process visual inspections',
        'Immediate detection of bottle seal defects',
        'Scrap reduced at the source with direct alerts',
        'Quality dashboards consolidated instantly',
      ],
      kpis: [{ label: 'reduction in in-line defect rate' }, { label: 'lower cost of quality' }],
      visualCaption: 'CIPA quality dashboard: Pareto of scrap causes and live compliance rate.',
    },
    {
      tag: 'Sustainability',
      title: 'Sustainability and lower environmental impact',
      desc: 'Track and optimize resource use, especially purified water and energy, while minimizing material waste in your packaging workshops.',
      before: [
        'High purified-water waste during cleaning (CIP)',
        'No continuous measurement of utility consumption',
        'Cutting/packaging waste poorly assessed',
        'High environmental cost of production',
      ],
      after: [
        'Optimized cleaning cycles and purified-water use',
        'Real-time view of energy consumption',
        'Significantly less waste produced',
        'Green factory practices in line with CSR charters',
      ],
      kpis: [{ label: 'measured reduction in waste generated' }, { label: 'reduction in electricity consumption' }],
      visualCaption: 'CIPA sustainability tracking: purified-water and electricity savings profile over one year.',
    },
  ],

  platform: {
    title: 'One platform for quality, traceability and ISO compliance.',
    desc: 'CIPA unifies people, processes and data to deliver connected insights across the value chain — ISO 13485 and ISO 22716 GMP compliance, sterile cleanroom eBR, UDI serialization and automated audits.',
    features: [
      { label: 'Connected data' },
      { label: 'Shop-floor visibility' },
      { label: 'Supplier visibility' },
      { label: 'ISO compliance assurance' },
    ],
  },

  steps: [
    { title: '1. Connect', desc: 'Unify equipment and operator data in the cleanroom.' },
    { title: '2. Analyze', desc: 'AI and analytics predict drifts and pinpoint scrap.' },
    { title: '3. Act', desc: 'Automate quality workflows and manage deviations.' },
    { title: '4. Improve', desc: 'Monitor, measure and optimize cycle times.' },
    { title: '5. Impact', desc: 'Measurable results in batch release, compliance and energy.' },
  ],

  cta: {
    title: 'Ready to digitize your cosmetics & MD operations?',
    text: 'Join the industry leaders using CIPA to ensure compliance, maximize traceability and optimize OEE. Our experts are ready to give you a tailored demo based on your real constraints.',
  },

  visuals: {
    complianceFlow: [
      { title: 'DMR file approval', sub: 'ISO 13485 control plan approved' },
      { title: 'Cleanroom line inspection', sub: 'Sterile pouch seal validation in progress' },
      { title: 'Dual signature & release', sub: 'Batch release report generated' },
    ],
    tablet: {
      orderLabel: 'Work order',
      instructionsLabel: 'Assembly instructions',
      instructions: [
        'Check tank / hopper cleaning',
        'Scan the sterile component UDI code',
        'Start the assembly / filling cycle',
      ],
      progressLabel: 'Mixing',
      ctaLabel: 'Confirm production step',
    },
    predictiveChart: {
      thresholdLabel: 'Die pressure alert threshold',
      annotation: { label: 'Die pressure control' },
    },
    supplyChain: {
      steps: [{ title: 'Polymer / Active' }, { title: 'Mixing / Extrus.' }, { title: 'UDI label' }],
      noteLabel: 'UDI genealogy:',
      noteText: 'Full traceability through every mixing and cutting step, making product recall response simpler.',
    },
    launchTimeline: [
      { name: 'Compatibility tests' },
      { name: 'Mold prototype' },
      { name: 'Design file' },
      { name: 'Validation run' },
    ],
    dashboard: {
      tiles: [
        { label: 'Line scrap rate' },
        { label: 'Open deviations' },
        { label: 'Cleaning efficiency' },
        { label: 'Cost of quality', trend: 'Overall' },
      ],
      auditLabel: 'AOI vision checks:',
      auditText: 'Automatic in-line inspections enabled, instant detection of labeling or sealing defects.',
    },
    energyChart: {
      baselineLabel: 'Baseline',
      xLabels: ['T0', 'Month 1', 'Month 3', 'Month 6', 'Month 12'],
    },
  },
}
