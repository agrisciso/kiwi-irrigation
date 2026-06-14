/* eslint-disable no-undef */
import { useState, useEffect } from "react";

// ─── Multilingual support ───────────────────────────────────────────────────
const LANGS = {
  el: {
    title: "Μοντέλο Άρδευσης Ακτινίδιου",
    subtitle: "Αποκλειστικό εργαλείο για πελάτες",
    brand: "AgriSci Solutions",
    password: "Κωδικός πρόσβασης",
    enter: "Είσοδος",
    wrongPw: "Λάθος κωδικός. Επικοινωνήστε με την AgriSci Solutions.",
    month: "Μήνας", treeAge: "Ηλικία δένδρων", pheno: "Φαινολογική φάση",
    rowSpacing: "Απόσταση μεταξύ σειρών (m)", rainfall: "Βροχόπτωση ημέρας (mm)",
    tmax: "Μέγιστη θερμοκρασία ημέρας (°C)", soil: "Τύπος Εδάφους",
    system: "Σύστημα Άρδευσης", emitters: "Σύνολο εκπομπών",
    flow: "Παροχή / εκπομπή (L/h)", results: "Αποτελέσματα Ημέρας",
    waterNeeded: "Νερό που απαιτείται σήμερα", perDay: "ημέρα",
    et0: "ET₀ (εκτίμηση)", kc: "Kc", etc: "ETc", net: "Καθαρή ανάγκη",
    runtime: "Χρόνος λειτουργίας", cycle: "Κύκλος (αποστράγγιση AFD)",
    sessions: "Συνιστώμενη κατανομή", perSession: "λεπτά × φορές/ημέρα",
    totalFlow: "Συνολική παροχή", critical: "Κρίσιμη Φάση",
    undersized: "Ανεπαρκής παροχή συστήματος",
    notNeeded: "Δεν απαιτείται", every: "κάθε", days: "ημέρα/ες",
    perUnit: "στρέμμα", perHa: "εκτάριο",
    young: "1–3 έτη (νεαρό)", mature: "≥4 έτη (ενήλικο)",
    stremma: "ανά στρέμμα", hectare: "ανά εκτάριο",
    emittersHelp: "Εισάγετε το σύνολο των εκπομπών (όλοι οι αγωγοί μαζί).",
    emittersExample: "Π.χ. 2 αγωγοί × 100 σταλ./αγωγό =",
    footerCTA: "Για προσωπική αξιολόγηση χωραφιού:",
    footerLink: "Επικοινωνήστε μαζί μας",
    calcBtn: "Υπολογισμός",
    pwTitle: "Μοντέλο Άρδευσης Ακτινιδίου",
    pwSubtitle: "Εισάγετε τον κωδικό πρόσβασης",
  },
  en: {
    title: "Kiwifruit Irrigation Model",
    subtitle: "Exclusive tool for clients",
    brand: "AgriSci Solutions",
    password: "Access password",
    enter: "Enter",
    wrongPw: "Wrong password. Contact AgriSci Solutions.",
    month: "Month", treeAge: "Tree age", pheno: "Phenological stage",
    rowSpacing: "Row spacing (m)", rainfall: "Daily rainfall (mm)",
    tmax: "Maximum daily temperature (°C)", soil: "Soil Type",
    system: "Irrigation System", emitters: "Total emitters",
    flow: "Flow per emitter (L/h)", results: "Daily Results",
    waterNeeded: "Water needed today", perDay: "day",
    et0: "ET₀ (estimate)", kc: "Kc", etc: "ETc", net: "Net requirement",
    runtime: "Run time", cycle: "Cycle (RAW depletion)",
    sessions: "Recommended split", perSession: "min × times/day",
    totalFlow: "Total system flow", critical: "Critical Stage",
    undersized: "System flow insufficient",
    notNeeded: "Not required", every: "every", days: "day(s)",
    perUnit: "acre", perHa: "hectare",
    young: "1–3 years (young)", mature: "≥4 years (mature)",
    stremma: "per stremma", hectare: "per hectare",
    emittersHelp: "Enter total emitters across ALL driplines.",
    emittersExample: "e.g. 2 lines × 100 drippers =",
    footerCTA: "For personalised orchard assessment:",
    footerLink: "Contact us",
    calcBtn: "Calculate",
    pwTitle: "Kiwifruit Irrigation Model",
    pwSubtitle: "Enter your access password",
  },
  it: {
    title: "Modello Irrigazione Kiwi",
    subtitle: "Strumento esclusivo per clienti",
    brand: "AgriSci Solutions",
    password: "Password di accesso",
    enter: "Accedi",
    wrongPw: "Password errata. Contatta AgriSci Solutions.",
    month: "Mese", treeAge: "Età delle piante", pheno: "Fase fenologica",
    rowSpacing: "Distanza tra filari (m)", rainfall: "Pioggia giornaliera (mm)",
    tmax: "Temperatura massima giornaliera (°C)", soil: "Tipo di Suolo",
    system: "Sistema di Irrigazione", emitters: "Totale erogatori",
    flow: "Portata per erogatore (L/h)", results: "Risultati Giornalieri",
    waterNeeded: "Acqua necessaria oggi", perDay: "giorno",
    et0: "ET₀ (stima)", kc: "Kc", etc: "ETc", net: "Fabbisogno netto",
    runtime: "Tempo di funzionamento", cycle: "Ciclo (esaurimento AFD)",
    sessions: "Distribuzione consigliata", perSession: "min × volte/giorno",
    totalFlow: "Portata totale sistema", critical: "Fase Critica",
    undersized: "Portata sistema insufficiente",
    notNeeded: "Non necessario", every: "ogni", days: "giorno/i",
    perUnit: "stremma", perHa: "ettaro",
    young: "1–3 anni (giovane)", mature: "≥4 anni (adulto)",
    stremma: "per stremma", hectare: "per ettaro",
    emittersHelp: "Inserire il totale degli erogatori (tutte le linee).",
    emittersExample: "Es. 2 linee × 100 gocciolatori =",
    footerCTA: "Per una valutazione personalizzata:",
    footerLink: "Contattaci",
    calcBtn: "Calcola",
    pwTitle: "Modello Irrigazione Kiwi",
    pwSubtitle: "Inserire la password di accesso",
  },
  es: {
    title: "Modelo de Riego para Kiwi",
    subtitle: "Herramienta exclusiva para clientes",
    brand: "AgriSci Solutions",
    password: "Contraseña de acceso",
    enter: "Entrar",
    wrongPw: "Contraseña incorrecta. Contacta AgriSci Solutions.",
    month: "Mes", treeAge: "Edad de las plantas", pheno: "Fase fenológica",
    rowSpacing: "Distancia entre filas (m)", rainfall: "Lluvia diaria (mm)",
    tmax: "Temperatura máxima diaria (°C)", soil: "Tipo de Suelo",
    system: "Sistema de Riego", emitters: "Total emisores",
    flow: "Caudal por emisor (L/h)", results: "Resultados Diarios",
    waterNeeded: "Agua necesaria hoy", perDay: "día",
    et0: "ET₀ (estimación)", kc: "Kc", etc: "ETc", net: "Necesidad neta",
    runtime: "Tiempo de funcionamiento", cycle: "Ciclo (agotamiento AFD)",
    sessions: "Distribución recomendada", perSession: "min × veces/día",
    totalFlow: "Caudal total sistema", critical: "Fase Crítica",
    undersized: "Caudal del sistema insuficiente",
    notNeeded: "No necesario", every: "cada", days: "día(s)",
    perUnit: "estrémma", perHa: "hectárea",
    young: "1–3 años (joven)", mature: "≥4 años (adulto)",
    stremma: "por estrémma", hectare: "por hectárea",
    emittersHelp: "Introducir el total de emisores (todas las líneas).",
    emittersExample: "Ej. 2 líneas × 100 goteros =",
    footerCTA: "Para evaluación personalizada del huerto:",
    footerLink: "Contáctenos",
    calcBtn: "Calcular",
    pwTitle: "Modelo de Riego para Kiwi",
    pwSubtitle: "Introduzca su contraseña de acceso",
  },
};

