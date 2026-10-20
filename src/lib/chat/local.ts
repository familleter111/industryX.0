/**
 * Mode « local » de l'assistant : réponses par mots-clés, calculées dans le
 * navigateur. Rien ne quitte la page.
 *
 * C'est le mode par défaut, et le filet de secours du mode IA : si l'API
 * /api/chat est désactivée ou injoignable, le widget répond d'ici.
 */

import type { ChatLocale } from '@/lib/chat/config'
import { SITE } from '@/lib/chat/knowledge'
import { CONTACT, postalAddress } from '@/lib/data/contact'
import { ENTIWIN_PATH } from '@/lib/data/entiwin'
import { FAQ_ENTRIES } from '@/lib/data/faq'
import { platformPages } from '@/lib/data/platform'
import { LINKEDIN_URL } from '@/lib/data/socials'
import { deburr } from '@/lib/phone'

/** Messages de bienvenue, joués un par un à l'ouverture. */
export const WELCOME: Record<ChatLocale, string[]> = {
  fr: [
    "Bonjour 👋 Je suis l'assistant virtuel d'Industry X.0.",
    'Prêt à découvrir comment digitaliser et piloter vos opérations industrielles avec CIPA ?',
    'Avez-vous des questions sur notre plateforme, ou souhaitez-vous planifier une démonstration ?',
  ],
  en: [
    "Hi 👋 I'm the Industry X.0 virtual assistant.",
    'Ready to see how CIPA can digitize and streamline your industrial operations?',
    'Any questions about our platform, or would you like to schedule a live demo?',
  ],
}

/**
 * Reconnaissance des questions de la FAQ, dans l'ordre de lib/data/faq.ts.
 * Une entrée correspond quand chacun de ses groupes trouve un mot dans la
 * question (accents et majuscules ignorés). Volontairement prudent : mieux
 * vaut passer la main à l'IA qu'afficher une réponse hors sujet.
 */
const FAQ_PATTERNS: RegExp[][] = [
  // Durée d'une démonstration
  [/\bdemo|demonstration/, /\b(dure|duree|temps|long|minutes?)\b/],
  // Intégration aux outils existants (« mes » seul est exclu : « mes équipes »)
  [/\b(integr\w*|erp|gmao|cmms|bi|api|connect\w*|sap)\b/],
  // Accompagnement au déploiement
  [/\b(accompagn\w*|formation|former|support|training|onboarding)\b/],
  // Secteurs couverts
  [/\b(secteurs?|industries|sectors?|pharma\w*|agro\w*|cosmeti\w*|automobile|automotive|electroni\w*|packaging|plasturgie|plastics?)\b/],
  // Délai avant un pilote
  [
    /\b(pilote?s?|delai|combien de temps|how long|how soon)\b/,
    /\b(pilote?s?|deploi\w*|deploy\w*|demarr\w*|mise en (place|service)|start\w*|operationnel|up and running)\b/,
  ],
]

/** Réponse de la FAQ si la question y correspond, sinon `undefined`. */
export function faqReply(userText: string, locale: ChatLocale): string | undefined {
  const text = deburr(userText)
  const index = FAQ_PATTERNS.findIndex((groups) => groups.every((pattern) => pattern.test(text)))
  return index >= 0 ? FAQ_ENTRIES[locale][index]?.answer : undefined
}

/* ------------------------------------------------- conversation courante

   Salutations, « comment vas-tu », remerciements, au revoir… : le visiteur
   doit pouvoir parler au bot comme à quelqu'un. Ces messages sont reconnus
   ici, sans IA : réponse instantanée, gratuite, et aucun appel consommé sur
   le plafond quotidien.

   Seuls les messages courts sont concernés : « Bonjour, CIPA gère-t-elle
   les audits ? » est une vraie question, elle continue son chemin. */

/** Au-delà, le message n'est plus un simple échange de politesse. */
const SMALL_TALK_MAX_WORDS = 8

