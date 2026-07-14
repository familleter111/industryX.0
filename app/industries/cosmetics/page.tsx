'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Zap,
  BrainCircuit,
  Workflow,
  Factory,
  CheckCircle2,
  AlertTriangle,
  LineChart,
  Network,
  Cpu,
  BarChart3,
  TrendingUp,
  Activity,
  FolderKanban,
  FileSpreadsheet,
  Gauge,
  Leaf,
  ClipboardCheck
} from 'lucide-react'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// Définition des animations réutilisables
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
}

export default function CosmeticsPage() {
  const [activeTab, setActiveTab] = useState<'line' | 'bar'>('line')
  const [hoveredTrace, setHoveredTrace] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-[#F7F7F6] text-dark overflow-x-hidden font-body selection:bg-gold/30 selection:text-gold-900">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-mesh-light">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#B6842B]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-[11px] font-bold uppercase tracking-widest text-[#B6842B] mb-6"
              >
                <Zap size={12} className="text-gold" />
                {"Secteur d'activité"}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-dark tracking-tight leading-[1.08] mb-6"
              >
                {"Comment CIPA transforme l'industrie"}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-[#C47E1A] to-[#9E5F18]">
                  {"cosmétique & des dispositifs médicaux"}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[15px] sm:text-[17px] leading-relaxed text-slate-600 mb-8 max-w-2xl"
              >
                {"La fabrication de dispositifs médicaux et de cosmétiques exige une rigueur opérationnelle et une traçabilité totale. CIPA fournit une plateforme digitale complète pour standardiser vos opérations en salle blanche, assurer la conformité aux normes ISO 13485 & ISO 22716, optimiser l'efficacité globale et garantir la sécurité des produits."}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-[#111827] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-black"
                >
                  Demander une démo
                  <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <a
                  href="#value-prop"
                  className="group inline-flex items-center gap-2 rounded-full border border-slate-350 bg-white/60 px-6 py-3.5 text-sm font-semibold text-[#44403C] backdrop-blur transition-all duration-300 hover:border-gold hover:bg-white"
                >
                  Découvrir les solutions
                  <ChevronRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </motion.div>
            </div>

            {/* Right Circular Photo Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center lg:justify-end relative"
            >
              {/* Outer Decorative Rings */}
              <div className="absolute -inset-4 border border-dashed border-gold/20 rounded-full animate-[spin_100s_linear_infinite]" />
              <div className="absolute -inset-10 border border-gold/10 rounded-full pointer-events-none" />

              <div className="relative w-[340px] h-[340px] sm:w-[400px] sm:h-[400px] rounded-full overflow-hidden border-[6px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
                <Image
                  src="/Secteur/cosmetics_hero.png"
                  alt="Production cosmétique et dispositif médical Industry X.0"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-2 -left-2 bg-white/90 backdrop-blur border border-gold/30 rounded-2xl p-4 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Normes ISO</div>
                  <div className="text-sm font-extrabold text-dark">ISO 13485 & 22716 Validé</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. STATS OVERVIEW SECTION */}
      <section className="py-12 border-y border-[#ECE7DD] bg-[#F1EFE9]/40 relative z-25">
        <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: '90%', label: 'Réduction du temps de préparation des audits', desc: 'Rapports d’audit instantanés et traçabilité documentaire à tout moment pour la FDA et l’ISO.' },
              { value: '30%', label: 'Baisse du taux de rebuts et défauts produits', desc: 'Détection précoce des anomalies en ligne grâce aux fiches de contrôle intelligentes par IA.' },
              { value: '30%', label: 'Augmentation de l’efficacité opérationnelle', desc: 'Digitalisation des dossiers de lot, checklists automatisées et réduction drastique des goulots d’étranglement.' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col justify-between"
              >
                <div>
                  <div className="text-4xl sm:text-5xl font-black font-display text-gold mb-2">{stat.value}</div>
                  <div className="text-sm font-bold text-dark mb-2 tracking-tight">{stat.label}</div>
                  <p className="text-xs leading-relaxed text-slate-500">{stat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. VALUE PROPOSITIONS SECTION */}
      <section id="value-prop" className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-7 lg:px-8">
          {/* Section title */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-dark tracking-tight mb-4">
              {"Pilotez la conformité et l'excellence dans vos usines"}
            </h2>
            <p className="text-[15px] sm:text-[16px] text-slate-500 leading-relaxed">
              {"Sélectionnez un élément pour voir comment CIPA résout les défis standards de l'industrie et les mesures en pourcentage d'amélioration des performances."}
            </p>
          </div>

          <div className="flex flex-col gap-28">
            {/* SECTION 1: CONFORMITÉ RÉGLEMENTAIRE (SCHEMA) */}
            <motion.div {...fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 flex flex-col justify-center">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B6842B] mb-3">Conformité & Normes</span>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-[#111827] tracking-tight mb-5">
                  1. Renforcer la conformité réglementaire
                </h3>
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-6">
                  {"La conformité réglementaire est cruciale dans la fabrication moderne de dispositifs médicaux et de cosmétiques. CIPA fournit des outils pour standardiser les procédures, garantir l'intégrité des données (ALCOA+) et suivre les indicateurs de conformité. Documentez et auditez facilement vos processus pour répondre aux normes industrielles et exigences réglementaires (ISO 13485, ISO 22716, FDA 21 CFR Part 820)."}
                </p>

                {/* Sub-KPI Box */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm">
                    <div className="text-2xl font-bold font-display text-gold">90%</div>
                    <div className="text-[11px] text-slate-500 mt-1">{"d'état de préparation aux audits"}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm">
                    <div className="text-2xl font-bold font-display text-gold">40%</div>
                    <div className="text-[11px] text-slate-500 mt-1">de réduction du temps de préparation</div>
                  </div>
                </div>

                {/* Comparison block from image */}
                <div className="mb-6 p-4 rounded-xl bg-[#FAF9F5] border border-[#ECE7DD] text-xs space-y-2">
                  <div className="text-[#9E5F18] font-bold">{"Sans CIPA :"}</div>
                  <p className="text-slate-500">{"Les processus manuels rendent la préparation des audits complexe et exposent aux risques de non-conformité."}</p>
                  <div className="text-emerald-700 font-bold pt-1">{"Avec CIPA :"}</div>
                  <p className="text-slate-500">{"Des rapports automatisés et une traçabilité numérique complète permettent d'être prêt pour un audit à tout moment."}</p>
                </div>

                <div className="flex gap-4">
                  <a href="/solutions/quality" className="inline-flex items-center text-xs font-bold text-gold hover:text-[#C47E1A] transition-colors">
                    Explorer la conformité <ChevronRight size={14} className="ml-1" />
                  </a>
                  <span className="text-slate-350 text-xs">|</span>
                  <a href="/contact" className="inline-flex items-center text-xs font-bold text-dark hover:text-black transition-colors">
                    Demander une démo <ChevronRight size={14} className="ml-1" />
                  </a>
                </div>
              </div>

              {/* SCHEMA PLACEHOLDER */}
              <div className="lg:col-span-6">
                <div className="bg-white rounded-3xl border border-black/[0.06] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">SCHEMA — Validation ISO 13485 & 22716</span>
                    </div>
                    <span className="text-[10px] bg-[#F5F5F4] text-slate-500 font-bold px-2 py-0.5 rounded-full">Interactif</span>
                  </div>

                  {/* SVG Diagram workflow */}
                  <div className="relative py-6 flex flex-col gap-6">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-50 via-transparent to-transparent opacity-50" />
                    
                    {/* Node 1 */}
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="relative z-10 flex items-center gap-4 bg-slate-50/80 border border-slate-200/80 rounded-xl p-3.5 shadow-sm"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gold/10 text-gold flex items-center justify-center font-bold text-xs shrink-0">
                        1
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-dark">Validation Dossier Technique (DHF/DMR)</h4>
                        <p className="text-[10px] text-slate-500 truncate">{"Vérification des spécifications matières et conformité design"}</p>
                      </div>
                      <ShieldCheck size={18} className="text-emerald-500 shrink-0" />
                    </motion.div>

                    {/* Dotted connector */}
                    <div className="flex justify-center my-[-10px] z-0">
                      <div className="h-6 w-0.5 border-l-2 border-dashed border-slate-200" />
                    </div>

                    {/* Node 2 */}
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="relative z-10 flex items-center gap-4 bg-slate-50/80 border border-gold/30 rounded-xl p-3.5 shadow-sm"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gold/10 text-gold flex items-center justify-center font-bold text-xs shrink-0">
                        2
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-dark">Inspection Ligne Salle Blanche</h4>
                        <p className="text-[10px] text-slate-500 truncate">{"Vérification particulaire et validation de l'étiquetage UDI"}</p>
                      </div>
                      <div className="text-[10px] font-bold text-gold px-2 py-0.5 bg-gold/10 rounded-full shrink-0">En cours</div>
                    </motion.div>

                    {/* Dotted connector */}
                    <div className="flex justify-center my-[-10px] z-0">
                      <div className="h-6 w-0.5 border-l-2 border-dashed border-slate-200 animate-pulse" />
                    </div>

                    {/* Node 3 */}
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="relative z-10 flex items-center gap-4 bg-slate-50/80 border border-slate-200/80 rounded-xl p-3.5 shadow-sm"
                    >
                      <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-xs shrink-0">
                        3
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-450">{"Double Validation & Libération de Lot"}</h4>
                        <p className="text-[10px] text-slate-400 truncate">{"Archivage numérique et rapports de non-déviation validés"}</p>
                      </div>
                      <Workflow size={18} className="text-slate-300 shrink-0" />
                    </motion.div>
                  </div>
                  
                  <div className="mt-4 text-[10px] text-slate-400 text-center italic">
                    Figure 1 : Workflow de validation de lot sous les exigences ISO 13485.
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SECTION 2: DIGITALISATION & EFFICACITÉ (PHOTO) */}
            <motion.div {...fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* PHOTO PLACEHOLDER (Tablet/App screen simulation) */}
              <div className="lg:col-span-6 order-last lg:order-first">
                <div className="bg-[#0C0D12] rounded-3xl border border-white/10 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)] relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="w-3 h-3 rounded-full bg-yellow-500" />
                      <span className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider ml-2">PHOTO/MOCKUP — Interface Tablette Opérateur</span>
                    </div>
                  </div>

                  {/* Tablet Interface Mock */}
                  <div className="bg-[#141520] rounded-2xl p-4 border border-white/5 text-white flex flex-col gap-4">
                    {/* Header */}
                    <div className="flex justify-between items-center bg-[#1a1b24] p-3 rounded-xl">
                      <div>
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Ordre de Fabrication</div>
                        <div className="text-xs font-black text-white">OF-2026-COSM-L1-089</div>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Ligne active
                      </div>
                    </div>

                    {/* Content split */}
                    <div className="grid grid-cols-12 gap-3">
                      <div className="col-span-7 bg-[#1a1b24] p-3 rounded-xl">
                        <div className="text-[9px] text-slate-450 font-bold uppercase tracking-wider mb-2">{"Instructions d'Assemblage"}</div>
                        <ol className="text-[10px] text-slate-300 list-decimal list-inside space-y-1.5 leading-tight">
                          <li>{"Vérifier le nettoyage de la cuve / trémie"}</li>
                          <li>{"Scanner le code UDI du composant stérile"}</li>
                          <li>{"Lancer le cycle d'assemblage / remplissage"}</li>
                        </ol>
                      </div>

                      <div className="col-span-5 bg-[#1a1b24] p-3 rounded-xl flex flex-col justify-between">
                        <div>
                          <div className="text-[9px] text-slate-405 font-bold uppercase tracking-wider mb-1">Progression</div>
                          <div className="text-lg font-black text-gold">78%</div>
                        </div>
                        {/* Fake Progress bar */}
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-gold h-full w-[78%] rounded-full" />
                        </div>
                      </div>
                    </div>

                    {/* Confirm Button */}
                    <div className="bg-[#DAA250] hover:bg-gold text-dark text-center py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors">
                      {"Confirmer l'inspection de l'étape"}
                    </div>
                  </div>

                  <div className="mt-4 text-[10px] text-white/40 text-center italic">
                    {"Figure 2 : Application CIPA guidant l'opérateur en salle blanche stérile."}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B6842B] mb-3">Zéro Papier & Efficacité</span>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-[#111827] tracking-tight mb-5">
                  2. Efficacité renforcée par la digitalisation
                </h3>
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-6">
                  {"La digitalisation de vos opérations élimine les goulots d'étranglement liés au papier et accélère l'exécution. CIPA permet le suivi en temps réel des ordres de fabrication, l'accès à des checklists numériques et l'automatisation des workflows, conduisant à des temps de cycle réduits et une productivité accrue."}
                </p>

                {/* Sub-KPI Box */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm flex items-center gap-4">
                    <div className="text-3xl font-bold font-display text-gold">40%</div>
                    <div className="text-xs text-slate-500">{"d'augmentation de l'efficacité opérationnelle globale"}</div>
                  </div>
                </div>

                {/* Comparison block from image */}
                <div className="mb-6 p-4 rounded-xl bg-[#FAF9F5] border border-[#ECE7DD] text-xs space-y-2">
                  <div className="text-[#9E5F18] font-bold">{"Sans CIPA :"}</div>
                  <p className="text-slate-500">{"Les fiches suiveuses et rapports papier ralentissent l'exécution et augmentent les délais de traitement des dossiers de lots."}</p>
                  <div className="text-emerald-700 font-bold pt-1">{"Avec CIPA :"}</div>
                  <p className="text-slate-500">{"La digitalisation des instructions et le suivi en temps réel maximisent le débit et éliminent les goulots d'étranglement."}</p>
                </div>

                <div className="flex gap-4">
                  <a href="/solutions/production" className="inline-flex items-center text-xs font-bold text-gold hover:text-[#C47E1A] transition-colors">
                    Explorer nos solutions digitales <ChevronRight size={14} className="ml-1" />
                  </a>
                  <span className="text-slate-350 text-xs">|</span>
                  <a href="/contact" className="inline-flex items-center text-xs font-bold text-dark hover:text-black transition-colors">
                    Demander une démo <ChevronRight size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* SECTION 3: ANALYSES & IA (GRAPH) */}
            <motion.div {...fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B6842B] mb-3">Intelligence Artificielle</span>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-[#111827] tracking-tight mb-5">
                  {"3. Analyses avancées et IA pour l'amélioration continue"}
                </h3>
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-6">
                  {"Accédez à des tableaux de bord en temps réel et à des insights basés sur l'IA pour surveiller les performances des machines et anticiper les besoins de maintenance. Utilisez les données pour optimiser la planification de la production, minimiser les temps d'arrêt et prendre des décisions éclairées."}
                </p>

                {/* Sub-KPI Box */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm">
                    <div className="text-2xl font-bold font-display text-gold">60%</div>
                    <div className="text-[11px] text-slate-500 mt-1">{"de réduction des temps d'arrêt machines"}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm">
                    <div className="text-2xl font-bold font-display text-gold">15%</div>
                    <div className="text-[11px] text-slate-500 mt-1">{"d'augmentation du rendement de production"}</div>
                  </div>
                </div>

                {/* Comparison block from image */}
                <div className="mb-6 p-4 rounded-xl bg-[#FAF9F5] border border-[#ECE7DD] text-xs space-y-2">
                  <div className="text-[#9E5F18] font-bold">{"Sans CIPA :"}</div>
                  <p className="text-slate-500">{"Une approche réactive des pannes entraîne des arrêts imprévus coûteux et perturbe les livraisons clients."}</p>
                  <div className="text-emerald-700 font-bold pt-1">{"Avec CIPA :"}</div>
                  <p className="text-slate-500">{"La maintenance prédictive et le suivi d'indicateurs par l'IA augmentent la disponibilité opérationnelle des équipements."}</p>
                </div>

                <div className="flex gap-4">
                  <a href="/platform/intelligence" className="inline-flex items-center text-xs font-bold text-gold hover:text-[#C47E1A] transition-colors">
                    {"Découvrir l'IA CIPA"} <ChevronRight size={14} className="ml-1" />
                  </a>
                  <span className="text-slate-350 text-xs">|</span>
                  <a href="/contact" className="inline-flex items-center text-xs font-bold text-dark hover:text-black transition-colors">
                    Demander une démo <ChevronRight size={14} className="ml-1" />
                  </a>
                </div>
              </div>

              {/* GRAPH PLACEHOLDER (Custom Interactive Line Chart) */}
              <div className="lg:col-span-6">
                <div className="bg-white rounded-3xl border border-black/[0.06] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">GRAPHE — Rendement Opérationnel (TRS) / Ligne Emballage</span>
                    </div>
                    {/* Toggle button */}
                    <div className="flex rounded-lg bg-slate-100 p-0.5">
                      <button
                        onClick={() => setActiveTab('line')}
                        className={`text-[9px] font-bold px-2 py-1 rounded-md transition-all ${
                          activeTab === 'line' ? 'bg-white text-dark shadow-sm' : 'text-slate-500'
                        }`}
                      >
                        Courbe
                      </button>
                      <button
                        onClick={() => setActiveTab('bar')}
                        className={`text-[9px] font-bold px-2 py-1 rounded-md transition-all ${
                          activeTab === 'bar' ? 'bg-white text-dark shadow-sm' : 'text-slate-500'
                        }`}
                      >
                        Bâtons
                      </button>
                    </div>
                  </div>

                  {/* SVG Chart area */}
                  <div className="h-48 w-full relative flex items-end">
                    {activeTab === 'line' ? (
                      <svg viewBox="0 0 400 160" className="w-full h-full">
                        {/* Axes */}
                        <line x1="20" y1="140" x2="380" y2="140" stroke="#ECE7DD" strokeWidth="1" />
                        <line x1="20" y1="10" x2="20" y2="140" stroke="#ECE7DD" strokeWidth="1" />
                        
                        {/* Y Grid Lines */}
                        <line x1="20" y1="100" x2="380" y2="100" stroke="#F5F5F4" strokeDasharray="3,3" />
                        <line x1="20" y1="60" x2="380" y2="60" stroke="#F5F5F4" strokeDasharray="3,3" />
                        <line x1="20" y1="20" x2="380" y2="20" stroke="#F5F5F4" strokeDasharray="3,3" />

                        {/* Chart Curve with Gradient Area */}
                        <defs>
                          <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#DAA250" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#DAA250" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        
                        <path
                          d="M20 120 C 50 110, 100 130, 150 80 C 200 40, 250 50, 300 25 C 350 20, 380 15, 380 15 L 380 140 L 20 140 Z"
                          fill="url(#chartGlow)"
                        />
                        <path
                          d="M20 120 C 50 110, 100 130, 150 80 C 200 40, 250 50, 300 25 C 350 20, 380 15, 380 15"
                          fill="none"
                          stroke="#DAA250"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />

                        {/* Interactive dots */}
                        {[
                          { x: 20, y: 120, val: '72%' },
                          { x: 150, y: 80, val: '80%' },
                          { x: 300, y: 25, val: '91%' },
                          { x: 380, y: 15, val: '94%' }
                        ].map((pt, i) => (
                          <g key={i}>
                            <circle
                              cx={pt.x}
                              cy={pt.y}
                              r={hoveredTrace === i ? 6 : 4}
                              className="fill-white stroke-gold stroke-[2px] transition-all cursor-pointer"
                              onMouseEnter={() => setHoveredTrace(i)}
                              onMouseLeave={() => setHoveredTrace(null)}
                            />
                            {hoveredTrace === i && (
                              <g>
                                <rect x={pt.x - 20} y={pt.y - 25} width="40" height="16" rx="4" className="fill-[#0F172A] shadow-lg" />
                                <text x={pt.x} y={pt.y - 14} textAnchor="middle" className="fill-white font-bold text-[9px]">{pt.val}</text>
                              </g>
                            )}
                          </g>
                        ))}
                      </svg>
                    ) : (
                      <div className="w-full h-full flex justify-between items-end px-4 pt-4">
                        {[
                          { label: 'Lun', val: 72 },
                          { label: 'Mar', val: 78 },
                          { label: 'Mer', val: 82 },
                          { label: 'Jeu', val: 91 },
                          { label: 'Ven', val: 89 },
                          { label: 'Sam', val: 94 }
                        ].map((d, i) => (
                          <div key={i} className="flex flex-col items-center gap-2 flex-1">
                            <div className="w-6 bg-slate-100 rounded-t-lg h-32 relative overflow-hidden flex items-end">
                              <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${d.val}%` }}
                                transition={{ duration: 0.8 }}
                                className="w-full bg-gold rounded-t-lg hover:bg-gold-600 transition-colors"
                              />
                            </div>
                            <span className="text-[9px] font-bold text-slate-400">{d.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 text-[10px] text-slate-400 text-center italic">
                    {"Figure 3 : Mesures OEE (TRS) avant et après l'intégration de CIPA."}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SECTION 4: SUPPLY CHAIN (SCHEMA) */}
            <motion.div {...fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* SCHEMA PLACEHOLDER */}
              <div className="lg:col-span-6 order-last lg:order-first">
                <div className="bg-white rounded-3xl border border-black/[0.06] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">SCHEMA — Carte Généalogique Lot & Traçabilité UDI</span>
                    </div>
                  </div>

                  {/* Supply chain diagram */}
                  <div className="py-6 flex justify-between items-center relative">
                    <div className="absolute left-4 right-4 h-0.5 border-t border-dashed border-slate-200 z-0" />
                    
                    {[
                      { icon: Network, title: 'Polymère / Actif', id: 'Lot-RAW-402' },
                      { icon: Cpu, title: 'Mélange / Extrusion', id: 'Lot-EXT-11' },
                      { icon: Activity, title: 'Conditionn. UDI', id: 'Lot-UDI-55' }
                    ].map((step, i) => {
                      const Icon = step.icon
                      return (
                        <div key={i} className="flex flex-col items-center gap-2 relative z-10">
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-11 h-11 rounded-full bg-slate-50 border border-slate-200 text-dark flex items-center justify-center shadow-md cursor-pointer hover:border-gold hover:bg-gold/5"
                          >
                            <Icon size={18} className="text-gold" />
                          </motion.div>
                          <div className="text-center">
                            <div className="text-[10px] font-bold text-dark">{step.title}</div>
                            <div className="text-[8px] text-slate-400 bg-slate-100 px-1 py-0.5 rounded font-mono mt-0.5">{step.id}</div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  
                  <div className="mt-4 text-[10px] text-slate-400 text-center italic">
                    {"Figure 4 : Suivi généalogique et sérialisation UDI (Unique Device Identifier) d'un lot."}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B6842B] mb-3">Traçabilité Supply Chain</span>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-[#111827] tracking-tight mb-5">
                  4. Améliorer la transparence de la supply chain
                </h3>
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-6">
                  {"Obtenez une visibilité complète sur votre chaîne d'approvisionnement, des matières premières à la livraison finale. Suivez les performances des fournisseurs, gérez les niveaux de stock en temps réel et assurez une livraison de produits ponctuelle et traçable."}
                </p>

                {/* Sub-KPI Box */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm">
                    <div className="text-2xl font-bold font-display text-gold">30%</div>
                    <div className="text-[11px] text-slate-500 mt-1">de réduction des délais de livraison</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm">
                    <div className="text-2xl font-bold font-display text-gold">20%</div>
                    <div className="text-[11px] text-slate-500 mt-1">de baisse des coûts de stockage</div>
                  </div>
                </div>

                {/* Comparison block from image */}
                <div className="mb-6 p-4 rounded-xl bg-[#FAF9F5] border border-[#ECE7DD] text-xs space-y-2">
                  <div className="text-[#9E5F18] font-bold">{"Sans CIPA :"}</div>
                  <p className="text-slate-500">{"Le manque de visibilité sur les flux matières accroît le risque de rupture de stock et allonge les temps de cycle."}</p>
                  <div className="text-emerald-700 font-bold pt-1">{"Avec CIPA :"}</div>
                  <p className="text-slate-500">{"Le suivi en temps réel et la généalogie des composants sécurisent l'approvisionnement et simplifient grandement les rappels."}</p>
                </div>

                <div className="flex gap-4">
                  <a href="/solutions/audits" className="inline-flex items-center text-xs font-bold text-gold hover:text-[#C47E1A] transition-colors">
                    Explorer la traçabilité <ChevronRight size={14} className="ml-1" />
                  </a>
                  <span className="text-slate-350 text-xs">|</span>
                  <a href="/contact" className="inline-flex items-center text-xs font-bold text-dark hover:text-black transition-colors">
                    Demander une démo <ChevronRight size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* SECTION 5: R&D (PHOTO/EXTRUSION DESIGN ART) */}
            <motion.div {...fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B6842B] mb-3">Co-Design & NPI</span>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-[#111827] tracking-tight mb-5">
                  {"5. Favoriser l'innovation via l'optimisation R&D"}
                </h3>
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-6">
                  {"Accélérez le cycle de développement de vos produits en collaborant sur la conception et les tests au sein d'une plateforme centralisée. Gérez les prototypes, collectez les retours et facilitez la transition de la conception vers la fabrication."}
                </p>

                {/* Sub-KPI Box */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm flex items-center gap-4">
                    <div className="text-3xl font-bold font-display text-gold">50%</div>
                    <div className="text-xs text-slate-500">{"de réduction du time-to-market pour les nouveaux produits"}</div>
                  </div>
                </div>

                {/* Comparison block from image */}
                <div className="mb-6 p-4 rounded-xl bg-[#FAF9F5] border border-[#ECE7DD] text-xs space-y-2">
                  <div className="text-[#9E5F18] font-bold">{"Sans CIPA :"}</div>
                  <p className="text-slate-500">{"Les cycles de développement cloisonnés et les documents papier retardent l'introduction de nouveaux produits (NPI)."}</p>
                  <div className="text-emerald-700 font-bold pt-1">{"Avec CIPA :"}</div>
                  <p className="text-slate-500">{"Une collaboration fluide R&D-Usine et un archivage centralisé sécurisent et accélèrent le transfert industriel."}</p>
                </div>

                <div className="flex gap-4">
                  <a href="/solutions/improvement" className="inline-flex items-center text-xs font-bold text-gold hover:text-[#C47E1A] transition-colors">
                    Optimiser le Transfert <ChevronRight size={14} className="ml-1" />
                  </a>
                  <span className="text-slate-350 text-xs">|</span>
                  <a href="/contact" className="inline-flex items-center text-xs font-bold text-dark hover:text-black transition-colors">
                    Demander une démo <ChevronRight size={14} className="ml-1" />
                  </a>
                </div>
              </div>

              {/* PHOTO/EXTRUSION SCHEMA ART */}
              <div className="lg:col-span-6">
                <div className="bg-[#141520] rounded-3xl border border-white/5 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.18)] relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white/40">PHOTO/VECTOR ART — CAO Extrudeuse / Mélangeur sous vide</span>
                    </div>
                  </div>

                  {/* Extrusion Schematic Art */}
                  <div className="relative h-48 w-full border border-white/5 rounded-2xl bg-[#0C0D12] overflow-hidden flex items-center justify-center">
                    {/* CAD Grid */}
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
                    
                    {/* SVG representing extruder CAD */}
                    <svg viewBox="0 0 300 150" className="w-full h-full opacity-70">
                      {/* Screw body */}
                      <rect x="50" y="60" width="160" height="20" rx="3" className="fill-[#1A1B24] stroke-gold stroke-[1.5px]" />
                      
                      {/* Screw threading effect */}
                      <path d="M 60 60 L 70 80 M 80 60 L 90 80 M 100 60 L 110 80 M 120 60 L 130 80 M 140 60 L 150 80 M 160 60 L 170 80 M 180 60 L 190 80 M 200 60 L 210 80" stroke="#DAA250" strokeWidth="1.5" />
                      
                      {/* Hopper feed */}
                      <polygon points="70,30 90,30 85,60 75,60" className="fill-[#2B2D3A] stroke-slate-500" />
                      
                      {/* Die & cooling tank */}
                      <rect x="210" y="65" width="20" height="10" className="fill-[#3B82F6]" />
                      <line x1="230" y1="70" x2="280" y2="70" stroke="#ECE7DD" strokeWidth="3" />

                      {/* CAD dimension cursor lines */}
                      <line x1="50" y1="110" x2="210" y2="110" stroke="#EF4444" strokeWidth="1" strokeDasharray="2,2" />
                      <text x="130" y="105" textAnchor="middle" className="fill-red-400 font-mono text-[7px]">Debit: 2.4 kg/min</text>
                      
                      <text x="130" y="25" className="fill-slate-400 font-mono text-[6px]">Temp: 195°C | Press: 120 bar</text>
                    </svg>
                  </div>
                  
                  <div className="mt-4 text-[10px] text-white/40 text-center italic">
                    {"Figure 5 : Modélisation des paramètres physiques et transfert en production sur CIPA."}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* SECTION 6: FIABILITÉ PRODUIT (GRAPH) */}
            <motion.div {...fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* GRAPH PLACEHOLDER (Pareto) */}
              <div className="lg:col-span-6 order-last lg:order-first">
                <div className="bg-white rounded-3xl border border-black/[0.06] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">GRAPHE — Pareto des Causes de Rebuts Qualité</span>
                    </div>
                  </div>

                  {/* Pareto Chart Drawing */}
                  <div className="h-48 w-full relative flex items-end">
                    <svg viewBox="0 0 400 160" className="w-full h-full">
                      {/* Axes */}
                      <line x1="30" y1="130" x2="370" y2="130" stroke="#ECE7DD" strokeWidth="1" />
                      <line x1="30" y1="10" x2="30" y2="130" stroke="#ECE7DD" strokeWidth="1" />
                      
                      {/* Bars */}
                      {[
                        { name: 'Etanchéité', val: 90, pct: 45 },
                        { name: 'Etiquette', val: 50, pct: 70 },
                        { name: 'Contam.', val: 30, pct: 85 },
                        { name: 'Dimensions', val: 20, pct: 95 },
                        { name: 'Autres', val: 10, pct: 100 }
                      ].map((bar, i) => {
                        const x = 45 + i * 65
                        const h = bar.val
                        return (
                          <g key={i}>
                            {/* Bar */}
                            <rect
                              x={x}
                              y={130 - h}
                              width="36"
                              height={h}
                              className="fill-gold opacity-85 hover:opacity-100 transition-opacity"
                              rx="2"
                            />
                            {/* Bar Value text */}
                            <text x={x + 18} y={130 - h - 5} textAnchor="middle" className="text-[8px] font-bold fill-dark">{bar.val}</text>
                            
                            {/* X Axis Label */}
                            <text x={x + 18} y="142" textAnchor="middle" className="text-[9px] font-bold fill-slate-400">{bar.name}</text>
                          </g>
                        )
                      })}

                      {/* Cumulative Line (Pareto) */}
                      <path
                        d="M 63 40 L 128 30 L 193 20 L 258 15 L 323 10"
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth="2"
                      />
                      {[45, 70, 85, 95, 100].map((pct, i) => (
                        <circle
                          key={i}
                          cx={63 + i * 65}
                          cy={40 - i * 7.5}
                          r="3"
                          className="fill-white stroke-red-500 stroke-2"
                        />
                      ))}
                    </svg>
                  </div>
                  
                  <div className="mt-4 text-[10px] text-slate-400 text-center italic">
                    {"Figure 6 : Analyse de Pareto automatisée des causes d'écarts de fabrication."}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B6842B] mb-3">Qualité & Fiabilité</span>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-[#111827] tracking-tight mb-5">
                  6. Assurer la qualité produit et la fiabilité
                </h3>
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-6">
                  {"Livrez systématiquement des produits de haute qualité grâce à des contrôles qualité intégrés et des inspections automatisées. Identifiez les défauts tôt dans le processus de production pour minimiser les déchets et garantir la satisfaction des clients."}
                </p>

                {/* Sub-KPI Box */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm">
                    <div className="text-2xl font-bold font-display text-gold">70%</div>
                    <div className="text-[11px] text-slate-500 mt-1">de réduction du taux de défauts</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm">
                    <div className="text-2xl font-bold font-display text-gold">30%</div>
                    <div className="text-[11px] text-slate-500 mt-1">de diminution du coût de la qualité</div>
                  </div>
                </div>

                {/* Comparison block from image */}
                <div className="mb-6 p-4 rounded-xl bg-[#FAF9F5] border border-[#ECE7DD] text-xs space-y-2">
                  <div className="text-[#9E5F18] font-bold">{"Sans CIPA :"}</div>
                  <p className="text-slate-500">{"La détection tardive des défauts en fin de ligne augmente les rebuts et les coûts de retravail."}</p>
                  <div className="text-emerald-700 font-bold pt-1">{"Avec CIPA :"}</div>
                  <p className="text-slate-500">{"Le contrôle qualité en ligne et les inspections automatisées éliminent les rebuts à la source."}</p>
                </div>

                <div className="flex gap-4">
                  <a href="/solutions/capa" className="inline-flex items-center text-xs font-bold text-gold hover:text-[#C47E1A] transition-colors">
                    Explorer la qualité <ChevronRight size={14} className="ml-1" />
                  </a>
                  <span className="text-slate-350 text-xs">|</span>
                  <a href="/contact" className="inline-flex items-center text-xs font-bold text-dark hover:text-black transition-colors">
                    Demander une démo <ChevronRight size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </motion.div>

            {/* SECTION 7: DURABILITÉ (GRAPH) */}
            <motion.div {...fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B6842B] mb-3">Développement Durable & Eco-Conception</span>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-[#111827] tracking-tight mb-5">
                  7. Durabilité et impact environnemental
                </h3>
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-6">
                  {"Surveillez la consommation de ressources et les émissions pour atteindre vos objectifs de durabilité. CIPA aide à suivre la consommation d'énergie (électricité, eau purifiée), à minimiser les déchets et à mettre en œuvre des pratiques de fabrication écoresponsables."}
                </p>

                {/* Sub-KPI Box */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                      <Leaf size={18} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold font-display text-[#22C55E]">30%</div>
                      <div className="text-xs text-slate-500">de réduction de la production de déchets</div>
                    </div>
                  </div>
                </div>

                {/* Comparison block from image */}
                <div className="mb-6 p-4 rounded-xl bg-[#FAF9F5] border border-[#ECE7DD] text-xs space-y-2">
                  <div className="text-[#9E5F18] font-bold">{"Sans CIPA :"}</div>
                  <p className="text-slate-500">{"Le manque de métriques de consommation empêche l'identification et la réduction des gaspillages de ressources."}</p>
                  <div className="text-emerald-700 font-bold pt-1">{"Avec CIPA :"}</div>
                  <p className="text-slate-500">{"Les tableaux de bord de durabilité permettent d'optimiser en continu l'usage de l'eau, de l'énergie et des matières."}</p>
                </div>

                <div className="flex gap-4">
                  <a href="/about" className="inline-flex items-center text-xs font-bold text-gold hover:text-[#C47E1A] transition-colors">
                    Voir nos engagements <ChevronRight size={14} className="ml-1" />
                  </a>
                  <span className="text-slate-350 text-xs">|</span>
                  <a href="/contact" className="inline-flex items-center text-xs font-bold text-dark hover:text-black transition-colors">
                    Demander une démo <ChevronRight size={14} className="ml-1" />
                  </a>
                </div>
              </div>

              {/* GRAPH PLACEHOLDER (Energy Consumption chart) */}
              <div className="lg:col-span-6">
                <div className="bg-white rounded-3xl border border-black/[0.06] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{"GRAPHE — Suivi de la Consommation d'Eau Purifiée & Énergie"}</span>
                    </div>
                  </div>

                  {/* Energy Chart comparing before/after CIPA */}
                  <div className="h-48 w-full relative flex items-end">
                    <svg viewBox="0 0 400 160" className="w-full h-full">
                      {/* Grid */}
                      <line x1="30" y1="10" x2="30" y2="130" stroke="#ECE7DD" strokeWidth="1" />
                      <line x1="30" y1="130" x2="370" y2="130" stroke="#ECE7DD" strokeWidth="1" />
                      
                      <line x1="30" y1="80" x2="370" y2="80" stroke="#F5F5F4" strokeDasharray="3,3" />
                      <line x1="30" y1="40" x2="370" y2="40" stroke="#F5F5F4" strokeDasharray="3,3" />

                      {/* Standard Energy Curve */}
                      <path
                        d="M30,30 L110,25 L190,35 L270,30 L350,28"
                        fill="none"
                        stroke="#A8A29E"
                        strokeWidth="1.5"
                        strokeDasharray="4,4"
                      />
                      <text x="355" y="32" className="fill-slate-400 text-[7px] font-bold">Base</text>

                      {/* CIPA Optimized Energy Curve */}
                      <path
                        d="M30,30 L110,48 L190,65 L270,80 L350,90"
                        fill="none"
                        stroke="#22C55E"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                      <text x="355" y="94" className="fill-emerald-500 text-[7px] font-bold">-30%</text>

                      {/* Timeline labels */}
                      <text x="30" y="142" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">T0</text>
                      <text x="110" y="142" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">Mois 1</text>
                      <text x="190" y="142" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">Mois 3</text>
                      <text x="270" y="142" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">Mois 6</text>
                      <text x="350" y="142" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">Mois 12</text>
                    </svg>
                  </div>
                  
                  <div className="mt-4 text-[10px] text-slate-400 text-center italic">
                    {"Figure 7 : Profil de consommation énergétique et d'eau purifiée optimisé sur CIPA."}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. REASSURANCE SECTION / CALL TO ACTION */}
      <section className="py-20 bg-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-dark opacity-30" />
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-green-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-5 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white mb-6">
            {"Prêt à digitaliser vos opérations de cosmétiques & DM ?"}
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            {"Rejoignez les leaders industriels de la cosmétique et des dispositifs médicaux qui utilisent CIPA pour assurer leur conformité ISO/FDA, maximiser la traçabilité et optimiser le TRS. Nos experts sont à votre disposition pour réaliser une démonstration personnalisée basée sur vos contraintes réelles."}
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a
              href="/contact"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-dark shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-dark"
            >
              {"Planifier une démo de CIPA"}
              <ArrowRight size={15} className="text-dark transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="mailto:contact@industryx0.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 px-7 py-4 text-sm font-semibold text-white transition-all duration-300"
            >
              Contacter un conseiller
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
