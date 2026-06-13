import { useState, useEffect, useCallback } from "react";

// ── Translations ─────────────────────────────────────────────────────────────
const LANGS = {
  el: {
    flag: "🇬🇷", label: "Ελληνικά",
    appTitle: "Υπολογιστής Ημερήσιας Άρδευσης",
    appSub: "Precision Irrigation · Ακτινίδιο",
    perStremma: "ανά στρέμμα", perHectare: "ανά εκτάριο",
    monthLabel: "Μήνας",
    kcMeasured: "Kc μετρημένο", et0ref: "ET₀ αναφοράς (mm/ημ)",
    tempTitle: "Θερμοκρασία Ημέρας",
    tempLabel: "Μέγιστη θερμοκρασία ημέρας (°C)",
    et0Est: "Εκτίμηση ET₀",
    rainfallLabel: "Βροχόπτωση ημέρας (mm)",
    plantTitle: "Φυτεία",
    ageLabel: "Ηλικία δένδρων",
    ageYoung: "1–3 έτη (νεαρό, μερική κόμη)",
    ageMature: "≥4 έτη (ενήλικο, πλήρης κόμη)",
    phenoLabel: "Φαινολογική φάση",
    rowSpacingLabel: "Απόσταση μεταξύ σειρών (m)",
    soilTitle: "Τύπος Εδάφους",
    irrigTitle: "Σύστημα Άρδευσης",
    irrigTypeLabel: "Τύπος συστήματος",
    emittersBox: "Χαρακτηριστικά Εκπομπών",
    emittersNote1: "Εισάγετε το",
    emittersNote2: "σύνολο",
    emittersNote3: "των εκπομπών",
    emittersNote4: "(όλοι οι αγωγοί μαζί). Π.χ. 2 αγωγοί × 100 σταλ./αγωγό =",
    totalEmitters: "Σύνολο εκπομπών",
    flowLabel: "Παροχή / εκπομπή (L/h)",
    totalFlow: "Συνολική παροχή",
    resultsTitle: "Αποτελέσματα Ημέρας",
    waterNeeded: "Νερό που χρειάζεται σήμερα",
    dayUnit: "ημέρα", perDay: "ημ",
    et0Tmax: "ET₀ (Tmax)", kcMeas: "Kc (μετρημένο)", kcPhase: "Kc (φάση)",
    etcCrop: "ETc καλλιέργειας", netNeed: "Καθαρή ανάγκη",
    runtimeTitle: "Χρόνος Λειτουργίας Συστήματος",
    undersizedWarn: "Ανεπαρκής παροχή συστήματος",
    undersizedMsg: "Χρειάζονται {min} λεπτά για να χορηγηθεί το απαιτούμενο νερό. Αυξήστε τον αριθμό ή την παροχή των εκπομπών.",
    totalTimeDay: "Συνολικός χρόνος/ημέρα",
    minutes: "λεπτά",
    recommendedDist: "Συνιστώμενη κατανομή",
    soilParams: "Παράμετροι Εδάφους (Vs, 0–50 cm)",
    wettedVol: "Vs βρεχόμενος", availWater: "AD διαθέσιμο", rawLabel: "AFD (40% AD)",
    freqLabel: "Κύκλος (αποστράγγιση AFD)",
    freqNone: "Δεν απαιτείται", freqEvery: "κάθε {n} ημέρα/ες",
    highTempWarn: "⚠️ Υψηλή θερμοκρασία — κίνδυνος υδατικής καταπόνησης. Προτεραιότητα πρωινής άρδευσης.",
    criticalPhase: "Κρίσιμη Φάση",
    cellDivMsg: "Κυτταροδιαίρεση — ~70% του ολικού ETc. Ακόμη και βραχύχρονη έλλειψη νερού μειώνει τον αριθμό κυττάρων και το τελικό μέγεθος καρπού.",
    months: ["","Ιαν","Φεβ","Μάρ","Απρ","Μάι","Ιούν","Ιούλ","Αύγ","Σεπ","Οκτ","Νοε","Δεκ"],
    monthsFull: {4:"Απρ",5:"Μάι",6:"Ιούν",7:"Ιούλ",8:"Αύγ",9:"Σεπ",10:"Οκτ"},
    stremma: "στρέμμα", hectare: "εκτάριο",
    kcTable: {
      young: [
        { label: "Βλάστηση – Ανθοφορία (Μάρ–Απρ)", kc: 0.25, months: [3,4] },
        { label: "Κυτταροδιαίρεση (Μάι–Ιούν)",      kc: 0.40, months: [5,6] },
        { label: "Ωρίμανση καρπού (Ιούλ–Αύγ)",      kc: 0.55, months: [7,8] },
        { label: "Προσυγκομιδή – Συγκομιδή (Σεπ–Οκτ)", kc: 0.40, months: [9,10] },
      ],
      mature: [
        { label: "Βλάστηση – Ανθοφορία (Μάρ–Απρ)", kc: 0.50, months: [3,4] },
        { label: "Κυτταροδιαίρεση (Μάι–Ιούν)",      kc: 0.80, months: [5,6] },
        { label: "Ωρίμανση καρπού (Ιούλ–Αύγ)",      kc: 1.10, months: [7,8] },
        { label: "Προσυγκομιδή – Συγκομιδή (Σεπ–Οκτ)", kc: 0.80, months: [9,10] },
      ],
    },
    soilTypes: {
      sandy_loam: "Αμμοαργιλοπηλώδες (FAS) – ελαφρύ",
      clay_loam:  "Αργιλοπηλώδες (FA) – μέσο",
      clay:       "Αργιλώδες (A) – βαρύ",
      loam:       "Πηλώδες (F) – μέσο-βαρύ",
    },
    irrigSystems: {
      drip_1dl:  "Σταγόνα – 1 αγωγός/σειρά",
      drip_2dl:  "Σταγόνα – 2 αγωγοί/σειρά",
      drip_4dl:  "Σταγόνα – 4 αγωγοί/σειρά",
      sprinkler: "Μικρο-εκτοξευτήρας (Sprinkler)",
    },
  },
  it: {
    flag: "🇮🇹", label: "Italiano",
    appTitle: "Calcolatore Irrigazione Giornaliera",
    appSub: "Irrigazione di Precisione · Actinidia",
    perStremma: "per stremma", perHectare: "per ettaro",
    monthLabel: "Mese",
    kcMeasured: "Kc misurato", et0ref: "ET₀ riferimento (mm/g)",
    tempTitle: "Temperatura Giornaliera",
    tempLabel: "Temperatura massima giornaliera (°C)",
    et0Est: "Stima ET₀",
    rainfallLabel: "Pioggia giornaliera (mm)",
    plantTitle: "Impianto",
    ageLabel: "Età delle piante",
    ageYoung: "1–3 anni (giovane, chioma parziale)",
    ageMature: "≥4 anni (adulto, chioma completa)",
    phenoLabel: "Fase fenologica",
    rowSpacingLabel: "Distanza tra le file (m)",
    soilTitle: "Tipo di Suolo",
    irrigTitle: "Sistema Irriguo",
    irrigTypeLabel: "Tipo di sistema",
    emittersBox: "Caratteristiche degli Erogatori",
    emittersNote1: "Inserire il",
    emittersNote2: "totale",
    emittersNote3: "degli erogatori",
    emittersNote4: "(tutte le ali gocciolanti insieme). Es. 2 ali × 100 gocciolatori/ala =",
    totalEmitters: "Totale erogatori",
    flowLabel: "Portata / erogatore (L/h)",
    totalFlow: "Portata totale",
    resultsTitle: "Risultati Giornalieri",
    waterNeeded: "Acqua necessaria oggi",
    dayUnit: "giorno", perDay: "g",
    et0Tmax: "ET₀ (Tmax)", kcMeas: "Kc (misurato)", kcPhase: "Kc (fase)",
    etcCrop: "ETc coltura", netNeed: "Fabbisogno netto",
    runtimeTitle: "Tempo di Funzionamento del Sistema",
    undersizedWarn: "Portata del sistema insufficiente",
    undersizedMsg: "Sono necessari {min} minuti per erogare l'acqua richiesta. Aumentare il numero o la portata degli erogatori.",
    totalTimeDay: "Tempo totale/giorno",
    minutes: "minuti",
    recommendedDist: "Distribuzione consigliata",
    soilParams: "Parametri del Suolo (Vs, 0–50 cm)",
    wettedVol: "Vs bagnato", availWater: "AD disponibile", rawLabel: "AFD (40% AD)",
    freqLabel: "Ciclo (svuotamento AFD)",
    freqNone: "Non necessario", freqEvery: "ogni {n} giorno/i",
    highTempWarn: "⚠️ Temperatura elevata — rischio di stress idrico. Privilegiare l'irrigazione mattutina.",
    criticalPhase: "Fase Critica",
    cellDivMsg: "Divisione cellulare — ~70% dell'ETc totale. Anche una breve carenza idrica riduce il numero di cellule e la dimensione finale del frutto.",
    months: ["","Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"],
    monthsFull: {4:"Apr",5:"Mag",6:"Giu",7:"Lug",8:"Ago",9:"Set",10:"Ott"},
    stremma: "stremma", hectare: "ettaro",
    kcTable: {
      young: [
        { label: "Germogliamento – Fioritura (Mar–Apr)", kc: 0.25, months: [3,4] },
        { label: "Divisione cellulare (Mag–Giu)",        kc: 0.40, months: [5,6] },
        { label: "Maturazione frutto (Lug–Ago)",         kc: 0.55, months: [7,8] },
        { label: "Pre-raccolta – Raccolta (Set–Ott)",    kc: 0.40, months: [9,10] },
      ],
      mature: [
        { label: "Germogliamento – Fioritura (Mar–Apr)", kc: 0.50, months: [3,4] },
        { label: "Divisione cellulare (Mag–Giu)",        kc: 0.80, months: [5,6] },
        { label: "Maturazione frutto (Lug–Ago)",         kc: 1.10, months: [7,8] },
        { label: "Pre-raccolta – Raccolta (Set–Ott)",    kc: 0.80, months: [9,10] },
      ],
    },
    soilTypes: {
      sandy_loam: "Franco sabbioso argilloso – leggero",
      clay_loam:  "Franco argilloso – medio",
      clay:       "Argilloso – pesante",
      loam:       "Franco – medio-pesante",
    },
    irrigSystems: {
      drip_1dl:  "Goccia – 1 ala/fila",
      drip_2dl:  "Goccia – 2 ali/fila",
      drip_4dl:  "Goccia – 4 ali/fila",
      sprinkler: "Micro-irrigatore (Sprinkler)",
    },
  },
  en: {
    flag: "🇬🇧", label: "English",
    appTitle: "Daily Irrigation Calculator",
    appSub: "Precision Irrigation · Kiwifruit",
    perStremma: "per stremma", perHectare: "per hectare",
    monthLabel: "Month",
    kcMeasured: "Kc measured", et0ref: "ET₀ reference (mm/day)",
    tempTitle: "Daily Temperature",
    tempLabel: "Maximum daily temperature (°C)",
    et0Est: "ET₀ estimate",
    rainfallLabel: "Daily rainfall (mm)",
    plantTitle: "Orchard",
    ageLabel: "Tree age",
    ageYoung: "1–3 years (young, partial canopy)",
    ageMature: "≥4 years (adult, full canopy)",
    phenoLabel: "Phenological stage",
    rowSpacingLabel: "Row spacing (m)",
    soilTitle: "Soil Type",
    irrigTitle: "Irrigation System",
    irrigTypeLabel: "System type",
    emittersBox: "Emitter Characteristics",
    emittersNote1: "Enter the",
    emittersNote2: "total",
    emittersNote3: "emitters",
    emittersNote4: "(all lateral lines combined). E.g. 2 lines × 100 drippers/line =",
    totalEmitters: "Total emitters",
    flowLabel: "Flow rate / emitter (L/h)",
    totalFlow: "Total flow rate",
    resultsTitle: "Daily Results",
    waterNeeded: "Water needed today",
    dayUnit: "day", perDay: "day",
    et0Tmax: "ET₀ (Tmax)", kcMeas: "Kc (measured)", kcPhase: "Kc (stage)",
    etcCrop: "Crop ETc", netNeed: "Net requirement",
    runtimeTitle: "System Run Time",
    undersizedWarn: "Insufficient system flow",
    undersizedMsg: "System needs {min} minutes to deliver the required water. Increase emitter count or flow rate.",
    totalTimeDay: "Total time/day",
    minutes: "minutes",
    recommendedDist: "Recommended distribution",
    soilParams: "Soil Parameters (Vs, 0–50 cm)",
    wettedVol: "Vs wetted", availWater: "AW available", rawLabel: "RAW (40% AW)",
    freqLabel: "Cycle (RAW depletion)",
    freqNone: "Not required", freqEvery: "every {n} day(s)",
    highTempWarn: "⚠️ High temperature — risk of water stress. Prioritise morning irrigation.",
    criticalPhase: "Critical Stage",
    cellDivMsg: "Cell division — ~70% of total ETc. Even brief water deficit reduces cell count and final fruit size.",
    months: ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    monthsFull: {4:"Apr",5:"May",6:"Jun",7:"Jul",8:"Aug",9:"Sep",10:"Oct"},
    stremma: "stremma", hectare: "hectare",
    kcTable: {
      young: [
        { label: "Budbreak – Flowering (Mar–Apr)",  kc: 0.25, months: [3,4] },
        { label: "Cell division (May–Jun)",          kc: 0.40, months: [5,6] },
        { label: "Fruit maturation (Jul–Aug)",       kc: 0.55, months: [7,8] },
        { label: "Pre-harvest – Harvest (Sep–Oct)",  kc: 0.40, months: [9,10] },
      ],
      mature: [
        { label: "Budbreak – Flowering (Mar–Apr)",  kc: 0.50, months: [3,4] },
        { label: "Cell division (May–Jun)",          kc: 0.80, months: [5,6] },
        { label: "Fruit maturation (Jul–Aug)",       kc: 1.10, months: [7,8] },
        { label: "Pre-harvest – Harvest (Sep–Oct)",  kc: 0.80, months: [9,10] },
      ],
    },
    soilTypes: {
      sandy_loam: "Sandy clay loam – light",
      clay_loam:  "Clay loam – medium",
      clay:       "Clay – heavy",
      loam:       "Loam – medium-heavy",
    },
    irrigSystems: {
      drip_1dl:  "Drip – 1 lateral/row",
      drip_2dl:  "Drip – 2 laterals/row",
      drip_4dl:  "Drip – 4 laterals/row",
      sprinkler: "Micro-sprinkler",
    },
  },
  es: {
    flag: "🇪🇸", label: "Español",
    appTitle: "Calculadora de Riego Diario",
    appSub: "Riego de Precisión · Kiwi",
    perStremma: "por stremma", perHectare: "por hectárea",
    monthLabel: "Mes",
    kcMeasured: "Kc medido", et0ref: "ET₀ referencia (mm/día)",
    tempTitle: "Temperatura Diaria",
    tempLabel: "Temperatura máxima diaria (°C)",
    et0Est: "Estimación ET₀",
    rainfallLabel: "Lluvia diaria (mm)",
    plantTitle: "Plantación",
    ageLabel: "Edad de los árboles",
    ageYoung: "1–3 años (joven, dosel parcial)",
    ageMature: "≥4 años (adulto, dosel completo)",
    phenoLabel: "Fase fenológica",
    rowSpacingLabel: "Distancia entre filas (m)",
    soilTitle: "Tipo de Suelo",
    irrigTitle: "Sistema de Riego",
    irrigTypeLabel: "Tipo de sistema",
    emittersBox: "Características de los Emisores",
    emittersNote1: "Introducir el",
    emittersNote2: "total",
    emittersNote3: "de emisores",
    emittersNote4: "(todas las líneas juntas). Ej. 2 líneas × 100 goteros/línea =",
    totalEmitters: "Total emisores",
    flowLabel: "Caudal / emisor (L/h)",
    totalFlow: "Caudal total",
    resultsTitle: "Resultados Diarios",
    waterNeeded: "Agua necesaria hoy",
    dayUnit: "día", perDay: "día",
    et0Tmax: "ET₀ (Tmax)", kcMeas: "Kc (medido)", kcPhase: "Kc (fase)",
    etcCrop: "ETc cultivo", netNeed: "Necesidad neta",
    runtimeTitle: "Tiempo de Funcionamiento del Sistema",
    undersizedWarn: "Caudal del sistema insuficiente",
    undersizedMsg: "Se necesitan {min} minutos para suministrar el agua requerida. Aumente el número o el caudal de los emisores.",
    totalTimeDay: "Tiempo total/día",
    minutes: "minutos",
    recommendedDist: "Distribución recomendada",
    soilParams: "Parámetros del Suelo (Vs, 0–50 cm)",
    wettedVol: "Vs mojado", availWater: "AD disponible", rawLabel: "AFD (40% AD)",
    freqLabel: "Ciclo (agotamiento AFD)",
    freqNone: "No requerido", freqEvery: "cada {n} día(s)",
    highTempWarn: "⚠️ Temperatura alta — riesgo de estrés hídrico. Priorizar el riego matutino.",
    criticalPhase: "Fase Crítica",
    cellDivMsg: "División celular — ~70% del ETc total. Incluso un déficit hídrico breve reduce el número de células y el tamaño final del fruto.",
    months: ["","Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
    monthsFull: {4:"Abr",5:"May",6:"Jun",7:"Jul",8:"Ago",9:"Sep",10:"Oct"},
    stremma: "stremma", hectare: "hectárea",
    kcTable: {
      young: [
        { label: "Brotación – Floración (Mar–Abr)",    kc: 0.25, months: [3,4] },
        { label: "División celular (May–Jun)",          kc: 0.40, months: [5,6] },
        { label: "Maduración del fruto (Jul–Ago)",      kc: 0.55, months: [7,8] },
        { label: "Pre-cosecha – Cosecha (Sep–Oct)",     kc: 0.40, months: [9,10] },
      ],
      mature: [
        { label: "Brotación – Floración (Mar–Abr)",    kc: 0.50, months: [3,4] },
        { label: "División celular (May–Jun)",          kc: 0.80, months: [5,6] },
        { label: "Maduración del fruto (Jul–Ago)",      kc: 1.10, months: [7,8] },
        { label: "Pre-cosecha – Cosecha (Sep–Oct)",     kc: 0.80, months: [9,10] },
      ],
    },
    soilTypes: {
      sandy_loam: "Franco arenoso arcilloso – ligero",
      clay_loam:  "Franco arcilloso – medio",
      clay:       "Arcilloso – pesado",
      loam:       "Franco – medio-pesado",
    },
    irrigSystems: {
      drip_1dl:  "Goteo – 1 lateral/fila",
      drip_2dl:  "Goteo – 2 laterales/fila",
      drip_4dl:  "Goteo – 4 laterales/fila",
      sprinkler: "Micro-aspersor (Sprinkler)",
    },
  },
};

// ── Static data (lang-independent) ───────────────────────────────────────────
const KC_MONTHLY = {
  3:  { kc: 0.30, et0ref: 1.50 },
  4:  { kc: 0.50, et0ref: 2.80 },
  5:  { kc: 0.70, et0ref: 5.00 },
  6:  { kc: 0.90, et0ref: 5.50 },
  7:  { kc: 1.10, et0ref: 7.50 },
  8:  { kc: 1.10, et0ref: 6.50 },
  9:  { kc: 0.80, et0ref: 3.40 },
  10: { kc: 0.80, et0ref: 1.90 },
  11: { kc: 0.40, et0ref: 1.20 },
};

const SOIL_TYPES = {
  sandy_loam: { fc: 28, wp: 12, bulk: 1.45 },
  clay_loam:  { fc: 39, wp: 19, bulk: 1.39 },
  clay:       { fc: 52, wp: 24, bulk: 1.35 },
  loam:       { fc: 35, wp: 16, bulk: 1.40 },
};

const IRRIGATION_SYSTEMS = {
  drip_1dl:  { efficiency: 0.90, wetted_width: 0.5 },
  drip_2dl:  { efficiency: 0.90, wetted_width: 1.0 },
  drip_4dl:  { efficiency: 0.90, wetted_width: 2.0 },
  sprinkler: { efficiency: 0.82, wetted_width: 2.0 },
};

function estimateET0(tmax) {
  if (tmax <= 15) return 1.2;
  if (tmax <= 20) return 1.2 + (tmax - 15) * 0.26;
  if (tmax <= 38) return 2.5 + (tmax - 20) * 0.278;
  return 7.5 + (tmax - 38) * 0.175;
}
function getRefET0(month) { return KC_MONTHLY[month]?.et0ref ?? null; }
function getMeasuredKc(month, age) {
  const base = KC_MONTHLY[month]?.kc ?? null;
  if (!base) return null;
  return age === "young" ? base * 0.5 : base;
}

// ── localStorage helpers ──────────────────────────────────────────────────────
const STORAGE_KEY = "kiwi_irrig_v1";
const DEFAULT_STATE = {
  lang: "el", tmax: 35, month: 7, soilType: "clay_loam",
  irrigSystem: "drip_2dl", emittersHa: 2000, emitterFlow: 2.0,
  unit: "stremma", treeAge: "mature", phenoStage: 2,
  rainfall: 0, rowSpacing: 5.0,
};
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch { return DEFAULT_STATE; }
}
function saveState(s) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}

