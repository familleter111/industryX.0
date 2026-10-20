/**
 * Questions fréquentes, partagées par la page /faq et l'assistant de chat
 * (lib/chat/knowledge.ts) : une réponse corrigée ici l'est partout.
 */

export type FaqEntry = { question: string; answer: string }

export const FAQ_ENTRIES: Record<'fr' | 'en', FaqEntry[]> = {
  fr: [
    {
      question: 'Combien de temps dure une démonstration CIPA ?',
      answer:
        'La démonstration CIPA dure en moyenne 45 minutes. Elle est entièrement guidée par un expert Industry X.0 et adaptée à votre secteur, vos enjeux et vos priorités. Vous repartez avec une vision claire de la valeur que CIPA peut apporter à vos opérations industrielles.',
    },
    {
      question: 'CIPA s’intègre-t-elle à nos outils existants ?',
      answer:
        'Oui. CIPA se connecte à votre écosystème existant — ERP, MES, GMAO, outils de BI et bases de données métier — pour éviter les doubles saisies et conserver une source de vérité unique. Les échanges se font par API ou par connecteurs dédiés, définis pendant la phase de cadrage.',
    },
    {
      question: 'Proposez-vous un accompagnement au déploiement ?',
      answer:
        'Oui. Un expert dédié vous accompagne du cadrage initial jusqu’à la pleine maîtrise de la plateforme : paramétrage des processus, formation des équipes terrain, conduite du changement et suivi des premiers résultats.',
    },
    {
      question: 'Quels secteurs industriels sont couverts ?',
      answer:
        'CIPA est déployée dans la pharmaceutique, l’agroalimentaire et les boissons, la cosmétique et les dispositifs médicaux, l’automobile et les composants, l’électronique et le câblage, ainsi que le packaging et la plasturgie. La plateforme s’adapte aux référentiels et exigences propres à chaque secteur.',
    },
    {
      question: 'Combien de temps avant un premier déploiement pilote ?',
      answer:
        'Un premier périmètre pilote est généralement opérationnel en quelques semaines. Nous démarrons sur un processus à forte valeur — audits, inspections, non-conformités ou contrôles production — afin de démontrer l’impact rapidement avant d’étendre progressivement à l’ensemble du site.',
    },
  ],
  en: [
    {
      question: 'How long does a CIPA demo take?',
      answer:
        'A CIPA demo lasts about 45 minutes on average. It is fully guided by an Industry X.0 expert and tailored to your industry, your challenges and your priorities. You leave with a clear view of the value CIPA can bring to your industrial operations.',
    },
    {
      question: 'Does CIPA integrate with our existing tools?',
      answer:
        'Yes. CIPA connects to your existing ecosystem — ERP, MES, CMMS, BI tools and business databases — to avoid double entry and keep a single source of truth. Data is exchanged through APIs or dedicated connectors, defined during the scoping phase.',
    },
    {
      question: 'Do you offer deployment support?',
      answer:
        'Yes. A dedicated expert supports you from initial scoping until you fully master the platform: process configuration, training for shop-floor teams, change management and follow-up of the first results.',
    },
    {
      question: 'Which industries are covered?',
      answer:
        'CIPA is deployed in pharmaceuticals, food and beverage, cosmetics and medical devices, automotive and components, electronics and wiring, and packaging and plastics. The platform adapts to the standards and requirements specific to each industry.',
    },
    {
      question: 'How long until a first pilot deployment?',
      answer:
        'A first pilot scope is usually up and running within a few weeks. We start with a high-value process — audits, inspections, non-conformities or production checks — to show the impact quickly before gradually extending to the whole site.',
    },
  ],
}
