import type { TextOverlay } from '@/lib/i18n'
import type { IndustryPageData } from '@/lib/data/industries/types'

/**
 * Version anglaise de la page automobile. Seuls les textes y figurent : les
 * chiffres, icônes et tracés viennent de automotive.ts (voir `overlay`).
 * L'ordre des éléments de chaque liste doit suivre celui du français.
 */
export const automotiveEn: TextOverlay<IndustryPageData> = {
  metaTitle: 'CIPA for the automotive & components industry | Industry X.0',
  metaDescription:
    'IATF 16949 compliance, component-to-VIN traceability, predictive maintenance on the lines: CIPA digitizes quality and production for automotive suppliers and manufacturers.',

  headline: 'automotive & components',
  intro:
    'The automotive industry operates in an environment where safety, emissions and quality are scrutinized at every step. CIPA provides a complete digital platform to manage compliance, production performance and component traceability, from supplier to finished vehicle.',
  hero: { alt: 'Industry X.0 automotive production' },
  heroBadge: { label: 'Quality standards', value: 'IATF 16949 standardized' },

  results: [
    {
      label: 'Improved operational efficiency',
      desc: 'Digitized production and supply chain for optimal coordination.',
    },
    {
      label: 'Fewer compliance errors',
      desc: 'Automated documentation and shop-floor regulatory tracking.',
    },
    {
      label: 'Lower defect rates',
      desc: 'Continuous quality control and automated reporting on the lines.',
    },
  ],

  overview:
    'From critical components to final vehicle assembly, CIPA helps suppliers and manufacturers secure regulatory compliance, make production more reliable and speed up parts traceability.',
  useCasesTitle: 'core automotive operations',

  coreAccentLabel: 'Automotive operations',
  coreSlides: [
    {
      tag: 'Compliance & regulation',
      title: 'Strengthen automotive regulatory compliance',
      desc: 'The automotive industry faces strict regulations on safety, emissions and quality. Compliance matters not only for meeting the law but also for consumer trust. CIPA automates compliance documentation and tracking, reducing the risk of non-compliance and the penalties that come with it.',
      before: [
        'Manual compliance tracking with a 12% error rate',
        'High risk of product recalls and legal disputes',
        'Regulatory documentation scattered across departments',
        'Long, uncertain audit preparation',
      ],
      after: [
        'End-to-end automated compliance documentation and tracking',
        '85% fewer compliance errors',
        '40% fewer regulation-related non-conformities',
        'Audit costs down 30% thanks to instant reports',
      ],
      kpis: [
        { label: 'reduction in compliance errors' },
        { label: 'savings on compliance audit costs' },
      ],
      visualCaption: 'Automotive compliance workflow: dual quality check and audit-trail archiving in CIPA.',
    },
    {
      tag: 'Digitization & efficiency',
      title: 'Boost efficiency through digitization',
      desc: 'The complexity of automotive manufacturing calls for precise coordination between supply chain, scheduling and production. CIPA digitizes these processes for real-time data access, better planning and optimized use of resources.',
      before: [
        'Paper processes causing 18% production inefficiency',
        'Slow-to-react inventory and supply chain management',
        'Higher production costs and lead times',
        'Manual scheduling that leads to planning errors',
      ],
      after: [
        'Fully digitized production and logistics flows',
        '25 to 35% gain in operational efficiency',
        'Real-time, data-driven decisions',
        'Less waste and fewer unplanned stoppages',
      ],
      kpis: [{ label: 'improvement in operational efficiency' }],
      visualCaption: 'CIPA digital work order: guided instructions and real-time line tracking.',
    },
    {
      tag: 'Predictive analytics & AI',
      title: 'Advanced analytics and AI for continuous improvement',
      desc: 'In a constantly evolving automotive industry, data analytics and AI are essential to optimize operations and product quality. CIPA uses production data and customer feedback to drive continuous improvement.',
      before: [
        'Unexpected equipment failures causing 7 to 10% production losses',
        'Reactive maintenance affecting delivery times',
        'Customer satisfaction hurt by delays',
        'Poorly optimized resource allocation',
      ],
      after: [
        'AI-driven predictive maintenance',
        '40 to 50% less machine downtime',
        'Better resource allocation and improved OEE',
        'Drifts anticipated before they affect quality',
      ],
      kpis: [
        { label: 'reduction in equipment downtime' },
        { label: 'savings on maintenance costs' },
      ],
      visualCaption: 'Predictive assembly-line monitoring: drift detected before it affects quality.',
    },
    {
      tag: 'Component traceability',
      title: 'Improve supply chain transparency',
      desc: 'Supply chain transparency is vital in the automotive sector to guarantee quality and efficiency. CIPA improves visibility with real-time tracking of components and materials, so you can react quickly to disruptions and keep risks under control.',
      before: [
        'Lack of visibility raising storage costs by 20%',
        'Higher risk of counterfeit or non-compliant parts',
        'Component traceability that is hard to rebuild',
        'Limited ability to react to supply disruptions',
      ],
      after: [
        'Real-time component tracking, from supplier to VIN',
        'Inventory costs cut by 25%',
        'Authenticity and compliance guaranteed across the chain',
        'Supplier risks detected quickly',
      ],
      kpis: [
        { label: 'lower risk of counterfeit parts' },
        { label: 'reduction in inventory costs' },
      ],
      visualCaption: 'Component traceability chain: from supplier to assembly to finished vehicle (VIN).',
    },
  ],

  performanceAccentLabel: 'Sustainable automotive performance',
  performanceSlides: [
    {
      tag: 'Innovation & R&D',
      title: 'Accelerate innovation with R&D data',
      desc: 'In a highly competitive automotive industry, innovation is key to success. CIPA streamlines R&D with data-driven insights and closer collaboration between teams, speeding up product development cycles.',
      before: [
        'R&D data processing adding 15 to 20% to lead times',
        'Siloed collaboration between engineering teams',
        'Delayed market entry for new models',
        'Hard to build on field feedback',
      ],
      after: [
        'Single data repository and collaborative tools',
        'Time-to-market cut by 30 to 40%',
        'Greater competitiveness on new models',
        'Faster, documented innovation cycles',
      ],
      kpis: [{ label: 'shorter time-to-market for new models' }],
      visualCaption: 'Vehicle R&D timeline: shorter lead time from design to homologation.',
    },
    {
      tag: 'Quality & safety',
      title: 'Guarantee product quality and safety',
      desc: 'Maintaining high quality standards is paramount in automotive, where defects can lead to recalls and safety issues. CIPA strengthens quality assurance with continuous monitoring and automated reporting.',
      before: [
        'Manual quality checks with 8 to 9% defect rates',
        'High rework and product recall costs',
        'Late detection of non-conformities',
        'Tedious, unconsolidated quality reporting',
      ],
      after: [
        'Real-time quality monitoring and automated reporting',
        'Defect rates cut by 50%',
        '20% fewer recalls and less rework',
        'Stronger product safety at every step',
      ],
      kpis: [
        { label: 'reduction in defect rates' },
        { label: 'savings from less rework' },
      ],
      visualCaption: 'CIPA line quality dashboard: first-time right, non-conformities and live alerts.',
    },
    {
      tag: 'Sustainability & energy',
      title: 'Optimize sustainability and environmental impact',
      desc: 'Sustainability is becoming a central issue in the automotive industry, driven by regulatory requirements and consumer expectations. CIPA helps optimize resource use and reduce waste, in line with CSR goals.',
      before: [
        'Energy-intensive, poorly optimized production processes',
        'Up to 12% of operating costs due to waste',
        'Little visibility on consumption per line',
        'An environmental footprint that is hard to manage',
      ],
      after: [
        'Fine-grained control of energy use in production',
        'Energy consumption down 20 to 25%',
        'Lower operating costs and carbon footprint',
        'Stronger alignment with sustainability goals',
      ],
      kpis: [{ label: 'reduction in energy consumption and costs' }],
      visualCaption: 'Production line energy profile: consumption curve optimized by CIPA.',
    },
  ],

  platform: {
    title: 'One platform for quality, traceability and IATF 16949 compliance.',
    desc: 'CIPA unifies people, processes and data across the automotive value chain — IATF 16949 compliance, component-to-VIN traceability, predictive line maintenance and automated audits.',
    features: [
      { label: 'Connected data' },
      { label: 'Shop-floor visibility' },
      { label: 'Supplier visibility' },
      { label: 'IATF compliance assurance' },
    ],
  },

  steps: [
    { title: '1. Connect', desc: 'Unify machine, operator and supplier data across the lines.' },
    { title: '2. Analyze', desc: 'AI and analytics predict drifts and pinpoint quality gaps.' },
    { title: '3. Act', desc: 'Automate quality workflows and trigger corrective actions.' },
    { title: '4. Improve', desc: 'Monitor, measure and reduce downtime and defects.' },
    { title: '5. Impact', desc: 'Measurable results in compliance, quality and energy efficiency.' },
  ],

  cta: {
    title: 'Ready to digitize your automotive operations?',
    text: 'Join the suppliers and manufacturers using CIPA to ensure IATF compliance, maximize component-to-VIN traceability and optimize industrial performance. Our experts are ready to give you a tailored demo based on your real constraints.',
  },

  visuals: {
    complianceFlow: [
      { title: 'Quality specification sign-off', sub: 'Safety & emissions specifications approved' },
      { title: 'Operator & quality double check', sub: 'Inspection record active on the line' },
      { title: 'IATF 16949 audit-trail archiving', sub: 'Report generated and time-stamped automatically' },
    ],
    tablet: {
      orderLabel: 'Digital work order',
      instructionsLabel: 'Assembly instructions',
      instructions: [
        'Check the tightening torque at station 12 (chassis mounting)',
        'Verify the sub-assembly reference before assembly',
        'Confirm the component scan and station time stamp',
      ],
      progressLabel: 'Progress',
      ctaLabel: 'Confirm assembly step',
    },
    predictiveChart: {
      thresholdLabel: 'Vibration/torque alert threshold',
      annotation: { label: 'Predictive maintenance triggered' },
    },
    supplyChain: {
      steps: [
        { title: 'Component supplier' },
        { title: 'Sub-assembly' },
        { title: 'Final inspection / VIN' },
      ],
      noteLabel: 'Full traceability:',
      noteText: 'Instant component-batch-VIN genealogy to meet recall and warranty requirements.',
    },
    launchTimeline: [
      { name: 'Design & specifications' },
      { name: 'Prototype & validation' },
      { name: 'Industrial trials' },
      { name: 'Homologation & launch' },
    ],
    dashboard: {
      tiles: [
        { label: 'First time right' },
        { label: 'Open non-conformities' },
        { label: 'Line quality alerts' },
        { label: 'Inspection review' },
      ],
      auditLabel: 'Audit trail report:',
      auditText: 'Quality checks locked, operator sign-off time-stamped and IATF 16949 compliant.',
    },
    energyChart: {
      baselineLabel: 'Baseline',
      xLabels: ['T0', 'Month 1', 'Month 3', 'Month 6', 'Month 12'],
    },
  },
}
