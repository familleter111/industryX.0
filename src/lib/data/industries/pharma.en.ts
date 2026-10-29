import type { TextOverlay } from '@/lib/i18n'
import type { IndustryPageData } from '@/lib/data/industries/types'

/**
 * Version anglaise de la page pharmaceutique. Seuls les textes y figurent :
 * les chiffres, icônes et tracés viennent de pharma.ts (voir `overlay`).
 * L'ordre des éléments de chaque liste doit suivre celui du français.
 */
export const pharmaEn: TextOverlay<IndustryPageData> = {
  metaTitle: 'CIPA for the pharmaceutical industry | Industry X.0',
  metaDescription:
    'FDA 21 CFR Part 11 and GMP compliance, electronic batch records, deviations and API traceability: CIPA digitizes pharmaceutical quality and production.',

  heroStatement: {
    title: ['CIPA turns', '', 'shop-floor data', 'into lasting performance'],
  },
  intro:
    'An integrated platform to orchestrate quality, production, maintenance and R&D in regulated environments, and accelerate continuous improvement with AI.',
  hero: { alt: 'CIPA platform in a pharmaceutical cleanroom: quality dashboard, compliance and AI assistance' },
  indicators: ['Unified data', 'Controlled processes', 'Stronger compliance'],

  overview:
    'From bulk active ingredients to final blister packaging, CIPA helps pharmaceutical labs secure regulatory compliance, optimize eBR and speed up batch release.',
  useCasesTitle: 'core pharmaceutical operations',

  coreAccentLabel: 'Pharma operations',
  coreSlides: [
    {
      tag: 'Compliance & standards',
      title: 'Strengthen FDA & GMP regulatory compliance',
      desc: 'Comply with strict FDA (21 CFR Part 11) and GMP guidelines through automated audit trails and complete digital traceability of every step.',
      before: [
        'Slow, risky manual audit preparation',
        'High risk of paper transcription errors',
        'Compliance data fragmented in silos',
        'Audit trail hard to rebuild by hand',
      ],
      after: [
        '100% automated audit trails',
        'Strict compliance with 21 CFR Part 11',
        'Dual approval and electronic signatures',
        'Instant compliance reports and audits',
      ],
      kpis: [{ label: 'constant audit readiness' }, { label: 'reduction in overall compliance cost' }],
      visualCaption: 'FDA & GMP compliance workflow: dual approval and electronic signature in CIPA.',
    },
    {
      tag: 'Electronic batch record',
      title: 'Greater efficiency with the electronic batch record (eBR)',
      desc: 'Eliminate slow, error-prone paper batch records. CIPA lets operators follow guided digital work instructions in the sterile cleanroom and approve steps in real time.',
      before: [
        'Bulky paper batch records that are slow to review',
        'Risk of weighing and excipient dosing errors',
        'No live approval of critical steps',
        'Tedious post-production batch record review',
      ],
      after: [
        'Guided electronic batch records (eBR)',
        'Automatic checks on weighing and blending',
        'Systematic live approval of each step',
        'Faster, simpler batch release',
      ],
      kpis: [{ label: 'reduction in batch release time' }, { label: 'fewer documentation errors' }],
      visualCaption: 'CIPA operator eBR interface: guided formulation instructions on a cleanroom tablet.',
    },
    {
      tag: 'AI & deviations',
      title: 'Advanced analytics and AI for continuous improvement',
      desc: 'Use built-in predictive AI models to continuously monitor the physical parameters of your reactors and anticipate batch quality deviations.',
      before: [
        'Bioreactor temperature or pH drift caught late',
        'Quality deviations detected at the end of the batch',
        'Reactive maintenance causing line stoppages',
        'Costly full-batch rejects at the end of the cycle',
      ],
      after: [
        'AI predictive monitoring of process parameters',
        'Early warning on temperature or pH drift',
        'Predictive maintenance planned outside production',
        'Significantly fewer lost batches',
      ],
      kpis: [{ label: 'reduction in quality deviation rate' }, { label: 'increase in overall production yield' }],
      visualCaption: 'Predictive bioreactor monitoring: thermal drift detected before the batch is affected.',
    },
    {
      tag: 'API traceability',
      title: 'Improve supply chain transparency and traceability',
      desc: 'Keep a complete digital history from receipt of active pharmaceutical ingredients (API) and excipients to final distribution of the drug. Isolate batches in minutes.',
      before: [
        'Complex, manual traceability of active ingredients',
        'Slow reconstruction of batch genealogy',
        'Hard to locate serialized vials',
        'Slow response in the event of a product recall',
      ],
      after: [
        'Instant upstream/downstream batch genealogy',
        'Full traceability of material suppliers',
        'Serialization and UDI codes tracked live',
        'Targeted product recall executed in under 3 min',
      ],
      kpis: [{ label: 'shorter delivery lead times' }, { label: 'lower storage costs' }],
      visualCaption: 'Batch genealogy chain: continuous traceability from active ingredient (API) to packaging.',
    },
  ],

  performanceAccentLabel: 'Sustainable pharma performance',
  performanceSlides: [
    {
      tag: 'Innovation & NPI',
      title: 'Accelerate innovation and optimize R&D transfer',
      desc: 'Ease technology transfer between R&D labs and the production plant. Centralize formulas and standardize recipes to speed up drug industrialization.',
      before: [
        'R&D-to-plant formulation transfer on paper',
        'Complex, undocumented scale-up',
        'Long, costly new drug launches',
        'Errors when adapting formulas for production',
      ],
      after: [
        'Single repository of standardized digital formulas',
        'Seamless collaboration between labs and plants',
        'Documented, automated scale-up',
        'Dramatically shorter time-to-market',
      ],
      kpis: [{ label: 'faster documentation' }, { label: 'shorter time-to-market for launches' }],
      visualCaption: 'NPI timeline: shorter technology transfer from R&D to manufacturing.',
    },
    {
      tag: 'Quality assurance',
      title: 'Ensure product quality and patient safety',
      desc: 'Build in-line quality checks and automate visual inspection to strictly meet product specifications and protect patient safety.',
      before: [
        'Subjective manual visual inspection',
        'Quality incidents detected late',
        'Slow offline quality control',
        'High quarantine and reject costs',
      ],
      after: [
        'Automated visual inspection and reliable in-line checks',
        'Immediate detection of defects and foreign bodies',
        'Live automated quality assurance reports',
        'Patient safety guaranteed for every ampoule',
      ],
      kpis: [{ label: 'fewer finished-product defects' }, { label: 'less time spent on inspections' }],
      visualCaption: 'CIPA batch release dashboard: quality indicators, deviations and live approval.',
    },
    {
      tag: 'Cleanroom HVAC',
      title: 'Optimize sustainability and cut energy use',
      desc: 'Manage the energy consumption of your cleanrooms, especially HVAC (heating, ventilation and air conditioning) systems, for sustainable, eco-responsible production.',
      before: [
        'Cleanrooms air-conditioned non-stop at full power',
        'Little visibility on energy consumption',
        'Utility losses and discharges with no reliable measurement',
        'High industrial carbon footprint',
      ],
      after: [
        'Smart HVAC control outside production hours',
        'Energy consumption tracked room by room',
        'Significantly lower utility costs',
        'Green operations aligned with CSR goals',
      ],
      kpis: [{ label: 'energy consumption on HVAC' }, { label: 'less waste and material rejects' }],
      visualCaption: 'Cleanroom HVAC energy profile: consumption curve optimized by CIPA.',
    },
  ],

  platform: {
    title: 'One platform for excellence, traceability and 21 CFR Part 11 compliance.',
    desc: 'CIPA unifies people, processes and data to deliver connected insights across the pharmaceutical value chain — patient safety, ALCOA+ data integrity, automated compliance audits and real-time eBR.',
    features: [
      { label: 'Connected data' },
      { label: 'Shop-floor visibility' },
      { label: 'Supplier visibility' },
      { label: 'FDA compliance assurance' },
    ],
  },

  steps: [
    { title: '1. Connect', desc: 'Unify equipment and operator data in the cleanroom.' },
    { title: '2. Analyze', desc: 'AI and analytics predict drifts and pinpoint deviations.' },
    { title: '3. Act', desc: 'Automate quality workflows and flag deviations.' },
    { title: '4. Improve', desc: 'Monitor, measure and reduce release times.' },
    { title: '5. Impact', desc: 'Measurable results in eBR release, compliance and HVAC energy.' },
  ],

  cta: {
    title: 'Ready to digitize your pharmaceutical operations?',
    text: 'Join the life-sciences leaders using CIPA to ensure compliance, maximize traceability and optimize yield. Our experts are ready to give you a tailored demo based on your real constraints.',
  },

  visuals: {
    complianceFlow: [
      { title: 'Formula file approval', sub: 'GMP specifications approved' },
      { title: 'Operator & pharmacist dual signature', sub: 'Electronic signature record active' },
      { title: 'FDA audit-trail archiving', sub: 'Report generated & signed per 21 CFR Part 11' },
    ],
    tablet: {
      orderLabel: 'Electronic batch record',
      instructionsLabel: 'Formulation instructions',
      instructions: [
        'Check sterilization of reactor R-101 (SIP)',
        'Add 150 kg of excipient while stirring at 60 RPM',
        'Confirm the 37.5°C temperature set point',
      ],
      progressLabel: 'Blending',
      ctaLabel: 'Confirm weighing/blending step',
    },
    predictiveChart: {
      thresholdLabel: 'pH/Temp alert threshold',
      annotation: { label: 'Bioreactor pH control' },
    },
    supplyChain: {
      steps: [{ title: 'API supplier' }, { title: 'Blending / Granul.' }, { title: 'Serialized packaging' }],
      noteLabel: 'Full traceability:',
      noteText: 'Instant upstream and downstream batch-to-batch genealogy to meet regulatory recall requirements.',
    },
    launchTimeline: [
      { name: 'R&D recipe transfer' },
      { name: 'Pilot validation' },
      { name: 'Industrial trials' },
      { name: 'Registration dossier' },
    ],
    dashboard: {
      tiles: [
        { label: 'Right-first-time release' },
        { label: 'Open deviations' },
        { label: 'Temperature alerts' },
        { label: 'Batch record review' },
      ],
      auditLabel: 'Audit trail report:',
      auditText: 'System locked, dual electronic signature approved and time-stamped on the industrial blockchain.',
    },
    energyChart: {
      baselineLabel: 'Baseline',
      xLabels: ['T0', 'Month 1', 'Month 3', 'Month 6', 'Month 12'],
    },
  },
}