type SmallTalk = {
  pattern: RegExp
  fr: string[]
  en: string[]
  /** Nombre de mots maximal pour cette intention (défaut : SMALL_TALK_MAX_WORDS). */
  maxWords?: number
}

/**
 * Un message qui parle d'affaires n'est pas une simple politesse, même s'il
 * commence par « bonjour » ou « merci » : il continue vers la FAQ, l'IA ou
 * les mots-clés.
 */
const BUSINESS =
  /\b(demo\w*|demonstration|cipa|enti ?win|prix|tarifs?|couts?|price\w*|cost\w*|devis|quote|audits?|qualite|quality|production|maintenance|ecarts?|deviations?|capa|contact\w*|rendez|rdv|meeting|essai|trial|solutions?|plateforme|platform|secteurs?|industries)\b/

const GREETING = /^(bonjour|bonsoir|salut|coucou|hello|hi|hey|yo|salam|aslema|ahla|good (morning|afternoon|evening))\b/
/** Salutation seule : « bonjour », « salut à tous », « hello there ». */
const GREETING_ONLY =
  /^(bonjour|bonsoir|salut|coucou|hello|hi|hey|yo|salam|aslema|ahla|good (morning|afternoon|evening))( (a (tous|toi|vous)|tout le monde|l'?equipe|everyone|there|team|the team|bot|assistant))?$/

/** Dans l'ordre : la première intention reconnue répond. */
const SMALL_TALK: SmallTalk[] = [
  {
    pattern: /\b(comment (vas|allez|va)[ -]?(tu|vous)?|ca va|tu vas bien|vous allez bien|la forme|how are you|how('s| is) it going|how do you do|labes)\b/,
    fr: [
      'Je vais très bien, merci ! Et vous ? Je suis là pour parler de CIPA, de vos opérations ou d’une démonstration.',
      'Très bien, merci de demander ! Et de votre côté ? Dites-moi si je peux vous aider sur CIPA.',
    ],
    en: [
      "I'm doing great, thanks! How about you? I'm here to talk about CIPA, your operations or a demo.",
      "Very well, thanks for asking! And you? Let me know if I can help with CIPA.",
    ],
  },
  {
    pattern: /\b(je vais (tres |plutot )?bien|ca va (tres |plutot )?bien|tres bien|nickel|pas mal|i'?m (fine|good|great|ok)|(fine|good|great),? thanks?)\b/,
    fr: ['Ravi de l’entendre ! En quoi puis-je vous aider aujourd’hui ?'],
    en: ['Glad to hear it! How can I help you today?'],
  },
  {
    pattern: /\b(qui (es|etes)[ -](tu|vous)|tu es qui|t'?es qui|(es[ -]tu|tu es|t'?es) (un |une )?(robot|bot|humain|ia|vrai)|(etes[ -]vous|vous etes) (un |une )?(robot|bot|humain|ia)|who are you|what are you|are you (a |an )?(bot|robot|human|ai|real))\b/,
    fr: [
      'Je suis l’assistant virtuel d’Industry X.0, un programme et non une personne. Je réponds aux questions sur CIPA ; pour un échange avec l’équipe, le formulaire de contact est là.',
    ],
    en: [
      "I'm Industry X.0's virtual assistant, a program rather than a person. I answer questions about CIPA; to talk with the team, use the contact form.",
    ],
  },
  {
    pattern: /\b(comment tu t'?appelles|comment vous appelez[ -]vous|ton nom|votre nom|what'?s your name|your name)\b/,
    fr: ['Je suis l’Assistant CIPA, le guide virtuel d’Industry X.0. Et vous, que puis-je faire pour vous ?'],
    en: ["I'm the CIPA Assistant, Industry X.0's virtual guide. What can I do for you?"],
  },
  {
    pattern: /\b(que (peux|sais)[ -]tu faire|tu (peux|sais) faire quoi|a quoi tu sers|comment (tu peux|pouvez[ -]vous) m'?aider|aide[ -]moi|what can you do|how can you help|help me)\b/,
    fr: [
      'Je peux vous présenter CIPA et ses usages (remontée terrain, gestion des écarts, pilotage…), vous dire quels secteurs nous accompagnons, ou vous guider pour demander une démonstration. Par quoi commençons-nous ?',
    ],
    en: [
      'I can introduce CIPA and its use cases (shop-floor capture, deviation management, performance…), tell you which industries we support, or help you book a demo. Where shall we start?',
    ],
  },
  {
    pattern: /\b(merci|thanks?|thank you|thx)\b/,
    maxWords: 5,
    fr: ['Avec plaisir ! N’hésitez pas si vous avez une autre question.', 'Je vous en prie, c’est un plaisir d’aider !'],
    en: ["You're welcome! Feel free to ask if you have another question.", 'My pleasure, happy to help!'],
  },
  {
    pattern: /\b(au revoir|a (bientot|plus|\+)|bonne (journee|soiree|nuit)|bye|goodbye|see you|ciao|tchao|have a (nice|good) day)\b/,
    maxWords: 6,
    fr: ['Au revoir et à bientôt ! Bonne journée.', 'À bientôt ! Vous pouvez revenir ici quand vous voulez.'],
    en: ['Goodbye, see you soon! Have a great day.', 'See you soon! Come back any time.'],
  },
  {
    pattern: /\b(super|genial|cool|top|parfait|excellent|bravo|great|awesome|nice|perfect|ok|d'?accord|okay)\b/,
    maxWords: 3,
    fr: ['Parfait ! Autre chose que je puisse faire pour vous ?'],
    en: ['Great! Anything else I can do for you?'],
  },
  {
    pattern: GREETING_ONLY,
    fr: [
      'Bonjour ! Ravi de vous lire. Une question sur CIPA, ou envie de voir une démonstration ?',
      'Bonjour et bienvenue ! Comment puis-je vous aider aujourd’hui ?',
    ],
    en: [
      'Hello! Nice to hear from you. A question about CIPA, or would you like to see a demo?',
      'Hi and welcome! How can I help you today?',
    ],
  },
]

/* ------------------------------------------------- réponses prêtes

   Questions pratiques qui ont une seule bonne réponse : présentation
   d'Industry X.0, solutions, Enti Win, coordonnées, candidatures. Elles
   sont servies telles quelles, sans IA : exactes, instantanées et sans
   coût. Comme pour la FAQ, une intention correspond quand chacun de ses
   groupes trouve un mot dans le message, et `unless` lui fait passer son
   tour (« le numéro de lot dans CIPA » n'est pas une question de téléphone). */

/** Au-delà, le message est une vraie question : il continue vers l'IA. */
const INFO_MAX_WORDS = 16

type Info = {
  groups: RegExp[]
  unless?: RegExp
  reply: (locale: ChatLocale) => string
}

/** Le message demande une présentation ou une liste. */
const ASK =
  /\b(present\w*|parle[sz]?|c'?est quoi|qu'?est[ -]ce|que (fait|faites|proposez|offrez)|qui (est|etes)|decouvrir|connaitre|en savoir|tell me|what('?s)?|who (is|are)|about|learn|introduce|vos|quels?|quelles?|liste|your|which)\b/

/** Le message parle du produit, pas de l'entreprise : ce n'est pas une question de coordonnées. */
const PRODUCT = /\b(cipa|plateforme|platform|application|app|modules?|lots?|batch|operateurs?|operators?|fonctionn\w*|works?)\b/

const lang = (locale: ChatLocale, fr: string, en: string) => (locale === 'en' ? en : fr)
const site = (locale: ChatLocale, path: string) => `${SITE}${locale === 'en' ? '/en' : ''}${path}`

const contactCard = (locale: ChatLocale) =>
  lang(
    locale,
    `📍 Adresse : ${postalAddress('fr')}\n📞 Téléphone : ${CONTACT.phone}\n✉️ E-mail : ${CONTACT.email}`,
    `📍 Address: ${postalAddress('en')}\n📞 Phone: ${CONTACT.phone}\n✉️ Email: ${CONTACT.email}`,
  )

const demoLine = (locale: ChatLocale) =>
  lang(
    locale,
    `Pour une démonstration de CIPA : ${site(locale, '/contact')} (réponse sous 24 h ouvrées).`,
    `To book a CIPA demo: ${site(locale, '/contact')} (reply within one business day).`,
  )

/** Dans l'ordre : la première intention reconnue répond. */
const INFOS: Info[] = [
  {
    // Candidatures : CV, stage, PFE, emploi
    groups: [
      /\b(cv|curriculum|candidat\w*|postuler|recrut\w*|embauch\w*|emplois?|stages?|stagiaires?|pfe|alternance|internships?|interns?|careers?|hiring|resume|apply(ing)? for|jobs?)\b/,
    ],
    reply: (locale) =>
      lang(
        locale,
        `Merci de votre intérêt pour Industry X.0 ! Pour une candidature (emploi, stage ou PFE), envoyez votre CV et quelques lignes de motivation à ${CONTACT.email}, avec en objet « Candidature – poste ou stage visé ». Notre équipe revient vers vous si votre profil correspond à un besoin.\nNos actualités et offres sont aussi sur LinkedIn : ${LINKEDIN_URL}`,
        `Thank you for your interest in Industry X.0! To apply (job or internship), send your resume and a short cover letter to ${CONTACT.email}, with the subject “Application – target role”. Our team will get back to you if your profile matches a need.\nOur news and openings are also on LinkedIn: ${LINKEDIN_URL}`,
      ),
  },
  {
    // Toutes les coordonnées
    groups: [
      /\b(coordonnees|contacts? details?|contact info\w*|infos? de contact|vous (contacter|joindre|ecrire)|nous contacter|(how|where) (can|do|could) i (contact|reach)|reach (you|out)|contact you|get in touch)\b/,
    ],
    reply: (locale) =>
      `${lang(locale, 'Voici nos coordonnées :', 'Here are our contact details:')}\n${contactCard(locale)}\n${demoLine(locale)}`,
  },
  {
    // E-mail (avant l'adresse : « adresse mail »)
    groups: [/\b(e-?mails?|mail|courriel|adresse (electronique|mail))\b/],
    unless: PRODUCT,
    reply: (locale) =>
      lang(
        locale,
        `Vous pouvez nous écrire à ${CONTACT.email} : notre équipe répond sous 24 h ouvrées. Le formulaire de contact est aussi là : ${site(locale, '/contact')}`,
        `You can email us at ${CONTACT.email}: our team replies within one business day. The contact form is also available: ${site(locale, '/contact')}`,
      ),
  },
  {
    // Téléphone
    groups: [/\b(telephone|tel|numeros?|appeler|whatsapp|phone|call (you|us)|number)\b/],
    unless: PRODUCT,
    reply: (locale) =>
      lang(
        locale,
        `Vous pouvez nous appeler au ${CONTACT.phone}, ou nous écrire à ${CONTACT.email}.\n${demoLine(locale)}`,
        `You can call us at ${CONTACT.phone}, or email us at ${CONTACT.email}.\n${demoLine(locale)}`,
      ),
  },
  {
    // Adresse et localisation
    groups: [
      /\b(adresse|localisation|localise\w*|situe\w*|ou (etes|est|se trouve|sont|vous trouver)|bureaux|locaux|siege|address|location|located|where are you|offices?|headquarters|hq|maps?|plan d'?acces|venir vous voir|visit you)\b/,
    ],
    unless: PRODUCT,
    reply: (locale) =>
      lang(
        locale,
        `Nos bureaux sont à ${postalAddress('fr')}.\nItinéraire : ${CONTACT.maps}\nPensez à nous prévenir avant de passer : ${CONTACT.phone} ou ${CONTACT.email}.`,
        `Our offices are at ${postalAddress('en')}.\nDirections: ${CONTACT.maps}\nPlease let us know before you visit: ${CONTACT.phone} or ${CONTACT.email}.`,
      ),
  },
  {
    // Enti Win
    groups: [/\benti ?win\b/, ASK],
    reply: (locale) =>
      lang(
        locale,
        `Enti Win est notre nouveau produit : l'évaluation qualité pharmaceutique assistée par IA.\n1. Vous déposez vos documents (procédures, déviations, CAPA… en PDF, Word ou Excel).\n2. L'IA confronte chaque exigence BPF du référentiel à vos documents.\n3. Vous obtenez les écarts, les preuves et un plan d'action priorisé, que vos experts valident.\nDécouvrir et lancer une analyse : ${site(locale, ENTIWIN_PATH)}`,
        `Enti Win is our new product: AI-assisted pharmaceutical quality assessment.\n1. You upload your documents (procedures, deviations, CAPAs… as PDF, Word or Excel).\n2. The AI checks each GMP requirement of the standard against your documents.\n3. You get the gaps, the evidence and a prioritized action plan for your experts to validate.\nLearn more and start an analysis: ${site(locale, ENTIWIN_PATH)}`,
      ),
  },
  {
    // Solutions proposées
    groups: [
      /\b(solutions?|produits?|offres?|services?|modules?|proposez|offrez|vendez|products?|offer(s|ings?)?|cipa)\b/,
      ASK,
    ],
    unless: /\b(prix|tarifs?|couts?|price\w*|cost\w*|devis|quote|demo\w*|hors ligne|offline|integr\w*|erp|sap)\b/,
    reply: (locale) => {
      const uses = platformPages(locale)
        .map((page) => `• ${page.menuTitle}`)
        .join('\n')
      return lang(
        locale,
        `Notre plateforme CIPA couvre sept usages, sur mobile, tablette et PC :\n${uses}\nEt notre nouveau produit, Enti Win : l'évaluation qualité pharmaceutique assistée par IA.\nLe menu « Solution » détaille chaque usage. ${demoLine(locale)}`,
        `Our CIPA platform covers seven use cases, on mobile, tablet and desktop:\n${uses}\nAnd our new product, Enti Win: AI-assisted pharmaceutical quality assessment.\nThe “Solution” menu details each one. ${demoLine(locale)}`,
      )
    },
  },
  {
    // Présentation d'Industry X.0
    groups: [
      /\b(industry ?x( ?0)?|industryx0?|ix0|votre (entreprise|societe|boite|startup|equipe)|your (company|business|startup|team)|l'?entreprise|la societe|presentez[ -]vous|yourselves)\b/,
      ASK,
    ],
    reply: (locale) =>
      lang(
        locale,
        `Industry X.0 est une startup tunisienne fondée en 2019, spécialisée dans la digitalisation et l'optimisation des opérations industrielles.\nSon produit phare, CIPA, aide les industriels à structurer et piloter leurs processus qualité, production et amélioration continue : remontée des données terrain, gestion des écarts, conformité et pilotage de la performance. Enti Win, notre nouveau produit, évalue vos documents qualité pharmaceutiques avec l'IA.\nNous accompagnons la pharma, l'agroalimentaire, la cosmétique, l'automobile, l'électronique et le packaging.\n${demoLine(locale)}`,
        `Industry X.0 is a Tunisian startup founded in 2019, specialized in digitizing and optimizing industrial operations.\nIts flagship product, CIPA, helps manufacturers structure and manage their quality, production and continuous improvement processes: shop-floor data capture, deviation management, compliance and performance management. Enti Win, our new product, assesses your pharmaceutical quality documents with AI.\nWe serve pharma, food and beverage, cosmetics, automotive, electronics and packaging.\n${demoLine(locale)}`,
      ),
  },
]

/** Réponse prête si le message demande une information pratique, sinon `undefined`. */
export function infoReply(userText: string, locale: ChatLocale): string | undefined {
  const text = normalize(userText)
  if (!text || text.split(' ').length > INFO_MAX_WORDS) return undefined
  const match = INFOS.find(
    (info) => info.groups.every((pattern) => pattern.test(text)) && !info.unless?.test(text),
  )
  if (!match) return undefined
  const reply = match.reply(locale)
  return GREETING.test(text) ? `${lang(locale, 'Bonjour !', 'Hello!')} ${reply}` : reply
}

/** Message sans accents, majuscules ni ponctuation, pour les motifs ci-dessus. */
function normalize(userText: string): string {
  return deburr(userText)
    .replace(/[’`]/g, "'")
    .replace(/[!?.,;:…]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Choix stable parmi plusieurs formulations : même message, même réponse. */
function pick(options: string[], seed: string): string {
  let hash = 0
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return options[hash % options.length]
}

/** Réponse de conversation courante, ou `undefined` si le message est une vraie question. */
export function smallTalkReply(userText: string, locale: ChatLocale): string | undefined {
  const text = normalize(userText)
  if (!text || BUSINESS.test(text)) return undefined
  const words = text.split(' ').length
  const match = SMALL_TALK.find(
    (entry) => words <= (entry.maxWords ?? SMALL_TALK_MAX_WORDS) && entry.pattern.test(text),
  )
  if (!match) return undefined
  const reply = pick(match[locale], text)
  // « Bonjour, comment vas-tu ? » : on salue avant de répondre.
  const greets = match.pattern !== GREETING_ONLY && GREETING.test(text)
  return greets ? `${locale === 'en' ? 'Hello!' : 'Bonjour !'} ${reply}` : reply
}

/**
 * Réponse immédiate sans IA, si le message en a une : question de la FAQ,
 * réponse prête ou conversation courante. Le widget l'utilise avant
 * d'appeler l'IA.
 */
export function instantReply(userText: string, locale: ChatLocale): string | undefined {
  return faqReply(userText, locale) ?? infoReply(userText, locale) ?? smallTalkReply(userText, locale)
}

/** Réponse sans IA : FAQ, conversation courante, puis réponses par mots-clés. */
export function localReply(userText: string, locale: ChatLocale): string {
  const instant = instantReply(userText, locale)
  if (instant) return instant
  const t = userText.toLowerCase()
  if (locale === 'fr') {
    if (/(demo|démo|rdv|rendez|contact|tester)/.test(t))
      return "C'est une excellente idée ! Pour réserver une démonstration personnalisée de CIPA, cliquez sur « Demander une démo » dans le menu : notre équipe vous recontacte sous 24 h ouvrées."
    if (/(prix|tarif|coût|cout|abonnement)/.test(t))
      return "Nos tarifs s'adaptent à la taille de votre usine et aux modules choisis. Le plus simple est d'en parler lors d'un court échange : demandez une démo depuis le menu."
    if (/(cipa|produit|logiciel|app|solution|fonctionne)/.test(t))
      return "CIPA est notre plateforme modulaire : elle capte la donnée terrain, gère les écarts et pilote la performance, sur mobile, tablette et PC. Le menu « Solution » détaille ses sept usages."
    if (/(merci|super|ok|parfait)/.test(t))
      return "Je vous en prie ! N'hésitez pas si vous avez d'autres questions."
    return "Merci pour votre message ! Pour une réponse précise, notre équipe vous répond via le formulaire de contact. Puis-je vous aider sur CIPA ou sur une démonstration ?"
  }
  if (/(demo|book|schedule|meeting|contact|test)/.test(t))
    return 'Great idea! To book a personalized CIPA demo, click “Book a demo” in the menu: our team gets back to you within one business day.'
  if (/(price|pricing|cost|license|subscription)/.test(t))
    return 'Our pricing depends on your plant size and the modules you choose. The easiest way is a short call: book a demo from the menu.'
  if (/(cipa|product|software|app|solution|works|platform)/.test(t))
    return 'CIPA is our modular platform: it captures shop-floor data, manages deviations and drives performance, on mobile, tablet and desktop. The “Solution” menu details its seven use cases.'
  if (/(thanks|thank you|awesome|ok|perfect)/.test(t))
    return "You're welcome! Let me know if you have other questions."
  return 'Thank you for your message! For a precise answer, our team replies through the contact form. Can I help you with CIPA or a demo?'
}
