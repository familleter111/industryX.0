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

export default function PharmaPage() {
  const [activeTab, setActiveTab] = useState<'line' | 'bar'>('line')
  const [hoveredTrace, setHoveredTrace] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-[#F7F7F6] text-dark overflow-x-hidden font-body selection:bg-gold/30 selection:text-gold-900">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-mesh-light">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />

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
                  {"pharmaceutique & des sciences de la vie"}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[15px] sm:text-[17px] leading-relaxed text-slate-600 mb-8 max-w-2xl"
              >
                {"Les industries des sciences de la vie opèrent dans des environnements rigoureusement réglementés. CIPA fournit une plateforme digitale complète spécialement conçue pour les secteurs de la pharmacie, des biotechnologies et des dispositifs médicaux afin de digitaliser les processus, d'optimiser les rendements, de garantir la conformité et de stimuler l'efficacité opérationnelle."}
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
                  src="/Secteur/pharma_hero.png"
                  alt="Laboratoire et production pharmaceutique Industry X.0"
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-2 -left-2 bg-white/90 backdrop-blur border border-gold/30 rounded-2xl p-4 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gold/10 text-gold flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Normes GMP & FDA</div>
                  <div className="text-sm font-extrabold text-dark">21 CFR Part 11 Validé</div>
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
              { value: '90%', label: 'Réduction du temps de préparation des audits', desc: 'Rapports automatisés et accès instantané à toute la documentation de lot pour une conformité maximale.' },
              { value: '25%', label: 'Réduction des temps de libération des lots', desc: 'Grâce aux dossiers de lot électroniques (eBR) et à la validation des signatures en temps réel.' },
              { value: '50%', label: 'Diminution des coûts de conformité', desc: 'Standardisation et simplification des processus d’assurance qualité et de gestion documentaire.' }
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
                  {"La conformité réglementaire est la pierre angulaire de l'industrie des sciences de la vie. CIPA fournit des outils pour documenter les procédures opérationnelles standard (SOP), valider les étapes en temps réel et garantir l'intégrité des données. Avec CIPA, vous pouvez automatiser les pistes d'audit (audit trail), suivre les indicateurs de qualité et simplifier les rapports réglementaires, facilitant ainsi la conformité aux directives de la FDA (21 CFR Part 11) et aux autres normes mondiales (BPF / GMP)."}
                </p>

                {/* Sub-KPI Box */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm">
                    <div className="text-2xl font-bold font-display text-gold">90%</div>
                    <div className="text-[11px] text-slate-500 mt-1">de préparation constante aux audits</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm">
                    <div className="text-2xl font-bold font-display text-gold">30%</div>
                    <div className="text-[11px] text-slate-500 mt-1">de réduction du coût global de conformité</div>
                  </div>
                </div>

                {/* Comparison block from image */}
                <div className="mb-6 p-4 rounded-xl bg-[#FAF9F5] border border-[#ECE7DD] text-xs space-y-2">
                  <div className="text-[#9E5F18] font-bold">Sans CIPA :</div>
                  <p className="text-slate-500">{"La préparation manuelle des audits prend du temps et est sujette aux erreurs humaines de transcription."}</p>
                  <div className="text-emerald-700 font-bold pt-1">Avec CIPA :</div>
                  <p className="text-slate-500">{"Les pistes d'audit automatisées et les rapports de conformité centralisés garantissent une préparation constante aux audits."}</p>
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
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">SCHEMA — Validation Qualité FDA & BPF</span>
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
                        <h4 className="text-xs font-bold text-dark">Audit de Lot Matières Actives</h4>
                        <p className="text-[10px] text-slate-500 truncate">{"Vérification de la pureté de l'API et certificat fournisseur"}</p>
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
                        <h4 className="text-xs font-bold text-dark">Saisie Contrôle Mirage</h4>
                        <p className="text-[10px] text-slate-500 truncate">{"Inspection visuelle des particules et volume de ampoule"}</p>
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
                        <h4 className="text-xs font-bold text-slate-450">{"Signature Électronique (21 CFR Part 11)"}</h4>
                        <p className="text-[10px] text-slate-400 truncate">{"Double validation et archivage sécurisé de la piste d'audit"}</p>
                      </div>
                      <Workflow size={18} className="text-slate-300 shrink-0" />
                    </motion.div>
                  </div>
                  
                  <div className="mt-4 text-[10px] text-slate-400 text-center italic">
                    Figure 1 : Modèle de workflow de validation qualité configurable dans CIPA.
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
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Dossier de Lot Électronique</div>
                        <div className="text-xs font-black text-white">OF-2026-PHARMA-L3-042</div>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        Ligne active
                      </div>
                    </div>

                    {/* Content split */}
                    <div className="grid grid-cols-12 gap-3">
                      <div className="col-span-7 bg-[#1a1b24] p-3 rounded-xl">
                        <div className="text-[9px] text-slate-450 font-bold uppercase tracking-wider mb-2">Instructions de Mélange</div>
                        <ol className="text-[10px] text-slate-300 list-decimal list-inside space-y-1.5 leading-tight">
                          <li>{"Vérifier la stérilisation du réacteur R-101 (SIP)"}</li>
                          <li>{"Ajouter 150 kg d'excipient sous agitation à 60 RPM"}</li>
                          <li>{"Valider la température de consigne à 37.5°C"}</li>
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
                      {"Valider l'étape de pesée/mélange"}
                    </div>
                  </div>

                  <div className="mt-4 text-[10px] text-white/40 text-center italic">
                    {"Figure 2 : Simulation de l'application CIPA sur tablette industrielle lors de la formulation."}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B6842B] mb-3">Zéro Papier & Efficacité</span>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-[#111827] tracking-tight mb-5">
                  2. Efficacité renforcée par la digitalisation
                </h3>
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-6">
                  {"La digitalisation des enregistrements papier et des procédures manuelles améliore l'efficacité des flux de travail et réduit les temps de cycle. CIPA permet le suivi en temps réel des dossiers de lot, la gestion des dossiers de lot électroniques (eBR) et le pilotage des tâches des opérateurs. Cela augmente la productivité dans l'atelier, optimise l'utilisation des ressources et fluidifie la communication entre les départements."}
                </p>

                {/* Sub-KPI Box */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm flex items-center gap-4">
                    <div className="text-3xl font-bold font-display text-gold">30%</div>
                    <div className="text-xs text-slate-500">{"de réduction des temps de libération des lots (batch release)"}</div>
                  </div>
                </div>

                {/* Comparison block from image */}
                <div className="mb-6 p-4 rounded-xl bg-[#FAF9F5] border border-[#ECE7DD] text-xs space-y-2">
                  <div className="text-[#9E5F18] font-bold">Sans CIPA :</div>
                  <p className="text-slate-500">{"Les dossiers de lot papier entraînent des cycles de revue lents et des risques élevés d'erreurs documentaires."}</p>
                  <div className="text-emerald-700 font-bold pt-1">Avec CIPA :</div>
                  <p className="text-slate-500">{"Les dossiers de lot électroniques (eBR) simplifient les approbations et accélèrent la libération des produits."}</p>
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
                  {"L'exploitation des données opérationnelles aide à identifier les goulots d'étranglement et à optimiser les processus de fabrication. CIPA propose des tableaux de bord d'analyses avancées et des insights basés sur l'IA pour surveiller les performances des processus, anticiper les déviations potentielles et optimiser les rendements de production. Prenez des décisions basées sur les données pour améliorer le débit et la régularité des produits."}
                </p>

                {/* Sub-KPI Box */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm">
                    <div className="text-2xl font-bold font-display text-gold">50%</div>
                    <div className="text-[11px] text-slate-500 mt-1">de réduction du taux de déviations qualité</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm">
                    <div className="text-2xl font-bold font-display text-gold">10%</div>
                    <div className="text-[11px] text-slate-500 mt-1">{"d'augmentation du rendement de production global"}</div>
                  </div>
                </div>

                {/* Comparison block from image */}
                <div className="mb-6 p-4 rounded-xl bg-[#FAF9F5] border border-[#ECE7DD] text-xs space-y-2">
                  <div className="text-[#9E5F18] font-bold">Sans CIPA :</div>
                  <p className="text-slate-500">{"La visibilité limitée sur les variations de processus rend difficile la prévention des déviations qualité."}</p>
                  <div className="text-emerald-700 font-bold pt-1">Avec CIPA :</div>
                  <p className="text-slate-500">{"La surveillance des processus en temps réel et les alertes IA prédictives permettent un contrôle qualité proactif."}</p>
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
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">GRAPHE — Rendement Opérationnel (TRS) Ligne Conditionnement</span>
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
                    {"Figure 3 : Taux de Rendement Synthétique mesuré avant et après l'intégration de CIPA."}
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
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">SCHEMA — Chaîne Généalogique Lot & Sérialisation</span>
                    </div>
                  </div>

                  {/* Supply chain diagram */}
                  <div className="py-6 flex justify-between items-center relative">
                    <div className="absolute left-4 right-4 h-0.5 border-t border-dashed border-slate-200 z-0" />
                    
                    {[
                      { icon: Network, title: 'Fournisseur API', id: 'Lot-API-992' },
                      { icon: Cpu, title: 'Mélange / Granul.', id: 'Lot-MEL-04' },
                      { icon: Activity, title: 'Conditionn. Sérial.', id: 'Lot-PACK-88' }
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
                    {"Figure 4 : Traçabilité généalogique amont/aval d'un lot de médicament fini."}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B6842B] mb-3">Traçabilité Supply Chain</span>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-[#111827] tracking-tight mb-5">
                  4. Améliorer la transparence de la supply chain
                </h3>
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-6">
                  {"La visibilité sur la chaîne d'approvisionnement est cruciale pour la gestion des matières et des produits finis. CIPA permet une traçabilité de bout en bout, depuis l'approvisionnement en matières premières jusqu'à la distribution des produits. Conservez des enregistrements numériques de la qualité des fournisseurs, des certificats de matières et de la généalogie des lots, ce qui facilite l'isolation des problèmes et la gestion des rappels."}
                </p>

                {/* Sub-KPI Box */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm">
                    <div className="text-2xl font-bold font-display text-gold">20%</div>
                    <div className="text-[11px] text-slate-500 mt-1">de réduction des délais de livraison</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm">
                    <div className="text-2xl font-bold font-display text-gold">25%</div>
                    <div className="text-[11px] text-slate-500 mt-1">de baisse des coûts de stockage</div>
                  </div>
                </div>

                {/* Comparison block from image */}
                <div className="mb-6 p-4 rounded-xl bg-[#FAF9F5] border border-[#ECE7DD] text-xs space-y-2">
                  <div className="text-[#9E5F18] font-bold">Sans CIPA :</div>
                  <p className="text-slate-500">{"Les données de supply chain fragmentées augmentent le risque de rupture de stock et ralentissent les temps de réaction en cas de rappel."}</p>
                  <div className="text-emerald-700 font-bold pt-1">Avec CIPA :</div>
                  <p className="text-slate-500">{"La visibilité en temps réel et la traçabilité de bout en bout garantissent la résilience de la supply chain et une exécution rapide des rappels."}</p>
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

            {/* SECTION 5: R&D (PHOTO/BIOREACTOR DESIGN ART) */}
            <motion.div {...fadeInUp} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B6842B] mb-3">Co-Design & Transfert</span>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-[#111827] tracking-tight mb-5">
                  {"5. Favoriser l'innovation via l'optimisation R&D"}
                </h3>
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-6">
                  {"Accélérer le développement de produits et optimiser le transfert technologique du laboratoire à la fabrication. CIPA facilite la collaboration entre les équipes de R&D et de production, en fournissant un référentiel centralisé pour les formules de processus, les résultats d'essais et la documentation de mise à l'échelle (scale-up). Un transfert technologique fluide réduit le time-to-market."}
                </p>

                {/* Sub-KPI Box */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm flex items-center gap-4">
                    <div className="text-3xl font-bold font-display text-gold">70%</div>
                    <div className="text-xs text-slate-500">{"d'augmentation de la vitesse de documentation de la R&D"}</div>
                  </div>
                </div>

                {/* Comparison block from image */}
                <div className="mb-6 p-4 rounded-xl bg-[#FAF9F5] border border-[#ECE7DD] text-xs space-y-2">
                  <div className="text-[#9E5F18] font-bold">Sans CIPA :</div>
                  <p className="text-slate-500">{"Le transfert manuel de données de formulation entre la R&D et la fabrication ralentit le lancement de nouveaux médicaments."}</p>
                  <div className="text-emerald-700 font-bold pt-1">Avec CIPA :</div>
                  <p className="text-slate-500">{"Le référentiel centralisé et les formules de processus digitales standardisées accélèrent le transfert de technologie."}</p>
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

              {/* PHOTO/BIOREACTOR SCHEMA ART */}
              <div className="lg:col-span-6">
                <div className="bg-[#141520] rounded-3xl border border-white/5 p-6 shadow-[0_20px_50px_rgba(0,0,0,0.18)] relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-white/40">PHOTO/VECTOR ART — Suivi Télémétrie Bioréacteur</span>
                    </div>
                  </div>

                  {/* Bioreactor Schematic Art */}
                  <div className="relative h-48 w-full border border-white/5 rounded-2xl bg-[#0C0D12] overflow-hidden flex items-center justify-center">
                    {/* CAD Grid */}
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
                    
                    {/* SVG Bioreactor vessel */}
                    <svg viewBox="0 0 300 150" className="w-full h-full opacity-70">
                      {/* Vessel Outline */}
                      <rect x="110" y="20" width="80" height="100" rx="40" fill="none" stroke="#ECE7DD" strokeWidth="2" />
                      
                      {/* Liquid level */}
                      <path d="M111,80 C130,83, 170,77, 189,80 L189,100 C189,115, 175,119, 150,119 C125,119, 111,115, 111,100 Z" fill="#3B82F6" opacity="0.2" />
                      
                      {/* Impeller shaft */}
                      <line x1="150" y1="10" x2="150" y2="100" stroke="#A8A29E" strokeWidth="2.5" />
                      {/* Impeller blades */}
                      <path d="M135,100 L165,100" stroke="#A8A29E" strokeWidth="3" />
                      <path d="M138,80 L162,80" stroke="#A8A29E" strokeWidth="3" />

                      {/* Probe sensors lines */}
                      <line x1="90" y1="40" x2="120" y2="50" stroke="#EF4444" strokeWidth="1" />
                      <circle cx="120" cy="50" r="2" fill="#EF4444" />
                      
                      <line x1="90" y1="70" x2="125" y2="75" stroke="#3B82F6" strokeWidth="1" />
                      <circle cx="125" cy="75" r="2" fill="#3B82F6" />

                      <line x1="210" y1="60" x2="175" y2="65" stroke="#22C55E" strokeWidth="1" />
                      <circle cx="175" cy="65" r="2" fill="#22C55E" />

                      {/* Live Data tags */}
                      <text x="50" y="42" className="fill-red-400 font-mono text-[8px] font-bold">Temp: 37.0°C</text>
                      <text x="50" y="72" className="fill-blue-400 font-mono text-[8px] font-bold">pH: 7.20</text>
                      <text x="215" y="62" className="fill-emerald-400 font-mono text-[8px] font-bold">DO: 40%</text>
                      <text x="155" y="112" className="fill-slate-400 font-mono text-[7px]">Agitation: 120 RPM</text>
                    </svg>
                  </div>
                  
                  <div className="mt-4 text-[10px] text-white/40 text-center italic">
                    {"Figure 5 : Interface de contrôle analytique et suivi de paramètres de mise à l'échelle via CIPA."}
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
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">GRAPHE — Pareto des Déviations Qualité / Processus</span>
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
                        { name: 'Température', val: 90, pct: 45 },
                        { name: 'Pesée', val: 50, pct: 70 },
                        { name: 'Emballage', val: 30, pct: 85 },
                        { name: 'Étiquetage', val: 20, pct: 95 },
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
                    {"Figure 6 : Analyse de Pareto des écarts qualités automatisée dans le module CAPA CIPA."}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B6842B] mb-3">Qualité Produit & Sécurité</span>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-[#111827] tracking-tight mb-5">
                  6. Assurer la qualité produit et la sécurité des patients
                </h3>
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-6">
                  {"La qualité des produits est primordiale dans les sciences de la vie. CIPA intègre des contrôles qualité automatisés, des inspections visuelles et une surveillance des processus en ligne pour garantir que les produits respectent scrupuleusement les spécifications. Minimisez les défauts, réduisez les rebuts et garantissez les normes de sécurité des patients les plus élevées."}
                </p>

                {/* Sub-KPI Box */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm">
                    <div className="text-2xl font-bold font-display text-gold">50%</div>
                    <div className="text-[11px] text-slate-500 mt-1">de diminution des défauts produits</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm">
                    <div className="text-2xl font-bold font-display text-gold">20%</div>
                    <div className="text-[11px] text-slate-500 mt-1">de réduction du temps des contrôles qualité</div>
                  </div>
                </div>

                {/* Comparison block from image */}
                <div className="mb-6 p-4 rounded-xl bg-[#FAF9F5] border border-[#ECE7DD] text-xs space-y-2">
                  <div className="text-[#9E5F18] font-bold">Sans CIPA :</div>
                  <p className="text-slate-500">{"Les inspections manuelles sont subjectives et peuvent laisser passer des défauts à travers les contrôles qualité."}</p>
                  <div className="text-emerald-700 font-bold pt-1">Avec CIPA :</div>
                  <p className="text-slate-500">{"Le contrôle des processus en ligne et les inspections automatisées sécurisent une qualité constante des produits et protègent la santé des patients."}</p>
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
                <span className="text-xs font-bold uppercase tracking-widest text-[#B6842B] mb-3">Développement Durable & Éco-Conception</span>
                <h3 className="text-2xl sm:text-3xl font-black font-display text-[#111827] tracking-tight mb-5">
                  7. Durabilité et impact environnemental
                </h3>
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-6">
                  {"Les installations des sciences de la vie consomment une quantité importante d'énergie et de ressources. CIPA aide à suivre la consommation des fluides (eau purifiée WFI, électricité), à surveiller les émissions et à optimiser l'utilisation des matières premières. Stimulez des pratiques de fabrication durables en identifiant les opportunités d'économies d'énergie, en réduisant les déchets et en garantissant la conformité environnementale."}
                </p>

                {/* Sub-KPI Box */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-white border border-black/[0.05] shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                      <Leaf size={18} />
                    </div>
                    <div>
                      <div className="text-2xl font-bold font-display text-[#22C55E]">20%</div>
                      <div className="text-xs text-slate-500">de réduction globale de la production de déchets</div>
                    </div>
                  </div>
                </div>

                {/* Comparison block from image */}
                <div className="mb-6 p-4 rounded-xl bg-[#FAF9F5] border border-[#ECE7DD] text-xs space-y-2">
                  <div className="text-[#9E5F18] font-bold">Sans CIPA :</div>
                  <p className="text-slate-500">{"Le manque de visibilité sur le gaspillage des ressources et l'énergie augmente les coûts opérationnels et l'empreinte carbone."}</p>
                  <div className="text-emerald-700 font-bold pt-1">Avec CIPA :</div>
                  <p className="text-slate-500">{"Le suivi énergétique et les analyses de réduction des déchets soutiennent directement vos objectifs de fabrication durable."}</p>
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
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">GRAPHE — Consommation Énergétique des Systèmes CVC (Salle Blanche)</span>
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
                      <text x="355" y="94" className="fill-emerald-500 text-[7px] font-bold">-20%</text>

                      {/* Timeline labels */}
                      <text x="30" y="142" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">T0</text>
                      <text x="110" y="142" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">Mois 1</text>
                      <text x="190" y="142" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">Mois 3</text>
                      <text x="270" y="142" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">Mois 6</text>
                      <text x="350" y="142" textAnchor="middle" className="text-[8px] font-bold fill-slate-400">Mois 12</text>
                    </svg>
                  </div>
                  
                  <div className="mt-4 text-[10px] text-slate-400 text-center italic">
                    {"Figure 7 : Profil de consommation énergétique CVC mesuré sur un an (salle blanche)."}
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
            {"Prêt à digitaliser vos opérations pharmaceutiques ?"}
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            {"Rejoignez les leaders des sciences de la vie qui utilisent CIPA pour assurer leur conformité, maximiser la traçabilité et optimiser le rendement. Nos experts sont à votre disposition pour réaliser une démonstration personnalisée basée sur vos contraintes réelles."}
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
