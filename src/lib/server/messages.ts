/**
 * Messages renvoyés par les routes API aux formulaires.
 *
 * Le formulaire envoie la langue de la page (`locale`) avec sa demande ; les
 * erreurs reviennent dans cette langue et s'affichent telles quelles. Sans
 * langue lisible (requête mal formée), on répond en français, langue par
 * défaut du site.
 */

export type ApiLocale = 'fr' | 'en'

export function apiLocale(value: unknown): ApiLocale {
  return value === 'en' ? 'en' : 'fr'
}

export const API_MESSAGES = {
  fr: {
    unreadable: 'Requête illisible.',
    tooMany: 'Trop de demandes envoyées depuis cette adresse. Réessayez dans quelques minutes.',
    incomplete: 'Formulaire incomplet.',
    firstName: 'Prénom requis',
    lastName: 'Nom requis',
    email: 'Email requis',
    emailInvalid: 'Adresse email invalide',
    company: 'Société requise',
    industry: 'Sélectionnez votre industrie',
    message: 'Message requis',
    consent: 'Merci d’accepter le traitement de vos données',
    phone: 'Numéro de téléphone incomplet',
    contactFailed:
      'Impossible d’enregistrer votre demande pour le moment. Merci de réessayer ou de nous écrire directement.',
    subscribeFailed: 'Inscription impossible pour le moment. Merci de réessayer.',
  },
  en: {
    unreadable: 'Unreadable request.',
    tooMany: 'Too many requests sent from this address. Please try again in a few minutes.',
    incomplete: 'The form is incomplete.',
    firstName: 'First name is required',
    lastName: 'Last name is required',
    email: 'Email is required',
    emailInvalid: 'Invalid email address',
    company: 'Company is required',
    industry: 'Select your industry',
    message: 'Message is required',
    consent: 'Please accept the processing of your data',
    phone: 'Incomplete phone number',
    contactFailed:
      'We could not save your request right now. Please try again or email us directly.',
    subscribeFailed: 'Subscription is not possible right now. Please try again.',
  },
} satisfies Record<ApiLocale, Record<string, string>>
