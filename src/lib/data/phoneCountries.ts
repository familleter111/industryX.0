/**
 * Pays du champ téléphone — FICHIER GÉNÉRÉ, ne pas éditer à la main.
 *
 * Source : `npm run gen:countries` (scripts/gen-countries.mjs), qui lit les
 * métadonnées de libphonenumber-js et les noms français d'Intl.DisplayNames.
 *
 * `mask` est le gabarit national, indicatif exclu : '#' vaut un chiffre, tout
 * le reste est un séparateur littéral. Un gabarit vide veut dire « aucun
 * format connu » — le champ laisse alors saisir librement.
 */

export type PhoneCountry = {
  /** ISO 3166-1 alpha-2, en majuscules. Drapeau : /flags/<iso minuscule>.png */
  iso: string
  /** Nom français, tel qu'affiché dans la liste. */
  name: string
  /** Indicatif, sans le « + ». */
  dial: string
  /** Gabarit national : '## ### ###'. Vide si inconnu. */
  mask: string
  /** Numéro d'exemple formaté, utilisé comme placeholder. */
  example: string
  /** Préfixe interurbain à retirer en international. Vide si le pays n'en a pas. */
  trunk: string
}

export type PhoneCountryGroup = {
  label: string
  countries: PhoneCountry[]
}