// ── Theme ─────────────────────────────────────────────────────────────────────
const darkGreen = "#1A4A2E", midGreen = "#2E7D52", gold = "#C8973A";
const cream = "#F5F0E8", lightGreen = "#EAF3EC";
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

// ── App ───────────────────────────────────────────────────────────────────────
export default function KiwiIrrigationCalc() {
  const init = loadState();
  const [lang,         setLang]         = useState(init.lang);
  const [tmax,         setTmax]         = useState(init.tmax);
  const [month,        setMonth]        = useState(init.month);
  const [soilType,     setSoilType]     = useState(init.soilType);
  const [irrigSystem,  setIrrigSystem]  = useState(init.irrigSystem);
  const [emittersHa,   setEmittersHa]   = useState(init.emittersHa);
  const [emitterFlow,  setEmitterFlow]  = useState(init.emitterFlow);
  const [unit,         setUnit]         = useState(init.unit);
  const [treeAge,      setTreeAge]      = useState(init.treeAge);
  const [phenoStage,   setPhenoStage]   = useState(init.phenoStage);
  const [rainfall,     setRainfall]     = useState(init.rainfall);
  const [rowSpacing,   setRowSpacing]   = useState(init.rowSpacing);
  const [result,       setResult]       = useState(null);

  const t = LANGS[lang];

  // Persist every change
  useEffect(() => {
    saveState({ lang, tmax, month, soilType, irrigSystem, emittersHa, emitterFlow, unit, treeAge, phenoStage, rainfall, rowSpacing });
  }, [lang, tmax, month, soilType, irrigSystem, emittersHa, emitterFlow, unit, treeAge, phenoStage, rainfall, rowSpacing]);

  const calculate = useCallback(() => {
    const soil    = SOIL_TYPES[soilType];
    const sys     = IRRIGATION_SYSTEMS[irrigSystem];
    const kcEntry = t.kcTable[treeAge][phenoStage];
    const measuredKc = getMeasuredKc(month, treeAge);
    const kc  = measuredKc !== null ? measuredKc : kcEntry.kc;
    const et0 = estimateET0(tmax);
    const etc = et0 * kc;
    const wetted_frac = Math.min(1.0, sys.wetted_width / rowSpacing);
    const pu  = Math.min(rainfall * wetted_frac, etc * 0.85);
    const netMM    = Math.max(0, etc - pu);
    const grossM3Ha = (netMM / sys.efficiency) * 10;
    const lengthPerHa = 10000 / rowSpacing;
    const Vs   = sys.wetted_width * 0.50 * lengthPerHa;
    const aw_pct = (soil.fc - soil.wp) / 100;
    const AW   = Vs * soil.bulk * aw_pct * 1000;
    const RAW  = AW * 0.40;
    const rawMM = RAW / 10;
    const freq  = netMM > 0 ? Math.max(1, Math.round(rawMM / netMM)) : 999;
    const systemFlowM3HaH = (emittersHa * emitterFlow) / 1000;
    const runTimeH   = systemFlowM3HaH > 0 ? grossM3Ha / systemFlowM3HaH : 0;
    const runTimeMin = runTimeH * 60;
    const sessions = runTimeH > 3 ? 3 : runTimeH > 1.5 ? 2 : 1;
    const perSessionMin = runTimeMin / sessions;
    const undersized = runTimeH > 12;
    const factor   = unit === "stremma" ? 0.1 : 1.0;
    const unitLabel = unit === "stremma" ? t.stremma : t.hectare;
    setResult({
      et0: et0.toFixed(1), etc: etc.toFixed(1), kc: kc.toFixed(2),
      usingMeasuredKc: measuredKc !== null,
      netMM: netMM.toFixed(1),
      grossM3:    (grossM3Ha * factor).toFixed(1),
      systemFlowDisplay: ((systemFlowM3HaH) * factor).toFixed(2),
      unitLabel, factor,
      AW:  (AW  * factor).toFixed(0),
      RAW: (RAW * factor).toFixed(0),
      Vs:  (Vs  * factor).toFixed(0),
      freq, runTimeMin: runTimeMin.toFixed(0),
      sessions, perSessionMin: perSessionMin.toFixed(0),
      undersized,
      warning: tmax > 38 ? t.highTempWarn : null,
    });
  }, [tmax, month, soilType, irrigSystem, emittersHa, emitterFlow, unit, treeAge, phenoStage, rainfall, rowSpacing, t]);

  useEffect(() => { calculate(); }, [calculate]);

  return (
    <div style={{ minHeight:"100vh", background:cream, fontFamily:"'Inter','Segoe UI',sans-serif", color:darkGreen }}>

      {/* Header */}
      <div style={{ background:`linear-gradient(135deg,${darkGreen} 0%,${midGreen} 100%)`, padding:"24px 22px 18px", color:"#fff" }}>
        <div style={{ maxWidth:540, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
            <span style={{ fontSize:28 }}>🥝</span>
            <div>
              <div style={{ fontSize:10, letterSpacing:"0.14em", opacity:0.65, textTransform:"uppercase" }}>{t.appSub}</div>
              <div style={{ fontSize:20, fontWeight:800 }}>{t.appTitle}</div>
            </div>
          </div>
          {/* Language selector */}
          <div style={{ display:"flex", gap:6 }}>
            {Object.entries(LANGS).map(([code, l]) => (
              <button key={code} onClick={() => setLang(code)} style={{
                padding:"5px 10px", borderRadius:20, border:"none", cursor:"pointer",
                background: lang === code ? gold : "rgba(255,255,255,0.15)",
                color:"#fff", fontWeight: lang === code ? 800 : 400,
                fontSize:13, transition:"all 0.2s",
              }}>{l.flag} {l.label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:540, margin:"0 auto", padding:"16px 15px 40px" }}>

        {/* Unit toggle */}
        <div style={{ display:"flex", gap:8, marginBottom:14 }}>
          {["stremma","hectare"].map(u => (
            <button key={u} onClick={() => setUnit(u)} style={{
              flex:1, padding:"9px 0", borderRadius:8, border:"none", cursor:"pointer",
              background:unit===u ? darkGreen : "#fff",
              color:unit===u ? "#fff" : darkGreen,
              fontWeight:700, fontSize:13, transition:"all 0.2s",
              boxShadow:unit===u ? "0 2px 8px rgba(26,74,46,0.2)" : "0 1px 3px rgba(0,0,0,0.07)",
            }}>{u==="stremma" ? t.perStremma : t.perHectare}</button>
          ))}
        </div>

        {/* Month selector */}
        <div style={cardStyle}>
          <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>📅 {t.monthLabel}</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:5 }}>
            {[4,5,6,7,8,9,10].map(m => {
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
                  <div>{t.monthsFull[m]}</div>
                  <div style={{ fontSize:9, opacity: isSelected ? 0.85 : 0.55, marginTop:1 }}>
                    Kc {ref?.kc.toFixed(1)}
                  </div>
                </button>
              );
            })}
          </div>
          <div style={{ marginTop:10, display:"flex", gap:8 }}>
            <div style={{ flex:1, background:lightGreen, borderRadius:8, padding:"7px 10px", textAlign:"center" }}>
              <div style={{ fontSize:9, color:midGreen, fontWeight:700 }}>{t.kcMeasured}</div>
              <div style={{ fontSize:20, fontWeight:800 }}>{KC_MONTHLY[month]?.kc.toFixed(2) ?? "—"}</div>
            </div>
            <div style={{ flex:1, background:lightGreen, borderRadius:8, padding:"7px 10px", textAlign:"center" }}>
              <div style={{ fontSize:9, color:midGreen, fontWeight:700 }}>{t.et0ref}</div>
              <div style={{ fontSize:20, fontWeight:800 }}>{KC_MONTHLY[month]?.et0ref.toFixed(1) ?? "—"}</div>
            </div>
          </div>
        </div>

        {/* Climate */}
        <div style={cardStyle}>
          <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>🌡️ {t.tempTitle}</div>
          <label style={labelStyle}>{t.tempLabel}</label>
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
              {t.et0Est}: <strong>{result.et0} mm/{t.perDay}</strong>
            </div>
          )}
          <label style={labelStyle}>{t.rainfallLabel}</label>
          <input type="number" min={0} max={60} value={rainfall} step={1}
            onChange={e => setRainfall(Number(e.target.value))} style={inputStyle} />
        </div>

        {/* Tree */}
        <div style={cardStyle}>
          <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>🌿 {t.plantTitle}</div>
          <label style={labelStyle}>{t.ageLabel}</label>
          <select value={treeAge} onChange={e => setTreeAge(e.target.value)} style={{ ...inputStyle, marginBottom:12 }}>
            <option value="young">{t.ageYoung}</option>
            <option value="mature">{t.ageMature}</option>
          </select>
          <label style={labelStyle}>{t.phenoLabel}</label>
          <div style={{ display:"flex", flexDirection:"column", gap:5, marginBottom:12 }}>
            {t.kcTable[treeAge].map((s,i) => (
              <button key={i} onClick={() => setPhenoStage(i)} style={{
                textAlign:"left", padding:"9px 13px", borderRadius:8, cursor:"pointer",
                border:`2px solid ${phenoStage===i ? stageColors[i] : "#d6ead9"}`,
                background:phenoStage===i ? `${stageColors[i]}18` : "#fff",
                fontSize:13, color:darkGreen, fontWeight:phenoStage===i ? 700 : 400,
              }}>
                <span style={{ fontWeight:700, color:stageColors[i] }}>Kc {s.kc.toFixed(2)}</span>
                {"  "}{s.label}
              </button>
            ))}
          </div>
          <label style={labelStyle}>{t.rowSpacingLabel}</label>
          <input type="number" min={3} max={7} value={rowSpacing} step={0.5}
            onChange={e => setRowSpacing(Number(e.target.value))} style={inputStyle} />
        </div>

        {/* Soil */}
        <div style={cardStyle}>
          <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>🪱 {t.soilTitle}</div>
          <select value={soilType} onChange={e => setSoilType(e.target.value)} style={{ ...inputStyle, marginBottom:10 }}>
            {Object.entries(SOIL_TYPES).map(([k]) => (
              <option key={k} value={k}>{t.soilTypes[k]}</option>
            ))}
          </select>
          <div style={{ display:"flex", gap:8 }}>
            {[
              { l:"FC", v:SOIL_TYPES[soilType].fc+"%" },
              { l:"WP", v:SOIL_TYPES[soilType].wp+"%" },
              { l:"AD=FC–WP", v:(SOIL_TYPES[soilType].fc-SOIL_TYPES[soilType].wp)+"%" },
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
          <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>💧 {t.irrigTitle}</div>
          <label style={labelStyle}>{t.irrigTypeLabel}</label>
          <select value={irrigSystem} onChange={e => setIrrigSystem(e.target.value)}
            style={{ ...inputStyle, marginBottom:14 }}>
            {Object.entries(IRRIGATION_SYSTEMS).map(([k,v]) => (
              <option key={k} value={k}>{t.irrigSystems[k]} | {(v.efficiency*100).toFixed(0)}%</option>
            ))}
          </select>
          <div style={{ background:"#f0f7f2", borderRadius:10, padding:"12px 14px", marginBottom:10 }}>
            <div style={{ fontSize:12, fontWeight:700, color:midGreen, marginBottom:8 }}>{t.emittersBox}</div>
            <div style={{ fontSize:11, color:"#555", marginBottom:10, lineHeight:1.5 }}>
              {t.emittersNote1} <strong>{t.emittersNote2}</strong> {t.emittersNote3}/{unit==="stremma"?"stremma":"ha"} {t.emittersNote4} <strong>200/{unit==="stremma"?"stremma":"ha"}</strong>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <div style={{ flex:1 }}>
                <label style={labelStyle}>{t.totalEmitters}/{unit==="stremma"?"stremma":"ha"}</label>
                <input type="number" min={10} max={unit==="stremma"?500:5000}
                  value={unit === "stremma" ? Math.round(emittersHa / 10) : emittersHa}
                  onChange={e => {
                    const v = Number(e.target.value);
                    setEmittersHa(unit==="stremma" ? v*10 : v);
                  }} style={inputStyle} />
              </div>
              <div style={{ flex:1 }}>
                <label style={labelStyle}>{t.flowLabel}</label>
                <input type="number" min={0.5} max={80} value={emitterFlow} step={0.5}
                  onChange={e => setEmitterFlow(Number(e.target.value))} style={inputStyle} />
              </div>
            </div>
            {result && (
              <div style={{ marginTop:8, fontSize:12, color:darkGreen }}>
                {t.totalFlow}: <strong>{result.systemFlowDisplay} m³/{result.unitLabel}/h</strong>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        {result && (
          <div style={{
            background:`linear-gradient(155deg,${darkGreen} 0%,#1d6040 100%)`,
            borderRadius:16, padding:"20px", color:"#fff", marginBottom:12,
          }}>
            <div style={{ fontSize:11, letterSpacing:"0.1em", opacity:0.65, marginBottom:12, textTransform:"uppercase" }}>
              📊 {t.resultsTitle}
            </div>
            <div style={{ textAlign:"center", marginBottom:18, paddingBottom:16, borderBottom:"1px solid rgba(255,255,255,0.15)" }}>
              <div style={{ fontSize:12, opacity:0.7, marginBottom:2 }}>{t.waterNeeded}</div>
              <div style={{ fontSize:52, fontWeight:900, lineHeight:1, color:gold }}>{result.grossM3}</div>
              <div style={{ fontSize:15, opacity:0.8 }}>m³ / {result.unitLabel} / {t.dayUnit}</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:16, paddingBottom:16, borderBottom:"1px solid rgba(255,255,255,0.15)" }}>
              {[
                { l:t.et0Tmax,   v:result.et0+" mm/"+t.perDay },
                { l:result.usingMeasuredKc ? t.kcMeas : t.kcPhase, v:result.kc },
                { l:t.etcCrop,   v:result.etc+" mm/"+t.perDay },
                { l:t.netNeed,   v:result.netMM+" mm/"+t.perDay },
              ].map(item => (
                <div key={item.l} style={{ background:"rgba(255,255,255,0.10)", borderRadius:9, padding:"9px 11px" }}>
                  <div style={{ fontSize:10, opacity:0.6, marginBottom:2 }}>{item.l}</div>
                  <div style={{ fontSize:16, fontWeight:800 }}>{item.v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom:14, paddingBottom:14, borderBottom:"1px solid rgba(255,255,255,0.15)" }}>
              <div style={{ fontSize:11, opacity:0.6, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>
                ⏱️ {t.runtimeTitle}
              </div>
              {result.undersized ? (
                <div style={{ background:"rgba(255,100,100,0.2)", borderRadius:10, padding:"12px", fontSize:13 }}>
                  ⚠️ <strong>{t.undersizedWarn}</strong><br/>
                  {t.undersizedMsg.replace("{min}", result.runTimeMin)}
                </div>
              ) : (
                <>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                    <span style={{ opacity:0.75, fontSize:13 }}>{t.totalTimeDay}</span>
                    <span style={{ fontWeight:800, fontSize:18, color:gold }}>{result.runTimeMin} {t.minutes}</span>
                  </div>
                  {result.sessions > 1 && (
                    <div style={{ background:"rgba(255,255,255,0.10)", borderRadius:9, padding:"10px 12px" }}>
                      <div style={{ fontSize:11, opacity:0.65, marginBottom:4 }}>{t.recommendedDist}</div>
                      <div style={{ fontSize:16, fontWeight:800 }}>{result.sessions} × {result.perSessionMin} {t.minutes}</div>
                    </div>
                  )}
                </>
              )}
            </div>
            <div style={{ marginBottom:14, paddingBottom:14, borderBottom:"1px solid rgba(255,255,255,0.15)" }}>
              <div style={{ fontSize:11, opacity:0.6, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>
                {t.soilParams}
              </div>
              <div style={{ display:"flex", gap:6 }}>
                {[
                  { l:t.wettedVol,   v:result.Vs+" m³" },
                  { l:t.availWater,  v:result.AW+" m³" },
                  { l:t.rawLabel,    v:result.RAW+" m³" },
                ].map(item => (
                  <div key={item.l} style={{ flex:1, textAlign:"center", background:"rgba(255,255,255,0.08)", borderRadius:8, padding:"8px 4px" }}>
                    <div style={{ fontSize:8.5, opacity:0.6 }}>{item.l}</div>
                    <div style={{ fontSize:14, fontWeight:800 }}>{item.v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between" }}>
              <span style={{ opacity:0.75, fontSize:13 }}>📅 {t.freqLabel}</span>
              <span style={{ fontWeight:800, fontSize:15 }}>
                {result.freq >= 999 ? t.freqNone : t.freqEvery.replace("{n}", result.freq)}
              </span>
            </div>
          </div>
        )}

        {result?.warning && (
          <div style={{ background:"#fff8e6", border:`1.5px solid ${gold}`, borderRadius:10, padding:"11px 14px", fontSize:13, color:"#7a5a00", marginBottom:12 }}>
            {result.warning}
          </div>
        )}

        {phenoStage === 1 && (
          <div style={{ ...cardStyle, borderLeft:`4px solid ${gold}` }}>
            <div style={{ fontSize:11, fontWeight:700, color:gold, textTransform:"uppercase", marginBottom:5 }}>⚠️ {t.criticalPhase}</div>
            <div style={{ fontSize:13, lineHeight:1.6 }}>{t.cellDivMsg}</div>
          </div>
        )}

      </div>
    </div>
  );
}