// Kc & ET0 measured values — user's field data (mature kiwifruit, Mediterranean)
// Apr:0.50 May:0.70 Jun:0.90 Jul:1.10 Aug:1.10 Sep:0.80 Oct:0.80
// Minimum ETc (mm/day): May:4.2 Jun:4.9 Jul:5.2 Aug:5.2
// Young trees (1-3yr): partial canopy ~50% → Kc halved

// Monthly Kc lookup for precise calculation
const KC_MONTHLY = {
  3:  { kc: 0.10, et0ref: 1.50 }, // Μάρτιος (εκτίμηση)
  4:  { kc: 0.13, et0ref: 2.80 }, // Απρίλιος
  5:  { kc: 0.56, et0ref: 5.00 }, // Μάιος
  6:  { kc: 0.73, et0ref: 5.50 }, // Ιούνιος
  7:  { kc: 0.82, et0ref: 7.50 }, // Ιούλιος
  8:  { kc: 0.88, et0ref: 6.50 }, // Αύγουστος
  9:  { kc: 0.64, et0ref: 3.40 }, // Σεπτέμβριος
  10: { kc: 0.39, et0ref: 1.90 }, // Οκτώβριος
  11: { kc: 0.20, et0ref: 1.20 }, // Νοέμβριος (εκτίμηση)
};

const KC_TABLE = {
  young: [
    { labels: { el:"Βλάστηση – Ανθοφορία (Μάρ–Απρ)", en:"Budbreak – Flowering (Mar–Apr)", it:"Germogliamento – Fioritura (Mar–Apr)", es:"Brotación – Floración (Mar–Abr)" }, kc: 0.07, months: [3,4] },
    { labels: { el:"Κυτταροδιαίρεση (Μάι–Ιούν)", en:"Cell division (May–Jun)", it:"Citochinesi (Mag–Giu)", es:"División celular (May–Jun)" }, kc: 0.33, months: [5,6] },
    { labels: { el:"Ωρίμανση καρπού (Ιούλ–Αύγ)", en:"Fruit growth (Jul–Aug)", it:"Ingrossamento frutto (Lug–Ago)", es:"Crecimiento fruto (Jul–Ago)" }, kc: 0.43, months: [7,8] },
    { labels: { el:"Προσυγκομιδή – Συγκομιδή (Σεπ–Οκτ)", en:"Pre-harvest – Harvest (Sep–Oct)", it:"Pre-raccolta – Raccolta (Set–Ott)", es:"Pré-cosecha – Cosecha (Sep–Oct)" }, kc: 0.26, months: [9,10] },
  ],
  mature: [
    { labels: { el:"Βλάστηση – Ανθοφορία (Μάρ–Απρ)", en:"Budbreak – Flowering (Mar–Apr)", it:"Germogliamento – Fioritura (Mar–Apr)", es:"Brotación – Floración (Mar–Abr)" }, kc: 0.13, months: [3,4] },
    { labels: { el:"Κυτταροδιαίρεση (Μάι–Ιούν)", en:"Cell division (May–Jun)", it:"Citochinesi (Mag–Giu)", es:"División celular (May–Jun)" }, kc: 0.65, months: [5,6] },
    { labels: { el:"Ωρίμανση καρπού (Ιούλ–Αύγ)", en:"Fruit growth (Jul–Aug)", it:"Ingrossamento frutto (Lug–Ago)", es:"Crecimiento fruto (Jul–Ago)" }, kc: 0.85, months: [7,8] },
    { labels: { el:"Προσυγκομιδή – Συγκομιδή (Σεπ–Οκτ)", en:"Pre-harvest – Harvest (Sep–Oct)", it:"Pre-raccolta – Raccolta (Set–Ott)", es:"Pré-cosecha – Cosecha (Sep–Oct)" }, kc: 0.52, months: [9,10] },
  ],
};

const SOIL_TYPES_DATA = {
  sandy_loam: { fc: 28, wp: 12, bulk: 1.45 },
  clay_loam:  { fc: 39, wp: 19, bulk: 1.39 },
  clay:       { fc: 52, wp: 24, bulk: 1.35 },
  loam:       { fc: 35, wp: 16, bulk: 1.40 },
};