export const PHONE_COUNTRY_GROUPS: PhoneCountryGroup[] = [
  {
    label: 'Pays fréquents',
    countries: [
      { iso: 'TN', name: 'Tunisie', dial: '216', mask: '## ### ###', example: '20 123 456', trunk: '' },
      { iso: 'FR', name: 'France', dial: '33', mask: '# ## ## ## ##', example: '6 12 34 56 78', trunk: '0' },
      { iso: 'ES', name: 'Espagne', dial: '34', mask: '### ## ## ##', example: '612 34 56 78', trunk: '' },
      { iso: 'IT', name: 'Italie', dial: '39', mask: '### ### ####', example: '312 345 6789', trunk: '' },
      { iso: 'DE', name: 'Allemagne', dial: '49', mask: '#### #######', example: '1512 3456789', trunk: '0' },
    ],
  },
  {
    label: 'Afrique',
    countries: [
      { iso: 'ZA', name: 'Afrique du Sud', dial: '27', mask: '## ### ####', example: '71 123 4567', trunk: '0' },
      { iso: 'DZ', name: 'Algérie', dial: '213', mask: '### ## ## ##', example: '551 23 45 67', trunk: '0' },
      { iso: 'AO', name: 'Angola', dial: '244', mask: '### ### ###', example: '923 123 456', trunk: '' },
      { iso: 'BJ', name: 'Bénin', dial: '229', mask: '## ## ## ## ##', example: '01 95 12 34 56', trunk: '' },
      { iso: 'BW', name: 'Botswana', dial: '267', mask: '## ### ###', example: '71 123 456', trunk: '' },
      { iso: 'BF', name: 'Burkina Faso', dial: '226', mask: '## ## ## ##', example: '70 12 34 56', trunk: '' },
      { iso: 'BI', name: 'Burundi', dial: '257', mask: '## ## ## ##', example: '79 56 12 34', trunk: '' },
      { iso: 'CM', name: 'Cameroun', dial: '237', mask: '# ## ## ## ##', example: '6 71 23 45 67', trunk: '' },
      { iso: 'CV', name: 'Cap-Vert', dial: '238', mask: '### ## ##', example: '991 12 34', trunk: '' },
      { iso: 'KM', name: 'Comores', dial: '269', mask: '### ## ##', example: '321 23 45', trunk: '' },
      { iso: 'CG', name: 'Congo-Brazzaville', dial: '242', mask: '## ### ####', example: '06 123 4567', trunk: '' },
      { iso: 'CD', name: 'Congo-Kinshasa', dial: '243', mask: '### ### ###', example: '991 234 567', trunk: '0' },
      { iso: 'CI', name: 'Côte d’Ivoire', dial: '225', mask: '## ## ## ####', example: '01 23 45 6789', trunk: '' },
      { iso: 'DJ', name: 'Djibouti', dial: '253', mask: '## ## ## ##', example: '77 83 10 01', trunk: '' },
      { iso: 'EG', name: 'Égypte', dial: '20', mask: '## ########', example: '10 01234567', trunk: '0' },
      { iso: 'ER', name: 'Érythrée', dial: '291', mask: '# ### ###', example: '7 123 456', trunk: '0' },
      { iso: 'SZ', name: 'Eswatini', dial: '268', mask: '#### ####', example: '7612 3456', trunk: '' },
      { iso: 'ET', name: 'Éthiopie', dial: '251', mask: '## ### ####', example: '91 123 4567', trunk: '0' },
      { iso: 'GA', name: 'Gabon', dial: '241', mask: '## ## ## ##', example: '06 03 12 34', trunk: '' },
      { iso: 'GM', name: 'Gambie', dial: '220', mask: '### ####', example: '301 2345', trunk: '' },
      { iso: 'GH', name: 'Ghana', dial: '233', mask: '## ### ####', example: '23 123 4567', trunk: '0' },
      { iso: 'GN', name: 'Guinée', dial: '224', mask: '### ## ## ##', example: '601 12 34 56', trunk: '' },
      { iso: 'GQ', name: 'Guinée équatoriale', dial: '240', mask: '### ### ###', example: '222 123 456', trunk: '' },
      { iso: 'GW', name: 'Guinée-Bissau', dial: '245', mask: '### ### ###', example: '955 012 345', trunk: '' },
      { iso: 'KE', name: 'Kenya', dial: '254', mask: '### ######', example: '712 123456', trunk: '0' },
      { iso: 'RE', name: 'La Réunion', dial: '262', mask: '### ## ## ##', example: '692 12 34 56', trunk: '0' },
      { iso: 'LS', name: 'Lesotho', dial: '266', mask: '#### ####', example: '5012 3456', trunk: '' },
      { iso: 'LR', name: 'Liberia', dial: '231', mask: '## ### ####', example: '77 012 3456', trunk: '0' },
      { iso: 'LY', name: 'Libye', dial: '218', mask: '## #######', example: '91 2345678', trunk: '0' },
      { iso: 'MG', name: 'Madagascar', dial: '261', mask: '## ## ### ##', example: '32 12 345 67', trunk: '0' },
      { iso: 'MW', name: 'Malawi', dial: '265', mask: '### ## ## ##', example: '991 23 45 67', trunk: '0' },
      { iso: 'ML', name: 'Mali', dial: '223', mask: '## ## ## ##', example: '65 01 23 45', trunk: '' },
      { iso: 'MA', name: 'Maroc', dial: '212', mask: '# ## ## ## ##', example: '6 50 12 34 56', trunk: '0' },
      { iso: 'MU', name: 'Maurice', dial: '230', mask: '#### ####', example: '5251 2345', trunk: '' },
      { iso: 'MR', name: 'Mauritanie', dial: '222', mask: '## ## ## ##', example: '22 12 34 56', trunk: '' },
      { iso: 'YT', name: 'Mayotte', dial: '262', mask: '### ## ## ##', example: '639 01 23 45', trunk: '0' },
      { iso: 'MZ', name: 'Mozambique', dial: '258', mask: '## ### ####', example: '82 123 4567', trunk: '' },
      { iso: 'NA', name: 'Namibie', dial: '264', mask: '## ### ####', example: '81 123 4567', trunk: '0' },
      { iso: 'NE', name: 'Niger', dial: '227', mask: '## ## ## ##', example: '93 12 34 56', trunk: '' },
      { iso: 'NG', name: 'Nigeria', dial: '234', mask: '### ### ####', example: '802 123 4567', trunk: '0' },
      { iso: 'UG', name: 'Ouganda', dial: '256', mask: '### ######', example: '712 345678', trunk: '0' },
      { iso: 'CF', name: 'République centrafricaine', dial: '236', mask: '## ## ## ##', example: '70 01 23 45', trunk: '' },
      { iso: 'RW', name: 'Rwanda', dial: '250', mask: '### ### ###', example: '720 123 456', trunk: '0' },
      { iso: 'ST', name: 'Sao Tomé-et-Principe', dial: '239', mask: '### ####', example: '981 2345', trunk: '' },
      { iso: 'SN', name: 'Sénégal', dial: '221', mask: '## ### ## ##', example: '70 123 45 67', trunk: '' },
      { iso: 'SC', name: 'Seychelles', dial: '248', mask: '# ### ###', example: '2 510 123', trunk: '' },
      { iso: 'SL', name: 'Sierra Leone', dial: '232', mask: '## ######', example: '25 123456', trunk: '0' },
      { iso: 'SO', name: 'Somalie', dial: '252', mask: '# #######', example: '7 1123456', trunk: '0' },
      { iso: 'SD', name: 'Soudan', dial: '249', mask: '## ### ####', example: '91 123 1234', trunk: '0' },
      { iso: 'SS', name: 'Soudan du Sud', dial: '211', mask: '### ### ###', example: '977 123 456', trunk: '0' },
      { iso: 'TZ', name: 'Tanzanie', dial: '255', mask: '### ### ###', example: '621 234 567', trunk: '0' },
      { iso: 'TD', name: 'Tchad', dial: '235', mask: '## ## ## ##', example: '63 01 23 45', trunk: '' },
      { iso: 'TG', name: 'Togo', dial: '228', mask: '## ## ## ##', example: '90 11 23 45', trunk: '' },
      { iso: 'ZM', name: 'Zambie', dial: '260', mask: '## #######', example: '95 5123456', trunk: '0' },
      { iso: 'ZW', name: 'Zimbabwe', dial: '263', mask: '## ### ####', example: '71 234 5678', trunk: '0' },
    ],
  },
  {
    label: 'Europe',
    countries: [
      { iso: 'AL', name: 'Albanie', dial: '355', mask: '## ### ####', example: '67 212 3456', trunk: '0' },
      { iso: 'AD', name: 'Andorre', dial: '376', mask: '### ###', example: '312 345', trunk: '' },
      { iso: 'AT', name: 'Autriche', dial: '43', mask: '### ######', example: '664 123456', trunk: '0' },
      { iso: 'BE', name: 'Belgique', dial: '32', mask: '### ## ## ##', example: '450 00 12 34', trunk: '0' },
      { iso: 'BY', name: 'Biélorussie', dial: '375', mask: '## ### ## ##', example: '29 491 19 11', trunk: '8' },
      { iso: 'BA', name: 'Bosnie-Herzégovine', dial: '387', mask: '## ### ###', example: '61 123 456', trunk: '0' },
      { iso: 'BG', name: 'Bulgarie', dial: '359', mask: '## ### ###', example: '43 012 345', trunk: '0' },
      { iso: 'CY', name: 'Chypre', dial: '357', mask: '## ######', example: '96 123456', trunk: '' },
      { iso: 'HR', name: 'Croatie', dial: '385', mask: '## ### ####', example: '92 123 4567', trunk: '0' },
      { iso: 'DK', name: 'Danemark', dial: '45', mask: '## ## ## ##', example: '34 41 23 45', trunk: '' },
      { iso: 'EE', name: 'Estonie', dial: '372', mask: '#### ####', example: '5123 4567', trunk: '' },
      { iso: 'VA', name: 'État de la Cité du Vatican', dial: '39', mask: '### ### ####', example: '312 345 6789', trunk: '' },
      { iso: 'FI', name: 'Finlande', dial: '358', mask: '## #######', example: '41 2345678', trunk: '0' },
      { iso: 'GE', name: 'Géorgie', dial: '995', mask: '### ## ## ##', example: '555 12 34 56', trunk: '0' },
      { iso: 'GI', name: 'Gibraltar', dial: '350', mask: '########', example: '57123456', trunk: '' },
      { iso: 'GR', name: 'Grèce', dial: '30', mask: '### ### ####', example: '691 234 5678', trunk: '' },
      { iso: 'HU', name: 'Hongrie', dial: '36', mask: '## ### ####', example: '20 123 4567', trunk: '06' },
      { iso: 'FO', name: 'Îles Féroé', dial: '298', mask: '## ## ##', example: '21 12 34', trunk: '' },
      { iso: 'IE', name: 'Irlande', dial: '353', mask: '## ### ####', example: '85 012 3456', trunk: '0' },
      { iso: 'IS', name: 'Islande', dial: '354', mask: '### ####', example: '611 1234', trunk: '' },
      { iso: 'XK', name: 'Kosovo', dial: '383', mask: '## ### ###', example: '43 201 234', trunk: '0' },
      { iso: 'LV', name: 'Lettonie', dial: '371', mask: '## ### ###', example: '21 234 567', trunk: '' },
      { iso: 'LI', name: 'Liechtenstein', dial: '423', mask: '### ### ###', example: '660 234 567', trunk: '0' },
      { iso: 'LT', name: 'Lituanie', dial: '370', mask: '### #####', example: '612 34567', trunk: '0' },
      { iso: 'LU', name: 'Luxembourg', dial: '352', mask: '### ### ###', example: '628 123 456', trunk: '' },
      { iso: 'MK', name: 'Macédoine du Nord', dial: '389', mask: '## ### ###', example: '72 345 678', trunk: '0' },
      { iso: 'MT', name: 'Malte', dial: '356', mask: '#### ####', example: '9696 1234', trunk: '' },
      { iso: 'MD', name: 'Moldavie', dial: '373', mask: '### ## ###', example: '621 12 345', trunk: '0' },
      { iso: 'MC', name: 'Monaco', dial: '377', mask: '# ## ## ## ##', example: '6 12 34 56 78', trunk: '0' },
      { iso: 'ME', name: 'Monténégro', dial: '382', mask: '## ### ###', example: '60 123 456', trunk: '0' },
      { iso: 'NO', name: 'Norvège', dial: '47', mask: '## ## ## ##', example: '40 61 23 45', trunk: '' },
      { iso: 'NL', name: 'Pays-Bas', dial: '31', mask: '# ########', example: '6 12345678', trunk: '0' },
      { iso: 'PL', name: 'Pologne', dial: '48', mask: '### ### ###', example: '512 345 678', trunk: '' },
      { iso: 'PT', name: 'Portugal', dial: '351', mask: '### ### ###', example: '912 345 678', trunk: '' },
      { iso: 'RO', name: 'Roumanie', dial: '40', mask: '### ### ###', example: '712 034 567', trunk: '0' },
      { iso: 'GB', name: 'Royaume-Uni', dial: '44', mask: '#### ######', example: '7400 123456', trunk: '0' },
      { iso: 'RU', name: 'Russie', dial: '7', mask: '### ### ## ##', example: '912 345 67 89', trunk: '8' },
      { iso: 'SM', name: 'Saint-Marin', dial: '378', mask: '## ## ## ##', example: '66 66 12 12', trunk: '' },
      { iso: 'RS', name: 'Serbie', dial: '381', mask: '## #######', example: '60 1234567', trunk: '0' },
      { iso: 'SK', name: 'Slovaquie', dial: '421', mask: '### ### ###', example: '912 123 456', trunk: '0' },
      { iso: 'SI', name: 'Slovénie', dial: '386', mask: '## ### ###', example: '31 234 567', trunk: '0' },
      { iso: 'SE', name: 'Suède', dial: '46', mask: '## ### ## ##', example: '70 123 45 67', trunk: '0' },
      { iso: 'CH', name: 'Suisse', dial: '41', mask: '## ### ## ##', example: '78 123 45 67', trunk: '0' },
      { iso: 'CZ', name: 'Tchéquie', dial: '420', mask: '### ### ###', example: '601 123 456', trunk: '' },
      { iso: 'UA', name: 'Ukraine', dial: '380', mask: '## ### ####', example: '50 123 4567', trunk: '0' },
    ],
  },
  {
    label: 'Moyen-Orient',
    countries: [
      { iso: 'SA', name: 'Arabie saoudite', dial: '966', mask: '## ### ####', example: '51 234 5678', trunk: '0' },
      { iso: 'BH', name: 'Bahreïn', dial: '973', mask: '#### ####', example: '3600 1234', trunk: '' },
      { iso: 'AE', name: 'Émirats arabes unis', dial: '971', mask: '## ### ####', example: '50 123 4567', trunk: '0' },
      { iso: 'IQ', name: 'Irak', dial: '964', mask: '### ### ####', example: '791 234 5678', trunk: '0' },
      { iso: 'IR', name: 'Iran', dial: '98', mask: '### ### ####', example: '912 345 6789', trunk: '0' },
      { iso: 'IL', name: 'Israël', dial: '972', mask: '## ### ####', example: '50 234 5678', trunk: '0' },
      { iso: 'JO', name: 'Jordanie', dial: '962', mask: '# #### ####', example: '7 9012 3456', trunk: '0' },
      { iso: 'KW', name: 'Koweït', dial: '965', mask: '### #####', example: '500 12345', trunk: '' },
      { iso: 'LB', name: 'Liban', dial: '961', mask: '## ### ###', example: '71 123 456', trunk: '0' },
      { iso: 'OM', name: 'Oman', dial: '968', mask: '#### ####', example: '9212 3456', trunk: '' },
      { iso: 'QA', name: 'Qatar', dial: '974', mask: '#### ####', example: '3312 3456', trunk: '' },
      { iso: 'SY', name: 'Syrie', dial: '963', mask: '### ### ###', example: '944 567 890', trunk: '0' },
      { iso: 'PS', name: 'Territoires palestiniens', dial: '970', mask: '### ### ###', example: '599 123 456', trunk: '0' },
      { iso: 'TR', name: 'Turquie', dial: '90', mask: '### ### ## ##', example: '501 234 56 78', trunk: '0' },
      { iso: 'YE', name: 'Yémen', dial: '967', mask: '### ### ###', example: '712 345 678', trunk: '0' },
    ],
  },
  {
    label: 'Amériques',
    countries: [
      { iso: 'AR', name: 'Argentine', dial: '54', mask: '# ## #### ####', example: '9 11 2345 6789', trunk: '0' },
      { iso: 'BS', name: 'Bahamas', dial: '1', mask: '### ### ####', example: '242 359 1234', trunk: '1' },
      { iso: 'BB', name: 'Barbade', dial: '1', mask: '### ### ####', example: '246 250 1234', trunk: '1' },
      { iso: 'BZ', name: 'Belize', dial: '501', mask: '### ####', example: '622 1234', trunk: '' },
      { iso: 'BO', name: 'Bolivie', dial: '591', mask: '########', example: '71234567', trunk: '0' },
      { iso: 'BR', name: 'Brésil', dial: '55', mask: '## ##### ####', example: '11 96123 4567', trunk: '0' },
      { iso: 'CA', name: 'Canada', dial: '1', mask: '### ### ####', example: '506 234 5678', trunk: '1' },
      { iso: 'CL', name: 'Chili', dial: '56', mask: '# #### ####', example: '2 2123 4567', trunk: '' },
      { iso: 'CO', name: 'Colombie', dial: '57', mask: '### #######', example: '321 1234567', trunk: '0' },
      { iso: 'CR', name: 'Costa Rica', dial: '506', mask: '#### ####', example: '8312 3456', trunk: '' },
      { iso: 'CU', name: 'Cuba', dial: '53', mask: '# #######', example: '5 1234567', trunk: '0' },
      { iso: 'EC', name: 'Équateur', dial: '593', mask: '## ### ####', example: '99 123 4567', trunk: '0' },
      { iso: 'US', name: 'États-Unis', dial: '1', mask: '### ### ####', example: '201 555 0123', trunk: '1' },
      { iso: 'GP', name: 'Guadeloupe', dial: '590', mask: '### ## ## ##', example: '690 00 12 34', trunk: '0' },
      { iso: 'GT', name: 'Guatemala', dial: '502', mask: '#### ####', example: '5123 4567', trunk: '' },
      { iso: 'GF', name: 'Guyane française', dial: '594', mask: '### ## ## ##', example: '694 20 12 34', trunk: '0' },
      { iso: 'HT', name: 'Haïti', dial: '509', mask: '## ## ####', example: '34 10 1234', trunk: '' },
      { iso: 'HN', name: 'Honduras', dial: '504', mask: '#### ####', example: '9123 4567', trunk: '' },
      { iso: 'JM', name: 'Jamaïque', dial: '1', mask: '### ### ####', example: '876 210 1234', trunk: '1' },
      { iso: 'MQ', name: 'Martinique', dial: '596', mask: '### ## ## ##', example: '696 20 12 34', trunk: '0' },
      { iso: 'MX', name: 'Mexique', dial: '52', mask: '### ### ####', example: '222 123 4567', trunk: '' },
      { iso: 'NI', name: 'Nicaragua', dial: '505', mask: '#### ####', example: '8123 4567', trunk: '' },
      { iso: 'PA', name: 'Panama', dial: '507', mask: '#### ####', example: '6123 4567', trunk: '' },
      { iso: 'PY', name: 'Paraguay', dial: '595', mask: '### ######', example: '961 456789', trunk: '0' },
      { iso: 'PE', name: 'Pérou', dial: '51', mask: '### ### ###', example: '912 345 678', trunk: '0' },
      { iso: 'PR', name: 'Porto Rico', dial: '1', mask: '### ### ####', example: '787 234 5678', trunk: '1' },
      { iso: 'DO', name: 'République dominicaine', dial: '1', mask: '### ### ####', example: '809 234 5678', trunk: '1' },
      { iso: 'SV', name: 'Salvador', dial: '503', mask: '#### ####', example: '7012 3456', trunk: '' },
      { iso: 'TT', name: 'Trinité-et-Tobago', dial: '1', mask: '### ### ####', example: '868 291 1234', trunk: '1' },
      { iso: 'UY', name: 'Uruguay', dial: '598', mask: '## ### ###', example: '94 231 234', trunk: '0' },
      { iso: 'VE', name: 'Venezuela', dial: '58', mask: '### #######', example: '412 1234567', trunk: '0' },
    ],
  },
  {
    label: 'Asie',
    countries: [
      { iso: 'AF', name: 'Afghanistan', dial: '93', mask: '## ### ####', example: '70 123 4567', trunk: '0' },
      { iso: 'AM', name: 'Arménie', dial: '374', mask: '## ######', example: '77 123456', trunk: '0' },
      { iso: 'AZ', name: 'Azerbaïdjan', dial: '994', mask: '## ### ## ##', example: '40 123 45 67', trunk: '0' },
      { iso: 'BD', name: 'Bangladesh', dial: '880', mask: '#### ######', example: '1812 345678', trunk: '0' },
      { iso: 'BT', name: 'Bhoutan', dial: '975', mask: '## ## ## ##', example: '17 12 34 56', trunk: '' },
      { iso: 'BN', name: 'Brunei', dial: '673', mask: '### ####', example: '712 3456', trunk: '' },
      { iso: 'KH', name: 'Cambodge', dial: '855', mask: '## ### ###', example: '91 234 567', trunk: '0' },
      { iso: 'CN', name: 'Chine', dial: '86', mask: '### #### ####', example: '131 2345 6789', trunk: '0' },
      { iso: 'KR', name: 'Corée du Sud', dial: '82', mask: '## #### ####', example: '10 2000 0000', trunk: '0' },
      { iso: 'IN', name: 'Inde', dial: '91', mask: '##### #####', example: '81234 56789', trunk: '0' },
      { iso: 'ID', name: 'Indonésie', dial: '62', mask: '### ### ###', example: '812 345 678', trunk: '0' },
      { iso: 'JP', name: 'Japon', dial: '81', mask: '## #### ####', example: '90 1234 5678', trunk: '0' },
      { iso: 'KZ', name: 'Kazakhstan', dial: '7', mask: '### ### ####', example: '771 000 9998', trunk: '8' },
      { iso: 'KG', name: 'Kirghizstan', dial: '996', mask: '### ### ###', example: '700 123 456', trunk: '0' },
      { iso: 'LA', name: 'Laos', dial: '856', mask: '## ## ### ###', example: '20 23 123 456', trunk: '0' },
      { iso: 'MY', name: 'Malaisie', dial: '60', mask: '## ### ####', example: '12 345 6789', trunk: '0' },
      { iso: 'MV', name: 'Maldives', dial: '960', mask: '### ####', example: '771 2345', trunk: '' },
      { iso: 'MN', name: 'Mongolie', dial: '976', mask: '#### ####', example: '8812 3456', trunk: '0' },
      { iso: 'MM', name: 'Myanmar (Birmanie)', dial: '95', mask: '# ### ####', example: '9 212 3456', trunk: '0' },
      { iso: 'NP', name: 'Népal', dial: '977', mask: '### #######', example: '984 1234567', trunk: '0' },
      { iso: 'UZ', name: 'Ouzbékistan', dial: '998', mask: '## ### ## ##', example: '91 234 56 78', trunk: '' },
      { iso: 'PK', name: 'Pakistan', dial: '92', mask: '### #######', example: '301 2345678', trunk: '0' },
      { iso: 'PH', name: 'Philippines', dial: '63', mask: '### ### ####', example: '905 123 4567', trunk: '0' },
      { iso: 'HK', name: 'R.A.S. chinoise de Hong Kong', dial: '852', mask: '#### ####', example: '5123 4567', trunk: '' },
      { iso: 'MO', name: 'R.A.S. chinoise de Macao', dial: '853', mask: '#### ####', example: '6612 3456', trunk: '' },
      { iso: 'SG', name: 'Singapour', dial: '65', mask: '#### ####', example: '8123 4567', trunk: '' },
      { iso: 'LK', name: 'Sri Lanka', dial: '94', mask: '## ### ####', example: '71 234 5678', trunk: '0' },
      { iso: 'TJ', name: 'Tadjikistan', dial: '992', mask: '## ### ####', example: '91 712 3456', trunk: '' },
      { iso: 'TW', name: 'Taïwan', dial: '886', mask: '### ### ###', example: '912 345 678', trunk: '0' },
      { iso: 'TH', name: 'Thaïlande', dial: '66', mask: '## ### ####', example: '81 234 5678', trunk: '0' },
      { iso: 'TM', name: 'Turkménistan', dial: '993', mask: '## ######', example: '66 123456', trunk: '8' },
      { iso: 'VN', name: 'Viêt Nam', dial: '84', mask: '### ### ###', example: '912 345 678', trunk: '0' },
    ],
  },
  {
    label: 'Océanie',
    countries: [
      { iso: 'AU', name: 'Australie', dial: '61', mask: '### ### ###', example: '412 345 678', trunk: '0' },
      { iso: 'FJ', name: 'Fidji', dial: '679', mask: '### ####', example: '701 2345', trunk: '' },
      { iso: 'SB', name: 'Îles Salomon', dial: '677', mask: '## #####', example: '74 21234', trunk: '' },
      { iso: 'NC', name: 'Nouvelle-Calédonie', dial: '687', mask: '## ## ##', example: '75 12 34', trunk: '' },
      { iso: 'NZ', name: 'Nouvelle-Zélande', dial: '64', mask: '## ### ####', example: '21 123 4567', trunk: '0' },
      { iso: 'PG', name: 'Papouasie-Nouvelle-Guinée', dial: '675', mask: '#### ####', example: '7012 3456', trunk: '' },
      { iso: 'PF', name: 'Polynésie française', dial: '689', mask: '## ## ## ##', example: '87 12 34 56', trunk: '' },
      { iso: 'WS', name: 'Samoa', dial: '685', mask: '## #####', example: '72 12345', trunk: '' },
      { iso: 'VU', name: 'Vanuatu', dial: '678', mask: '### ####', example: '591 2345', trunk: '' },
    ],
  },
]

/** Liste à plat, dans l'ordre d'affichage. */
export const PHONE_COUNTRIES: PhoneCountry[] = PHONE_COUNTRY_GROUPS.flatMap(
  (group) => group.countries,
)

/** Le siège est en Tunisie : c'est le pays proposé par défaut. */
export const DEFAULT_PHONE_COUNTRY = 'TN'

export function findPhoneCountry(iso: string): PhoneCountry | undefined {
  return PHONE_COUNTRIES.find((country) => country.iso === iso)
}
