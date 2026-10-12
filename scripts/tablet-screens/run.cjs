/**
 * Versions tablette paysage des captures du carrousel d'accueil.
 *
 *   npm run gen:tablet                       # les six captures de features.ts
 *   npm run gen:tablet -- ecran-deviations-nc.png
 *
 * Chaque capture téléphone (public/ecran-*.png, 1170 x 2532) est recomposée
 * dans compose.html : en-tête étalé sur toute la largeur, cartes réparties en
 * deux colonnes, barre d'onglets centrée, barre d'accueil iPhone retirée.
 * Résultat : public/ecran-*-tablette.webp, 1600 x 1200.
 *
 * Le dessin se fait dans Chrome (canvas) : aucune bibliothèque d'image à
 * installer. Chemin de Chrome : variable CHROME, sinon l'emplacement Windows
 * par défaut. Toujours vérifier le résultat à l'œil (voir CUTS).
 */
const http = require('http'), fs = require('fs'), path = require('path'), { execFile } = require('child_process'), { promisify } = require('util')
const HERE = __dirname, ROOT = path.resolve(HERE, '../..')
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const files = process.argv.length > 2 ? process.argv.slice(2) : fs.readdirSync(path.join(ROOT, 'public')).filter((f) => /^ecran-.*.png$/.test(f))
// Lignes de coupe (en px de la capture) quand l'ombre d'une carte rejoint le
// fondu de la suivante : la détection automatique les fusionnerait.
const CUTS = { 'ecran-inspections-qualite.png': '866', 'ecran-amelioration-continue.png': '1200' }
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://x')
  const file = url.pathname.startsWith('/public/') ? path.join(ROOT, decodeURIComponent(url.pathname)) : path.join(HERE, 'compose.html')
  fs.readFile(file, (err, data) => { if (err) { res.writeHead(404); return res.end() } res.writeHead(200); res.end(data) })
}).listen(4789, async () => {
  for (const f of files) {
    const { stdout: html } = await promisify(execFile)(CHROME, ['--headless=new', '--disable-gpu', '--virtual-time-budget=10000', '--dump-dom', `http://localhost:4789/c?src=${encodeURIComponent(f)}&cuts=${CUTS[f] || ''}`], { encoding: 'utf8', maxBuffer: 1 << 28 })
    const text = html.match(/<pre id="out">([\s\S]*?)<\/pre>/)[1]
    const [log, uri] = text.split('\n')
    if (!uri) { console.log(f, log); continue }
    const out = path.join(ROOT, 'public', f.replace(/\.png$/, '-tablette.webp'))
    fs.writeFileSync(out, Buffer.from(uri.split(',')[1], 'base64'))
    console.log(path.basename(out), Math.round(fs.statSync(out).size / 1024) + 'Ko', log)
  }
  server.close()
})