const SOIL_LABELS = {
  el: { sandy_loam: "Αμμοαργιλοπηλώδες (FAS) – ελαφρύ", clay_loam: "Αργιλοπηλώδες (FA) – μέσο", clay: "Αργιλώδες (A) – βαρύ", loam: "Πηλώδες (F) – μέσο-βαρύ" },
  en: { sandy_loam: "Sandy Clay Loam (light)", clay_loam: "Clay Loam (medium)", clay: "Clay (heavy)", loam: "Loam (medium-heavy)" },
  it: { sandy_loam: "Franco Argilloso Sabbioso (leggero)", clay_loam: "Franco Argilloso (medio)", clay: "Argilloso (pesante)", loam: "Franco (medio-pesante)" },
  es: { sandy_loam: "Franco Arcillo Arenoso (ligero)", clay_loam: "Franco Arcilloso (medio)", clay: "Arcilloso (pesado)", loam: "Franco (medio-pesado)" },
};

const IRRIGATION_SYSTEMS_DATA = {
  drip_1dl:  { efficiency: 0.90, wetted_width: 0.5 },
  drip_2dl:  { efficiency: 0.90, wetted_width: 1.0 },
  drip_4dl:  { efficiency: 0.90, wetted_width: 2.0 },
  sprinkler: { efficiency: 0.82, wetted_width: 2.0 },
};

const IRRIG_LABELS = {
  el: { drip_1dl: "Σταγόνα – 1 αγωγός/σειρά | αποδ. 90%", drip_2dl: "Σταγόνα – 2 αγωγοί/σειρά | αποδ. 90%", drip_4dl: "Σταγόνα – 4 αγωγοί/σειρά | αποδ. 90%", sprinkler: "Μικρο-εκτοξευτήρας (Sprinkler) | αποδ. 82%" },
  en: { drip_1dl: "Drip – 1 line/row | eff. 90%", drip_2dl: "Drip – 2 lines/row | eff. 90%", drip_4dl: "Drip – 4 lines/row | eff. 90%", sprinkler: "Micro-sprinkler | eff. 82%" },
  it: { drip_1dl: "Goccia – 1 ala/fila | eff. 90%", drip_2dl: "Goccia – 2 ali/fila | eff. 90%", drip_4dl: "Goccia – 4 ali/fila | eff. 90%", sprinkler: "Micro-sprinkler | eff. 82%" },
  es: { drip_1dl: "Goteo – 1 línea/fila | ef. 90%", drip_2dl: "Goteo – 2 líneas/fila | ef. 90%", drip_4dl: "Goteo – 4 líneas/fila | ef. 90%", sprinkler: "Micro-aspersor | ef. 82%" },
};

// ET0 from Tmax — calibrated to match measured monthly averages:
// Apr(Tmax~21°C)→2.8  May(~29°C)→5.0  Jun(~31°C)→5.5
// Jul(~38°C)→7.5  Aug(~34°C)→6.5  Sep(~23°C)→3.4  Oct(~18°C)→1.9
function estimateET0(tmax) {
  if (tmax <= 15) return 1.2;
  if (tmax <= 20) return 1.2 + (tmax - 15) * 0.26;
  if (tmax <= 38) return 2.5 + (tmax - 20) * 0.278;
  return 7.5 + (tmax - 38) * 0.175;
}

// Get reference ET0 for selected month (from measured table)
function getRefET0(month) {
  return KC_MONTHLY[month]?.et0ref ?? null;
}

// Get measured Kc for selected month and age
function getMeasuredKc(month, age) {
  const base = KC_MONTHLY[month]?.kc ?? null;
  if (!base) return null;
  return age === "young" ? base * 0.5 : base;
}

const darkGreen = "#0D2818";
const midGreen  = "#1A3A2A";
const accent    = "#2D5A3D";
const gold      = "#C9A84C";
const cream     = "#F5F0E8";
const creamDark = "#EDE6D8";
const textMuted = "#5A7A64";
const cream = "#F5F0E8";
const lightGreen = "#EAF3EC";
const stageColors = ["#2E7D52","#C8973A","#1A4A2E","#6b9e7a"];

const inputStyle = {
  width:"100%", padding:"10px 12px", borderRadius:8,
  border:"1.5px solid #cde0d4", background:"#fff",
  fontSize:15, color:darkGreen, outline:"none",
  boxSizing:"border-box", fontFamily:"inherit",
};
const labelStyle = {
  fontSize:11, fontWeight:700, letterSpacing:"0.05em",
  color:midGreen, textTransform:"uppercase", marginBottom:4, display:"block",
};
const cardStyle = {
  background:"#fff", borderRadius:14, padding:"18px 20px",
  marginBottom:14, boxShadow:"0 2px 10px rgba(26,74,46,0.07)",
  border:"1px solid #d6ead9",
};


// ─── Persist inputs to localStorage ────────────────────────────────────────
const IRRIG_STORAGE_KEY = 'agrisci_irrigation_inputs';

function loadSaved(key, defaultVal) {
  try {
    const s = localStorage.getItem(IRRIG_STORAGE_KEY);
    if (!s) return defaultVal;
    const d = JSON.parse(s);
    return key in d ? d[key] : defaultVal;
  } catch { return defaultVal; }
}

function saveInputs(data) {
  try { localStorage.setItem(IRRIG_STORAGE_KEY, JSON.stringify(data)); } catch {}
}


// ─── Irrigation Icon (water drop) ────────────────────────────────────────────
function IrrigationIcon({ size = 42 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Water drop shape */}
      <path d="M40 8 C40 8 18 34 18 50 C18 62 28 72 40 72 C52 72 62 62 62 50 C62 34 40 8 40 8Z" fill="#1A3A2A"/>
      <path d="M40 14 C40 14 22 37 22 50 C22 60 30 68 40 68 C50 68 58 60 58 50 C58 37 40 14 40 14Z" fill="#C9A84C" opacity="0.15"/>
      {/* Kiwi leaf inside drop */}
      <ellipse cx="40" cy="48" rx="13" ry="16" fill="#2D5A3D" transform="rotate(-10 40 48)"/>
      <line x1="40" y1="34" x2="40" y2="62" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <line x1="40" y1="44" x2="30" y2="52" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <line x1="40" y1="44" x2="50" y2="52" stroke="#C9A84C" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      {/* Water drop highlight */}
      <ellipse cx="32" cy="36" rx="4" ry="6" fill="white" opacity="0.15" transform="rotate(-20 32 36)"/>
    </svg>
  );
}

