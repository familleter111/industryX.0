import type { TextOverlay } from '@/lib/i18n'
import type { Guide } from '@/lib/data/guides'

/**
 * Version anglaise des guides, indexée par slug. Même ordre de blocs que le
 * français : un bloc ajouté d'un côté doit l'être de l'autre (voir
 * `overlay`, qui associe les blocs par position).
 */
export const GUIDES_EN: Record<string, TextOverlay<Guide>> = {
  'digitaliser-audits-terrain': {
    title: 'Digitizing shop-floor audits: a guide to moving from paper to mobile',
    excerpt:
      'Inconsistent grids, retyping, late reports: how to structure mobile audits that produce usable data as soon as the visit ends.',
    author: 'Industry X.0 team',
    image: { alt: 'CIPA screens for a mobile internal audit, a safety tour and time-stamped traceability' },
    related: { label: 'Discover CIPA Shop floor' },
    body: [
      {
        text: 'In many plants, the shop-floor audit is still a two-step exercise: findings are noted on paper or in a spreadsheet, then retyped, formatted and sent out. In between, the information loses accuracy, freshness and sometimes completeness. Digitizing the audit does not mean swapping paper for a tablet: it means making the data accurate and usable at the very moment it is collected.',
      },
      { text: 'Signs of an audit that is not pulling its weight' },
      {
        items: [
          'Each auditor uses their own version of the grid, with their own criteria.',
          'Findings are retyped after the audit, with transcription errors.',
          'The report goes out several days after the visit, when the deviations have already changed.',
          'A finding raised in one audit is forgotten in the next.',
        ],
      },
      {
        text: 'Taken one by one, none of these is dramatic. Together, they make any reliable comparison impossible — from one audit, area or site to the next.',
      },
      { text: '1. Standardize the grid before choosing the tool' },
      {
        text: 'The first task is about method. Gather the existing grids, identify the common criteria and give each one a clear definition, a response type (compliant / non-compliant, measured value, choice from a list) and, where relevant, a tolerance threshold. A shared, versioned grid is what makes two auditors reach the same result in the same situation.',
      },
      {
        text: 'You can tell a good grid by this: two different auditors, in the same area, on the same day, reach the same verdict.',
      },
      { text: '2. Capture the evidence when the finding is made' },
      {
        text: 'On mobile, every checkpoint can carry its evidence: a photo, a measurement, a comment. Linked to the item checked, time-stamped and located, that evidence avoids photos scattered across personal phones and after-the-fact debates about what was actually observed.',
      },
      {
        text: 'Also think about areas with poor network coverage: an offline mode, with automatic sync when the connection returns, is essential in most workshops.',
      },
      { text: '3. Turn every finding into an action' },
      {
        text: 'An audit is only worth what it triggers. Every non-conformity raised must be able to become an action, with an owner and a due date, tracked until it is closed. This direct link between the shop floor and quality handling is what stops the same findings from coming back audit after audit.',
      },
      { text: '4. Generate the report without writing it' },
      {
        text: 'When data entry is structured, the report is no longer a document to write: it is generated as soon as the audit ends, with the findings, the evidence and the open actions. It can be sent immediately to the managers concerned, then archived for future audits.',
      },
      { text: 'Where to start' },
      {
        items: [
          'Pick a frequent, well-understood type of audit (5S, safety, hygiene).',
          'Align its grid with the auditors who use it.',
          'Deploy on one area or line for a few weeks.',
          'Measure the time saved on writing and the faster response to deviations, then extend.',
        ],
      },
    ],
  },
  'non-conformites-capa': {
    title: 'Non-conformities and CAPA: structuring deviation handling through to closure',
    excerpt:
      'Reporting, criticality, escalation, root-cause analysis and effectiveness checks: the steps of a deviation process that turns incidents into lasting progress.',
    author: 'Industry X.0 team',
    image: { alt: 'CIPA screens of a non-conformity workflow, from report to CAPA plan' },
    related: { label: 'Discover CIPA Quality' },
    body: [
      {
        text: 'A badly handled non-conformity costs twice: once when it happens, and again when it happens again. Yet deviation handling is often split between emails, a shared spreadsheet and verbal exchanges. Here is how to structure a single process, from detection to effectiveness check.',
      },
      { text: '1. Make reporting immediate' },
      {
        text: 'The later a deviation is reported, the harder it is to analyze. The operator who spots it must be able to report it from their workstation, in a few seconds, with a photo and a description. A simple report is a report that actually gets made.',
      },
      { text: '2. Rate criticality with shared rules' },
      {
        text: 'Assessing severity case by case leads to uneven handling. Define a few criticality levels with explicit criteria (product, safety, customer or regulatory impact), and attach a process to each one: who is notified, how fast, and who decides.',
      },
      {
        text: 'Escalation must not depend on people’s goodwill: it must follow automatically from criticality.',
      },
      { text: '3. Look for the cause, not the culprit' },
      {
        text: 'A corrective action without root-cause analysis treats the symptom. Always document the analysis — 5 whys, Ishikawa diagram or any method that suits your context — and keep it with the deviation: that is what will let you recognize a recurring problem.',
      },
      { text: '4. Tell corrective from preventive' },
      {
        items: [
          'Remedial action: deal with the deviation found (isolate, rework, scrap).',
          'Corrective action: remove the cause so the deviation does not happen again.',
          'Preventive action: extend the fix to similar situations before they drift.',
        ],
      },
      {
        text: 'Every action has an owner and a due date. A missed due date should trigger an alert, not be discovered at the next review.',
      },
      { text: '5. Check effectiveness before closing' },
      {
        text: 'This is the step most often forgotten. A CAPA is only closed once you have checked, after a set period, that the deviation has not come back. Without that check, the closure rate flatters the indicators without guaranteeing any progress.',
      },
      { text: '6. Make use of the history' },
      {
        text: 'When every deviation follows the same process, deviations become comparable. Recurring ones stand out, action plans can be prioritized and lessons learned are shared across teams and sites. That is where non-conformity handling becomes a driver of continuous improvement.',
      },
    ],
  },
  'indicateurs-qualite-temps-reel': {
    title: 'Managing quality in real time: which indicators, and how to make them reliable',
    excerpt:
      'From KPIs consolidated by hand in Excel to dashboards fed by the shop floor: choosing the right indicators and making sure they tell the truth.',
    author: 'Industry X.0 team',
    image: { alt: 'CIPA quality dashboard with indicators, an AI-detected weak signal and integrations' },
    related: { label: 'Discover CIPA Performance' },
    body: [
      {
        text: 'An indicator that arrives several days late describes the past, not the current situation. And two departments showing different figures for the same indicator spend the meeting arguing about the source. Managing in real time first means solving these two problems: data freshness and data reliability.',
      },
      { text: 'Few indicators, each tied to a decision' },
      {
        text: 'A useful dashboard fits on one screen. For every indicator you keep, ask a simple question: what decision do we take when it drifts, and who takes it? If there is no answer, the indicator is decoration.',
      },
      {
        items: [
          'Audit and inspection compliance rate, by area and by line.',
          'Number of open deviations, by criticality and by age.',
          'Average time to handle non-conformities.',
          'Corrective actions overdue against their due date.',
          'Recurring deviations: same causes, same areas, same products.',
        ],
      },
      { text: 'Enter it once, at the source' },
      {
        text: 'Manual consolidation is the leading cause of wrong or late indicators. When checks, audits and deviations are entered directly on the shop floor in a single repository, indicators are calculated with no retyping or copy-pasting, and everyone sees the same version of the figures.',
      },
      {
        text: 'A reliable indicator is not one that is recalculated more often: it is one that no longer depends on any retyping.',
      },
      { text: 'Watch trends, not just values' },
      {
        text: 'A single value can wrongly reassure or alarm. Track trends by site, line and team: a slow drift is often more telling than a one-off spike. This is also where operational AI comes in, spotting weak signals and inconsistencies before they become incidents.',
      },
      { text: 'Connect rather than duplicate' },
      {
        text: 'Quality data takes on its full meaning when it joins the rest of the information system: ERP, MES, CMMS or BI tool. Defining these exchanges during scoping avoids manual exports and guarantees a single source of truth.',
      },
    ],
  },
  'reussir-pilote-digitalisation': {
    title: 'Running a successful industrial digitization pilot in a few weeks',
    excerpt:
      'Start small, prove the value, then extend: how to choose the right pilot scope, bring shop-floor teams on board and decide what comes next based on facts.',
    author: 'Industry X.0 team',
    image: { alt: 'Shop-floor teams using CIPA on a tablet' },
    related: { label: 'Book a demo' },
    body: [
      {
        text: 'Digitization projects that fail often have one thing in common: they tried to cover everything at once. A pilot approach, by contrast, shows value quickly on a controlled scope before scaling up with confidence.',
      },
      { text: '1. Choose a high-value, well-bounded process' },
      {
        text: 'The right candidate is a frequent process that is painful today and whose result can be measured: audits, inspections, non-conformity management or production checks. Avoid rare processes or ones that depend too much on other ongoing projects.',
      },
      { text: '2. Set success criteria before you start' },
      {
        items: [
          'Time spent per audit or per check, before and after.',
          'Time between detecting a deviation and handling it.',
          'Share of findings turned into tracked actions.',
          'Buy-in from shop-floor users, measured by actual usage.',
        ],
      },
      {
        text: 'Criteria set after the fact always end up confirming what you wanted to show. Set them beforehand.',
      },
      { text: '3. Involve the shop floor from configuration onward' },
      {
        text: 'The operators and auditors who will use the tool every day should help build the checklists. It is the best guarantee that the tool fits the reality of the workshop, and the best way to make it their tool rather than one imposed on them.',
      },
      { text: '4. Support, train, adjust' },
      {
        text: 'A pilot is not a passive test. Plan a short training at the start, regular check-ins with users and the ability to adjust grids and processes quickly. The first pieces of feedback are the most valuable.',
      },
      { text: '5. Decide what comes next based on facts' },
      {
        text: 'At the end of the pilot, compare the results with the criteria set at the start. If they are met, the rollout is planned process by process, site by site, reusing what has been built. If they are not, you know exactly why — and that is a result too.',
      },
    ],
  },
}
