/**
 * Réponses de prospection validées par l'équipe, utilisées par l'assistant IA
 * (lib/chat/knowledge.ts) comme réponses de référence.
 *
 * FICHIER GÉNÉRÉ par scripts/gen-chatbot-base.mjs depuis
 * Industry_X0_Base_Chatbot_Prospection.xlsx : corriger le classeur, puis
 * relancer `npm run gen:chatbot-base`.
 */

export type ChatbotAnswer = { theme: string; question: string; answer: string }

export const CHATBOT_BASE: ChatbotAnswer[] = [
  {
    theme: "Positionnement",
    question: "Qui est Industry X.0 ?",
    answer:
      "Industry X.0 accompagne les industriels dans la digitalisation de leurs opérations et l'exploitation de leurs données. Nous combinons expertise métier, plateforme CIPA et solutions d'intelligence artificielle. Quel est votre secteur d'activité ?",
  },
  {
    theme: "Positionnement",
    question: "Quelle est votre mission ?",
    answer:
      "Notre objectif est de rendre les opérations industrielles plus visibles, traçables et pilotables, depuis la collecte des données terrain jusqu'aux décisions. Nous commençons par identifier un problème mesurable à résoudre.",
  },
  {
    theme: "Positionnement",
    question: "Qu'est-ce que CIPA ?",
    answer:
      "CIPA est notre plateforme d'intelligence opérationnelle : elle centralise les données terrain, coordonne les processus qualité et opérationnels, puis les transforme en indicateurs et actions. Souhaitez-vous découvrir un cas d'usage lié à vos activités ?",
  },
  {
    theme: "Positionnement",
    question: "Quelle différence entre Industry X.0 et CIPA ?",
    answer:
      "Industry X.0 est l'entreprise qui accompagne les projets de transformation. CIPA est la plateforme qui permet de digitaliser et piloter une partie des processus industriels. Nous pouvons aussi étudier des besoins spécifiques d'IA et d'intégration.",
  },
  {
    theme: "Positionnement",
    question: "Depuis quand existez-vous ?",
    answer:
      "Industry X.0 a été créée en 2019 et développe des solutions destinées aux réalités du terrain industriel. Nous privilégions une démarche progressive, du besoin métier au déploiement.",
  },
  {
    theme: "Positionnement",
    question: "Quels problèmes traitez-vous en priorité ?",
    answer:
      "Nous intervenons notamment lorsque les audits, contrôles, non-conformités, actions ou KPI sont dispersés entre papier, Excel et e-mails. Le premier échange sert à identifier le processus le plus pénalisant.",
  },
  {
    theme: "Positionnement",
    question: "Travaillez-vous avec des PME ?",
    answer:
      "Oui, notre approche convient aussi aux PME industrielles. Un premier périmètre limité permet d'évaluer la valeur avant d'étendre la solution. Combien de sites ou de lignes souhaitez-vous couvrir ?",
  },
  {
    theme: "Positionnement",
    question: "Avez-vous des experts métier ou seulement des développeurs ?",
    answer:
      "Notre approche associe connaissance des opérations industrielles et compétences digitales. Nous cherchons à traduire vos standards, workflows et indicateurs en usages concrets, sans imposer une méthode déconnectée du terrain.",
  },
  {
    theme: "Positionnement",
    question: "Où êtes-vous basés ?",
    answer:
      "Industry X.0 est basée à Tunis et accompagne des projets industriels en Tunisie et à l'international. Pour étudier votre projet, décrivez votre pays, votre secteur et le besoin prioritaire sur https://www.industryx0.pro/contact.",
  },
  {
    theme: "Problèmes industriels",
    question: "Nous travaillons encore avec des fichiers Excel",
    answer:
      "CIPA peut remplacer des tableaux dispersés par des formulaires, un suivi centralisé et des indicateurs partagés. Le bon point de départ est un processus avec beaucoup de ressaisie ou des données difficiles à consolider. Lequel vous prend le plus de temps ?",
  },
  {
    theme: "Problèmes industriels",
    question: "Nos audits prennent trop de temps",
    answer:
      "CIPA aide à préparer les grilles, planifier les audits, collecter les constats sur mobile et suivre les actions issues des écarts. Nous pouvons illustrer le parcours complet sur une checklist représentative de votre usine.",
  },
  {
    theme: "Problèmes industriels",
    question: "Nos actions correctives restent ouvertes trop longtemps",
    answer:
      "L'enjeu est de voir qui fait quoi, pour quand, avec quel statut et quelle preuve de clôture. CIPA permet de structurer le suivi des actions et leur validation. Souhaitez-vous commencer par les CAPA ou l'ensemble des plans d'action ?",
  },
  {
    theme: "Problèmes industriels",
    question: "Nous n'avons pas une vision temps réel du terrain",
    answer:
      "Lorsque l'information remonte par mails ou fichiers, les décisions arrivent souvent trop tard. CIPA centralise les relevés et indicateurs pour améliorer la visibilité par zone, équipe et période. Quels KPI vous manquent aujourd'hui ?",
  },
  {
    theme: "Problèmes industriels",
    question: "Nous subissons des non-conformités récurrentes",
    answer:
      "Le premier levier consiste à mieux qualifier les écarts, documenter leurs causes et vérifier l'efficacité des actions. CIPA permet de relier la déclaration terrain au traitement qualité. Une démonstration peut suivre un cas réel de récurrence.",
  },
  {
    theme: "Problèmes industriels",
    question: "Nous perdons du temps à préparer les réunions SQCDP",
    answer:
      "Des données standardisées et des tableaux de bord partagés peuvent limiter les consolidations manuelles et recentrer les réunions sur les décisions et les actions. Quels indicateurs utilisez-vous dans vos routines quotidiennes ?",
  },
  {
    theme: "Problèmes industriels",
    question: "Nos contrôles papier génèrent des erreurs",
    answer:
      "La saisie numérique au point d'utilisation réduit les transferts manuels et associe les résultats au bon poste, lot, équipement ou utilisateur selon le processus. Nous pouvons examiner une fiche papier représentative.",
  },
  {
    theme: "Problèmes industriels",
    question: "Nous manquons de traçabilité sur les lots",
    answer:
      "CIPA peut organiser les données de contrôle et les validations autour du contexte de production, avec historique et identification des intervenants. Pour définir le périmètre, faut-il couvrir les contrôles, le dossier de lot ou les deux ?",
  },
  {
    theme: "Problèmes industriels",
    question: "Les écarts ne remontent pas assez vite",
    answer:
      "En remplaçant les signalements informels par des formulaires et workflows identifiés, les équipes voient plus facilement les écarts et leurs responsables. Quel délai sépare aujourd'hui la détection d'un problème et son traitement ?",
  },
  {
    theme: "Problèmes industriels",
    question: "La production et la qualité utilisent des données différentes",
    answer:
      "Un référentiel partagé permet de relier contrôles, déviations, actions et indicateurs sans multiplier les versions d'un même fichier. Nous pouvons cartographier vos flux d'information avant de proposer un périmètre pilote.",
  },
  {
    theme: "Problèmes industriels",
    question: "Nous avons trop de tâches administratives",
    answer:
      "Nous cherchons d'abord les opérations répétitives sans valeur ajoutée : ressaisie, diffusion de rapports, relances et consolidation de KPI. Un atelier de cadrage permet d'estimer le gain potentiel sur un cas concret.",
  },
  {
    theme: "Problèmes industriels",
    question: "Nous voulons digitaliser nos routines managériales",
    answer:
      "CIPA peut structurer les tournées, checklists et routines par zone et équipe, avec suivi des constats et escalade selon le workflow retenu. Parlez-vous de routines quotidiennes, hebdomadaires ou mensuelles ?",
  },
  {
    theme: "Problèmes industriels",
    question: "Nous avons du mal à suivre les interventions de maintenance",
    answer:
      "La centralisation des demandes et de leur historique peut améliorer la visibilité sur les interventions, les équipements et les actions en attente. Décrivez votre système actuel et nous étudierons le périmètre de maintenance pertinent.",
  },
  {
    theme: "Problèmes industriels",
    question: "Les réclamations clients arrivent par plusieurs canaux",
    answer:
      "Un traitement structuré peut regrouper les réclamations, les investigations et les actions associées dans un même processus qualité. Nous pouvons montrer comment suivre le dossier depuis sa réception jusqu'à sa clôture.",
  },
  {
    theme: "Problèmes industriels",
    question: "Nous voulons commencer par un seul problème",
    answer:
      "C'est souvent la meilleure approche. Choisissons un processus, un site ou une équipe, définissons un indicateur avant/après et évaluons les résultats du pilote avant toute généralisation.",
  },
  {
    theme: "Solutions et usages",
    question: "Digitalisation des audits internes",
    answer:
      "CIPA couvre la préparation, l'exécution et le suivi des audits avec grilles standardisées, constats, preuves et actions. Nous pouvons prendre votre modèle d'audit actuel comme base d'une démonstration de 45 minutes.",
  },
  {
    theme: "Solutions et usages",
    question: "Tournées terrain et inspections",
    answer:
      "Les équipes peuvent renseigner leurs contrôles sur mobile ou tablette, rattacher des photos et enregistrer le contexte de la visite. Souhaitez-vous digitaliser les tournées qualité, sécurité ou production ?",
  },
  {
    theme: "Solutions et usages",
    question: "Checklists et formulaires personnalisés",
    answer:
      "CIPA permet de paramétrer des formulaires et checklists selon vos critères, seuils et processus. Vous pouvez nous transmettre un exemple non confidentiel pour étudier sa transposition dans la plateforme.",
  },
  {
    theme: "Solutions et usages",
    question: "Planification et rappels des contrôles",
    answer:
      "Les audits et contrôles peuvent être planifiés et suivis dans un environnement commun. Lors d'une démo, nous pouvons examiner vos fréquences, responsabilités et règles d'escalade.",
  },
  {
    theme: "Solutions et usages",
    question: "Gestion des déviations et non-conformités",
    answer:
      "CIPA permet de déclarer, classifier et suivre les écarts en conservant leur origine et leur historique. Un cas concret peut être présenté depuis l'observation terrain jusqu'à la clôture.",
  },
  {
    theme: "Solutions et usages",
    question: "Gestion CAPA et plans d'action",
    answer:
      "Les actions correctives et préventives peuvent être affectées, suivies et documentées au sein d'un workflow qualité. Les règles de validation et de vérification d'efficacité sont à définir selon votre processus.",
  },
  {
    theme: "Solutions et usages",
    question: "Analyse de causes et problem solving",
    answer:
      "Nous pouvons structurer l'investigation, les causes identifiées et les actions retenues autour d'un dossier unique. Les méthodes 5 Pourquoi, Ishikawa ou 8D peuvent être étudiées selon vos pratiques.",
  },
  {
    theme: "Solutions et usages",
    question: "Gestion des réclamations qualité",
    answer:
      "CIPA peut contribuer à centraliser les réclamations, l'investigation et les mesures correctives. Nous proposons de partir de votre circuit actuel de traitement pour qualifier les adaptations nécessaires.",
  },
  {
    theme: "Solutions et usages",
    question: "Gestion des changements",
    answer:
      "Les changements peuvent être pilotés via des formulaires, responsabilités, étapes d'analyse d'impact et approbations. Le workflow précis est adapté au processus de change control du client.",
  },
  {
    theme: "Solutions et usages",
    question: "Suivi des contrôles de production",
    answer:
      "CIPA peut digitaliser les relevés et autocontrôles réalisés au poste, avec rattachement au contexte de production. Souhaitez-vous couvrir une ligne, un atelier ou plusieurs sites ?",
  },
  {
    theme: "Solutions et usages",
    question: "Dossier de lot électronique et EBR",
    answer:
      "Nous pouvons étudier la digitalisation des enregistrements de lot, des contrôles et des validations. Le périmètre EBR, les interfaces et les exigences de validation doivent être cadrés avant toute proposition.",
  },
  {
    theme: "Solutions et usages",
    question: "Tableaux de bord et indicateurs qualité",
    answer:
      "CIPA consolide notamment les audits, déviations et actions dans des tableaux de bord consultables selon les périodes et périmètres. Nous pouvons examiner les indicateurs que vous suivez déjà.",
  },
  {
    theme: "Solutions et usages",
    question: "Reporting et export des données",
    answer:
      "Les données collectées peuvent alimenter des rapports et exports. Le format exact, les destinataires et le niveau d'automatisation doivent être confirmés pendant le cadrage.",
  },
  {
    theme: "Solutions et usages",
    question: "Mode hors ligne en atelier",
    answer:
      "Le site CIPA présente un mode hors ligne pour les usages terrain, avec synchronisation au retour du réseau. Nous pouvons vérifier ensemble les scénarios à couvrir et les contraintes de vos terminaux.",
  },
  {
    theme: "Solutions et usages",
    question: "Signatures et validations numériques",
    answer:
      "CIPA propose des validations associées aux rôles et un historique des actions. Pour un usage réglementé, la configuration et les preuves de conformité doivent être évaluées selon vos exigences.",
  },
  {
    theme: "Solutions et usages",
    question: "Plateforme unique ou modules ciblés",
    answer:
      "Il n'est pas nécessaire de tout digitaliser simultanément. Nous pouvons définir un premier usage prioritaire puis construire une trajectoire d'extension, en tenant compte de vos systèmes existants.",
  },
  {
    theme: "Valeur et ROI",
    question: "Comment justifier le projet auprès de la direction ?",
    answer:
      "Le dossier de décision doit relier un problème métier à un gain mesurable : temps de traitement, ressaisie, retard de CAPA, préparation d'audits ou visibilité des KPI. Nous pouvons cadrer un pilote avec indicateurs avant/après.",
  },
  {
    theme: "Valeur et ROI",
    question: "Comment calculer le retour sur investissement ?",
    answer:
      "Le ROI dépend du temps gagné, des coûts évités, du périmètre déployé et du coût total du projet. Une estimation fiable nécessite vos volumes, temps actuels et processus visés ; nous pouvons construire ce calcul pendant le cadrage.",
  },
  {
    theme: "Valeur et ROI",
    question: "Quels KPI suivre pendant un pilote ?",
    answer:
      "Les KPI dépendent du cas d'usage. Pour les audits : temps de préparation et délai de clôture ; pour les CAPA : actions en retard et taux de récurrence ; pour les contrôles : taux de complétude et ressaisies supprimées.",
  },
  {
    theme: "Valeur et ROI",
    question: "Quand verrai-je des résultats ?",
    answer:
      "Le délai dépend du processus choisi, de la disponibilité des données et du niveau d'adaptation. Nous recommandons des jalons vérifiables plutôt qu'une promesse de gain ou de délai uniforme.",
  },
  {
    theme: "Valeur et ROI",
    question: "Pouvez-vous garantir un pourcentage de gain ?",
    answer:
      "Nous ne promettons pas un pourcentage universel. Les résultats doivent être évalués sur votre contexte et mesurés avec des indicateurs validés avant et après le déploiement.",
  },
  {
    theme: "Valeur et ROI",
    question: "Quels gains pour la qualité ?",
    answer:
      "Les bénéfices possibles sont une meilleure traçabilité des écarts, des responsabilités plus claires et une préparation d'audit plus structurée. L'ampleur dépend de votre maturité et de votre organisation actuelle.",
  },
  {
    theme: "Valeur et ROI",
    question: "Quels gains pour la production ?",
    answer:
      "L'intérêt porte souvent sur la fiabilisation des relevés, la remontée plus rapide des anomalies et la réduction du temps de consolidation. Quels contrôles et KPI occupent aujourd'hui vos équipes ?",
  },
  {
    theme: "Valeur et ROI",
    question: "Comment comparer CIPA avec le coût du statu quo ?",
    answer:
      "Il faut aussi quantifier le coût de la non-digitalisation : ressaisies, informations perdues, actions en retard et retards de décision. Nous pouvons vous aider à choisir trois postes de coûts mesurables.",
  },
  {
    theme: "Valeur et ROI",
    question: "Peut-on mesurer la valeur sans grand projet ?",
    answer:
      "Oui. Un pilote limité à une équipe, un processus ou une zone peut fournir les premières données de valeur. Il convient de définir le point de départ, l'objectif et les critères de réussite dès le cadrage.",
  },
  {
    theme: "Prix et investissement",
    question: "Combien coûte CIPA ?",
    answer:
      "Le budget dépend des processus, du nombre de sites, des intégrations, du mode d'hébergement et de l'accompagnement nécessaire. Nous pouvons établir une estimation après quelques informations sur votre périmètre. Quel usage souhaitez-vous lancer en premier ?",
  },
  {
    theme: "Prix et investissement",
    question: "Avez-vous un prix standard par utilisateur ?",
    answer:
      "Le modèle commercial dépend de la configuration et de l'offre retenue. Plutôt que de vous donner un tarif inadapté, nous pouvons préciser les modalités applicables à votre nombre d'utilisateurs et à vos sites.",
  },
  {
    theme: "Prix et investissement",
    question: "Proposez-vous un abonnement SaaS ?",
    answer:
      "Une approche cloud par abonnement peut être étudiée selon la solution et les contraintes du client. Nous clarifions dans la proposition les frais de démarrage, les services inclus et les conditions récurrentes.",
  },
  {
    theme: "Prix et investissement",
    question: "Proposez-vous une installation sur site ?",
    answer:
      "Un déploiement on-premise peut être étudié lorsque les contraintes informatiques ou réglementaires l'exigent. La faisabilité, l'architecture et les conditions commerciales sont à confirmer avec notre équipe technique.",
  },
  {
    theme: "Prix et investissement",
    question: "Y a-t-il des frais de configuration ?",
    answer:
      "La reprise de vos formulaires, la configuration des workflows, les intégrations et la formation peuvent faire partie de l'effort initial. Une proposition détaillée distinguera les travaux de démarrage et les coûts récurrents.",
  },
  {
    theme: "Prix et investissement",
    question: "Quel budget pour un pilote ?",
    answer:
      "Un pilote peut être dimensionné sur un périmètre restreint afin de limiter l'investissement initial. Le chiffrage dépend des fonctions nécessaires, des données disponibles et des critères de succès.",
  },
  {
    theme: "Prix et investissement",
    question: "Quels sont les coûts de maintenance ?",
    answer:
      "Ils dépendent du mode de déploiement et des niveaux de service convenus. La proposition commerciale précise les prestations incluses, les responsabilités et les coûts associés.",
  },
  {
    theme: "Prix et investissement",
    question: "Comment obtenir une proposition commerciale ?",
    answer:
      "Décrivez votre secteur, le processus concerné, le nombre de sites et vos principales contraintes. Un expert pourra organiser un échange de cadrage et préparer une offre adaptée : https://www.industryx0.pro/contact.",
  },
  {
    theme: "Déploiement",
    question: "Comment se déroule un déploiement CIPA ?",
    answer:
      "Nous commençons par qualifier le besoin, puis définissons les workflows, formulaires, rôles et intégrations du périmètre retenu. Après configuration et tests viennent la formation, le démarrage et le suivi.",
  },
  {
    theme: "Déploiement",
    question: "Combien de temps dure le déploiement ?",
    answer:
      "Le délai varie selon la complexité des processus, le nombre de sites et les interfaces nécessaires. Une estimation crédible est fournie après le cadrage du périmètre pilote.",
  },
  {
    theme: "Déploiement",
    question: "Faut-il changer toute notre organisation ?",
    answer:
      "Non. La démarche consiste d'abord à comprendre vos processus et à identifier les ajustements utiles. Nous recommandons de conserver les pratiques pertinentes et de digitaliser progressivement.",
  },
  {
    theme: "Déploiement",
    question: "Comment former les équipes terrain ?",
    answer:
      "La formation s'appuie sur les usages de chaque rôle : opérateur, auditeur, responsable qualité, manager ou administrateur. Nous pouvons construire un scénario pilote avec des utilisateurs référents.",
  },
  {
    theme: "Déploiement",
    question: "Comment gérer la résistance au changement ?",
    answer:
      "Un périmètre simple, des formulaires proches des habitudes du terrain et des bénéfices visibles favorisent l'appropriation. Il est utile d'impliquer les utilisateurs clés dès le cadrage.",
  },
  {
    theme: "Déploiement",
    question: "Faut-il mobiliser fortement notre service IT ?",
    answer:
      "Le niveau d'implication dépend de l'hébergement, de la sécurité et des intégrations. Nous clarifions en amont les contributions attendues des équipes IT et métier.",
  },
  {
    theme: "Déploiement",
    question: "Pouvons-nous commencer sur un seul site ?",
    answer:
      "Oui, un premier site, atelier ou processus peut servir de pilote avant une extension. Combien de sites avez-vous et lequel présente aujourd'hui le besoin le plus urgent ?",
  },
  {
    theme: "Déploiement",
    question: "Que faut-il préparer avant le cadrage ?",
    answer:
      "Un exemple de formulaire, une description du workflow, les rôles impliqués et deux ou trois KPI suffisent pour commencer. Aucune documentation exhaustive n'est nécessaire au premier échange.",
  },
  {
    theme: "Déploiement",
    question: "Que se passe-t-il après la mise en production ?",
    answer:
      "Le dispositif de support et les modalités d'évolution sont définis avec le client. Nous clarifions les responsables, les canaux d'assistance et les conditions de maintenance dans la proposition.",
  },
  {
    theme: "Déploiement",
    question: "Que faire si le pilote ne donne pas les résultats attendus ?",
    answer:
      "Il faut analyser les écarts par rapport aux critères de succès : adoption, données, processus ou paramétrage. L'objectif d'un pilote est précisément d'apprendre et de décider sur des résultats, avant toute généralisation.",
  },
  {
    theme: "Objections",
    question: "Nous sommes trop petits pour ce type de plateforme",
    answer:
      "L'important n'est pas la taille de l'entreprise mais le coût du problème à résoudre. Un seul processus récurrent peut justifier une démarche ciblée. Quel travail manuel ou suivi vous pénalise le plus ?",
  },
  {
    theme: "Objections",
    question: "Nous n'avons pas le budget cette année",
    answer:
      "Vous pouvez commencer par identifier le coût du fonctionnement actuel et définir un périmètre minimal. Cela permet d'évaluer une trajectoire de déploiement sans engager immédiatement un programme complet.",
  },
  {
    theme: "Objections",
    question: "Nous n'avons pas de temps pour un projet",
    answer:
      "Nous pouvons privilégier un cas d'usage limité et réutiliser vos procédures ou formulaires existants. L'objectif du cadrage est aussi d'estimer la mobilisation réelle de vos équipes.",
  },
  {
    theme: "Objections",
    question: "Nous avons déjà un ERP",
    answer:
      "CIPA ne vise pas nécessairement à remplacer votre ERP. Il peut compléter votre système de gestion par la collecte terrain, les workflows qualité et les indicateurs opérationnels. Quels processus votre ERP couvre-t-il mal aujourd'hui ?",
  },
  {
    theme: "Objections",
    question: "Nous avons déjà un logiciel qualité",
    answer:
      "Nous commencerons par identifier les fonctionnalités déjà couvertes et les lacunes restantes. Une intégration ou un usage complémentaire peut être plus pertinent qu'un remplacement.",
  },
  {
    theme: "Objections",
    question: "Nous préférons garder Excel",
    answer:
      "Excel reste utile pour des analyses ponctuelles. Les limites apparaissent surtout lorsque plusieurs équipes doivent saisir, valider et suivre des actions avec traçabilité. Un pilote permet de comparer objectivement les deux approches.",
  },
  {
    theme: "Objections",
    question: "Nos opérateurs ne sont pas à l'aise avec le digital",
    answer:
      "L'adoption se construit avec des écrans simples, un accompagnement adapté et un nombre réduit d'actions à réaliser. Nous pouvons présenter un parcours concret depuis le poste de travail.",
  },
  {
    theme: "Objections",
    question: "Notre usine dispose d'une connexion réseau instable",
    answer:
      "CIPA prévoit des usages terrain en mode hors ligne, avec synchronisation lorsque le réseau revient. Les limites techniques et les scénarios concernés doivent être vérifiés selon votre environnement.",
  },
  {
    theme: "Objections",
    question: "Notre processus est très spécifique",
    answer:
      "CIPA permet une configuration de formulaires et de workflows. Si votre besoin dépasse le standard, notre équipe évaluera l'adaptation nécessaire plutôt que de promettre une couverture immédiate.",
  },
  {
    theme: "Objections",
    question: "Nous ne sommes pas encore prêts pour l'IA",
    answer:
      "La première étape peut être uniquement la digitalisation et la fiabilisation des données. L'IA devient pertinente lorsque le besoin, la qualité des données et les critères de décision sont suffisamment clairs.",
  },
  {
    theme: "Objections",
    question: "Nous avons peur de la dépendance à un fournisseur",
    answer:
      "La réversibilité doit être discutée dès le cadrage : export des données, interfaces, responsabilités et conditions contractuelles. Nous pouvons organiser un échange technique sur ces points.",
  },
  {
    theme: "Objections",
    question: "Notre direction n'est pas convaincue",
    answer:
      "Un dossier court présentant le problème, le coût actuel, un pilote limité et des indicateurs de succès facilite l'arbitrage. Nous pouvons contribuer à structurer ces éléments pour votre comité de décision.",
  },
  {
    theme: "Objections",
    question: "Pourquoi agir maintenant plutôt que l'an prochain ?",
    answer:
      "La bonne question est le coût d'un report : ressaisies répétées, actions en retard, manque de visibilité et risques qualité. Si ce coût est significatif, un diagnostic limité peut être utile dès maintenant.",
  },
  {
    theme: "Objections",
    question: "Et si CIPA ne convient pas ?",
    answer:
      "Nous préférons identifier rapidement les incompatibilités fonctionnelles ou techniques. Un échange de cadrage permet de vérifier l'adéquation avant d'engager un projet ou un investissement.",
  },
  {
    theme: "Démo et conversion",
    question: "Je veux voir une démonstration",
    answer:
      "Nous proposons une démonstration CIPA guidée d'environ 45 minutes, adaptée à votre secteur et à votre besoin. Vous pouvez la demander ici : https://www.industryx0.pro/contact. Quel processus souhaitez-vous voir en priorité ?",
  },
  {
    theme: "Démo et conversion",
    question: "Puis-je voir CIPA sur mes propres checklists ?",
    answer:
      "Oui, vous pouvez présenter un modèle de checklist ou un cas d'usage représentatif pour orienter la démonstration. Évitez de transmettre des données sensibles dans ce chat ; un canal adapté pourra être convenu avec l'équipe.",
  },
  {
    theme: "Démo et conversion",
    question: "Je veux simplement poser une question à un expert",
    answer:
      "Vous pouvez décrire brièvement votre problème sur https://www.industryx0.pro/contact pour être orienté vers un interlocuteur compétent. Précisez si votre question concerne la qualité, la production, la maintenance ou l'IA.",
  },
  {
    theme: "Démo et conversion",
    question: "Je souhaite lancer un pilote",
    answer:
      "Pour cadrer un pilote, il faut choisir un processus, un site ou une équipe, préciser les utilisateurs et définir des critères de réussite. Nous pouvons organiser un premier échange pour délimiter ce périmètre.",
  },
  {
    theme: "Démo et conversion",
    question: "Je souhaite un devis",
    answer:
      "Pour préparer un chiffrage, indiquez votre secteur, le périmètre fonctionnel, le nombre de sites, les besoins d'intégration et vos contraintes d'hébergement. Déposez votre demande sur https://www.industryx0.pro/contact.",
  },
  {
    theme: "Démo et conversion",
    question: "Je veux parler avec quelqu'un rapidement",
    answer:
      "L'équipe commerciale peut être contactée via https://www.industryx0.pro/contact ou à hello@industryx0.pro. Décrivez votre objectif en une phrase pour faciliter l'orientation de votre demande.",
  },
  {
    theme: "Démo et conversion",
    question: "Je ne sais pas par où commencer",
    answer:
      "Commençons par votre principal irritant : audits, non-conformités, contrôles de production, maintenance ou reporting. Lequel vous coûte aujourd'hui le plus de temps ou de risques ?",
  },
  {
    theme: "Démo et conversion",
    question: "Quels renseignements donner pour être recontacté ?",
    answer:
      "Les informations utiles sont votre société, votre secteur, votre fonction, votre problème principal et un moyen de contact. Utilisez le formulaire officiel pour transmettre vos coordonnées : https://www.industryx0.pro/contact.",
  },
  {
    theme: "Démo et conversion",
    question: "Je souhaite organiser une démo pour plusieurs services",
    answer:
      "Une démonstration commune peut aider qualité, production, IT et direction à partager les mêmes enjeux. Indiquez les fonctions participantes et un ou deux cas d'usage prioritaires dans votre demande.",
  },
  {
    theme: "Démo et conversion",
    question: "Je veux une présentation pour mon directeur",
    answer:
      "Nous pouvons orienter un échange autour des enjeux métier, des bénéfices attendus et d'un plan de déploiement progressif. Précisez la fonction du décideur et les trois questions auxquelles il attend une réponse.",
  },
  {
    theme: "Démo et conversion",
    question: "Je veux comparer plusieurs solutions",
    answer:
      "Une comparaison utile porte sur la couverture fonctionnelle, l'expérience terrain, les intégrations, les exigences réglementaires, le coût total et l'accompagnement. Nous pouvons vous aider à définir ces critères avant une démonstration.",
  },
  {
    theme: "Démo et conversion",
    question: "Je préfère explorer sans engagement",
    answer:
      "Vous pouvez commencer par une démonstration ou un échange de découverte, sans présumer d'une décision d'achat. L'objectif est de vérifier l'adéquation entre votre problème et les solutions Industry X.0.",
  },
  {
    theme: "Secteurs et métiers",
    question: "CIPA pour l'industrie pharmaceutique",
    answer:
      "CIPA peut accompagner les audits BPF, déviations, CAPA, contrôles et traçabilité. Pour un usage GxP, les exigences de validation et de conformité sont définies avec le client. Quel processus pharmaceutique souhaitez-vous prioriser ?",
  },
  {
    theme: "Secteurs et métiers",
    question: "CIPA pour l'agroalimentaire",
    answer:
      "La plateforme peut digitaliser les contrôles qualité, inspections, autocontrôles et actions d'amélioration. Nous pouvons partir d'une ligne de production ou d'un programme d'audits terrain.",
  },
  {
    theme: "Secteurs et métiers",
    question: "CIPA pour l'automobile",
    answer:
      "Les cas d'usage incluent audits terrain, maîtrise des écarts, plans d'action et suivi des performances. Quel est aujourd'hui votre principal indicateur de non-qualité ou de réactivité ?",
  },
  {
    theme: "Secteurs et métiers",
    question: "CIPA pour le packaging et la plasturgie",
    answer:
      "Nous pouvons examiner les contrôles au poste, incidents, suivi des actions et données de maintenance ou de production. Le cadrage peut commencer sur une ligne ou une famille de produits.",
  },
  {
    theme: "Secteurs et métiers",
    question: "CIPA pour les dispositifs médicaux",
    answer:
      "Les besoins de traçabilité, contrôles et qualité peuvent être étudiés au regard de votre système existant. Les exigences réglementaires précises devront être confirmées pendant le cadrage.",
  },
  {
    theme: "Secteurs et métiers",
    question: "CIPA pour la chimie et les matières premières",
    answer:
      "Nous pouvons étudier la digitalisation des inspections, contrôles, écarts et workflows selon vos risques opérationnels et vos procédures. Souhaitez-vous commencer par la qualité, la sécurité ou la production ?",
  },
  {
    theme: "Secteurs et métiers",
    question: "Je suis responsable qualité",
    answer:
      "Les cas les plus fréquents concernent les audits, déviations, CAPA, réclamations et indicateurs de conformité. Quelle activité de votre équipe est actuellement la plus chronophage ?",
  },
  {
    theme: "Secteurs et métiers",
    question: "Je suis responsable production",
    answer:
      "Nous pouvons travailler sur les relevés terrain, autocontrôles, incidents et indicateurs opérationnels. Quel indicateur ou quelle information manque à vos chefs d'équipe pendant le poste ?",
  },
  {
    theme: "Secteurs et métiers",
    question: "Je suis responsable maintenance",
    answer:
      "L'enjeu est souvent de mieux suivre les demandes, les interventions, les équipements et les historiques. Nous pouvons étudier votre processus actuel et ses interactions avec la qualité et la production.",
  },
  {
    theme: "Secteurs et métiers",
    question: "Je suis directeur industriel ou DG",
    answer:
      "Nous pouvons centrer l'échange sur les risques opérationnels, la qualité, les délais, les coûts de non-performance et la visibilité multi-sites. L'objectif est d'identifier un projet prioritaire avec ROI mesurable.",
  },
  {
    theme: "Secteurs et métiers",
    question: "Je suis responsable informatique",
    answer:
      "Nous pouvons discuter architecture, accès utilisateurs, interfaces avec ERP/MES/BI, hébergement, sécurité et réversibilité. Un échange technique aidera à préciser les prérequis et les limites.",
  },
  {
    theme: "IA et innovation",
    question: "Quelle place prend l'IA dans CIPA ?",
    answer:
      "L'IA peut aider à transformer des données et documents opérationnels en informations utiles, par exemple pour préparer certaines checklists ou analyser des tendances. Les usages concrets dépendent du module et de vos données.",
  },
  {
    theme: "IA et innovation",
    question: "Peut-on générer automatiquement des checklists ?",
    answer:
      "CIPA présente une assistance IA pour préparer des modèles de checklist à partir d'un besoin ou de documents existants. Une validation humaine des critères et questions reste nécessaire avant utilisation.",
  },
  {
    theme: "IA et innovation",
    question: "Pouvez-vous détecter des problèmes récurrents avec l'IA ?",
    answer:
      "L'analyse de données historiques peut aider à repérer des familles d'écarts ou des récurrences. Il faut d'abord vérifier la qualité et le volume des données disponibles, puis définir un cas d'usage mesurable.",
  },
  {
    theme: "IA et innovation",
    question: "L'IA remplace-t-elle le responsable qualité ?",
    answer:
      "Non. Les analyses et propositions doivent être examinées par les professionnels habilités. L'IA assiste la recherche d'information et la prise de décision, sans supprimer les responsabilités métier.",
  },
  {
    theme: "IA et innovation",
    question: "Qu'est-ce qu'Enti Win ?",
    answer:
      "Enti Win est une solution Industry X.0 d'analyse documentaire qualité assistée par IA, destinée notamment à rapprocher des documents des exigences BPF. Les résultats sont sourcés et soumis à validation humaine. En savoir plus : https://www.industryx0.pro/plateforme/entiwin.",
  },
  {
    theme: "IA et innovation",
    question: "Puis-je essayer Enti Win sur mes documents ?",
    answer:
      "La page Enti Win propose un accès à l'analyse documentaire. Avant de transmettre des documents internes, vérifiez leur caractère confidentiel et les conditions d'utilisation : https://www.industryx0.pro/plateforme/entiwin.",
  },
  {
    theme: "IA et innovation",
    question: "L'IA peut-elle assister une inspection réglementaire ?",
    answer:
      "Enti Win peut aider à repérer des exigences documentées, partiellement couvertes ou non identifiées, avec les passages sources. Ce travail prépare la revue des experts mais ne remplace pas une inspection ou un jugement réglementaire.",
  },
  {
    theme: "IA et innovation",
    question: "Proposez-vous des projets IA spécifiques ?",
    answer:
      "Nous pouvons étudier un besoin d'IA ciblé, par exemple l'analyse de réclamations, la capitalisation des connaissances ou l'aide à la décision. La faisabilité dépend des données, du processus et des risques à maîtriser.",
  },
  {
    theme: "IA et innovation",
    question: "Peut-on commencer sans données historiques propres ?",
    answer:
      "Oui, certains cas commencent par structurer la collecte et les règles de gestion. Pour les analyses avancées, la qualité et le volume des données sont décisifs ; un diagnostic permet de choisir une approche réaliste.",
  },
  {
    theme: "IA et innovation",
    question: "Comment évitez-vous les erreurs de l'IA ?",
    answer:
      "Nous privilégions des usages circonscrits, la justification des résultats, des vérifications et la validation humaine. Les exigences de performance et de contrôle doivent être définies pour chaque application.",
  },
  {
    theme: "IA et innovation",
    question: "L'IA peut-elle aider à rédiger des documents qualité ?",
    answer:
      "L'assistance à la rédaction ou à l'analyse de documents peut être étudiée selon le contexte. Les procédures d'approbation, la vérification des sources et la responsabilité des signataires restent indispensables.",
  },
  {
    theme: "IT, sécurité et conformité",
    question: "CIPA s'intègre-t-elle à notre ERP ?",
    answer:
      "CIPA prévoit des possibilités d'échange avec des systèmes tels que ERP, MES ou BI. Une intégration précise dépend des API, données disponibles, règles de sécurité et versions de vos logiciels. Quel ERP utilisez-vous ?",
  },
  {
    theme: "IT, sécurité et conformité",
    question: "Peut-on connecter CIPA à un MES ou à une BI ?",
    answer:
      "Le site présente des intégrations avec ERP, MES et outils de BI. Nous devons vérifier le mode de connexion, les flux attendus et les contraintes techniques avant de confirmer une interface.",
  },
  {
    theme: "IT, sécurité et conformité",
    question: "Peut-on importer nos données existantes ?",
    answer:
      "Une reprise de données peut être étudiée selon leur format, qualité et valeur opérationnelle. L'équipe de cadrage précisera les données à migrer et les contrôles à réaliser.",
  },
  {
    theme: "IT, sécurité et conformité",
    question: "Les données sont-elles protégées par des droits d'accès ?",
    answer:
      "CIPA s'appuie sur des profils et permissions définis par rôle. Les habilitations et les règles de validation sont configurées selon votre organisation et ses responsabilités.",
  },
  {
    theme: "IT, sécurité et conformité",
    question: "Disposez-vous d'un audit trail ?",
    answer:
      "Le site CIPA décrit un historique des opérations avec auteur, horodatage et contexte. Pour les usages réglementés, nous vérifierons avec vous le niveau de détail et les exigences applicables.",
  },
  {
    theme: "IT, sécurité et conformité",
    question: "Qui possède nos données ?",
    answer:
      "Le site indique que les données restent celles du client et peuvent être exportées. Les conditions exactes de réversibilité, de conservation et de restitution doivent être précisées contractuellement.",
  },
  {
    theme: "IT, sécurité et conformité",
    question: "Où sont hébergées les données ?",
    answer:
      "Le lieu d'hébergement et les garanties associées dépendent du scénario de déploiement. Nous pouvons fournir les informations d'architecture pertinentes après qualification de vos exigences IT et de localisation des données.",
  },
  {
    theme: "IT, sécurité et conformité",
    question: "CIPA est-elle certifiée ISO 27001 ?",
    answer:
      "Nous ne pouvons pas confirmer une certification précise sans document officiel à jour. Un expert pourra fournir les justificatifs de sécurité disponibles et préciser les mesures mises en œuvre.",
  },
  {
    theme: "IT, sécurité et conformité",
    question: "CIPA est-elle conforme à 21 CFR Part 11 ?",
    answer:
      "CIPA possède des fonctions utiles à la traçabilité et aux validations électroniques. La conformité Part 11 dépend aussi de la configuration, des procédures et de la validation du système : une analyse d'adéquation est nécessaire.",
  },
  {
    theme: "IT, sécurité et conformité",
    question: "Comment gérez-vous la validation GxP ?",
    answer:
      "La validation s'appuie sur les exigences d'utilisation, l'analyse de risques, les tests et la documentation adaptés au système et à son usage prévu. Les responsabilités et livrables IQ/OQ/PQ sont définis dans le projet.",
  },
  {
    theme: "IT, sécurité et conformité",
    question: "Peut-on utiliser une signature électronique ?",
    answer:
      "Le site présente des validations numériques et des signatures électroniques pour des usages terrain. Leur adéquation à une réglementation particulière nécessite une vérification des exigences et de la configuration.",
  },
  {
    theme: "IT, sécurité et conformité",
    question: "Comment se passe la gestion des incidents et du support ?",
    answer:
      "Les niveaux de service, canaux de support, responsabilités et délais d'intervention dépendent de l'offre contractuelle. Nous pouvons clarifier ces points lors de la proposition technique.",
  },
  {
    theme: "IT, sécurité et conformité",
    question: "Peut-on supprimer les anciens outils dès le lancement ?",
    answer:
      "Une transition progressive est généralement préférable. Il faut tester les processus critiques, les interfaces, la reprise des données et les scénarios de repli avant d'arrêter un système existant.",
  },
  {
    theme: "Preuves et références",
    question: "Avez-vous des références clients ?",
    answer:
      "Industry X.0 présente des références et témoignages industriels sur son site. Vous pouvez explorer les cas d'usage et nous demander une référence pertinente pour votre secteur : https://www.industryx0.pro/customers.",
  },
  {
    theme: "Preuves et références",
    question: "Avez-vous déjà travaillé dans la pharmaceutique ?",
    answer:
      "Notre site présente des usages et références dans l'industrie pharmaceutique, notamment autour de la qualité, des audits et de la traçabilité. Nous pouvons orienter la discussion vers un contexte proche du vôtre.",
  },
  {
    theme: "Preuves et références",
    question: "Avez-vous des exemples dans l'agroalimentaire ?",
    answer:
      "Le site présente des retours d'expérience d'industriels de l'agroalimentaire. Nous pouvons illustrer les cas de contrôle terrain, d'audit ou de suivi d'actions correspondant à votre besoin.",
  },
  {
    theme: "Preuves et références",
    question: "Pouvez-vous montrer un cas similaire au nôtre ?",
    answer:
      "Oui, lors d'une démonstration, nous chercherons le scénario le plus proche de votre secteur et de votre processus. Précisez votre activité, votre principal problème et la taille du périmètre envisagé.",
  },
  {
    theme: "Preuves et références",
    question: "Puis-je contacter un de vos clients ?",
    answer:
      "Une mise en relation éventuelle dépend de l'accord préalable du client concerné. Nous pouvons d'abord partager les références publiques et discuter d'un retour d'expérience adapté.",
  },
  {
    theme: "Preuves et références",
    question: "Avez-vous des indicateurs d'impact vérifiés ?",
    answer:
      "Le site présente des indicateurs et des témoignages clients. Pour une décision d'investissement, demandez les conditions de mesure et un cas comparable, plutôt que d'extrapoler automatiquement les résultats.",
  },
  {
    theme: "Preuves et références",
    question: "Comment savoir si vous pouvez réellement traiter notre besoin ?",
    answer:
      "Le plus fiable est de confronter CIPA à votre processus réel : formulaire, workflow, contraintes IT et critères de réussite. Une démonstration ciblée permet d'identifier à la fois les points couverts et les écarts.",
  },
  {
    theme: "Preuves et références",
    question: "Vos clients utilisent-ils réellement CIPA sur le terrain ?",
    answer:
      "Le site décrit des cas d'usage avec audits sur mobile, contrôles au poste et suivi de production. Nous pouvons vous montrer le parcours de l'utilisateur terrain plutôt qu'une simple présentation commerciale.",
  },
]