export default function KiwiIrrigationCalc() {
  const [appLang,       setAppLang]       = useState(() => loadSaved("appLang", "el"));
  const L2 = LANGS[appLang];
  const [tmax,          setTmax]          = useState(() => (parseInt(loadSaved("tmax", 35)) || 35));
  const [month,         setMonth]         = useState(() => (parseInt(loadSaved("month", 7)) || 7)); // 1-12, default July
  const [soilType,      setSoilType]      = useState(() => loadSaved("soilType", "clay_loam"));
  const [irrigSystem,   setIrrigSystem]   = useState(() => loadSaved("irrigSystem", "drip_2dl"));
  const [emittersHa,    setEmittersHa]    = useState(() => (parseInt(loadSaved("emittersHa", 2000)) || 2000));
  const [emitterFlow,   setEmitterFlow]   = useState(() => parseFloat(loadSaved("emitterFlow", 2.0) ?? 2.0));
  const [unit,          setUnit]          = useState(() => loadSaved("unit", "stremma"));
  const [treeAge,       setTreeAge]       = useState(() => loadSaved("treeAge", "mature"));
  const [phenoStage,    setPhenoStage]    = useState(() => (parseInt(loadSaved("phenoStage", 2)) || 2));
  const [rainfall,      setRainfall]      = useState(() => (parseInt(loadSaved("rainfall", 0)) || 0));
  const [rowSpacing,    setRowSpacing]    = useState(() => parseFloat(loadSaved("rowSpacing", 5.0) ?? 5.0));
  const [result,        setResult]        = useState(null);

  const [calculated, setCalculated] = useState(false);
  // Mark dirty when inputs change
  useEffect(() => { setCalculated(false); }, [tmax,month,soilType,irrigSystem,emittersHa,emitterFlow,treeAge,phenoStage,rainfall,rowSpacing]); // eslint-disable-line react-hooks/exhaustive-deps
  // Unit change: recalculate display immediately without resetting button
  function runCalculate() { calculate(unit); setCalculated(true); }

  // Save inputs whenever they change
  useEffect(() => {
    saveInputs({ appLang, tmax, month, soilType, irrigSystem, emittersHa, emitterFlow, unit, treeAge, phenoStage, rainfall, rowSpacing });
  }, [appLang, tmax, month, soilType, irrigSystem, emittersHa, emitterFlow, unit, treeAge, phenoStage, rainfall, rowSpacing]); // eslint-disable-line react-hooks/exhaustive-deps

  function calculate(overrideUnit) {
    const activeUnit = overrideUnit ?? unit;
    const soil = SOIL_TYPES_DATA[soilType];
    const sys  = IRRIGATION_SYSTEMS_DATA[irrigSystem];
    const kcEntry = KC_TABLE[treeAge][phenoStage];

    // Use measured monthly Kc if month is in table, else use stage average
    const measuredKc = getMeasuredKc(month, treeAge);
    const kc = measuredKc !== null ? measuredKc : kcEntry.kc;

    // Use measured monthly ET0 reference if available, else estimate from Tmax
    // Blend: if user's Tmax diverges from monthly avg, adjust proportionally
    // ET0 from Tmax (calibrated to measured monthly averages)
    const et0 = estimateET0(tmax);
    const etc  = et0 * kc;

    // Effective rainfall — only fraction reaches wetted root zone (Dichio/Frutticoltura 2020)
    const wetted_frac = Math.min(1.0, sys.wetted_width / rowSpacing);
    const pu = Math.min(rainfall * wetted_frac, etc * 0.85);

    const netMM = Math.max(0, etc - pu);

    // Gross irrigation volume [m³/ha/day]   IV = (ETc–Pu)/ime × 10
    const grossM3Ha = (netMM / sys.efficiency) * 10;

    // Wetted soil volume Vs = A × d × L
    const lengthPerHa = 10000 / rowSpacing;
    const Vs = sys.wetted_width * 0.50 * lengthPerHa;  // m³/ha

    // Available & readily available water in Vs
    const aw_pct = (soil.fc - soil.wp) / 100;
    const AW  = Vs * aw_pct;  // m³/ha (volumetric water content)
    const RAW = AW * 0.40;                         // 40% threshold 

    // Irrigation frequency: days to deplete RAW
    const rawMM = RAW / 10;
    const freq = netMM > 0 ? Math.max(1, Math.round(rawMM / netMM)) : 999;

    // Display conversion factor (1 ha = 10 stremma)
    const factor = activeUnit === "stremma" ? 0.1 : 1.0;

    // ── Run-time calculation ─────────────────────────────────────────────
    // System flow per unit area
    const systemFlowM3HaH = (emittersHa * emitterFlow) / 1000;
    const systemFlowUnit  = systemFlowM3HaH * factor;

    // Hours to irrigate one unit of area
    const grossUnit  = grossM3Ha * factor;
    const runTimeH   = systemFlowUnit > 0 ? grossUnit / systemFlowUnit : 0;
    const runTimeMin = runTimeH * 60;

    // Recommended sessions per day
    const sessions = runTimeH > 3 ? 3 : runTimeH > 1.5 ? 2 : 1;
    const perSessionMin = runTimeMin / sessions;

    // Undersized flag
    const undersized = runTimeH > 12;
    const unitLabel = activeUnit === "stremma" ? (appLang==="el"?"στρέμμα":appLang==="en"?"stremma":appLang==="it"?"stremma":"estrémma") : (appLang==="el"?"εκτάριο":appLang==="en"?"hectare":appLang==="it"?"ettaro":"hectárea");

    const monthNames = ["","Ιαν","Φεβ","Μάρ","Απρ","Μάι","Ιούν","Ιούλ","Αύγ","Σεπ","Οκτ","Νοε","Δεκ"];
    setResult({
      et0: et0.toFixed(1),
      etc: etc.toFixed(1),
      kc:  kc.toFixed(2),
      usingMeasuredKc: measuredKc !== null,
      monthName: monthNames[month],
      netMM: netMM.toFixed(1),
      grossM3:    (grossM3Ha * factor).toFixed(1),
      grossM3Ha:  grossM3Ha.toFixed(1),
      systemFlowDisplay: systemFlowUnit.toFixed(2),
      unitLabel, factor,
      AW:  (AW  * factor).toFixed(0),
      RAW: (RAW * factor).toFixed(0),
      Vs:  (Vs  * factor).toFixed(0),
      freq,
      runTimeMin:    runTimeMin.toFixed(0),
      sessions,
      perSessionMin: perSessionMin.toFixed(0),
      undersized,
      stage: kcEntry.labels ? kcEntry.labels[appLang] : kcEntry.label,
      highTemp: tmax > 38,
    });
  }

  // Sync displayed emitters input with unit
  // Password gate
  const [unlocked, setUnlocked] = useState(() => {
    try { return localStorage.getItem("agrisci_pw") === "agrisci2024"; } catch { return false; }
  });
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);

  const PASSWORD = "agrisci2024";

  function doUnlock() {
    try { localStorage.setItem("agrisci_pw", PASSWORD); } catch {}
    setUnlocked(true);
  }

  if (!unlocked) {
    return (
      <div style={{
        minHeight:"100vh", background:darkGreen,
        fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif",
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24,
      }}>
        <div style={{ display:"flex", gap:6, marginBottom:32 }}>
          {["el","en","it","es"].map(l => (
            <button key={l} onClick={() => setAppLang(l)} style={{
              padding:"4px 10px", borderRadius:20,
              border:`1.5px solid ${appLang===l ? gold : gold+"44"}`,
              background:appLang===l ? gold : "transparent",
              color:appLang===l ? darkGreen : gold,
              fontSize:11, fontWeight:700, cursor:"pointer",
            }}>
              {l==="el"?"🇬🇷 ΕΛ":l==="en"?"🇬🇧 EN":l==="it"?"🇮🇹 IT":"🇪🇸 ES"}
            </button>
          ))}
        </div>
        <div style={{
          background:cream, borderRadius:20, padding:"36px 28px",
          maxWidth:360, width:"100%", textAlign:"center",
        }}>
          <div style={{
            width:80, height:80, borderRadius:20, background:darkGreen,
            margin:"0 auto 20px", display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <IrrigationIcon size={56}/>
          </div>
          <div style={{ fontSize:11, color:gold, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:6 }}>
            AgriSci Solutions
          </div>
          <div style={{ fontSize:20, fontWeight:800, color:"#1A2E1E", marginBottom:6 }}>
            {L2.pwTitle || L2.title}
          </div>
          <div style={{ fontSize:13, color:textMuted, marginBottom:28 }}>
            {L2.pwSubtitle || L2.subtitle}
          </div>
          <input
            type="password" placeholder={L2.password} value={pwInput}
            onChange={e => { setPwInput(e.target.value); setPwError(false); }}
            onKeyDown={e => { if (e.key==="Enter") { if(pwInput===PASSWORD) doUnlock(); else setPwError(true); }}}
            style={{
              width:"100%", padding:"12px 16px", borderRadius:10,
              border:`2px solid ${pwError ? "#C0392B" : creamDark}`,
              background:"#fff", fontSize:16, color:"#1A2E1E",
              outline:"none", boxSizing:"border-box", marginBottom:8,
              textAlign:"center", letterSpacing:"0.1em",
            }}
          />
          {pwError && <div style={{ color:"#C0392B", fontSize:12, marginBottom:8, fontWeight:600 }}>{L2.wrongPw}</div>}
          <button
            onClick={() => { if(pwInput===PASSWORD) doUnlock(); else setPwError(true); }}
            style={{
              width:"100%", padding:"13px", borderRadius:10, background:darkGreen,
              color:gold, border:"none", fontSize:15, fontWeight:800,
              cursor:"pointer", letterSpacing:"0.05em", marginTop:4,
            }}
          >{L2.enter}</button>
          <div style={{ marginTop:24, fontSize:11, color:textMuted, lineHeight:1.8 }}>
            {L2.footerCTA}{" "}
            <a href="https://agrisci-solutions.com/#tools" style={{ color:"#2D5A3D", fontWeight:600 }}>
              agrisci-solutions.com
            </a>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div style={{ minHeight:"100vh", background:darkGreen, fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif" }}>

      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,${darkGreen} 0%,${midGreen} 100%)`, padding:"24px 22px 18px", color:"#fff" }}>
        <div style={{ maxWidth:540, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:4 }}>
              <div style={{ background:"rgba(255,255,255,0.1)", borderRadius:12, padding:6 }}>
                <IrrigationIcon size={38}/>
              </div>
              <div>
                <div style={{ fontSize:11, color:gold, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase" }}>AgriSci Solutions</div>
                <div style={{ fontSize:18, fontWeight:800, color:"#F5F0E8" }}>{L2.title}</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:5 }}>
              {["el","en","it","es"].map(l => (
                <button key={l} onClick={() => setAppLang(l)} style={{
                  padding:"4px 8px", borderRadius:6, border:"none", cursor:"pointer",
                  background: appLang===l ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)",
                  color:"#fff", fontSize:11, fontWeight:700,
                }}>{l.toUpperCase()}</button>
              ))}
            </div>
          </div>

        </div>
      </div>

      <div style={{ maxWidth:540, margin:"0 auto", padding:"16px 15px 40px" }}>

        {/* Unit toggle */}
        <div style={{ display:"flex", gap:8, marginBottom:14 }}>
          {["stremma","hectare"].map(u => (
            <button key={u} onClick={() => { setUnit(u); if(result) { calculate(u); } }} style={{
              flex:1, padding:"9px 0", borderRadius:8, border:"none", cursor:"pointer",
              background:unit===u ? darkGreen : "#fff",
              color:unit===u ? "#fff" : darkGreen,
              fontWeight:700, fontSize:13, transition:"all 0.2s",
              boxShadow:unit===u ? "0 2px 8px rgba(26,74,46,0.2)" : "0 1px 3px rgba(0,0,0,0.07)",
            }}>{u==="stremma" ? (appLang==="el"?"Στρέμμα":"Stremma") : (appLang==="el"?"Εκτάριο":"Hectare")}</button>
          ))}
        </div>

        {/* Month selector */}
        <div style={cardStyle}>
          <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>{appLang==="el"?"📅 Μήνας":appLang==="en"?"📅 Month":appLang==="it"?"📅 Mese":"📅 Mes"}</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:5 }}>
            {(()=>{
              const ML = {
                el:[{m:4,l:"Απρ"},{m:5,l:"Μάι"},{m:6,l:"Ιούν"},{m:7,l:"Ιούλ"},{m:8,l:"Αύγ"},{m:9,l:"Σεπ"},{m:10,l:"Οκτ"}],
                en:[{m:4,l:"Apr"},{m:5,l:"May"},{m:6,l:"Jun"},{m:7,l:"Jul"},{m:8,l:"Aug"},{m:9,l:"Sep"},{m:10,l:"Oct"}],
                it:[{m:4,l:"Apr"},{m:5,l:"Mag"},{m:6,l:"Giu"},{m:7,l:"Lug"},{m:8,l:"Ago"},{m:9,l:"Set"},{m:10,l:"Ott"}],
                es:[{m:4,l:"Abr"},{m:5,l:"May"},{m:6,l:"Jun"},{m:7,l:"Jul"},{m:8,l:"Ago"},{m:9,l:"Sep"},{m:10,l:"Oct"}],
              };
              return (ML[appLang]||ML.en).map(({m,l}) => {
              const ref = KC_MONTHLY[m];
              const isSelected = month === m;
              return (
                <button key={m} onClick={() => setMonth(m)} style={{
                  padding:"7px 2px", borderRadius:8, cursor:"pointer",
                  background: isSelected ? darkGreen : "#fff",
                  color: isSelected ? "#fff" : darkGreen,
                  fontWeight: isSelected ? 800 : 400,
                  fontSize:12, textAlign:"center",
                  boxShadow: isSelected ? "0 2px 6px rgba(26,74,46,0.25)" : "0 1px 3px rgba(0,0,0,0.06)",
                  border: isSelected ? "none" : "1.5px solid #d6ead9",
                }}>
                  <div>{l}</div>
                  <div style={{ fontSize:9, opacity: isSelected ? 0.85 : 0.55, marginTop:1 }}>
                    Kc {ref?.kc.toFixed(1)}
                  </div>
                </button>
              );
            });})()}
          </div>
          <div style={{ marginTop:10, display:"flex", gap:8 }}>
            <div style={{ flex:1, background:lightGreen, borderRadius:8, padding:"7px 10px", textAlign:"center" }}>
              <div style={{ fontSize:9, color:midGreen, fontWeight:700 }}>{appLang==="el"?"Kc μετρημένο":appLang==="en"?"Measured Kc":appLang==="it"?"Kc misurato":"Kc medido"}</div>
              <div style={{ fontSize:20, fontWeight:800 }}>{KC_MONTHLY[month]?.kc.toFixed(2) ?? "—"}</div>
            </div>
            <div style={{ flex:1, background:lightGreen, borderRadius:8, padding:"7px 10px", textAlign:"center" }}>
              <div style={{ fontSize:9, color:midGreen, fontWeight:700 }}>{appLang==="el"?"ET₀ αναφοράς (mm/ημ)":appLang==="en"?"ET₀ reference (mm/day)":appLang==="it"?"ET₀ riferimento (mm/g)":"ET₀ referencia (mm/día)"}</div>
              <div style={{ fontSize:20, fontWeight:800 }}>{KC_MONTHLY[month]?.et0ref.toFixed(1) ?? "—"}</div>
            </div>
          </div>
        </div>

        {/* Climate */}
        <div style={cardStyle}>
          <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>🌡️ {L2.tmax.split("(")[0]}</div>
          <label style={labelStyle}>{L2.tmax}</label>
          <input type="range" min={15} max={45} value={tmax}
            onChange={e => setTmax(Number(e.target.value))}
            style={{ width:"100%", accentColor:midGreen, marginBottom:4 }} />
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
            <span style={{ fontSize:12, color:"#999" }}>15°C</span>
            <span style={{ fontSize:28, fontWeight:800, color:gold }}>{tmax}°C</span>
            <span style={{ fontSize:12, color:"#999" }}>45°C</span>
          </div>
          {result && (
            <div style={{ background:lightGreen, borderRadius:8, padding:"7px 11px", marginBottom:10, fontSize:13 }}>
              {appLang==="el"?"Εκτίμηση ET₀:":appLang==="en"?"ET₀ estimate:":appLang==="it"?"Stima ET₀:":"Estimación ET₀:"} <strong>{result.et0} mm/{L2.perDay}</strong>
              
            </div>
          )}
          <label style={labelStyle}>{L2.rainfall}</label>
          <input type="number" min={0} max={60} value={rainfall} step={1}
            onChange={e => setRainfall(Number(e.target.value))} style={inputStyle} />
        </div>

        {/* Tree */}
        <div style={cardStyle}>
          <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>{`🌿 ${L2.treeAge}`}</div>
          <label style={labelStyle}>{L2.treeAge}</label>
          <select value={treeAge} onChange={e => setTreeAge(e.target.value)} style={{ ...inputStyle, marginBottom:12 }}>
            <option value="young">{L2.young}</option>
            <option value="mature">{L2.mature}</option>
          </select>
          <label style={labelStyle}>{L2.pheno}</label>
          <div style={{ display:"flex", flexDirection:"column", gap:5, marginBottom:12 }}>
            {KC_TABLE[treeAge].map((s,i) => (
              <button key={i} onClick={() => setPhenoStage(i)} style={{
                textAlign:"left", padding:"9px 13px", borderRadius:8, cursor:"pointer",
                border:`2px solid ${phenoStage===i ? stageColors[i] : "#d6ead9"}`,
                background:phenoStage===i ? `${stageColors[i]}18` : "#fff",
                fontSize:13, color:darkGreen, fontWeight:phenoStage===i ? 700 : 400,
              }}>
                <span style={{ fontWeight:700, color:stageColors[i] }}>Kc {s.kc.toFixed(2)}</span>
                {"  "}{s.labels[appLang]}
              </button>
            ))}
          </div>
          <label style={labelStyle}>{L2.rowSpacing}</label>
          <input type="number" min={3} max={7} value={rowSpacing} step={0.5}
            onChange={e => setRowSpacing(Number(e.target.value))} style={inputStyle} />
        </div>

        {/* Soil */}
        <div style={cardStyle}>
          <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>🪱 {L2.soil}</div>
          <select value={soilType} onChange={e => setSoilType(e.target.value)} style={{ ...inputStyle, marginBottom:10 }}>
            {Object.entries(SOIL_TYPES_DATA).map(([k]) => (
              <option key={k} value={k}>{SOIL_LABELS[appLang][k]}</option>
            ))}
          </select>
          <div style={{ display:"flex", gap:8 }}>
            {[
              { l:"FC", v:SOIL_TYPES_DATA[soilType].fc+"%" },
              { l:"WP", v:SOIL_TYPES_DATA[soilType].wp+"%" },
              { l:"AD=FC–WP", v:(SOIL_TYPES_DATA[soilType].fc-SOIL_TYPES_DATA[soilType].wp)+"%" },
            ].map(item => (
              <div key={item.l} style={{ flex:1, background:lightGreen, borderRadius:8, padding:"7px 6px", textAlign:"center" }}>
                <div style={{ fontSize:9, color:midGreen, fontWeight:700 }}>{item.l}</div>
                <div style={{ fontSize:16, fontWeight:800 }}>{item.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Irrigation system */}
        <div style={cardStyle}>
          <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>💧 {L2.system}</div>

          <label style={labelStyle}>{L2.system}</label>
          <select value={irrigSystem} onChange={e => setIrrigSystem(e.target.value)}
            style={{ ...inputStyle, marginBottom:14 }}>
            {Object.entries(IRRIGATION_SYSTEMS_DATA).map(([k]) => (
              <option key={k} value={k}>{IRRIG_LABELS[appLang][k]}</option>
            ))}
          </select>

          {/* Emitters — clearly labeled as TOTAL across all lines */}
          <div style={{ background:"#f0f7f2", borderRadius:10, padding:"12px 14px", marginBottom:10 }}>
            <div style={{ fontSize:12, fontWeight:700, color:midGreen, marginBottom:8 }}>
              {appLang==="el"?"Χαρακτηριστικά Εκπομπών":appLang==="en"?"Emitter Settings":appLang==="it"?"Impostazioni Erogatori":"Configuración Emisores"}
            </div>
    
            <div style={{ display:"flex", gap:10 }}>
              <div style={{ flex:1 }}>
                <label style={labelStyle}>
                  {appLang==="el"?"Σύνολο εκπομπών":appLang==="en"?"Total emitters":appLang==="it"?"Totale erogatori":"Total emisores"} /{unit==="stremma"?"στρ.":"ha"}
                </label>
                <input type="number" min={10} max={unit==="stremma"?500:5000}
                  value={unit === "stremma" ? Math.round(emittersHa / 10) : emittersHa}
                  onChange={e => {
                    const v = Number(e.target.value);
                    setEmittersHa(unit==="stremma" ? v*10 : v);
                  }}
                  style={inputStyle} />
              </div>
              <div style={{ flex:1 }}>
                <label style={labelStyle}>{L2.flow}</label>
                <input type="number" min={0.5} max={80} value={emitterFlow} step={0.5}
                  onChange={e => setEmitterFlow(Number(e.target.value))} style={inputStyle} />
              </div>
            </div>
            {result && (
              <div style={{ marginTop:8, fontSize:12, color:darkGreen }}>
                {appLang==="el"?"Συνολική παροχή:":appLang==="en"?"Total flow:":appLang==="it"?"Portata totale:":"Caudal total:"} <strong>{result.systemFlowDisplay} m³/{unit==="stremma"?"str":"ha"}/h</strong>
              </div>
            )}
          </div>
        </div>

        {/* Calculate button */}
        <button
          onClick={runCalculate}
          style={{
            width:"100%", padding:"14px", borderRadius:12, border:"none",
            background: calculated ? "#2E7D52" : "#C8973A",
            color: calculated ? "#fff" : "#1A4A2E",
            fontSize:16, fontWeight:800, cursor:"pointer", marginBottom:14,
            boxShadow: calculated ? "none" : "0 4px 16px rgba(200,151,58,0.4)",
            transition:"all 0.2s",
          }}
        >
          {calculated
            ? (appLang==="el"?"✅ Αποτελέσματα ενημερωμένα":appLang==="en"?"✅ Results up to date":appLang==="it"?"✅ Risultati aggiornati":"✅ Resultados actualizados")
            : (appLang==="el"?"⚗️ Υπολογισμός":appLang==="en"?"⚗️ Calculate":appLang==="it"?"⚗️ Calcola":"⚗️ Calcular")
          }
        </button>

        {/* Results */}
        {result && (
          <div style={{
            background:`linear-gradient(155deg,${darkGreen} 0%,#1d6040 100%)`,
            borderRadius:16, padding:"20px", color:"#fff", marginBottom:12,
          }}>
            <div style={{ fontSize:11, letterSpacing:"0.1em", opacity:0.65, marginBottom:12, textTransform:"uppercase" }}>
              📊 {L2.results}
            </div>

            {/* Water need */}
            <div style={{ textAlign:"center", marginBottom:18, paddingBottom:16, borderBottom:"1px solid rgba(255,255,255,0.15)" }}>
              <div style={{ fontSize:12, opacity:0.7, marginBottom:2 }}>{L2.waterNeeded}</div>
              <div style={{ fontSize:52, fontWeight:900, lineHeight:1, color:gold }}>{result.grossM3}</div>
              <div style={{ fontSize:15, opacity:0.8 }}>m³/{unit==="stremma"?(appLang==="el"?"στρ":appLang==="en"?"str":appLang==="it"?"str":"str"):"ha"}/{L2.perDay}</div>
            </div>

            {/* ET stats */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:16, paddingBottom:16, borderBottom:"1px solid rgba(255,255,255,0.15)" }}>
              {[
                { l:"ET₀ (Tmax)", v:result.et0+" mm/d" },
                { l:`Kc ${result.usingMeasuredKc?"("+( appLang==="el"?"μετρημένο":appLang==="en"?"measured":appLang==="it"?"misurato":"medido")+")":"("+( appLang==="el"?"φάση":appLang==="en"?"stage":appLang==="it"?"fase":"fase")+")"}`, v:result.kc },
                { l:appLang==="el"?"ETc καλλιέργειας":appLang==="en"?"Crop ETc":appLang==="it"?"ETc coltura":"ETc cultivo", v:result.etc+" mm/"+L2.perDay },
                { l:appLang==="el"?"Καθαρή ανάγκη":appLang==="en"?"Net requirement":appLang==="it"?"Fabbisogno netto":"Necesidad neta", v:result.netMM+" mm/"+L2.perDay},
              ].map(item => (
                <div key={item.l} style={{ background:"rgba(255,255,255,0.10)", borderRadius:9, padding:"9px 11px" }}>
                  <div style={{ fontSize:10, opacity:0.6, marginBottom:2 }}>{item.l}</div>
                  <div style={{ fontSize:16, fontWeight:800 }}>{item.v}</div>
                </div>
              ))}
            </div>

            {/* Operational — this is what changes with emitters */}
            <div style={{ marginBottom:14, paddingBottom:14, borderBottom:"1px solid rgba(255,255,255,0.15)" }}>
              <div style={{ fontSize:11, opacity:0.6, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>
                {appLang==="el"?"⏱️ Χρόνος Λειτουργίας":"⏱️ "+(appLang==="en"?"System Run Time":appLang==="it"?"Tempo Funzionamento":"Tiempo Funcionamiento")}
              </div>

              {result.undersized ? (
                <div style={{ background:"rgba(255,100,100,0.2)", borderRadius:10, padding:"12px", fontSize:13 }}>
                  ⚠️ <strong>{L2.undersized}</strong><br/>
                  {appLang==="el"?`Χρειάζονται ${result.runTimeMin} λεπτά. Αυξήστε τον αριθμό ή την παροχή.`:appLang==="en"?`Needs ${result.runTimeMin} min. Increase emitter count or flow.`:appLang==="it"?`Necessita ${result.runTimeMin} min. Aumentare numero o portata.`:`Necesita ${result.runTimeMin} min. Aumente número o caudal.`}
                </div>
              ) : (
                <>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                    <span style={{ opacity:0.75, fontSize:13 }}>{L2.runtime}</span>
                    <span style={{ fontWeight:800, fontSize:18, color:gold }}>{result.runTimeMin} {appLang==="el"?"λεπτά":appLang==="it"?"min":"min"}</span>
                  </div>
                  {result.sessions > 1 && (
                    <div style={{ background:"rgba(255,255,255,0.10)", borderRadius:9, padding:"10px 12px" }}>
                      <div style={{ fontSize:11, opacity:0.65, marginBottom:4 }}>
                        {L2.sessions}
                      </div>
                      <div style={{ fontSize:16, fontWeight:800 }}>
                        {result.sessions} × {result.perSessionMin} {appLang==="el"?"λεπτά":"min"} / {L2.perDay}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Soil water */}
            <div style={{ marginBottom:14, paddingBottom:14, borderBottom:"1px solid rgba(255,255,255,0.15)" }}>
              <div style={{ fontSize:11, opacity:0.6, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>
                {appLang==="el"?"Παράμετροι Εδάφους (Vs, 0–50cm)":appLang==="en"?"Soil Parameters (Vs, 0–50cm)":appLang==="it"?"Parametri Suolo (Vs, 0–50cm)":"Parámetros Suelo (Vs, 0–50cm)"}
              </div>
              <div style={{ display:"flex", gap:6 }}>
                {[
                  { l:appLang==="el"?"Vs βρεχόμενος":appLang==="en"?"Wetted Vs":appLang==="it"?"Vs bagnato":"Vs mojado", v:result.Vs+" m³" },
                  { l:appLang==="el"?"AD διαθέσιμο":appLang==="en"?"Available water":appLang==="it"?"Acqua disponibile":"Agua disponible", v:result.AW+" m³" },
                  { l:"AFD (40% AD)", v:result.RAW+" m³" },
                ].map(item => (
                  <div key={item.l} style={{ flex:1, textAlign:"center", background:"rgba(255,255,255,0.08)", borderRadius:8, padding:"8px 4px" }}>
                    <div style={{ fontSize:8.5, opacity:0.6 }}>{item.l}</div>
                    <div style={{ fontSize:14, fontWeight:800 }}>{item.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Frequency */}
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <span style={{ opacity:0.75, fontSize:13 }}>📅 {L2.cycle}</span>
              <span style={{ fontWeight:800, fontSize:15 }}>
                {result.freq >= 999 ? L2.notNeeded : `${L2.every} ${result.freq} ${L2.days}`}
              </span>
            </div>
          </div>
        )}

        {/* Warnings */}
        {result?.highTemp && (
          <div style={{ background:"#fff8e6", border:`1.5px solid ${gold}`, borderRadius:10, padding:"11px 14px", fontSize:13, color:"#7a5a00", marginBottom:12 }}>
            {appLang==="el"?"⚠️ Υψηλή θερμοκρασία — κίνδυνος υδατικής καταπόνησης. Προτεραιότητα πρωινής άρδευσης.":appLang==="en"?"⚠️ High temperature — risk of water stress. Prioritise morning irrigation.":appLang==="it"?"⚠️ Temperatura elevata — rischio stress idrico. Dare priorità all'irrigazione mattutina.":"⚠️ Temperatura alta — riesgo de estrés hídrico. Priorizar el riego matutino."}
          </div>
        )}

        {/* Stage note */}
        {phenoStage === 1 && (
          <div style={{ ...cardStyle, borderLeft:`4px solid ${gold}` }}>
            <div style={{ fontSize:11, fontWeight:700, color:gold, textTransform:"uppercase", marginBottom:5 }}>{`⚠️ ${L2.critical}`}</div>
            <div style={{ fontSize:13, lineHeight:1.6 }}>
              <strong>{L2.pheno}</strong> — {appLang === "el" ? "~70% του ολικού ETc. Ακόμη και βραχύχρονη έλλειψη νερού μειώνει τον αριθμό κυττάρων και το τελικό μέγεθος καρπού." : appLang === "en" ? "~70% of total ETc. Even brief water deficit reduces cell number and final fruit size." : appLang === "it" ? "~70% dell'ETc totale. Anche un breve stress idrico riduce il numero di cellule e la pezzatura finale." : "~70% del ETc total. Incluso un breve déficit hídrico reduce el número de células y el tamaño final del fruto."} 
            </div>
          </div>
        )}

      {/* Footer */}
      <div style={{ textAlign:"center", fontSize:11, color:textMuted, padding:"16px 16px 32px", lineHeight:1.8 }}>
        <span style={{ color:gold, fontWeight:700 }}>AgriSci Solutions</span> · agrisci-solutions.com<br/>
        {L2.footerCTA}{" "}
        <a href="https://agrisci-solutions.com" style={{ color:"#2D5A3D", fontWeight:600 }}>
          {L2.footerLink}
        </a>
      </div>

      </div>
    </div>
  );
}
