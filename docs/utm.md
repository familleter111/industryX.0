# Campagnes : UTM, QR codes et URL dédiées

Le site lit à l'arrivée `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`,
`utm_term` et `ref`. Ces valeurs suivent le visiteur dans PostHog, puis dans la ligne
Excel de sa demande de démo (colonnes `utm_*`, `ref`, `Première visite`).
Le code est dans `src/lib/analytics/attribution.ts`.

Les valeurs sont mises en minuscules et coupées à 100 caractères. N'utiliser que des
lettres, des chiffres et des tirets, sans espace ni accent.

## Convention

| Paramètre | Rôle | Valeurs |
|---|---|---|
| `utm_source` | Qui envoie le visiteur | `linkedin`, `facebook`, `radio-<station>`, `event-<salon>`, `newsletter`, `partner-<nom>` |
| `utm_medium` | Type de canal | `social` (organique), `paid` (sponsorisé), `audio`, `print` (flyer, kakémono, QR), `email`, `referral` |
| `utm_campaign` | L'opération | `<sujet>-<aaaa-mm>` : `salon-sifp-2026-11`, `lancement-cipa-2026-10` |
| `utm_content` | La variante (facultatif) | `video`, `carrousel`, `visuel-a`, `visuel-b` |
| `utm_term` | Mot-clé (facultatif, pub search) | |
| `ref` | Le support physique précis | `stand12`, `flyer-a5`, `kakemono`, `spot-30s` |

`ref` distingue deux QR codes d'une même campagne : celui du stand et celui du flyer.

## Exemples

```
# Post LinkedIn sponsorisé
https://www.industryx0.pro/?utm_source=linkedin&utm_medium=paid&utm_campaign=lancement-cipa-2026-10&utm_content=video

# QR code du stand, salon SIFP
https://www.industryx0.pro/?utm_source=event-sifp&utm_medium=print&utm_campaign=salon-sifp-2026-11&ref=stand12

# Spot radio : URL courte annoncée à l'antenne, redirigée vers
https://www.industryx0.pro/?utm_source=radio-mosaique&utm_medium=audio&utm_campaign=notoriete-2026-11&ref=spot-30s
```

Pour la radio, annoncer une adresse courte (`industryx0.pro/radio`) que le DNS ou le
serveur redirige vers l'URL complète. Personne ne retient des UTM à l'oral.

## Lire les résultats

- **PostHog** : la colonne de propriétés `utm_source` / `utm_campaign` existe d'office
  (PostHog lit les UTM tout seul). `ref` est enregistré comme propriété de tous les
  événements de la visite.
- **Excel** (`data/contacts.xlsx`) : `utm_source`, `utm_medium` et `utm_campaign`
  donnent la dernière source avant la demande, `Première visite` la toute première, et
  `ID PostHog` retrouve le parcours complet (PostHog → Persons → rechercher l'ID).

Un visiteur qui a refusé la mesure d'audience garde son attribution le temps de sa visite
(en mémoire). Elle est jointe à sa demande, mais rien n'est stocké sur son appareil et
PostHog ne reçoit rien.
