const MAP = { width: 920, height: 620 };
const TAU = Math.PI * 2;

const elements = {
  time: document.querySelector("#nairobi-time"),
  date: document.querySelector("#nairobi-date"),
  weatherMain: document.querySelector("#weather-main"),
  weatherDetail: document.querySelector("#weather-detail"),
  balanceScore: document.querySelector("#balance-score"),
  balanceState: document.querySelector("#balance-state"),
  vegetationScore: document.querySelector("#vegetation-score"),
  predatorPressure: document.querySelector("#predator-pressure"),
  waterPressure: document.querySelector("#water-pressure"),
  vegetationMeter: document.querySelector("#vegetation-meter"),
  predatorMeter: document.querySelector("#predator-meter"),
  waterMeter: document.querySelector("#water-meter"),
  languageToggle: document.querySelector("#language-toggle"),
  animalLayer: document.querySelector("#animal-layer"),
  labelLayer: document.querySelector("#label-layer"),
  temporaryLabelLayer: document.querySelector("#temporary-label-layer"),
  interactionLayer: document.querySelector("#interaction-layer"),
  habitatDetail: document.querySelector("#habitat-detail"),
  dayNightOverlay: document.querySelector("#day-night-overlay"),
  weatherLayer: document.querySelector("#weather-layer"),
  speciesList: document.querySelector("#species-list"),
  eventFeed: document.querySelector("#event-feed"),
  eventCount: document.querySelector("#event-count"),
  visibleCount: document.querySelector("#visible-count"),
  speciesTrendList: document.querySelector("#species-trend-list"),
  speciesTrendNote: document.querySelector("#species-trend-note"),
  relationshipList: document.querySelector("#relationship-list"),
  relationshipMode: document.querySelector("#relationship-mode"),
};

const OMNIVORE_MARKER_COLOR = "#2f8f45";
const WARTHOG_MARKER_COLOR = "#7f8582";
const SPECIES_TREND_INTERVAL = 1;
const SPECIES_TREND_MAX_POINTS = 90;

let currentLanguage = "zh";

const I18N = {
  zh: {
    pageTitle: "马赛马拉生态系统互动模拟器",
    appTitle: "马赛马拉生态系统互动模拟器",
    projectSubtitle: "本项目是基于星巴（Simba Qiang Zhuo）长期在马赛马拉的实地研究和保护工作做的非洲草原生态系统的模拟场景。",
    supportCredit: "感谢支持：Simon Masago, Jackson Looseyia, Simon Nkoitoi, Nelson Reiya, Josheph Kipiri Letoluo, Jeremiah Ntokoiwuan, Mengxi Kou",
    switchLanguage: "切换为英文",
    overviewTitle: "实时总览",
    overviewSubtitle: "真实时间、实时天气与生态平衡",
    nairobiTime: "内罗毕时间 UTC+3",
    weatherTitle: "马赛马拉天气",
    balanceTitle: "生态平衡",
    mapTitle: "实时互动雷达",
    legendGrass: "草原 60%",
    legendShrub: "灌丛 25%",
    legendForest: "林地 15%",
    legendRiver: "河流",
    legendMountain: "山地",
    legendCarnivores: "食肉动物颜色",
    speciesLion: "狮子",
    speciesLeopard: "花豹",
    speciesCheetah: "猎豹",
    speciesHyena: "斑鬣狗",
    speciesJackal: "黑背胡狼",
    speciesWarthog: "疣猪",
    legendOthers: "其它动物颜色",
    legendPrimates: "狒狒 / 绿猴",
    legendHerbivores: "食草动物",
    legendLines: "互动线",
    lineHunt: "捕猎",
    lineAvoidance: "避让",
    lineCarnivoreConflict: "食肉动物冲突",
    lineBuffaloCounter: "水牛反击狮子",
    lineScavenge: "抢食",
    lineCarcass: "残食点",
    eventsTitle: "互动事件",
    vegetationMetric: "植被恢复",
    predatorMetric: "捕食压力",
    waterMetric: "水源压力",
    speciesCountTitle: "物种数量",
    trendTitle: "数量变化曲线",
    dailyReportTitle: "每日数据报告",
    readingWeather: "读取中",
    waitingWeather: "等待实时数据",
    syncing: "同步中",
    visibleGroups: ({ count }) => `${count} 个群体在画面中`,
    trendNote: ({ seconds }) => `最近 ${seconds} 秒 · 每秒更新`,
    stable: "稳定",
    slight: "轻微波动",
    stressed: "承压",
    risk: "失衡风险",
    live: "实时",
    simulated: "动态模拟",
    humidity: "湿度",
    wind: "风",
    dawn: "黎明活跃过渡",
    day: "白天活动",
    dusk: "黄昏活跃过渡",
    night: "夜间活动",
    rain: "降雨",
    cloudy: "多云",
    partlyCloudy: "少云",
    clear: "晴朗",
    dataReport: "数据报告",
    todayRecording: "今日记录中",
    dailyDataTitle: "今日生态互动数据",
    pressureIndex: "压力指数",
    hunt: "捕猎",
    hunted: "被捕猎",
    conflict: "冲突",
    avoidance: "避让",
    scavenge: "抢食",
    activeRelations: "活跃关系",
    huntPressure: "捕猎压力",
    conflictFriction: "冲突摩擦",
    avoidancePressure: "避让驱逐",
    scavengePressure: "残食抢夺",
    waitingRecord: "等待记录",
    noHighPressure: "暂无高压关系",
    collectingReport: "今日数据正在累积，发生捕猎、冲突、避让或抢食后会自动更新。",
    recordingRelations: "今日关系数据正在记录",
    noSignificantRelations: ({ day }) => `${day}暂无显著关系`,
    reportReset: "报告按内罗毕日期每天重新统计捕猎、被捕猎、冲突、避让和抢食数据。",
    trendFlat: "持平",
    eventPredation: "捕食",
    eventScavenge: "抢食",
    eventConflict: "冲突",
    eventSystem: "系统",
  },
  en: {
    pageTitle: "Maasai Mara Ecosystem Interactive Simulator",
    appTitle: "Maasai Mara Ecosystem Interactive Simulator",
    projectSubtitle: "This project is a simulated African savanna ecosystem scenario based on Simba Qiang Zhuo's long-term field research and conservation work in the Maasai Mara.",
    supportCredit: "Supported with thanks to: Simon Masago, Jackson Looseyia, Simon Nkoitoi, Nelson Reiya, Josheph Kipiri Letoluo, Jeremiah Ntokoiwuan, Mengxi Kou",
    switchLanguage: "Switch to Chinese",
    overviewTitle: "Live Overview",
    overviewSubtitle: "Real time, live weather, and ecosystem balance",
    nairobiTime: "Nairobi Time UTC+3",
    weatherTitle: "Maasai Mara Weather",
    balanceTitle: "Ecosystem Balance",
    mapTitle: "Live Interaction Radar",
    legendGrass: "Grassland 60%",
    legendShrub: "Shrubland 25%",
    legendForest: "Woodland 15%",
    legendRiver: "River",
    legendMountain: "Highlands",
    legendCarnivores: "Carnivore Colors",
    speciesLion: "Lion",
    speciesLeopard: "Leopard",
    speciesCheetah: "Cheetah",
    speciesHyena: "Spotted Hyena",
    speciesJackal: "Black-backed Jackal",
    speciesWarthog: "Warthog",
    legendOthers: "Other Animal Colors",
    legendPrimates: "Baboon / Vervet",
    legendHerbivores: "Herbivores",
    legendLines: "Interaction Lines",
    lineHunt: "Hunting",
    lineAvoidance: "Avoidance",
    lineCarnivoreConflict: "Carnivore Conflict",
    lineBuffaloCounter: "Buffalo Counterattack",
    lineScavenge: "Scavenging",
    lineCarcass: "Carcass Site",
    eventsTitle: "Interaction Events",
    vegetationMetric: "Vegetation Recovery",
    predatorMetric: "Predation Pressure",
    waterMetric: "Water Stress",
    speciesCountTitle: "Species Counts",
    trendTitle: "Population Trend Lines",
    dailyReportTitle: "Daily Data Report",
    readingWeather: "Loading",
    waitingWeather: "Waiting for live data",
    syncing: "Syncing",
    visibleGroups: ({ count }) => `${count} groups visible`,
    trendNote: ({ seconds }) => `Last ${seconds}s · updates every second`,
    stable: "Stable",
    slight: "Slightly shifting",
    stressed: "Under pressure",
    risk: "Imbalance risk",
    live: "Live",
    simulated: "Dynamic simulation",
    humidity: "Humidity",
    wind: "Wind",
    dawn: "Dawn transition",
    day: "Day activity",
    dusk: "Dusk transition",
    night: "Night activity",
    rain: "Rain",
    cloudy: "Cloudy",
    partlyCloudy: "Partly cloudy",
    clear: "Clear",
    dataReport: "Data Report",
    todayRecording: "Recording today",
    dailyDataTitle: "Today's Ecosystem Interaction Data",
    pressureIndex: "Pressure Index",
    hunt: "Hunting",
    hunted: "Preyed on",
    conflict: "Conflict",
    avoidance: "Avoidance",
    scavenge: "Scavenging",
    activeRelations: "Active Relations",
    huntPressure: "Hunting pressure",
    conflictFriction: "Conflict friction",
    avoidancePressure: "Avoidance pressure",
    scavengePressure: "Carcass competition",
    waitingRecord: "Waiting for records",
    noHighPressure: "No high-pressure relation yet",
    collectingReport: "Today's data is accumulating and will update after hunting, conflict, avoidance, or scavenging.",
    recordingRelations: "Today's relationship data is recording",
    noSignificantRelations: ({ day }) => `No significant relations on ${day}`,
    reportReset: "The report resets daily on Nairobi dates and tracks hunting, prey loss, conflict, avoidance, and scavenging.",
    trendFlat: "Flat",
    eventPredation: "Predation",
    eventScavenge: "Scavenging",
    eventConflict: "Conflict",
    eventSystem: "System",
  },
};

const speciesEnglishNames = {
  lion: "Lion",
  leopard: "Leopard",
  cheetah: "Cheetah",
  hyena: "Spotted Hyena",
  jackal: "Black-backed Jackal",
  buffalo: "African Buffalo",
  eland: "Eland",
  zebra: "Zebra",
  wildebeest: "Wildebeest",
  gazelleThomson: "Thomson's Gazelle",
  gazelleGrant: "Grant's Gazelle",
  impala: "Impala",
  waterbuck: "Waterbuck",
  dikdik: "Dik-dik",
  topi: "Topi",
  giraffe: "Giraffe",
  elephant: "African Elephant",
  hippo: "Hippopotamus",
  warthog: "Warthog",
  baboon: "Baboon",
  vervet: "Vervet Monkey",
};

function translate(key, data = {}) {
  const value = I18N[currentLanguage]?.[key] ?? I18N.zh[key] ?? key;
  return typeof value === "function" ? value(data) : value;
}

function languageLocale() {
  return currentLanguage === "zh" ? "zh-CN" : "en-US";
}

function formatCount(value) {
  return Math.round(value || 0).toLocaleString(languageLocale());
}

function speciesDisplayName(spOrId) {
  const sp = typeof spOrId === "string" ? speciesById[spOrId] : spOrId;
  if (!sp) return "";
  return currentLanguage === "en" ? speciesEnglishNames[sp.id] || sp.name : sp.name;
}

function updateI18nNode(node) {
  const key = node.dataset.i18n;
  if (!key) return;
  const text = translate(key);
  const icon = node.firstElementChild?.tagName?.toLowerCase() === "i" ? node.firstElementChild : null;
  if (icon) {
    node.replaceChildren(icon, document.createTextNode(text));
  } else {
    node.textContent = text;
  }
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
  document.title = translate("pageTitle");
  document.querySelectorAll("[data-i18n]").forEach(updateI18nNode);

  if (elements.languageToggle) {
    elements.languageToggle.textContent = currentLanguage === "zh" ? "EN" : "中";
    elements.languageToggle.setAttribute("aria-label", translate("switchLanguage"));
  }

  buildSpeciesList();
  refreshMapLabels();
  updateClock();
  updateWeatherDisplay();
  renderEventFeed();
  dailyRelationshipSignature = "";
  speciesTrendSignature = "";
  renderAll();
}

function toggleLanguage() {
  currentLanguage = currentLanguage === "zh" ? "en" : "zh";
  applyLanguage();
}

const species = [
  {
    id: "lion",
    name: "狮子",
    baseCount: 15,
    markers: 8,
    color: "#e11919",
    category: "predator",
    habitats: ["shrub", "grass"],
    edge: true,
    activity: "nocturnal",
    speed: 16,
    huntSuccess: 0.28,
    awareness: 92,
    diet: ["wildebeest", "zebra", "gazelleThomson", "gazelleGrant", "buffalo", "eland", "warthog", "topi", "waterbuck", "impala", "giraffe", "hippo"],
    avoids: ["elephant"],
    label: true,
    restBias: 0.72,
    foodNeed: 7,
  },
  {
    id: "leopard",
    name: "花豹",
    baseCount: 6,
    markers: 1,
    color: "#d9a300",
    category: "predator",
    habitats: ["forest", "mountain"],
    activity: "nocturnal",
    speed: 18,
    huntSuccess: 0.3,
    awareness: 84,
    diet: ["impala", "dikdik", "warthog", "baboon", "vervet", "jackal", "gazelleThomson", "gazelleGrant"],
    avoids: ["lion", "hyena", "elephant", "buffalo", "hippo"],
    label: true,
    restBias: 0.55,
    foodNeed: 3,
  },
  {
    id: "cheetah",
    name: "猎豹",
    baseCount: 5,
    markers: 1,
    color: "#ffd21f",
    category: "predator",
    habitats: ["grass", "shrub"],
    edge: true,
    activity: "diurnal",
    speed: 30,
    huntSuccess: 0.5,
    awareness: 110,
    diet: ["gazelleThomson", "gazelleGrant", "impala", "wildebeest", "topi"],
    avoids: ["lion", "leopard", "hyena", "elephant", "buffalo", "hippo"],
    label: true,
    restBias: 0.45,
    foodNeed: 2,
  },
  {
    id: "hyena",
    name: "斑鬣狗",
    baseCount: 60,
    markers: 16,
    color: "#ff6fb1",
    category: "predator",
    habitats: ["shrub"],
    activity: "diurnal",
    speed: 18,
    huntSuccess: 0.16,
    awareness: 96,
    diet: ["wildebeest", "zebra", "gazelleThomson", "gazelleGrant", "topi", "warthog", "impala"],
    avoids: ["lion", "elephant", "buffalo", "hippo"],
    label: true,
    restBias: 0.34,
    foodNeed: 5,
  },
  {
    id: "jackal",
    name: "黑背胡狼",
    baseCount: 120,
    markers: 18,
    color: "#8b5a2b",
    category: "omnivore",
    habitats: ["shrub", "forest"],
    activity: "diurnal",
    speed: 18,
    huntSuccess: 0.18,
    awareness: 72,
    diet: ["gazelleThomson", "dikdik"],
    avoids: ["lion", "leopard", "cheetah", "hyena", "elephant", "buffalo", "hippo", "giraffe", "zebra"],
    label: true,
    restBias: 0.28,
    foodNeed: 1,
  },
  {
    id: "buffalo",
    name: "非洲水牛",
    baseCount: 280,
    markers: 17,
    color: "#2f3431",
    category: "herbivore",
    habitats: ["grass", "shrub"],
    activity: "diurnal",
    speed: 10,
    awareness: 72,
    avoids: ["lion"],
    defense: 0.58,
  },
  {
    id: "eland",
    name: "大羚羊",
    baseCount: 150,
    markers: 11,
    color: "#9d7448",
    category: "herbivore",
    habitats: ["grass", "shrub"],
    activity: "diurnal",
    speed: 12,
    awareness: 78,
    avoids: ["lion"],
    defense: 0.22,
  },
  {
    id: "zebra",
    name: "斑马",
    baseCount: 600,
    markers: 25,
    color: "#f5f1e8",
    stroke: "#222222",
    category: "herbivore",
    habitats: ["grass"],
    activity: "diurnal",
    speed: 14,
    awareness: 84,
    avoids: ["lion", "hyena"],
    defense: 0.28,
    migratory: true,
  },
  {
    id: "wildebeest",
    name: "角马",
    baseCount: 1000,
    markers: 30,
    color: "#61727a",
    category: "herbivore",
    habitats: ["grass"],
    activity: "diurnal",
    speed: 14,
    awareness: 86,
    avoids: ["lion", "hyena"],
    defense: 0.22,
    migratory: true,
  },
  {
    id: "gazelleThomson",
    name: "汤姆森瞪羚",
    baseCount: 1500,
    markers: 34,
    color: "#d9c17a",
    category: "herbivore",
    habitats: ["grass"],
    activity: "diurnal",
    speed: 22,
    awareness: 100,
    avoids: ["lion", "leopard", "cheetah"],
    defense: 0.08,
    migratory: true,
  },
  {
    id: "gazelleGrant",
    name: "格兰特瞪羚",
    baseCount: 500,
    markers: 20,
    color: "#c59561",
    category: "herbivore",
    habitats: ["grass", "shrub"],
    activity: "diurnal",
    speed: 20,
    awareness: 92,
    avoids: ["lion", "leopard", "cheetah"],
    defense: 0.1,
  },
  {
    id: "impala",
    name: "黑斑羚",
    baseCount: 1200,
    markers: 28,
    color: "#b57945",
    category: "herbivore",
    habitats: ["forest", "shrub"],
    activity: "diurnal",
    speed: 18,
    awareness: 90,
    avoids: ["lion", "leopard", "cheetah", "hyena"],
    defense: 0.1,
  },
  {
    id: "waterbuck",
    name: "水羚",
    baseCount: 300,
    markers: 13,
    color: "#8a7a59",
    category: "herbivore",
    habitats: ["forest"],
    nearWater: true,
    activity: "diurnal",
    speed: 11,
    awareness: 78,
    avoids: ["lion"],
    defense: 0.18,
  },
  {
    id: "dikdik",
    name: "犬羚",
    baseCount: 400,
    markers: 16,
    color: "#a68454",
    category: "herbivore",
    habitats: ["forest", "shrub"],
    activity: "diurnal",
    speed: 16,
    awareness: 88,
    avoids: ["lion", "leopard", "cheetah", "hyena", "jackal"],
    defense: 0.05,
  },
  {
    id: "topi",
    name: "转角牛羚",
    baseCount: 350,
    markers: 17,
    color: "#7e604b",
    category: "herbivore",
    habitats: ["grass"],
    activity: "diurnal",
    speed: 18,
    awareness: 98,
    avoids: ["lion", "hyena", "leopard", "cheetah"],
    defense: 0.16,
  },
  {
    id: "giraffe",
    name: "长颈鹿",
    baseCount: 120,
    markers: 8,
    color: "#d6a54f",
    category: "herbivore",
    habitats: ["forest"],
    activity: "diurnal",
    speed: 12,
    awareness: 92,
    avoids: ["lion"],
    defense: 0.46,
  },
  {
    id: "elephant",
    name: "非洲象",
    baseCount: 30,
    markers: 5,
    color: "#8b8f90",
    category: "herbivore",
    habitats: ["forest", "shrub"],
    activity: "any",
    speed: 9,
    awareness: 95,
    avoids: [],
    defense: 0.82,
    driver: true,
    label: true,
  },
  {
    id: "hippo",
    name: "河马",
    baseCount: 2,
    markers: 2,
    color: "#7f6b7e",
    category: "herbivore",
    habitats: ["water"],
    nearWater: true,
    activity: "nocturnal",
    speed: 7,
    awareness: 64,
    avoids: ["lion", "elephant"],
    defense: 0.76,
    seasonal: "rainy",
    label: true,
  },
  {
    id: "warthog",
    name: "疣猪",
    baseCount: 300,
    markers: 14,
    color: WARTHOG_MARKER_COLOR,
    category: "omnivore",
    habitats: ["forest", "shrub"],
    activity: "diurnal",
    speed: 13,
    awareness: 76,
    avoids: ["lion", "leopard"],
    defense: 0.12,
  },
  {
    id: "baboon",
    name: "狒狒",
    baseCount: 450,
    markers: 14,
    color: OMNIVORE_MARKER_COLOR,
    category: "omnivore",
    habitats: ["forest", "shrub"],
    activity: "diurnal",
    speed: 12,
    awareness: 82,
    avoids: ["lion", "leopard", "elephant", "hippo", "buffalo"],
    defense: 0.26,
  },
  {
    id: "vervet",
    name: "绿猴",
    baseCount: 220,
    markers: 12,
    color: OMNIVORE_MARKER_COLOR,
    category: "omnivore",
    habitats: ["forest", "shrub"],
    activity: "diurnal",
    speed: 13,
    awareness: 84,
    avoids: ["lion", "leopard", "cheetah", "hyena", "baboon", "elephant", "hippo", "buffalo"],
    defense: 0.05,
  },
];

const speciesById = Object.fromEntries(species.map((item) => [item.id, item]));
const predatorIds = new Set(["lion", "leopard", "cheetah", "hyena", "jackal"]);
const forestPrimateIds = new Set(["baboon", "vervet"]);
const alwaysLabeledPredators = new Set(["lion", "leopard", "cheetah", "hyena"]);
const jackalLabelTriggerSpecies = new Set(["lion", "leopard", "cheetah", "hyena"]);
const PREDATOR_HUNT_HUNGER = 64;
const leopardFocusedPrey = {
  warthog: { target: 0.56, success: 0.14 },
  baboon: { target: 0.48, success: 0.2 },
  vervet: { target: 0.38, success: 0.24 },
};
const riverSegments = [
  [{ x: 465, y: -32 }, { x: 416, y: 80 }, { x: 553, y: 146 }, { x: 493, y: 256 }],
  [{ x: 493, y: 256 }, { x: 440, y: 356 }, { x: 552, y: 424 }, { x: 506, y: 540 }],
  [{ x: 506, y: 540 }, { x: 477, y: 615 }, { x: 531, y: 666 }, { x: 494, y: 694 }],
];
const riverPoints = buildRiverPoints();

const relationships = [
  { from: "lion", to: "wildebeest", label: "捕猎主链", color: "#dc4f32" },
  { from: "lion", to: "zebra", label: "捕猎压力", color: "#dc4f32" },
  { from: "cheetah", to: "gazelleThomson", label: "高速追逐", color: "#e6a82d" },
  { from: "leopard", to: "impala", label: "林缘伏击", color: "#d18a2a" },
  { from: "hyena", to: "lion", label: "抢食/冲突", color: "#7a5d47" },
  { from: "jackal", to: "hyena", label: "腐食跟随", color: "#8d65c5" },
  { from: "elephant", to: "lion", label: "驱逐避让", color: "#5b6770" },
  { from: "buffalo", to: "lion", label: "集群反击", color: "#222222" },
];

let rng = mulberry32(Date.now() % 999999);
let entities = [];
let counts = {};
let baseSeasonCounts = {};
let activeInteractions = [];
let killSites = [];
let killSiteSerial = 0;
let treeDamageSites = [];
let temporaryPreyLabels = [];
let eventItems = [];
let eventVariantCursor = {};
let pendingEventMessageMeta = null;
let relationshipStrength = Object.fromEntries(relationships.map((rel) => [`${rel.from}-${rel.to}`, 18 + rng() * 24]));
let dailyRelationshipStats = {};
let dailyRelationshipDayKey = "";
let dailyRelationshipLabel = "";
let dailyRelationshipSnapshot = [];
let dailyRelationshipSignature = "";
let speciesTrendHistory = {};
let speciesTrendClock = 0;
let speciesTrendElapsed = 0;
let speciesTrendSignature = "";
let speciesRows = new Map();
let animalNodes = new Map();
let labelNodes = new Map();
let lionSocial = {
  mode: "dispersed",
  timer: 0,
  point: { x: 460, y: 310 },
};
let currentSeason = "normal";
let weather = syntheticWeather();
let speed = 1;
let lastFrame = performance.now();
let scanClock = 0;
let mortalityClock = 0;
let vegetationHealth = 78;
let waterStress = 35;
let predatorPressure = 0;
let balanceScore = 78;
let eventSerial = 0;

init();

function init() {
  drawHabitatDetail();
  buildSpeciesList();
  resetSimulation("normal");
  applyLanguage();
  elements.languageToggle?.addEventListener("click", toggleLanguage);
  updateClock();
  updateWeatherDisplay();
  fetchWeather();
  setInterval(updateClock, 1000);
  setInterval(fetchWeather, 10 * 60 * 1000);
  requestAnimationFrame(frame);
}

function resetSimulation(season) {
  currentSeason = season;
  rng = mulberry32((Date.now() + season.length * 101) % 999999);
  counts = {};
  baseSeasonCounts = {};
  entities = [];
  activeInteractions = [];
  killSites = [];
  killSiteSerial = 0;
  treeDamageSites = [];
  temporaryPreyLabels = [];
  eventItems = [];
  eventVariantCursor = {};
  eventSerial = 0;
  relationshipStrength = Object.fromEntries(relationships.map((rel) => [`${rel.from}-${rel.to}`, 18 + rng() * 24]));
  dailyRelationshipStats = {};
  dailyRelationshipDayKey = "";
  dailyRelationshipLabel = "";
  dailyRelationshipSnapshot = [];
  dailyRelationshipSignature = "";
  speciesTrendHistory = {};
  speciesTrendClock = 0;
  speciesTrendElapsed = 0;
  speciesTrendSignature = "";
  vegetationHealth = season === "rainy" ? 86 : season === "migration" ? 72 : 78;
  waterStress = season === "rainy" ? 18 : 35;
  resetLionSocial();

  for (const sp of species) {
    const count = getSeasonCount(sp, season);
    counts[sp.id] = count;
    baseSeasonCounts[sp.id] = count;
    const markerCount = getMarkerCount(sp, season);
    const groupSize = markerCount > 0 ? Math.max(1, count / markerCount) : 0;

    for (let i = 0; i < markerCount; i += 1) {
      const point = randomHabitatPoint(sp);
      entities.push({
        uid: `${sp.id}-${i}`,
        speciesId: sp.id,
        groupSize: Math.max(1, Math.round(groupSize * randomRange(0.62, 1.34))),
        x: point.x,
        y: point.y,
        vx: randomRange(-0.12, 0.12),
        vy: randomRange(-0.12, 0.12),
        target: null,
        scavengeTarget: null,
        scavengeFocus: 0,
        feedingSiteId: null,
        state: sp.category === "herbivore" ? "foraging" : "resting",
        hunger: predatorIds.has(sp.id) ? randomRange(6, 42) : sp.category === "omnivore" ? randomRange(8, 54) : 0,
        restTimer: randomRange(1, 10),
        active: initialEntityActive(sp, i),
        appearanceTimer: initialAppearanceTimer(sp),
        vulnerable: sp.id === "elephant" ? rng() < 0.18 : false,
        treeDamageTimer: sp.id === "elephant" ? randomRange(4, 10) : 0,
        clan: sp.id === "lion" || sp.id === "hyena" ? i % 2 : 0,
        jitter: rng() * TAU,
      });
    }
  }

  animalNodes.clear();
  labelNodes.clear();
  elements.animalLayer.replaceChildren();
  elements.labelLayer.replaceChildren();
  elements.temporaryLabelLayer.replaceChildren();
  initializeSpeciesTrends();
  createAnimalNodes();
  addEventMessage("season", { season }, "system", "#4e6f37");
  renderAll();
}

function initialEntityActive(sp, index) {
  if (sp.id === "leopard") return true;
  return rng() < mapAppearanceProbability(sp);
}

function initialAppearanceTimer(sp) {
  if (sp.id === "leopard") return 0;
  if (sp.id === "cheetah") return randomRange(3, 14);
  return randomRange(8, 42);
}

function resetLionSocial() {
  lionSocial = {
    mode: rng() < 0.42 ? "gathered" : "dispersed",
    timer: randomRange(18, 42),
    point: randomHabitatPoint(speciesById.lion),
  };
}

function getSeasonCount(sp, season) {
  if (sp.seasonal === "rainy" && season !== "rainy") return 0;
  if (season === "migration" && sp.migratory) return Math.round(sp.baseCount * 2.5);
  return sp.baseCount;
}

function getMarkerCount(sp, season) {
  const count = getSeasonCount(sp, season);
  if (count <= 0) return 0;
  if (season === "migration" && sp.migratory) return Math.round(sp.markers * 1.35);
  return sp.markers;
}

function buildSpeciesList() {
  elements.speciesList.replaceChildren();
  for (const sp of species) {
    const row = document.createElement("div");
    row.className = "species-row";
    const paint = markerPaint(sp);
    row.innerHTML = `
      <i class="species-color" style="--species-color:${paint.fill}"></i>
      <span><b>${speciesDisplayName(sp)}</b></span>
      <strong class="species-count" data-count="${sp.id}">--</strong>
    `;
    elements.speciesList.append(row);
    speciesRows.set(sp.id, row);
  }
}

function createAnimalNodes() {
  const animalFragment = document.createDocumentFragment();
  const labelFragment = document.createDocumentFragment();

  for (const entity of entities) {
    const sp = speciesById[entity.speciesId];
    const g = svgEl("g", { class: animalClassName(entity), "data-id": entity.uid });
    const r = markerRadius(entity, sp);
    const paint = markerPaint(sp);
    const halo = svgEl("circle", {
      class: "animal-halo",
      r: r + 4,
      stroke: paint.fill,
    });
    const core = svgEl("circle", {
      class: "animal-core",
      r,
      fill: paint.fill,
      stroke: paint.stroke,
    });
    g.append(halo, core);
    animalFragment.append(g);
    animalNodes.set(entity.uid, g);

    if (sp.label && shouldLabelEntity(entity, sp)) {
      const text = svgEl("text", {
        class: "map-label",
        "text-anchor": "middle",
        "dominant-baseline": "hanging",
      });
      text.textContent = speciesDisplayName(sp);
      labelFragment.append(text);
      labelNodes.set(entity.uid, text);
    }
  }

  elements.animalLayer.append(animalFragment);
  elements.labelLayer.append(labelFragment);
}

function markerPaint(sp) {
  if (sp.category === "herbivore") {
    return { fill: "#111111", stroke: "rgba(255,255,255,0.92)" };
  }
  if (sp.category === "omnivore" && sp.id !== "jackal" && sp.id !== "warthog") {
    return { fill: OMNIVORE_MARKER_COLOR, stroke: "rgba(255,255,255,0.92)" };
  }
  return { fill: sp.color, stroke: sp.stroke || "rgba(255,255,255,0.92)" };
}

function isEntityActive(entity) {
  return entity.active !== false;
}

function shouldLabelEntity(entity, sp) {
  if (alwaysLabeledPredators.has(sp.id)) return true;
  if (sp.id === "jackal") return false;
  return true;
}

function frame(now) {
  const realDt = Math.min(0.06, (now - lastFrame) / 1000 || 0.016);
  lastFrame = now;

  updateSimulation(realDt * speed);

  renderAll();
  requestAnimationFrame(frame);
}

function updateSimulation(dt) {
  const hour = getNairobiHour();
  scanClock += dt;
  mortalityClock += dt;
  updateLionSocial(dt);

  for (const entity of entities) {
    updateEntity(entity, dt, hour);
  }

  if (scanClock >= 0.22) {
    scanInteractions(scanClock, hour);
    scanClock = 0;
  }

  if (mortalityClock >= 3) {
    applyMortality(mortalityClock);
    mortalityClock = 0;
  }

  updateKillSites(dt);
  updateTreeDamageSites(dt);
  updateTemporaryPreyLabels(dt);
  updateSystemMetrics(dt);
  updateSpeciesTrends(dt);
  activeInteractions = activeInteractions.filter((line) => {
    line.age += dt;
    return line.age < line.life;
  });

  for (const key of Object.keys(relationshipStrength)) {
    relationshipStrength[key] = Math.max(8, relationshipStrength[key] - dt * 1.7);
  }
}

function updateEntity(entity, dt, hour) {
  const sp = speciesById[entity.speciesId];
  if (sp.id !== "leopard" && !updateRatioBasedPresence(entity, sp, dt)) return;

  const activity = activityFactor(sp, hour);
  const terrain = terrainAt(entity.x, entity.y);
  const riverDistance = distanceToRiver(entity.x, entity.y);
  const speedBase = sp.speed * activity;
  const isPredator = predatorIds.has(sp.id);
  const isPredatorLike = isPredator || sp.category === "omnivore";
  const isElephant = sp.id === "elephant";

  if (isPredatorLike) {
    const hungerRate = isPredator ? 0.035 : 0.08;
    entity.hunger = clamp(entity.hunger + dt * (sp.foodNeed || 1) * hungerRate, 0, 100);
  }

  if (entity.scavengeFocus > 0) entity.scavengeFocus = Math.max(0, entity.scavengeFocus - dt);
  if (entity.scavengeFocus <= 0) entity.scavengeTarget = null;
  const isScavenging = Boolean(entity.scavengeFocus > 0 && entity.scavengeTarget);
  const canHuntNow = isPredator && entity.hunger >= PREDATOR_HUNT_HUNGER && activity >= 0.2;
  entity.restTimer -= dt;
  if (isPredator && !canHuntNow && entity.state !== "fleeing" && !isScavenging) {
    entity.state = "resting";
    entity.vx = 0;
    entity.vy = 0;
    entity.restTimer = Math.max(entity.restTimer, randomRange(3, 9));
  } else if (sp.category === "herbivore" && !isElephant && entity.state !== "fleeing") {
    entity.state = "foraging";
    entity.vx *= 0.38;
    entity.vy *= 0.38;
  } else if (sp.restBias && entity.hunger < 42 && entity.restTimer <= 0) {
    entity.state = rng() < sp.restBias ? "resting" : "patrolling";
    entity.restTimer = randomRange(4, 12);
  }

  const threat = nearestThreat(entity, sp);
  if (threat && threat.distance < sp.awareness) {
    const push = unitVector(threat.entity.x, threat.entity.y, entity.x, entity.y);
    entity.vx += push.x * speedBase * 0.09;
    entity.vy += push.y * speedBase * 0.09;
    entity.state = "fleeing";
    if (rng() < 0.07) {
      pulse(entity, threat.entity, "avoidance", `${sp.name}避让${speciesById[threat.entity.speciesId].name}`);
      strengthen(entity.speciesId, threat.entity.speciesId, 8);
    }
  } else if (isScavenging) {
    const pull = unitVector(entity.x, entity.y, entity.scavengeTarget.x, entity.scavengeTarget.y);
    const d = distance(entity, entity.scavengeTarget);
    entity.vx += pull.x * speedBase * (d > 30 ? 0.12 : 0.04);
    entity.vy += pull.y * speedBase * (d > 30 ? 0.12 : 0.04);
    entity.state = "scavenging";
  } else if (canHuntNow) {
    const target = nearestPrey(entity, sp, 150);
    if (target) {
      const targetSp = speciesById[target.entity.speciesId];
      entity.target = target.entity.uid;
      if (targetSp.category === "herbivore") addTemporaryPreyLabel(target.entity, targetSp);
      const pull = unitVector(entity.x, entity.y, target.entity.x, target.entity.y);
      const chaseBoost = target.distance < 64 ? 0.16 : 0.055;
      entity.vx += pull.x * speedBase * chaseBoost;
      entity.vy += pull.y * speedBase * chaseBoost;
      entity.state = "hunting";
      if (rng() < 0.05) {
        pulse(entity, target.entity, "predation", `${sp.name}追踪${targetSp.name}`);
        strengthen(entity.speciesId, target.entity.speciesId, 7);
      }
    } else {
      wander(entity, sp, dt, speedBase * 0.08);
      entity.state = "patrolling";
    }
  } else if (sp.nearWater && riverDistance > 85) {
    steerTowardRiver(entity, speedBase * (isElephant ? 0.022 : 0.04));
    entity.state = "drinking";
  } else if (!isPredator && (sp.category === "herbivore" || sp.category === "omnivore") && waterStress > 58 && riverDistance > 175 && rng() < 0.02) {
    steerTowardRiver(entity, speedBase * 0.018);
    entity.state = "drinking";
  } else if (isElephant) {
    entity.state = "browsing";
    wander(entity, sp, dt, speedBase * 0.055);
  } else if (!isPredator && sp.category === "omnivore" && rng() < 0.018) {
    wander(entity, sp, dt, speedBase * 0.05);
  } else if (!isPredator && rng() < 0.004) {
    wander(entity, sp, dt, speedBase * 0.025);
  }

  if (sp.id === "lion") {
    applyLionSocialMovement(entity, speedBase);
  }

  const habitatFit = habitatWeight(sp, entity.x, entity.y, terrain);
  const habitatThreshold = sp.id === "leopard" ? 0.42 : forestPrimateIds.has(sp.id) ? 0.46 : 0.33;
  const leopardNeedsCover = sp.id === "leopard" && habitatFit < 0.2 && entity.state !== "hunting" && entity.state !== "fleeing";
  const cheetahNeedsOpen = sp.id === "cheetah" && terrain.type === "forest" && entity.state !== "hunting" && entity.state !== "fleeing";
  const predatorCanMove = !isPredator || entity.state === "hunting" || entity.state === "fleeing" || entity.hunger >= PREDATOR_HUNT_HUNGER || leopardNeedsCover || cheetahNeedsOpen;
  if (predatorCanMove && (habitatFit < habitatThreshold || entity.x < 14 || entity.x > MAP.width - 14 || entity.y < 14 || entity.y > MAP.height - 14)) {
    const point = randomHabitatPoint(sp);
    const pull = unitVector(entity.x, entity.y, point.x, point.y);
    const pullStrength = sp.id === "leopard" || sp.id === "cheetah" ? 0.1 : forestPrimateIds.has(sp.id) ? 0.085 : isElephant ? 0.025 : 0.04;
    entity.vx += pull.x * speedBase * pullStrength;
    entity.vy += pull.y * speedBase * pullStrength;
  }

  const drag = entity.state === "resting" || entity.state === "foraging" ? 0.42 : entity.state === "browsing" ? 0.68 : 0.84;
  entity.vx *= drag;
  entity.vy *= drag;
  if (isPredator && entity.state === "resting" && !leopardNeedsCover && !cheetahNeedsOpen) {
    entity.vx = 0;
    entity.vy = 0;
  }

  const maxSpeed = leopardNeedsCover || cheetahNeedsOpen ? Math.max(0.18, speedBase * 0.035) : Math.max(0.02, speedBase * movementSpeedMultiplier(entity, sp));
  const mag = Math.hypot(entity.vx, entity.vy);
  if (mag > maxSpeed) {
    entity.vx = (entity.vx / mag) * maxSpeed;
    entity.vy = (entity.vy / mag) * maxSpeed;
  }

  entity.x = clamp(entity.x + entity.vx * dt * 2.15, 8, MAP.width - 8);
  entity.y = clamp(entity.y + entity.vy * dt * 2.15, 8, MAP.height - 8);

  if (entity.state === "fleeing" && rng() < 0.08) entity.state = isPredator ? "resting" : "foraging";
  if (entity.state === "hunting" && entity.hunger < 35 && rng() < 0.12) entity.state = "resting";
  if (sp.id === "elephant") applyElephantTreeImpact(entity, terrain, dt);
}

function updateRatioBasedPresence(entity, sp, dt) {
  if (entity.state === "leaving") return updateMapExit(entity, sp, dt);
  if (entity.state === "entering") return updateMapEntry(entity, sp, dt);

  entity.appearanceTimer -= dt;
  const probability = mapAppearanceProbability(sp);
  const desired = desiredVisibleByRatio(sp);
  const activeCount = activeSpeciesCount(sp.id);

  if (!entity.active) {
    if (entity.appearanceTimer <= 0) {
      if (activeCount < desired || rng() < probability * 0.36) {
        activateMapEntity(entity, sp);
      } else {
        entity.appearanceTimer = randomRange(8, 28);
      }
    }
    return false;
  }

  if (entity.appearanceTimer <= 0) {
    const overDesired = activeCount > desired;
    const leaveChance = clamp(0.16 + (1 - probability) * 0.58, 0.18, 0.78);
    if ((overDesired || rng() > probability) && rng() < leaveChance) {
      deactivateMapEntity(entity, sp);
      return false;
    }
    entity.appearanceTimer = randomRange(12, 42);
  }

  return true;
}

function activateMapEntity(entity, sp) {
  entity.active = true;
  entity.appearanceTimer = sp.id === "cheetah" ? randomRange(32, 78) : randomRange(16, 48);
  const target = sp.id === "lion" && lionSocial.mode === "gathered" ? lionGatherPoint(entity) : randomHabitatPoint(sp);
  const edge = edgePointNear(target);
  entity.x = edge.x;
  entity.y = edge.y;
  entity.entryTarget = target;
  entity.exitTarget = null;
  entity.vx = 0;
  entity.vy = 0;
  entity.state = "entering";

  if (sp.id === "elephant") {
    entity.vulnerable = rng() < 0.2;
    entity.treeDamageTimer = randomRange(3, 8);
    addEventMessage(entity.vulnerable ? "elephantVulnerableEnter" : "elephantEnter", {}, "system", "#5b6770");
  }
}

function deactivateMapEntity(entity, sp) {
  entity.exitTarget = nearestEdgePoint(entity.x, entity.y);
  entity.entryTarget = null;
  entity.state = "leaving";
  entity.appearanceTimer = sp.id === "cheetah" ? randomRange(4, 14) : randomRange(14, 56);
}

function updateMapEntry(entity, sp, dt) {
  const target = entity.entryTarget || randomHabitatPoint(sp);
  moveTowardPoint(entity, target, transitionSpeed(sp), dt);
  if (distance(entity, target) < 10) {
    entity.entryTarget = null;
    entity.vx = 0;
    entity.vy = 0;
    entity.state = sp.id === "elephant" ? "browsing" : sp.category === "herbivore" ? "foraging" : predatorIds.has(sp.id) ? "resting" : "foraging";
    return true;
  }
  return false;
}

function updateMapExit(entity, sp, dt) {
  const target = entity.exitTarget || nearestEdgePoint(entity.x, entity.y);
  entity.exitTarget = target;
  moveTowardPoint(entity, target, transitionSpeed(sp), dt);
  if (distance(entity, target) < 9) {
    entity.active = false;
    entity.exitTarget = null;
    entity.vx = 0;
    entity.vy = 0;
    entity.state = "away";
    if (sp.id === "elephant") addEventMessage("elephantLeave", {}, "system", "#5b6770");
  }
  return false;
}

function moveTowardPoint(entity, target, speed, dt) {
  const direction = unitVector(entity.x, entity.y, target.x, target.y);
  entity.vx = direction.x * speed;
  entity.vy = direction.y * speed;
  entity.x = clamp(entity.x + entity.vx * dt, 8, MAP.width - 8);
  entity.y = clamp(entity.y + entity.vy * dt, 8, MAP.height - 8);
}

function transitionSpeed(sp) {
  if (sp.id === "elephant") return 5;
  if (predatorIds.has(sp.id)) return 6.5;
  if (sp.category === "herbivore") return 7;
  return 6;
}

function edgePointNear(point) {
  const edge = Math.floor(rng() * 4);
  if (edge === 0) return { x: clamp(point.x + randomRange(-90, 90), 8, MAP.width - 8), y: 8 };
  if (edge === 1) return { x: MAP.width - 8, y: clamp(point.y + randomRange(-70, 70), 8, MAP.height - 8) };
  if (edge === 2) return { x: clamp(point.x + randomRange(-90, 90), 8, MAP.width - 8), y: MAP.height - 8 };
  return { x: 8, y: clamp(point.y + randomRange(-70, 70), 8, MAP.height - 8) };
}

function nearestEdgePoint(x, y) {
  const distances = [
    { side: "left", distance: x - 8 },
    { side: "right", distance: MAP.width - 8 - x },
    { side: "top", distance: y - 8 },
    { side: "bottom", distance: MAP.height - 8 - y },
  ].sort((a, b) => a.distance - b.distance);
  const side = distances[0].side;
  if (side === "left") return { x: 8, y: clamp(y + randomRange(-24, 24), 8, MAP.height - 8) };
  if (side === "right") return { x: MAP.width - 8, y: clamp(y + randomRange(-24, 24), 8, MAP.height - 8) };
  if (side === "top") return { x: clamp(x + randomRange(-28, 28), 8, MAP.width - 8), y: 8 };
  return { x: clamp(x + randomRange(-28, 28), 8, MAP.width - 8), y: MAP.height - 8 };
}

function mapAppearanceProbability(sp) {
  if (sp.id === "leopard") return 1;
  if (sp.id === "cheetah") return 0.72;
  const ratio = speciesLionRatio(sp);
  const probability = 0.08 + (Math.log1p(ratio) / Math.log1p(100)) * 0.78;
  return clamp(probability, 0.08, 0.9);
}

function desiredVisibleByRatio(sp) {
  const markerCount = entities.filter((entity) => entity.speciesId === sp.id).length || sp.markers;
  if (sp.id === "leopard") return markerCount;
  let desired = Math.round(markerCount * mapAppearanceProbability(sp));
  if (sp.id === "cheetah") desired = Math.min(desired, 1);
  if (sp.id === "lion" && lionSocial.mode === "gathered") desired = Math.max(desired, Math.min(markerCount, 4));
  return clamp(desired, 0, markerCount);
}

function speciesLionRatio(sp) {
  const lionCount = Math.max(1, counts.lion || speciesById.lion.baseCount);
  return Math.max(0, counts[sp.id] || 0) / lionCount;
}

function activeSpeciesCount(speciesId) {
  return entities.filter((entity) => entity.speciesId === speciesId && isEntityActive(entity)).length;
}

function updateElephantPresence(entity, dt) {
  entity.appearanceTimer -= dt;

  if (!entity.active) {
    if (entity.appearanceTimer <= 0) {
      entity.active = true;
      entity.appearanceTimer = randomRange(18, 42);
      entity.vulnerable = rng() < 0.2;
      entity.treeDamageTimer = randomRange(3, 8);
      const point = randomHabitatPoint(speciesById.elephant);
      entity.x = point.x;
      entity.y = point.y;
      entity.vx = randomRange(-0.08, 0.08);
      entity.vy = randomRange(-0.08, 0.08);
      entity.state = entity.vulnerable ? "foraging" : "browsing";
      addEventMessage(entity.vulnerable ? "elephantVulnerableEnter" : "elephantEnter", {}, "system", "#5b6770");
    }
    return false;
  }

  if (entity.appearanceTimer <= 0) {
    entity.active = false;
    entity.appearanceTimer = randomRange(22, 58);
    entity.state = "away";
    addEventMessage("elephantLeave", {}, "system", "#5b6770");
    return false;
  }

  return true;
}

function updateIntermittentPresence(entity, sp, dt) {
  entity.appearanceTimer -= dt;

  if (sp.id === "cheetah") {
    if (!entity.active) {
      if (entity.appearanceTimer <= 0) {
        entity.active = true;
        entity.appearanceTimer = randomRange(18, 38);
        const point = randomHabitatPoint(sp);
        entity.x = point.x;
        entity.y = point.y;
        entity.vx = randomRange(-0.1, 0.1);
        entity.vy = randomRange(-0.1, 0.1);
        entity.state = "patrolling";
        addEventMessage("cheetahEnter", {}, "system", "#ffd21f");
      }
      return false;
    }

    if (entity.appearanceTimer <= 0) {
      entity.active = false;
      entity.appearanceTimer = randomRange(24, 68);
      entity.state = "away";
      addEventMessage("cheetahLeave", {}, "system", "#ffd21f");
      return false;
    }
    return true;
  }

  if (sp.id === "hyena") {
    if (!entity.active) {
      if (entity.appearanceTimer <= 0 && (activeHyenaCount() < desiredVisibleHyenaCount() || rng() < 0.22)) {
        entity.active = true;
        entity.appearanceTimer = randomRange(18, 48);
        const point = randomHabitatPoint(sp);
        entity.x = point.x;
        entity.y = point.y;
        entity.vx = randomRange(-0.12, 0.12);
        entity.vy = randomRange(-0.12, 0.12);
        entity.state = rng() < 0.5 ? "patrolling" : "foraging";
      } else if (entity.appearanceTimer <= 0) {
        entity.appearanceTimer = randomRange(8, 24);
      }
      return false;
    }

    if (entity.appearanceTimer <= 0 && activeHyenaCount() > desiredVisibleHyenaCount() && rng() < 0.7) {
      entity.active = false;
      entity.appearanceTimer = randomRange(14, 48);
      entity.state = "away";
      return false;
    }

    if (entity.appearanceTimer <= 0) {
      entity.appearanceTimer = randomRange(12, 34);
    }
    return true;
  }

  if (sp.id === "jackal") {
    if (!entity.active) {
      if (entity.appearanceTimer <= 0 && (activeJackalCount() < desiredVisibleJackalCount() || rng() < 0.26)) {
        entity.active = true;
        entity.appearanceTimer = randomRange(16, 42);
        const point = randomHabitatPoint(sp);
        entity.x = point.x;
        entity.y = point.y;
        entity.vx = randomRange(-0.12, 0.12);
        entity.vy = randomRange(-0.12, 0.12);
        entity.state = rng() < 0.56 ? "foraging" : "patrolling";
      } else if (entity.appearanceTimer <= 0) {
        entity.appearanceTimer = randomRange(8, 24);
      }
      return false;
    }

    if (entity.appearanceTimer <= 0 && activeJackalCount() > desiredVisibleJackalCount() && rng() < 0.72) {
      entity.active = false;
      entity.appearanceTimer = randomRange(14, 46);
      entity.state = "away";
      return false;
    }

    if (entity.appearanceTimer <= 0) {
      entity.appearanceTimer = randomRange(10, 30);
    }
    return true;
  }

  if (sp.id === "lion") {
    if (!entity.active) {
      if (entity.appearanceTimer <= 0 && (activeLionCount() < desiredVisibleLionCount() || rng() < 0.34)) {
        entity.active = true;
        entity.appearanceTimer = randomRange(22, 58);
        const point = lionSocial.mode === "gathered" ? lionGatherPoint(entity) : randomHabitatPoint(sp);
        entity.x = point.x;
        entity.y = point.y;
        entity.vx = randomRange(-0.08, 0.08);
        entity.vy = randomRange(-0.08, 0.08);
        entity.state = lionSocial.mode === "gathered" ? "resting" : "patrolling";
      } else if (entity.appearanceTimer <= 0) {
        entity.appearanceTimer = randomRange(8, 22);
      }
      return false;
    }

    if (entity.appearanceTimer <= 0 && activeLionCount() > desiredVisibleLionCount() && rng() < 0.78) {
      entity.active = false;
      entity.appearanceTimer = randomRange(18, 52);
      entity.state = "away";
      return false;
    }

    if (entity.appearanceTimer <= 0) {
      entity.appearanceTimer = randomRange(14, 38);
    }
  }

  return true;
}

function activeHyenaCount() {
  return entities.filter((entity) => entity.speciesId === "hyena" && isEntityActive(entity)).length;
}

function desiredVisibleHyenaCount() {
  return 5 + Math.floor(rng() * 6);
}

function activeJackalCount() {
  return entities.filter((entity) => entity.speciesId === "jackal" && isEntityActive(entity)).length;
}

function desiredVisibleJackalCount() {
  return 4 + Math.floor(rng() * 5);
}

function updateLionSocial(dt) {
  lionSocial.timer -= dt;
  if (lionSocial.timer > 0) return;

  lionSocial.mode = lionSocial.mode === "gathered" ? "dispersed" : "gathered";
  lionSocial.timer = lionSocial.mode === "gathered" ? randomRange(18, 36) : randomRange(24, 58);
  lionSocial.point = randomHabitatPoint(speciesById.lion);
  addEventMessage(lionSocial.mode === "gathered" ? "lionGather" : "lionScatter", {}, "system", "#e11919");
}

function applyLionSocialMovement(entity, speedBase) {
  if (entity.state === "hunting" || entity.state === "fleeing" || entity.hunger < PREDATOR_HUNT_HUNGER) return;

  if (lionSocial.mode === "gathered") {
    const point = lionGatherPoint(entity);
    const pull = unitVector(entity.x, entity.y, point.x, point.y);
    entity.vx += pull.x * speedBase * 0.085;
    entity.vy += pull.y * speedBase * 0.085;
    if (distance(entity, point) < 60) entity.state = "resting";
    return;
  }

  const neighbor = nearestActiveLion(entity, 52);
  if (neighbor) {
    const push = unitVector(neighbor.x, neighbor.y, entity.x, entity.y);
    entity.vx += push.x * speedBase * 0.045;
    entity.vy += push.y * speedBase * 0.045;
    if (entity.state === "resting") entity.state = "patrolling";
  }
}

function lionGatherPoint(entity) {
  const index = Number(entity.uid.split("-").at(-1) || 0);
  const angle = index * 1.74;
  const radius = 12 + (index % 3) * 9;
  return {
    x: clamp(lionSocial.point.x + Math.cos(angle) * radius, 18, MAP.width - 18),
    y: clamp(lionSocial.point.y + Math.sin(angle) * radius, 18, MAP.height - 18),
  };
}

function activeLionCount() {
  return entities.filter((entity) => entity.speciesId === "lion" && isEntityActive(entity)).length;
}

function desiredVisibleLionCount() {
  return lionSocial.mode === "gathered" ? 5 : 3 + Math.floor(rng() * 3);
}

function nearestActiveLion(entity, radius) {
  let best = null;
  for (const other of entities) {
    if (other.uid === entity.uid || other.speciesId !== "lion" || !isEntityActive(other)) continue;
    const d = distance(entity, other);
    if (d <= radius && (!best || d < best.distance)) best = { ...other, distance: d };
  }
  return best;
}

function applyElephantTreeImpact(entity, terrain, dt) {
  if (!entity.active || (terrain.type !== "forest" && terrain.type !== "shrub")) return;
  entity.state = "browsing";
  vegetationHealth = clamp(vegetationHealth - dt * (terrain.type === "forest" ? 0.055 : 0.032), 18, 98);
  entity.treeDamageTimer -= dt;

  if (entity.treeDamageTimer <= 0) {
    entity.treeDamageTimer = randomRange(7, 16);
    treeDamageSites.push({ x: entity.x + randomRange(-16, 16), y: entity.y + randomRange(-14, 14), age: 0, life: 16 });
    addEventMessage("treeDamage", {}, "system", "#7b6a3b");
  }
}

function scanInteractions(dt, hour) {
  const predators = entities.filter((entity) => predatorIds.has(entity.speciesId) && counts[entity.speciesId] > 0 && isEntityActive(entity));
  const elephants = entities.filter((entity) => entity.speciesId === "elephant" && isEntityActive(entity));
  const buffalo = entities.filter((entity) => entity.speciesId === "buffalo" && isEntityActive(entity));

  for (const predator of predators) {
    const sp = speciesById[predator.speciesId];
    if (predator.hunger < PREDATOR_HUNT_HUNGER || activityFactor(sp, hour) < 0.2) continue;
    const prey = nearestPrey(predator, sp, 42);
    if (!prey) continue;

    const preySp = speciesById[prey.entity.speciesId];
    const cooperativeBoost = groupBoost(predator, prey.entity);
    const focusedPreyBoost = leopardFocusedPreyBoost(predator, prey.entity);
    const defensePenalty = preySp.defense || 0;
    const chance = clamp((sp.huntSuccess + cooperativeBoost + focusedPreyBoost - defensePenalty) * dt * 0.9, 0.01, focusedPreyBoost ? 0.58 : 0.45);

    if (rng() < chance) {
      const amount = killAmount(preySp, prey.entity);
      counts[preySp.id] = Math.max(0, counts[preySp.id] - amount);
      prey.entity.groupSize = Math.max(1, prey.entity.groupSize - amount);
      predator.hunger = Math.max(0, predator.hunger - preyFoodValue(preySp) * amount);
      predator.state = "resting";
      const site = createKillSite(prey.entity, predator.speciesId, preySp, amount * preyFoodValue(preySp));
      killSites.push(site);
      beginFeedingFlash(predator, site);
      pulse(predator, prey.entity, "predation", `${sp.name}捕食${preySp.name}`);
      strengthen(predator.speciesId, preySp.id, 28);
      if (preySp.category === "herbivore") addTemporaryPreyLabel(prey.entity, preySp);
      addEventMessage("predation", { predator: sp.id, prey: preySp.id, amount }, "predation", "#dc4f32");
      relocateIfSparse(prey.entity, preySp);
    }
  }

  for (const site of killSites) {
    updateScavengerChain(site, dt);
  }

  scanLionElephantHunts(elephants, predators, dt, hour);

  for (const elephant of elephants) {
    for (const predator of predators) {
      if (distance(elephant, predator) < 92 && rng() < 0.18) {
        const away = unitVector(elephant.x, elephant.y, predator.x, predator.y);
        predator.vx += away.x * 4.5;
        predator.vy += away.y * 4.5;
        predator.state = "fleeing";
        pulse(elephant, predator, "avoidance", "非洲象驱逐附近捕食者");
        strengthen("elephant", predator.speciesId, 12);
      }
    }
  }

  for (const cow of buffalo) {
    const lion = nearestSpecies(cow, "lion", 55);
    if (lion && rng() < 0.08) {
      const away = unitVector(cow.x, cow.y, lion.entity.x, lion.entity.y);
      lion.entity.vx += away.x * 3;
      lion.entity.vy += away.y * 3;
      lion.entity.state = "fleeing";
      pulse(cow, lion.entity, "conflict", "水牛集群反击狮子");
      addTemporaryBuffaloLabel(cow);
      strengthen("buffalo", "lion", 15);
      addEventMessage("buffaloConflict", {}, "conflict", "#1f2937");
    }
  }

  scanTerritoryConflicts();
}

function scanLionElephantHunts(elephants, predators, dt, hour) {
  const hungryLions = predators.filter((entity) => entity.speciesId === "lion" && entity.hunger >= PREDATOR_HUNT_HUNGER && activityFactor(speciesById.lion, hour) > 0.25);
  if (hungryLions.length < 4) return;

  for (const elephant of elephants) {
    if (!elephant.vulnerable || counts.elephant <= 0) continue;
    const nearbyLions = hungryLions.filter((lion) => distance(lion, elephant) < 95);
    if (nearbyLions.length < 4) continue;

    const chance = clamp((nearbyLions.length - 3) * dt * 0.018, 0, 0.08);
    if (rng() < chance) {
      counts.elephant = Math.max(0, counts.elephant - 1);
      elephant.groupSize = Math.max(1, elephant.groupSize - 1);
      elephant.active = false;
      elephant.appearanceTimer = randomRange(34, 72);
      elephant.vulnerable = false;
      const site = createKillSite(elephant, "lion", speciesById.elephant, 70);
      killSites.push(site);
      addTemporaryPreyLabel(elephant, speciesById.elephant);
      for (const lion of nearbyLions.slice(0, 5)) {
        lion.hunger = Math.max(0, lion.hunger - 44);
        lion.state = "resting";
        beginFeedingFlash(lion, site);
        pulse(lion, elephant, "predation", "狮群围猎老弱病残的非洲象");
      }
      strengthen("elephant", "lion", 24);
      addEventMessage("elephantHunt", {}, "predation", "#dc4f32");
      return;
    }
  }
}

function scanTerritoryConflicts() {
  if (rng() > 0.18) return;
  const lions = entities.filter((item) => item.speciesId === "lion" && isEntityActive(item));
  const hyenas = entities.filter((item) => item.speciesId === "hyena" && isEntityActive(item));
  for (const pack of [lions, hyenas]) {
    for (let i = 0; i < pack.length; i += 1) {
      for (let j = i + 1; j < pack.length; j += 1) {
        if (pack[i].clan === pack[j].clan) continue;
        if (distance(pack[i], pack[j]) < 46 && rng() < 0.1) {
          const sp = speciesById[pack[i].speciesId];
          pulse(pack[i], pack[j], "conflict", `${sp.name}领地冲突`);
          strengthen(pack[i].speciesId, pack[j].speciesId, 14);
          addEventMessage("territoryConflict", { species: sp.id }, "conflict", "#1f2937");
          return;
        }
      }
    }
  }
}

function createKillSite(point, owner, preySp, biomass) {
  return {
    id: `kill-site-${killSiteSerial += 1}`,
    x: point.x,
    y: point.y,
    owner,
    prey: preySp.name,
    preyId: preySp.id,
    biomass,
    initialBiomass: biomass,
    age: 0,
    life: clamp(22 + biomass * 0.08, 24, 42),
    chainClock: randomRange(0.6, 1.8),
    defenseClock: randomRange(2.2, 5.2),
  };
}

function beginFeedingFlash(predator, site) {
  if (!predatorIds.has(predator.speciesId)) return;
  predator.feedingSiteId = site.id;
}

function feedingSiteFor(entity) {
  if (!predatorIds.has(entity.speciesId) || !entity.feedingSiteId) return null;
  if (!isEntityActive(entity)) {
    entity.feedingSiteId = null;
    return null;
  }
  const site = killSites.find((item) => item.id === entity.feedingSiteId);
  if (!site || site.biomass <= 0.5) {
    entity.feedingSiteId = null;
    return null;
  }
  if (distance(entity, site) > 68) {
    entity.feedingSiteId = null;
    return null;
  }
  return site;
}

function animalClassName(entity) {
  const feedingClass = feedingSiteFor(entity) ? " feeding" : "";
  return `animal ${entity.state}${feedingClass}`;
}

function updateScavengerChain(site, dt) {
  if (site.biomass <= 0) return;
  const ownerSp = speciesById[site.owner];
  const nearbyScavengers = entities
    .filter((entity) => (entity.speciesId === "hyena" || entity.speciesId === "jackal") && isEntityActive(entity) && distance(entity, site) < carcassAttractionRadius(site))
    .sort((a, b) => distance(a, site) - distance(b, site));

  for (const scavenger of nearbyScavengers.slice(0, 5)) {
    attractScavengerToSite(scavenger, site);
  }

  const feedingScavengers = nearbyScavengers.filter((entity) => distance(entity, site) < 92);
  site.biomass -= dt * (0.22 + feedingScavengers.length * 1.15);
  for (const scavenger of feedingScavengers) {
    scavenger.hunger = Math.max(0, scavenger.hunger - dt * 7);
  }

  site.chainClock -= dt;
  if (feedingScavengers.length && site.chainClock <= 0) {
    const lead = feedingScavengers[0];
    const sp = speciesById[lead.speciesId];
    const target = scavengeTargetPoint(lead, site);
    pulsePoint(lead, target, "scavenge", `${sp.name}被残食吸引，靠近${ownerSp?.name || "原捕食者"}`, { bSpecies: site.owner });
    if (lead.speciesId === "jackal" && jackalLabelTriggerSpecies.has(site.owner)) addTemporaryJackalLabel(lead);
    if (site.owner) recordDailyRelationship(lead.speciesId, site.owner, "scavenge", 1);
    strengthen(lead.speciesId, site.owner, 10);
    addEventMessage("scavengeChain", { scavenger: sp.id, owner: ownerSp?.id || "originalPredator", prey: site.preyId || site.prey }, "scavenge", "#8d65c5");
    site.chainClock = randomRange(1.8, 4.2);
  }

  site.defenseClock -= dt;
  const defendingOwner = nearestActiveOwnerAtSite(site, 120);
  if (defendingOwner && feedingScavengers.length && site.defenseClock <= 0) {
    const lead = feedingScavengers[0];
    if (defendingOwner.uid === lead.uid) {
      site.defenseClock = randomRange(2, 4);
      return;
    }
    const ownerName = speciesById[defendingOwner.speciesId].name;
    const scavengerName = speciesById[lead.speciesId].name;
    const away = unitVector(defendingOwner.x, defendingOwner.y, lead.x, lead.y);
    lead.vx += away.x * 4.2;
    lead.vy += away.y * 4.2;
    lead.state = "fleeing";
    lead.scavengeFocus = 0;
    lead.scavengeTarget = null;
    pulse(defendingOwner, lead, "avoidance", `${ownerName}守住残食并驱离${scavengerName}`);
    addEventMessage("carcassDefense", { owner: defendingOwner.speciesId, scavenger: lead.speciesId }, "conflict", "#f0b334");
    site.defenseClock = randomRange(4.5, 8.5);
  }
}

function carcassAttractionRadius(site) {
  return clamp(120 + site.biomass * 1.15, 140, 250);
}

function attractScavengerToSite(entity, site) {
  if (entity.state === "fleeing" || entity.hunger < 30) return;
  entity.scavengeTarget = { x: site.x, y: site.y };
  entity.scavengeFocus = Math.max(entity.scavengeFocus || 0, randomRange(2.4, 5.8));
}

function nearestActiveOwnerAtSite(site, radius) {
  if (!site.owner) return null;
  let best = null;
  for (const entity of entities) {
    if (entity.speciesId !== site.owner || !isEntityActive(entity)) continue;
    const d = distance(entity, site);
    if (d <= radius && (!best || d < best.distance)) best = { entity, distance: d };
  }
  return best?.entity || null;
}

function updateKillSites(dt) {
  killSites = killSites.filter((site) => {
    site.age += dt;
    return site.age < site.life && site.biomass > 0.5;
  });
}

function updateTreeDamageSites(dt) {
  treeDamageSites = treeDamageSites.filter((site) => {
    site.age += dt;
    return site.age < site.life;
  });
}

function addTemporaryPreyLabel(entity, sp) {
  addTemporaryMapLabel(entity, sp, "temporary-prey-label", 4.8);
}

function addTemporaryJackalLabel(entity) {
  addTemporaryMapLabel(entity, speciesById.jackal, "temporary-jackal-label", 4.2);
}

function addTemporaryBuffaloLabel(entity) {
  addTemporaryMapLabel(entity, speciesById.buffalo, "temporary-buffalo-label", 4.8);
}

function addTemporaryMapLabel(entity, sp, className, life) {
  const existing = temporaryPreyLabels.find((item) => item.uid === entity.uid && item.className === className);
  if (existing) {
    existing.x = entity.x;
    existing.y = entity.y;
    existing.age = 0;
    existing.life = life;
    return;
  }
  temporaryPreyLabels.push({
    uid: entity.uid,
    speciesId: sp.id,
    className,
    name: sp.name,
    x: entity.x,
    y: entity.y,
    age: 0,
    life,
  });
  if (temporaryPreyLabels.length > 24) temporaryPreyLabels = temporaryPreyLabels.slice(-24);
}

function updateTemporaryPreyLabels(dt) {
  temporaryPreyLabels = temporaryPreyLabels.filter((item) => {
    item.age += dt;
    return item.age < item.life;
  });
}

function applyMortality(dt) {
  for (const sp of species) {
    const current = counts[sp.id] || 0;
    if (current <= 0) continue;
    const expected = (current * naturalMortality(sp) * dt) / 864;
    if (rng() < expected) {
      counts[sp.id] = Math.max(0, current - 1);
      if (rng() < 0.34) addEventMessage("mortality", { species: sp.id }, "system", "#6b7280");
    }
  }
}

function naturalMortality(sp) {
  if (sp.category === "predator") return 0.002;
  if (sp.category === "omnivore") return 0.004;
  return 0.003;
}

function updateSystemMetrics(dt) {
  const herbivoreTotal = species
    .filter((sp) => sp.category === "herbivore")
    .reduce((sum, sp) => sum + (counts[sp.id] || 0), 0);
  const herbivoreBase = species
    .filter((sp) => sp.category === "herbivore")
    .reduce((sum, sp) => sum + (baseSeasonCounts[sp.id] || 0), 0);
  const predatorTotal = species
    .filter((sp) => predatorIds.has(sp.id))
    .reduce((sum, sp) => sum + (counts[sp.id] || 0), 0);
  const preyTotal = species
    .filter((sp) => sp.category === "herbivore" || sp.category === "omnivore")
    .reduce((sum, sp) => sum + (counts[sp.id] || 0), 0);

  const rainBoost = weather.precipitation > 0 ? 1.2 : weather.cloud > 70 ? 0.45 : -0.12;
  const load = herbivoreBase ? herbivoreTotal / herbivoreBase : 1;
  const migrationLoad = currentSeason === "migration" ? 0.42 : 0;
  vegetationHealth = clamp(vegetationHealth + dt * (rainBoost * 0.08 - (load - 0.92 + migrationLoad) * 0.11), 24, 98);

  const heat = clamp((weather.temp - 22) * 2.4, 0, 30);
  const rainRelief = clamp(weather.precipitation * 16 + (currentSeason === "rainy" ? 18 : 0), 0, 34);
  waterStress = clamp(35 + heat + migrationLoad * 26 - rainRelief, 6, 92);

  predatorPressure = clamp((predatorTotal / Math.max(1, preyTotal)) * 5200 + predatorRecentActivity(), 8, 96);
  const vegetationPenalty = Math.abs(vegetationHealth - 78) * 0.35;
  const predatorPenalty = Math.abs(predatorPressure - 42) * 0.42;
  const waterPenalty = Math.max(0, waterStress - 48) * 0.46;
  balanceScore = clamp(96 - vegetationPenalty - predatorPenalty - waterPenalty, 18, 98);
}

function predatorRecentActivity() {
  return activeInteractions.filter((line) => line.type === "predation").length * 3.8;
}

function renderAll() {
  renderEntities();
  renderTemporaryPreyLabels();
  renderInteractions();
  renderSpeciesCounts();
  renderSpeciesTrends();
  renderMetrics();
  renderRelationships();
  renderDayNightLayer();
  renderWeatherLayer();
}

function renderEntities() {
  let visible = 0;
  for (const entity of entities) {
    const node = animalNodes.get(entity.uid);
    if (!node) continue;
    const sp = speciesById[entity.speciesId];
    const visibleSpecies = (counts[sp.id] || 0) > 0 && isEntityActive(entity);
    node.style.opacity = visibleSpecies ? "" : "0";
    node.setAttribute("transform", `translate(${entity.x.toFixed(2)} ${entity.y.toFixed(2)})`);
    node.setAttribute("class", animalClassName(entity));
    if (visibleSpecies) visible += 1;

    const label = labelNodes.get(entity.uid);
    if (label) {
      label.style.opacity = visibleSpecies ? "1" : "0";
      label.setAttribute("x", entity.x.toFixed(2));
      label.setAttribute("y", (entity.y + markerRadius(entity, sp) + 6).toFixed(2));
      label.textContent = speciesDisplayName(sp);
    }
  }
  elements.visibleCount.textContent = translate("visibleGroups", { count: formatCount(visible) });
}

function refreshMapLabels() {
  for (const entity of entities) {
    const label = labelNodes.get(entity.uid);
    if (!label) continue;
    label.textContent = speciesDisplayName(entity.speciesId);
  }
}

function renderTemporaryPreyLabels() {
  const fragment = document.createDocumentFragment();
  for (const item of temporaryPreyLabels) {
    const opacity = clamp(1 - item.age / item.life, 0, 1);
    const lift = item.age * 5;
    const text = svgEl("text", {
      class: item.className || "temporary-prey-label",
      "text-anchor": "middle",
      "dominant-baseline": "central",
      x: item.x.toFixed(1),
      y: (item.y - 23 - lift).toFixed(1),
      opacity: opacity.toFixed(2),
    });
    text.textContent = item.speciesId ? speciesDisplayName(item.speciesId) : item.name;
    fragment.append(text);
  }
  elements.temporaryLabelLayer.replaceChildren(fragment);
}

function renderInteractions() {
  const fragment = document.createDocumentFragment();
  for (const line of activeInteractions) {
    const opacity = clamp(1 - line.age / line.life, 0, 1);
    const path = svgEl("path", {
      class: interactionLineClass(line),
      d: curvePath(line.x1, line.y1, line.x2, line.y2),
      opacity: opacity.toFixed(2),
    });
    if (line.type === "predation" || isBuffaloCounterLine(line)) {
      path.setAttribute("marker-end", "url(#hunt-arrow)");
    } else if (line.type === "scavenge") {
      path.setAttribute("marker-end", "url(#scavenge-arrow)");
    }
    fragment.append(path);

    const affected = predatorAffectedPoint(line);
    if (affected) {
      const ring = svgEl("circle", {
        class: "predator-affected",
        cx: affected.x.toFixed(1),
        cy: affected.y.toFixed(1),
        r: affected.r.toFixed(1),
        opacity: opacity.toFixed(2),
      });
      fragment.append(ring);
    }
  }
  for (const site of killSites) {
    const opacity = clamp(1 - site.age / site.life, 0, 1);
    const radius = clamp(5 + Math.sqrt(site.biomass) * 1.1, 7, 18);
    const scent = svgEl("circle", {
      class: "carcass-scent",
      cx: site.x.toFixed(1),
      cy: site.y.toFixed(1),
      r: clamp(radius + 10 + site.biomass * 0.12, 16, 42).toFixed(1),
      opacity: (opacity * 0.55).toFixed(2),
    });
    fragment.append(scent);
    for (let ringIndex = 0; ringIndex < 3; ringIndex += 1) {
      const phase = (site.age * 0.42 + ringIndex / 3) % 1;
      const ring = svgEl("circle", {
        class: "carcass-light",
        cx: site.x.toFixed(1),
        cy: site.y.toFixed(1),
        r: (radius + 8 + phase * 46).toFixed(1),
        opacity: (opacity * (1 - phase) * 0.5).toFixed(2),
      });
      fragment.append(ring);
    }
    const mark = svgEl("circle", {
      class: "kill-site",
      cx: site.x.toFixed(1),
      cy: site.y.toFixed(1),
      r: radius.toFixed(1),
      opacity: opacity.toFixed(2),
    });
    fragment.append(mark);
  }
  for (const site of treeDamageSites) {
    const opacity = clamp(1 - site.age / site.life, 0, 1);
    const mark = svgEl("path", {
      class: "tree-damage",
      d: `M${(site.x - 7).toFixed(1)} ${(site.y + 7).toFixed(1)} L${(site.x + 7).toFixed(1)} ${(site.y - 7).toFixed(1)} M${(site.x - 5).toFixed(1)} ${(site.y - 5).toFixed(1)} L${(site.x + 5).toFixed(1)} ${(site.y + 5).toFixed(1)}`,
      opacity: opacity.toFixed(2),
    });
    fragment.append(mark);
  }
  elements.interactionLayer.replaceChildren(fragment);
}

function interactionLineClass(line) {
  const classes = ["interaction-line", line.type];
  if (isBuffaloCounterLine(line)) {
    classes.push("buffalo-counter");
  }
  if (line.type === "conflict" && predatorIds.has(line.aSpecies) && predatorIds.has(line.bSpecies)) {
    classes.push("carnivore-conflict");
  }
  return classes.join(" ");
}

function isBuffaloCounterLine(line) {
  return line.type === "conflict" && line.aSpecies === "buffalo" && line.bSpecies === "lion";
}

function predatorAffectedPoint(line) {
  const aIsPredator = predatorIds.has(line.aSpecies);
  const bIsPredator = predatorIds.has(line.bSpecies);

  if (line.type === "predation" && aIsPredator && !bIsPredator) {
    return { x: line.x2, y: line.y2, r: 17 };
  }

  if (line.type === "avoidance" && bIsPredator) {
    return { x: line.x1, y: line.y1, r: 16 };
  }

  return null;
}

function renderSpeciesCounts() {
  for (const sp of species) {
    const row = speciesRows.get(sp.id);
    if (!row) continue;
    const countNode = row.querySelector("[data-count]");
    const count = Math.round(counts[sp.id] || 0);
    const base = baseSeasonCounts[sp.id] || sp.baseCount;
    countNode.textContent = formatCount(count);
    row.style.opacity = count > 0 ? "1" : "0.48";
    row.style.borderColor = count < base * 0.82 ? "rgba(208, 88, 63, 0.35)" : "rgba(74, 86, 58, 0.12)";
  }
}

function initializeSpeciesTrends() {
  speciesTrendHistory = {};
  speciesTrendClock = 0;
  speciesTrendElapsed = 0;
  speciesTrendSignature = "";
  for (const sp of species) {
    speciesTrendHistory[sp.id] = [{ t: 0, count: Math.round(counts[sp.id] || 0) }];
  }
}

function updateSpeciesTrends(dt) {
  speciesTrendClock += dt;
  speciesTrendElapsed += dt;
  if (speciesTrendClock < SPECIES_TREND_INTERVAL) return;

  speciesTrendClock = 0;
  for (const sp of species) {
    const history = speciesTrendHistory[sp.id] || [];
    history.push({ t: speciesTrendElapsed, count: Math.round(counts[sp.id] || 0) });
    speciesTrendHistory[sp.id] = history.slice(-SPECIES_TREND_MAX_POINTS);
  }
}

function renderSpeciesTrends() {
  if (!elements.speciesTrendList) return;
  const signature = buildSpeciesTrendSignature();
  if (signature === speciesTrendSignature) return;
  speciesTrendSignature = signature;

  if (elements.speciesTrendNote) {
    const seconds = Math.max(1, Math.round(Math.min(speciesTrendElapsed, SPECIES_TREND_INTERVAL * SPECIES_TREND_MAX_POINTS)));
    elements.speciesTrendNote.textContent = translate("trendNote", { seconds: formatCount(seconds) });
  }

  const fragment = document.createDocumentFragment();
  for (const sp of species) {
    fragment.append(renderSpeciesTrendCard(sp));
  }
  elements.speciesTrendList.replaceChildren(fragment);
}

function buildSpeciesTrendSignature() {
  return species.map((sp) => {
    const history = speciesTrendHistory[sp.id] || [];
    const last = history.at(-1);
    const current = Math.round(counts[sp.id] || 0);
    return `${sp.id}:${history.length}:${last?.count ?? current}:${current}`;
  }).join("|");
}

function renderSpeciesTrendCard(sp) {
  const history = speciesTrendHistory[sp.id] || [{ t: 0, count: Math.round(counts[sp.id] || 0) }];
  const first = history[0]?.count ?? 0;
  const current = Math.round(counts[sp.id] || 0);
  const delta = current - first;
  const chartHistory = history.at(-1)?.count === current
    ? history
    : [...history, { t: speciesTrendElapsed, count: current }].slice(-SPECIES_TREND_MAX_POINTS);
  const card = document.createElement("article");
  card.className = `trend-card ${delta > 0 ? "rising" : delta < 0 ? "falling" : "stable"}`;
  card.style.setProperty("--trend-color", trendLineColor(sp));
  card.innerHTML = `
    <div class="trend-meta">
      <span><i class="trend-dot"></i><b>${speciesDisplayName(sp)}</b></span>
      <strong>${formatCount(current)}</strong>
      <small>${trendDeltaText(delta)}</small>
    </div>
  `;
  card.append(buildSpeciesSparkline(sp, chartHistory));
  return card;
}

function trendLineColor(sp) {
  return markerPaint(sp).fill;
}

function trendDeltaText(delta) {
  if (delta === 0) return translate("trendFlat");
  return `${delta > 0 ? "+" : ""}${formatCount(delta)}`;
}

function buildSpeciesSparkline(sp, history) {
  const width = 160;
  const height = 46;
  const padX = 3;
  const padY = 5;
  let values = history.length ? history.map((point) => point.count) : [Math.round(counts[sp.id] || 0)];
  if (values.length === 1) values = [values[0], values[0]];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const spread = Math.max(1, max - min);
  const yMin = Math.max(0, min - spread * 0.18);
  const yMax = max + spread * 0.18;
  const usableWidth = width - padX * 2;
  const usableHeight = height - padY * 2;
  const denominator = Math.max(1, yMax - yMin);
  const points = values.map((value, index) => {
    const x = padX + (values.length === 1 ? 0 : (index / (values.length - 1)) * usableWidth);
    const y = height - padY - ((value - yMin) / denominator) * usableHeight;
    return `${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");

  const svg = svgEl("svg", {
    class: "trend-sparkline",
    viewBox: `0 0 ${width} ${height}`,
    role: "img",
    "aria-label": currentLanguage === "zh" ? `${speciesDisplayName(sp)}数量变化曲线` : `${speciesDisplayName(sp)} population trend line`,
  });
  svg.append(
    svgEl("line", { class: "trend-baseline", x1: padX, y1: height - padY, x2: width - padX, y2: height - padY }),
    svgEl("polyline", { class: "trend-line", points, fill: "none", stroke: trendLineColor(sp), "stroke-width": 2.4, "stroke-linecap": "round", "stroke-linejoin": "round" }),
  );
  return svg;
}

function renderMetrics() {
  elements.vegetationScore.textContent = `${Math.round(vegetationHealth)}%`;
  elements.predatorPressure.textContent = `${Math.round(predatorPressure)}%`;
  elements.waterPressure.textContent = `${Math.round(waterStress)}%`;
  elements.balanceScore.textContent = Math.round(balanceScore);
  elements.balanceState.textContent = balanceState(balanceScore);

  elements.vegetationMeter.style.width = `${vegetationHealth}%`;
  elements.predatorMeter.style.width = `${predatorPressure}%`;
  elements.waterMeter.style.width = `${waterStress}%`;
}

function renderRelationships() {
  const currentDayKey = getNairobiDayKey();
  if (dailyRelationshipDayKey && dailyRelationshipDayKey !== currentDayKey) {
    dailyRelationshipStats = {};
    dailyRelationshipSignature = "";
  }

  dailyRelationshipDayKey = currentDayKey;
  dailyRelationshipSnapshot = buildDailyRelationshipSummary(currentDayKey, !dailyRelationshipEntries().length);
  dailyRelationshipLabel = `${translate("dataReport")} · ${formatDayLabel(currentDayKey)}`;

  const report = buildDailyDataReport(currentDayKey);
  const signature = buildDailyRelationshipSignature(currentDayKey);
  if (dailyRelationshipSignature === signature) return;

  dailyRelationshipSignature = signature;
  elements.relationshipMode.textContent = dailyRelationshipLabel;

  const fragment = document.createDocumentFragment();
  fragment.append(renderDailyDataReport(report));

  for (const rel of dailyRelationshipSnapshot) {
    const item = document.createElement("div");
    item.className = "relationship-item daily-summary";
    item.innerHTML = `
      <div class="rel-head">
        <i class="rel-icon ${rel.icon}"></i>
        <span><b>${rel.title}</b><small>${rel.detail}</small></span>
      </div>
      <div class="rel-data">
        <span><i class="mini-icon hunt"></i>${translate("hunt")} <b>${formatCount(rel.stats.hunt)}</b></span>
        <span><i class="mini-icon prey"></i>${translate("hunted")} <b>${formatCount(rel.stats.hunted)}</b></span>
        <span><i class="mini-icon conflict"></i>${translate("conflict")} <b>${formatCount(rel.stats.conflict)}</b></span>
        <span><i class="mini-icon pressure"></i>${translate("avoidance")} <b>${formatCount(rel.stats.avoidance)}</b></span>
        <span><i class="mini-icon scavenge"></i>${translate("scavenge")} <b>${formatCount(rel.stats.scavenge)}</b></span>
      </div>
    `;
    fragment.append(item);
  }
  elements.relationshipList.replaceChildren(fragment);
}

function dailyRelationshipEntries() {
  return Object.entries(dailyRelationshipStats)
    .map(([key, stats]) => {
      const [from, to] = key.split("-");
      const total = dailyRelationshipTotal(stats);
      return {
        key,
        from,
        to,
        stats,
        total,
        score: dailyRelationshipScore(stats),
      };
    })
    .filter((entry) => entry.total > 0 && entry.from !== entry.to && speciesById[entry.from] && speciesById[entry.to])
    .sort((a, b) => b.score - a.score);
}

function dailyRelationshipTotal(stats) {
  return stats.hunt + stats.conflict + stats.avoidance + stats.scavenge;
}

function dailyRelationshipScore(stats) {
  return stats.hunt * 4 + stats.conflict * 3 + stats.avoidance * 2 + stats.scavenge + stats.score * 0.08;
}

function buildDailyDataReport(dayKey) {
  const entries = dailyRelationshipEntries();
  const totals = entries.reduce((sum, entry) => {
    sum.hunt += entry.stats.hunt;
    sum.hunted += entry.stats.hunt;
    sum.conflict += entry.stats.conflict;
    sum.avoidance += entry.stats.avoidance;
    sum.scavenge += entry.stats.scavenge;
    return sum;
  }, { hunt: 0, hunted: 0, conflict: 0, avoidance: 0, scavenge: 0 });
  const top = entries[0];
  const pressureIndex = clamp(Math.round(totals.hunt * 9 + totals.conflict * 7 + totals.avoidance * 4 + totals.scavenge * 5), 0, 100);

  return {
    dayLabel: formatDayLabel(dayKey),
    totals,
    activeRelations: entries.length,
    pressureIndex,
    dominant: dominantDailyMetric(totals),
    topTitle: top ? `${speciesDisplayName(top.from)} → ${speciesDisplayName(top.to)}` : translate("noHighPressure"),
    topDetail: top ? dailyRelationshipText(top) : translate("collectingReport"),
  };
}

function dominantDailyMetric(totals) {
  const metrics = [
    { key: "hunt", label: translate("huntPressure"), icon: "hunt", value: totals.hunt },
    { key: "conflict", label: translate("conflictFriction"), icon: "conflict", value: totals.conflict },
    { key: "avoidance", label: translate("avoidancePressure"), icon: "pressure", value: totals.avoidance },
    { key: "scavenge", label: translate("scavengePressure"), icon: "scavenge", value: totals.scavenge },
  ].sort((a, b) => b.value - a.value);
  return metrics[0].value > 0 ? metrics[0] : { key: "summary", label: translate("waitingRecord"), icon: "summary", value: 0 };
}

function renderDailyDataReport(report) {
  const card = document.createElement("section");
  card.className = "daily-report";
  card.innerHTML = `
    <div class="daily-report-head">
      <span><b>${translate("dailyDataTitle")}</b><small>${translate("nairobiTime").replace(" UTC+3", "")} · ${report.dayLabel}</small></span>
      <span class="report-pressure"><b>${formatCount(report.pressureIndex)}</b><small>${translate("pressureIndex")}</small></span>
    </div>
    <div class="report-grid">
      <span class="report-metric"><i class="mini-icon hunt"></i><b>${formatCount(report.totals.hunt)}</b><small>${translate("hunt")}</small></span>
      <span class="report-metric"><i class="mini-icon prey"></i><b>${formatCount(report.totals.hunted)}</b><small>${translate("hunted")}</small></span>
      <span class="report-metric"><i class="mini-icon conflict"></i><b>${formatCount(report.totals.conflict)}</b><small>${translate("conflict")}</small></span>
      <span class="report-metric"><i class="mini-icon pressure"></i><b>${formatCount(report.totals.avoidance)}</b><small>${translate("avoidance")}</small></span>
      <span class="report-metric"><i class="mini-icon scavenge"></i><b>${formatCount(report.totals.scavenge)}</b><small>${translate("scavenge")}</small></span>
      <span class="report-metric"><i class="mini-icon ${report.dominant.icon}"></i><b>${formatCount(report.activeRelations)}</b><small>${translate("activeRelations")}</small></span>
    </div>
    <div class="report-focus">
      <span><i class="mini-icon ${report.dominant.icon}"></i>${report.dominant.label}</span>
      <b>${report.topTitle}</b>
      <small>${report.topDetail}</small>
    </div>
  `;
  return card;
}

function buildDailyRelationshipSignature(dayKey) {
  const entries = dailyRelationshipEntries()
    .map((entry) => `${entry.key}:${entry.stats.hunt}:${entry.stats.conflict}:${entry.stats.avoidance}:${entry.stats.scavenge}:${entry.stats.score.toFixed(1)}`)
    .join("|");
  return `${dayKey}|${entries}`;
}

function buildDailyRelationshipSummary(dayKey, isFirstRender = false) {
  const entries = dailyRelationshipEntries().slice(0, 5);

  if (!entries.length) {
    return [{
      title: isFirstRender ? translate("recordingRelations") : translate("noSignificantRelations", { day: formatDayLabel(dayKey) }),
      detail: translate("reportReset"),
      icon: "summary",
      stats: { hunt: 0, hunted: 0, conflict: 0, avoidance: 0, scavenge: 0 },
    }];
  }

  return entries.map((entry) => {
    return {
      title: `${speciesDisplayName(entry.from)} → ${speciesDisplayName(entry.to)}`,
      detail: dailyRelationshipText(entry),
      icon: dailyRelationshipIcon(entry.stats),
      stats: {
        hunt: entry.stats.hunt,
        hunted: entry.stats.hunt,
        conflict: entry.stats.conflict,
        avoidance: entry.stats.avoidance,
        scavenge: entry.stats.scavenge,
      },
    };
  });
}

function dailyRelationshipText(entry) {
  const { stats } = entry;
  if (stats.hunt >= stats.conflict && stats.hunt >= stats.avoidance + stats.scavenge && stats.hunt > 0) {
    return currentLanguage === "zh"
      ? "捕猎关系最明显，箭头方向代表捕猎者，被捕猎次数同步计入猎物压力。"
      : "Hunting is the dominant relation; arrows point from predator to prey and prey loss is counted as pressure.";
  }
  if (stats.conflict > 0 && stats.conflict >= stats.avoidance + stats.scavenge) {
    return currentLanguage === "zh"
      ? "冲突关系最明显，通常来自反击、领地摩擦或近距离对抗。"
      : "Conflict is dominant, usually from counterattacks, territory friction, or close-range confrontation.";
  }
  if (stats.avoidance > 0) {
    return currentLanguage === "zh"
      ? "驱逐和避让关系最明显，移动路线受到明显压迫。"
      : "Avoidance is dominant; movement routes are being pushed by nearby pressure.";
  }
  if (stats.scavenge > 0) {
    return currentLanguage === "zh"
      ? "抢食关系最明显，主要围绕猎物残食发生。"
      : "Scavenging is dominant, mostly around carcass remains.";
  }
  return currentLanguage === "zh"
    ? "关系保持低频，暂未形成稳定的日内压力链。"
    : "Relations remain low-frequency without a stable daily pressure chain yet.";
}

function dailyRelationshipIcon(stats) {
  if (stats.hunt >= stats.conflict && stats.hunt >= stats.avoidance + stats.scavenge && stats.hunt > 0) return "hunt";
  if (stats.conflict > 0 && stats.conflict >= stats.avoidance + stats.scavenge) return "conflict";
  if (stats.avoidance > 0) return "pressure";
  if (stats.scavenge > 0) return "scavenge";
  return "summary";
}

function renderDayNightLayer() {
  const hour = getNairobiHour();
  const phase = dayPhase(hour);
  const settings = {
    night: { fill: "#173052", opacity: 0.34 },
    dawn: { fill: "#f0a85c", opacity: 0.18 },
    day: { fill: "#fff6b7", opacity: 0.06 },
    dusk: { fill: "#cb6b51", opacity: 0.22 },
  }[phase];

  elements.dayNightOverlay.setAttribute("fill", settings.fill);
  elements.dayNightOverlay.setAttribute("opacity", settings.opacity);
  elements.dayNightOverlay.dataset.phase = phase;
}

function dayPhase(hour) {
  if (hour >= 6 && hour < 8) return "dawn";
  if (hour >= 8 && hour < 17) return "day";
  if (hour >= 17 && hour < 19) return "dusk";
  return "night";
}

function renderWeatherLayer() {
  const type = weather.precipitation > 0.05 ? "rain" : weather.cloud > 62 ? "cloud" : "clear";
  if (elements.weatherLayer.dataset.type === type) return;
  elements.weatherLayer.dataset.type = type;
  const fragment = document.createDocumentFragment();

  if (type === "rain") {
    for (let i = 0; i < 48; i += 1) {
      const drop = svgEl("circle", {
        class: "weather-drop",
        cx: randomRange(20, MAP.width - 20).toFixed(1),
        cy: randomRange(0, MAP.height).toFixed(1),
        r: randomRange(1.1, 2.4).toFixed(1),
        style: `animation-delay:${randomRange(0, 1.2).toFixed(2)}s;animation-duration:${randomRange(0.9, 1.7).toFixed(2)}s`,
      });
      fragment.append(drop);
    }
  } else if (type === "cloud") {
    for (let i = 0; i < 9; i += 1) {
      const g = svgEl("g", { opacity: randomRange(0.34, 0.65).toFixed(2) });
      const x = randomRange(50, MAP.width - 90);
      const y = randomRange(34, 140);
      g.append(
        svgEl("ellipse", { class: "weather-cloud", cx: x, cy: y, rx: 34, ry: 13 }),
        svgEl("ellipse", { class: "weather-cloud", cx: x + 24, cy: y - 6, rx: 28, ry: 17 }),
        svgEl("ellipse", { class: "weather-cloud", cx: x + 52, cy: y + 2, rx: 38, ry: 14 }),
      );
      fragment.append(g);
    }
  }

  elements.weatherLayer.replaceChildren(fragment);
}

function updateClock() {
  const now = new Date();
  elements.time.textContent = new Intl.DateTimeFormat(languageLocale(), {
    timeZone: "Africa/Nairobi",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);
  elements.date.textContent = new Intl.DateTimeFormat(languageLocale(), {
    timeZone: "Africa/Nairobi",
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(now);
}

async function fetchWeather() {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=-1.493&longitude=35.144&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,cloud_cover&timezone=Africa%2FNairobi";
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("weather request failed");
    const data = await response.json();
    const current = data.current || {};
    weather = {
      temp: Number(current.temperature_2m ?? weather.temp),
      humidity: Number(current.relative_humidity_2m ?? weather.humidity),
      precipitation: Number(current.precipitation ?? 0),
      wind: Number(current.wind_speed_10m ?? weather.wind),
      cloud: Number(current.cloud_cover ?? weather.cloud),
      code: Number(current.weather_code ?? 0),
      live: true,
    };
  } catch {
    weather = syntheticWeather();
  }
  updateWeatherDisplay();
}

function syntheticWeather() {
  const hour = getNairobiHour();
  const dailyWave = Math.sin(((hour - 7) / 24) * TAU);
  const rainy = currentSeason === "rainy";
  const cloud = rainy ? randomRange(64, 92) : randomRange(18, 68);
  return {
    temp: Math.round((21 + dailyWave * 6 + (rainy ? -1.5 : 1.2)) * 10) / 10,
    humidity: Math.round(rainy ? randomRange(68, 88) : randomRange(45, 72)),
    precipitation: rainy && rng() > 0.45 ? randomRange(0.1, 2.5) : 0,
    wind: Math.round(randomRange(5, 18)),
    cloud,
    code: rainy ? 61 : cloud > 60 ? 3 : 1,
    live: false,
  };
}

function updateWeatherDisplay() {
  const label = weatherCodeLabel(weather.code, weather.precipitation, weather.cloud);
  elements.weatherMain.textContent = `${label} ${Math.round(weather.temp)}°C`;
  elements.weatherDetail.textContent = `${weather.live ? translate("live") : translate("simulated")} · ${dayPhaseLabel()} · ${translate("humidity")} ${Math.round(weather.humidity)}% · ${translate("wind")} ${Math.round(weather.wind)} km/h`;
}

function dayPhaseLabel() {
  const labels = {
    dawn: translate("dawn"),
    day: translate("day"),
    dusk: translate("dusk"),
    night: translate("night"),
  };
  return labels[dayPhase(getNairobiHour())];
}

function weatherCodeLabel(code, precipitation, cloud) {
  if (precipitation > 0.05 || [51, 53, 55, 61, 63, 65, 80, 81, 82, 95].includes(code)) return translate("rain");
  if (cloud > 72 || [2, 3, 45, 48].includes(code)) return translate("cloudy");
  if (cloud > 35 || code === 1) return translate("partlyCloudy");
  return translate("clear");
}

function drawHabitatDetail() {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 340; i += 1) {
    const x = randomRange(0, MAP.width);
    const y = randomRange(0, MAP.height);
    const terrain = terrainAt(x, y);
    if (terrain.type === "water") continue;

    if (terrain.type === "forest" && rng() < 0.82) {
      fragment.append(svgEl("circle", {
        cx: x.toFixed(1),
        cy: y.toFixed(1),
        r: randomRange(2.4, 5.2).toFixed(1),
        fill: rng() > 0.5 ? "#315f38" : "#557b39",
        opacity: randomRange(0.34, 0.78).toFixed(2),
      }));
    } else if (terrain.type === "shrub" && rng() < 0.62) {
      fragment.append(svgEl("circle", {
        cx: x.toFixed(1),
        cy: y.toFixed(1),
        r: randomRange(1.4, 3.7).toFixed(1),
        fill: rng() > 0.45 ? "#6f7e3f" : "#9b8848",
        opacity: randomRange(0.28, 0.62).toFixed(2),
      }));
    } else if (terrain.type === "grass" && rng() < 0.44) {
      fragment.append(svgEl("path", {
        d: `M${x.toFixed(1)} ${y.toFixed(1)} c${randomRange(-4, 2).toFixed(1)} -${randomRange(4, 8).toFixed(1)} ${randomRange(2, 5).toFixed(1)} -${randomRange(5, 10).toFixed(1)} ${randomRange(5, 9).toFixed(1)} 0`,
        stroke: "#788d42",
        "stroke-width": randomRange(0.8, 1.4).toFixed(1),
        opacity: randomRange(0.18, 0.38).toFixed(2),
        fill: "none",
      }));
    }
  }
  elements.habitatDetail.append(fragment);
}

function buildRiverPoints() {
  const points = [];
  for (const [p0, p1, p2, p3] of riverSegments) {
    for (let t = 0; t <= 1; t += 0.025) {
      points.push(cubicPoint(p0, p1, p2, p3, t));
    }
  }
  return points;
}

function riverHalfWidthAt(x, y) {
  const upperWidening = y < 110 ? 4.5 : 0;
  const lowerWidening = y > 520 ? 5.5 : 0;
  const bendNoise = Math.sin(y * 0.031 + 0.8) * 5.2 + Math.sin(x * 0.017 - y * 0.011) * 3.4;
  const midPinch = Math.sin((y - 250) * 0.019) * 2.8;
  return clamp(22 + upperWidening + lowerWidening + bendNoise + midPinch, 15, 34);
}

function forestOuterWidthAt(x, y) {
  const bankNoise = Math.sin(y * 0.023 + 1.7) * 16 + Math.sin(x * 0.015 + y * 0.009) * 7;
  return clamp(riverHalfWidthAt(x, y) + 54 + bankNoise, 58, 112);
}

function shrubOuterWidthAt(x, y) {
  const transitionNoise = Math.sin(y * 0.018 + 2.3) * 19 + Math.sin(x * 0.012 - y * 0.016) * 11;
  return clamp(forestOuterWidthAt(x, y) + 62 + transitionNoise, 118, 182);
}

function terrainAt(x, y) {
  const d = distanceToRiver(x, y);
  const leftMountain = x < 255 && y < 165 - x * 0.18 + Math.sin(x * 0.035) * 14;
  const rightMountain = x > 690 && y < 138 - (MAP.width - x) * 0.13 + Math.sin(x * 0.028) * 12;
  const riverHalfWidth = riverHalfWidthAt(x, y);
  const forestOuterWidth = forestOuterWidthAt(x, y);
  const shrubOuterWidth = shrubOuterWidthAt(x, y);
  if (d < riverHalfWidth) return { type: "water", riverDistance: d };
  if ((leftMountain || rightMountain) && d > forestOuterWidth) return { type: "mountain", riverDistance: d };
  if (d < forestOuterWidth) return { type: "forest", riverDistance: d };
  if (d < shrubOuterWidth) return { type: "shrub", riverDistance: d };
  return { type: "grass", riverDistance: d };
}

function habitatWeight(sp, x, y, terrain = terrainAt(x, y)) {
  const d = terrain.riverDistance;
  let weight = sp.habitats.includes(terrain.type) ? 1 : 0.11;

  if (sp.id === "leopard") {
    if (terrain.type === "forest") return d < 64 ? 1.55 : 1.32;
    if (terrain.type === "mountain") return 1.08;
    if (terrain.type === "shrub" && d < 176) return 0.24;
    if (terrain.type === "grass") return 0.002;
    return 0.05;
  }

  if (sp.id === "cheetah") {
    if (terrain.type === "grass") return d > 100 ? 1.45 : 0.82;
    if (terrain.type === "shrub") return d > 84 ? 1.08 : 0.5;
    if (terrain.type === "forest") return 0.004;
    return 0.03;
  }

  if (forestPrimateIds.has(sp.id)) {
    if (terrain.type === "forest") return d < 104 ? 1.5 : 1.28;
    if (terrain.type === "shrub") return d < 178 ? 0.34 : 0.18;
    if (terrain.type === "grass") return 0.012;
    if (terrain.type === "mountain") return 0.16;
    return 0.03;
  }

  if (sp.edge) {
    const edgeScore = d > 84 && d < 174 ? 1.18 : d > 62 && d < 210 ? 0.76 : 0.12;
    weight = Math.max(weight, edgeScore);
  }
  if (sp.nearWater && d < 96) weight += 0.72;
  if (sp.id === "lion" && d < 62) weight *= 0.22;
  if (sp.id === "hippo" && terrain.type !== "water" && d > 36) weight *= 0.08;
  if (terrain.type === "mountain" && sp.id !== "leopard") weight *= 0.36;
  return clamp(weight, 0.02, 1.6);
}

function randomHabitatPoint(sp) {
  for (let attempt = 0; attempt < 1200; attempt += 1) {
    const x = randomRange(18, MAP.width - 18);
    const y = randomRange(18, MAP.height - 18);
    const terrain = terrainAt(x, y);
    if (sp.id === "leopard" && terrain.type === "grass" && rng() < 0.985) continue;
    if (sp.id === "cheetah" && terrain.type === "forest" && rng() < 0.995) continue;
    if (forestPrimateIds.has(sp.id) && terrain.type === "grass" && rng() < 0.992) continue;
    if (forestPrimateIds.has(sp.id) && terrain.type === "shrub" && rng() < 0.42) continue;
    const fit = habitatWeight(sp, x, y, terrain);
    if (rng() < fit * 0.72) return { x, y };
  }
  if (forestPrimateIds.has(sp.id)) {
    for (let attempt = 0; attempt < 300; attempt += 1) {
      const x = randomRange(18, MAP.width - 18);
      const y = randomRange(18, MAP.height - 18);
      if (terrainAt(x, y).type === "forest") return { x, y };
    }
  }
  return { x: randomRange(80, MAP.width - 80), y: randomRange(80, MAP.height - 80) };
}

function nearestThreat(entity, sp) {
  if (!sp.avoids?.length) return null;
  let best = null;
  for (const other of entities) {
    if (other.uid === entity.uid || !sp.avoids.includes(other.speciesId) || counts[other.speciesId] <= 0 || !isEntityActive(other)) continue;
    if (sp.id === "lion" && other.speciesId === "elephant" && other.vulnerable && nearbyActiveSpecies(entity, "lion", 95) >= 4) continue;
    const d = distance(entity, other);
    if (!best || d < best.distance) best = { entity: other, distance: d };
  }
  return best;
}

function nearbyActiveSpecies(entity, speciesId, radius) {
  return entities.filter((other) => other.speciesId === speciesId && isEntityActive(other) && distance(entity, other) < radius).length;
}

function nearestPrey(entity, sp, radius) {
  if (!sp.diet?.length) return null;
  let best = null;
  for (const other of entities) {
    if (other.uid === entity.uid || !sp.diet.includes(other.speciesId) || counts[other.speciesId] <= 0 || !isEntityActive(other)) continue;
    if (entity.speciesId === "jackal" && !["gazelleThomson", "dikdik"].includes(other.speciesId)) continue;
    const d = distance(entity, other);
    if (d > radius) continue;
    const otherTerrain = terrainAt(other.x, other.y);
    if (entity.speciesId === "leopard" && otherTerrain.type === "grass" && rng() < 0.92) continue;
    if (entity.speciesId === "cheetah" && otherTerrain.type === "forest" && rng() < 0.96) continue;
    const habitatModifier = otherTerrain.type === "water" && entity.speciesId !== "lion" ? 1.8 : 1;
    const leopardModifier = leopardPreyTargetModifier(entity, other, otherTerrain);
    const score = d * habitatModifier * leopardModifier + rng() * 18 * leopardModifier;
    if (!best || score < best.score) best = { entity: other, distance: d, score };
  }
  return best;
}

function leopardPreyTargetModifier(predator, prey, terrain) {
  if (predator.speciesId !== "leopard") return 1;
  const focus = leopardFocusedPrey[prey.speciesId];
  if (!focus) return 1.08;
  if (terrain.type === "forest") return focus.target * 0.72;
  if (terrain.type === "shrub") return focus.target * 0.88;
  if (terrain.type === "mountain") return focus.target * 0.94;
  return focus.target;
}

function nearestSpecies(entity, speciesId, radius) {
  let best = null;
  for (const other of entities) {
    if (other.uid === entity.uid || other.speciesId !== speciesId || counts[other.speciesId] <= 0 || !isEntityActive(other)) continue;
    const d = distance(entity, other);
    if (d <= radius && (!best || d < best.distance)) best = { entity: other, distance: d };
  }
  return best;
}

function scavengeTargetPoint(scavenger, site) {
  if (!site.owner) return site;
  let best = null;
  for (const other of entities) {
    if (other.uid === scavenger.uid || other.speciesId !== site.owner || !isEntityActive(other)) continue;
    const d = distance(other, site);
    if (d <= 180 && (!best || d < best.distance)) best = { entity: other, distance: d };
  }
  return best?.entity || site;
}

function groupBoost(predator, prey) {
  const predatorNearby = entities.filter((entity) => entity.speciesId === predator.speciesId && isEntityActive(entity) && distance(entity, predator) < 80).length;
  if (predator.speciesId === "lion") return predatorNearby >= 3 ? 0.19 : predatorNearby >= 2 ? 0.11 : 0;
  if (predator.speciesId === "hyena") return predatorNearby >= 5 ? 0.15 : predatorNearby >= 3 ? 0.08 : 0;
  if (predator.speciesId === "cheetah") return predatorNearby >= 2 ? 0.08 : 0;
  if (prey.speciesId === "buffalo" || prey.speciesId === "giraffe" || prey.speciesId === "hippo") return -0.12;
  return 0;
}

function leopardFocusedPreyBoost(predator, prey) {
  if (predator.speciesId !== "leopard") return 0;
  return leopardFocusedPrey[prey.speciesId]?.success || 0;
}

function killAmount(preySp, prey) {
  if (["buffalo", "giraffe", "eland", "hippo"].includes(preySp.id)) return 1;
  if (["wildebeest", "zebra", "topi", "warthog", "waterbuck"].includes(preySp.id)) return 1 + Math.floor(rng() * 2);
  return Math.max(1, Math.min(Math.round(prey.groupSize * randomRange(0.03, 0.08)), 5));
}

function preyFoodValue(preySp) {
  if (["buffalo", "giraffe", "hippo"].includes(preySp.id)) return 48;
  if (["zebra", "wildebeest", "eland", "topi", "waterbuck"].includes(preySp.id)) return 24;
  if (["warthog", "impala", "baboon"].includes(preySp.id)) return 11;
  return 6;
}

function relocateIfSparse(entity, sp) {
  if (rng() > 0.42) return;
  entity.vx += randomRange(-0.8, 0.8);
  entity.vy += randomRange(-0.8, 0.8);
  entity.state = "fleeing";
}

function wander(entity, sp, dt, force) {
  entity.jitter += dt * randomRange(0.4, 1.1);
  const terrain = terrainAt(entity.x, entity.y);
  const moistureCurve = terrain.riverDistance < 170 ? Math.sin(entity.y * 0.016) * 0.6 : 0;
  const angle = entity.jitter + moistureCurve + randomRange(-0.18, 0.18);
  const restScale = entity.state === "resting" ? 0.04 : entity.state === "foraging" ? 0.06 : entity.state === "browsing" ? 0.24 : 1;
  entity.vx += Math.cos(angle) * force * 0.02 * restScale;
  entity.vy += Math.sin(angle) * force * 0.02 * restScale;
}

function movementSpeedMultiplier(entity, sp) {
  if (entity.state === "scavenging") return 0.22;
  if (entity.state === "hunting" || entity.state === "fleeing") return 0.34;
  if (sp.id === "elephant") return 0.035;
  if (sp.category === "herbivore") return 0.018;
  if (predatorIds.has(sp.id)) return entity.hunger >= PREDATOR_HUNT_HUNGER ? 0.07 : 0;
  if (sp.category === "omnivore") return 0.035;
  return 0.04;
}

function steerTowardRiver(entity, force) {
  let best = riverPoints[0];
  let bestDistance = Infinity;
  for (const point of riverPoints) {
    const d = Math.hypot(entity.x - point.x, entity.y - point.y);
    if (d < bestDistance) {
      best = point;
      bestDistance = d;
    }
  }
  const pull = unitVector(entity.x, entity.y, best.x, best.y);
  entity.vx += pull.x * force;
  entity.vy += pull.y * force;
}

function activityFactor(sp, hour) {
  const phase = dayPhase(hour);
  let factor = 0.72;

  if (sp.activity === "diurnal") {
    if (phase === "day") factor = 1.08;
    else if (phase === "dawn") factor = 0.74;
    else if (phase === "dusk") factor = 0.38;
    else factor = 0.06;
  } else if (sp.activity === "nocturnal") {
    if (phase === "night") factor = 1.1;
    else if (phase === "dusk") factor = 0.82;
    else if (phase === "dawn") factor = 0.48;
    else factor = 0.07;
  } else if (sp.activity === "any") {
    if (phase === "day") factor = 0.82;
    else if (phase === "dawn" || phase === "dusk") factor = 0.68;
    else factor = 0.5;
  }

  if (hour >= 11 && hour < 14) factor *= 0.5;
  if (weather.temp > 29) factor *= 0.68;
  if (weather.precipitation > 0.2 && sp.id === "cheetah") factor *= 0.48;
  return factor;
}

function pulse(a, b, type, label) {
  recordDailyRelationship(a.speciesId, b.speciesId, type, 1);
  labelJackalInteraction(a, b, type);
  activeInteractions.push({
    x1: a.x,
    y1: a.y,
    x2: b.x,
    y2: b.y,
    aSpecies: a.speciesId,
    bSpecies: b.speciesId,
    type,
    label,
    age: 0,
    life: type === "predation" ? 2.4 : 1.45,
  });
}

function labelJackalInteraction(a, b, type) {
  const jackal = a.speciesId === "jackal" ? a : b.speciesId === "jackal" ? b : null;
  if (!jackal) return;

  const other = jackal === a ? b : a;
  const jackalIsHunting = type === "predation" && a.speciesId === "jackal";
  if (jackalIsHunting || jackalLabelTriggerSpecies.has(other.speciesId)) addTemporaryJackalLabel(jackal);
}

function pulsePoint(a, point, type, label, meta = {}) {
  activeInteractions.push({
    x1: a.x,
    y1: a.y,
    x2: point.x,
    y2: point.y,
    aSpecies: a.speciesId,
    bSpecies: meta.bSpecies || point.speciesId || null,
    type,
    label,
    age: 0,
    life: 1.6,
  });
}

function strengthen(from, to, amount) {
  const direct = `${from}-${to}`;
  const reverse = `${to}-${from}`;
  const key = relationshipStrength[direct] !== undefined ? direct : reverse;
  if (relationshipStrength[key] === undefined) return;
  relationshipStrength[key] = clamp(relationshipStrength[key] + amount, 5, 100);
  const stat = ensureDailyRelationshipStat(key);
  stat.score += amount;
}

function recordDailyRelationship(from, to, type, amount = 1) {
  if (!from || !to || from === to) return;
  const normalized = normalizeDailyRelationshipDirection(from, to, type);
  if (!normalized || normalized.from === normalized.to) return;
  const key = `${normalized.from}-${normalized.to}`;
  const stat = ensureDailyRelationshipStat(key);

  if (type === "predation") {
    stat.hunt += amount;
    stat.score += amount * 4;
  } else if (type === "conflict") {
    stat.conflict += amount;
    stat.score += amount * 3;
  } else if (type === "avoidance") {
    stat.avoidance += amount;
    stat.score += amount * 2;
  } else if (type === "scavenge") {
    stat.scavenge += amount;
    stat.score += amount;
  }
}

function normalizeDailyRelationshipDirection(from, to, type) {
  const fromIsPredator = predatorIds.has(from);
  const toIsPredator = predatorIds.has(to);

  if (type === "predation" && fromIsPredator) return { from, to };
  if (type === "predation" && toIsPredator) return { from: to, to: from };
  if (type === "avoidance" && toIsPredator && !fromIsPredator) return { from: to, to: from };
  return { from, to };
}

function ensureDailyRelationshipStat(key) {
  if (!dailyRelationshipStats[key]) {
    dailyRelationshipStats[key] = {
      hunt: 0,
      conflict: 0,
      avoidance: 0,
      scavenge: 0,
      score: 0,
    };
  }
  return dailyRelationshipStats[key];
}

function getNairobiDayKey() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Nairobi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

function formatDayLabel(dayKey) {
  const [year, month, day] = dayKey.split("-");
  if (currentLanguage === "en") return `${Number(month)}/${Number(day)}/${year}`;
  return `${Number(month)}月${Number(day)}日`;
}

function eventDataName(value, fallback = "") {
  if (value === "originalPredator" || value === "原捕食者") {
    return currentLanguage === "en" ? "the original predator" : "原捕食者";
  }
  if (!value) return fallback;
  const speciesMatch = species.find((item) => (
    item.id === value ||
    item.name === value ||
    speciesEnglishNames[item.id] === value
  ));
  return speciesMatch ? speciesDisplayName(speciesMatch) : String(value);
}

function eventAmount(value) {
  return formatCount(value || 0);
}

function eventTemplates(kind, data = {}) {
  const season = data.season || currentSeason;
  const predator = eventDataName(data.predator);
  const prey = eventDataName(data.prey);
  const scavenger = eventDataName(data.scavenger);
  const owner = eventDataName(data.owner, currentLanguage === "en" ? "the original predator" : "原捕食者");
  const speciesName = eventDataName(data.species);
  const amount = eventAmount(data.amount);

  const zhSeason = {
    migration: [
      () => "大迁徙开始，角马、斑马与汤姆森瞪羚数量增加，草原承压上升。",
      () => "迁徙群进入草原带，角马与斑马推动取食压力上升。",
      () => "大迁徙脉冲增强，瞪羚和角马让开阔草地更拥挤。",
    ],
    rainy: [
      () => "雨季到来，水源压力降低，河道附近出现河马活动。",
      () => "降雨改善水源条件，河岸林地的活动变得更频繁。",
      () => "雨季水位回升，动物对河道的争夺暂时放缓。",
    ],
    normal: [
      () => "实时生态场景已启动，领地动物更稳定地出现在画面中。",
      () => "常态生态模拟开始，捕食者和猎物进入自然节奏。",
      () => "地图进入实时监测，物种互动会按生态压力逐步累积。",
    ],
  };

  const enSeason = {
    migration: [
      () => "Migration pulse begins; wildebeest, zebra, and Thomson's gazelles increase, adding pressure to grassland.",
      () => "Migratory herds move into the plains, pushing grazing pressure higher.",
      () => "The migration surge thickens the open grassland with wildebeest and gazelles.",
    ],
    rainy: [
      () => "Rainy season arrives, water stress eases, and hippos begin using the river zone.",
      () => "Rain improves water access, making riverine woodland activity more frequent.",
      () => "Rainy-season water levels rise, briefly easing competition around the river.",
    ],
    normal: [
      () => "The live ecosystem scene has started, with territorial animals appearing more steadily on the map.",
      () => "The normal simulation begins as predators and prey settle into natural rhythms.",
      () => "Live monitoring is active; species interactions will build with ecosystem pressure.",
    ],
  };

  const zh = {
    season: zhSeason[season] || zhSeason.normal,
    elephantEnter: [
      () => "非洲象群从林地边缘进入，开始缓慢取食。",
      () => "一小群非洲象出现在湿润林带，树木压力上升。",
      () => "非洲象沿灌丛带进入画面，附近捕食者会主动避让。",
    ],
    elephantVulnerableEnter: [
      () => "一头老弱病残的非洲象靠近林地边缘，狮群开始保持距离观察。",
      () => "虚弱的非洲象进入画面，狮群的注意力被短暂吸引。",
      () => "一头行动迟缓的非洲象出现在林缘，捕猎风险上升。",
    ],
    elephantLeave: [
      () => "非洲象群从地图边缘离开，林地压力暂时下降。",
      () => "非洲象缓慢走出画面，受损林带进入恢复窗口。",
      () => "象群离开河岸林地，附近动物重新靠近取食。",
    ],
    cheetahEnter: [
      () => "一只猎豹短暂进入草原与灌丛交界处。",
      () => "猎豹从开阔草地边缘现身，开始观察瞪羚群。",
      () => "猎豹沿低草区进入画面，移动路线保持开阔。",
    ],
    cheetahLeave: [
      () => "猎豹离开画面，继续跟随瞪羚群移动。",
      () => "猎豹向地图边缘撤出，草原追逐压力下降。",
      () => "猎豹消失在低草区外侧，附近瞪羚恢复采食。",
    ],
    lionGather: [
      () => "狮群成员开始向同一区域聚集休息。",
      () => "几只狮子重新靠拢，进入低移动休息状态。",
      () => "狮群在灌丛边缘形成小聚集，巡逻活动减少。",
    ],
    lionScatter: [
      () => "狮群成员再次分散巡逻和寻找猎物。",
      () => "狮子从休息点分开，领地压力向外扩散。",
      () => "狮群打散队形，部分个体转入缓慢搜索。",
    ],
    treeDamage: [
      () => "非洲象折断树枝、推倒小树，林地恢复指数下降。",
      () => "象群取食时压倒灌木，河岸林地出现破坏痕迹。",
      () => "大象边走边啃食树皮，局部植被恢复被拖慢。",
    ],
    predation: [
      () => `${predator}捕食${amount}只${prey}，${predatorPressureText()}。`,
      () => `${predator}完成一次捕猎，${prey}数量减少${amount}只。`,
      () => `${prey}遭到${predator}压制，损失${amount}只个体。`,
      () => `${predator}的捕猎改变了附近${prey}的移动节奏。`,
    ],
    scavenge: [
      () => `${scavenger}在残食边缘等待，抢食压力上升。`,
      () => `${scavenger}靠近${owner}留下的食物，开始寻找机会。`,
      () => `残食吸引${scavenger}接近，周边互动变得更紧张。`,
    ],
    scavengeChain: [
      () => `${prey}残食气味扩散，${scavenger}向${owner}的猎物靠近。`,
      () => `${scavenger}沿残食气味进入现场，${owner}的食物开始被争夺。`,
      () => `残食吸引链形成：${scavenger}被${prey}残留气味牵引过来。`,
    ],
    carcassDefense: [
      () => `${owner}守住残食，${scavenger}被迫后撤。`,
      () => `${scavenger}靠近残食时遭${owner}驱离。`,
      () => `${owner}压制抢食者，残食点周围短暂紧张。`,
    ],
    buffaloConflict: [
      () => "非洲水牛集群反击，狮群短暂后撤。",
      () => "水牛群压向狮子，迫使狮群改变路线。",
      () => "水牛形成防御阵线，附近狮子暂停逼近。",
    ],
    elephantHunt: [
      () => "狮群合力捕杀一头老弱病残的非洲象，短期内活动减少。",
      () => "多只狮子围猎虚弱非洲象成功，残食会持续吸引清道夫。",
      () => "老弱病残的非洲象被狮群拿下，捕食压力短暂集中。",
    ],
    territoryConflict: [
      () => `${speciesName}不同群体发生领地摩擦，附近动物活动变慢。`,
      () => `${speciesName}群体边界出现冲突，周边动物开始回避。`,
      () => `${speciesName}之间发生短暂对峙，领地压力升高。`,
    ],
    mortality: [
      () => `${speciesName}出现自然死亡，种群数量轻微回落。`,
      () => `${speciesName}有个体因自然原因消失，数量小幅下降。`,
      () => `${speciesName}种群发生轻微自然损耗。`,
    ],
  };

  const en = {
    season: enSeason[season] || enSeason.normal,
    elephantEnter: [
      () => "African elephants enter from the woodland edge and begin feeding slowly.",
      () => "A small elephant group appears in the moist woodland belt, raising tree pressure.",
      () => "Elephants move in along the shrub belt, and nearby predators begin to give way.",
    ],
    elephantVulnerableEnter: [
      () => "A weak elephant approaches the woodland edge while the lions watch from a distance.",
      () => "A vulnerable elephant enters the map, briefly drawing the pride's attention.",
      () => "A slow-moving elephant appears near the woodland edge, increasing hunting risk.",
    ],
    elephantLeave: [
      () => "The elephant group leaves through the map edge, briefly easing woodland pressure.",
      () => "Elephants move slowly out of view, giving damaged woodland a recovery window.",
      () => "The herd leaves the riverine woodland, and nearby animals begin to move back in.",
    ],
    cheetahEnter: [
      () => "A cheetah briefly enters the grassland-shrubland boundary.",
      () => "A cheetah appears on the open grass edge and starts watching the gazelle groups.",
      () => "The cheetah enters through low grass, keeping its route open and fast.",
    ],
    cheetahLeave: [
      () => "The cheetah leaves the map and continues tracking gazelle movement.",
      () => "The cheetah withdraws toward the map edge, reducing chase pressure on the plains.",
      () => "The cheetah slips beyond the low grass zone, and nearby gazelles resume feeding.",
    ],
    lionGather: [
      () => "Lion pride members begin gathering in one area to rest.",
      () => "Several lions regroup and settle into a low-movement resting state.",
      () => "The pride forms a small cluster near the shrub edge, reducing patrol activity.",
    ],
    lionScatter: [
      () => "Lion pride members spread out again to patrol and search for prey.",
      () => "Lions separate from the resting point, pushing territorial pressure outward.",
      () => "The pride breaks formation, and some individuals shift into a slow search.",
    ],
    treeDamage: [
      () => "Elephants break branches and push down small trees, lowering woodland recovery.",
      () => "Feeding elephants crush shrubs and leave visible damage in the riverine woodland.",
      () => "Elephants browse bark as they walk, slowing local vegetation recovery.",
    ],
    predation: [
      () => `${predator} preys on ${amount} ${prey}; ${predatorPressureText()}.`,
      () => `${predator} completes a hunt, reducing ${prey} by ${amount}.`,
      () => `${prey} is pressured by ${predator}, losing ${amount} individual(s).`,
      () => `${predator}'s hunt changes the movement rhythm of nearby ${prey}.`,
    ],
    scavenge: [
      () => `${scavenger} waits near the carcass edge as scavenging pressure rises.`,
      () => `${scavenger} approaches food left by ${owner}, looking for an opening.`,
      () => `The carcass draws ${scavenger} closer, making nearby interactions more tense.`,
    ],
    scavengeChain: [
      () => `Scent from the ${prey} carcass spreads, drawing ${scavenger} toward ${owner}'s kill.`,
      () => `${scavenger} follows the carcass scent into the scene as ${owner}'s food becomes contested.`,
      () => `A carcass attraction chain forms as ${scavenger} is pulled in by the scent of ${prey}.`,
    ],
    carcassDefense: [
      () => `${owner} holds the carcass and forces ${scavenger} to back off.`,
      () => `${scavenger} is driven away by ${owner} after approaching the carcass.`,
      () => `${owner} suppresses the scavenger, briefly tightening tension around the carcass.`,
    ],
    buffaloConflict: [
      () => "African buffalo counterattack as a group, forcing the lions to pull back briefly.",
      () => "The buffalo herd presses toward the lions and makes the pride change route.",
      () => "Buffalo form a defensive line, and nearby lions pause their approach.",
    ],
    elephantHunt: [
      () => "The pride cooperatively kills a weak elephant, reducing activity for a short period.",
      () => "Several lions successfully hunt a vulnerable elephant, leaving a carcass that will attract scavengers.",
      () => "A weakened elephant is taken by the pride, concentrating predation pressure briefly.",
    ],
    territoryConflict: [
      () => `${speciesName} groups have territorial friction, slowing nearby animal movement.`,
      () => `A boundary conflict appears between ${speciesName} groups, and nearby animals begin avoiding it.`,
      () => `${speciesName} groups enter a brief standoff, raising territorial pressure.`,
    ],
    mortality: [
      () => `${speciesName} records a natural death, and the population dips slightly.`,
      () => `An individual ${speciesName} is lost to natural causes, causing a small decline.`,
      () => `${speciesName} experiences minor natural population loss.`,
    ],
  };

  return (currentLanguage === "en" ? en : zh)[kind] || [];
}

function eventMessageText(kind, data = {}, variant = 0) {
  const options = eventTemplates(kind, data);
  if (!options.length) return String(kind);
  return options[variant % options.length]();
}

function eventDisplayText(event) {
  if (!event.kind) return event.text;
  return eventMessageText(event.kind, event.data || {}, event.variant || 0);
}

function eventMessage(kind, data = {}) {
  pendingEventMessageMeta = null;
  const options = eventTemplates(kind, data);
  if (!options?.length) return String(kind);
  const key = eventVariantKey(kind, data);
  const visibleTexts = new Set(eventItems.map(eventDisplayText));
  const start = eventVariantCursor[key] ?? Math.floor(rng() * options.length);

  for (let offset = 0; offset < options.length; offset += 1) {
    const index = (start + offset) % options.length;
    const text = options[index]();
    if (!visibleTexts.has(text)) {
      eventVariantCursor[key] = (index + 1) % options.length;
      pendingEventMessageMeta = { kind, data: { ...data }, variant: index, text };
      return text;
    }
  }

  const variant = start % options.length;
  const text = options[variant]();
  eventVariantCursor[key] = (start + 1) % options.length;
  pendingEventMessageMeta = { kind, data: { ...data }, variant, text };
  return text;
}

function addEventMessage(kind, data, type, color) {
  addEvent(eventMessage(kind, data), type, color);
}

function addEvent(text, type, color) {
  const meta = pendingEventMessageMeta?.text === text ? pendingEventMessageMeta : null;
  pendingEventMessageMeta = null;
  if (eventItems.some((event) => eventDisplayText(event) === text)) return;
  eventSerial += 1;
  eventItems.unshift({
    id: eventSerial,
    text,
    kind: meta?.kind || null,
    data: meta?.data || null,
    variant: meta?.variant || 0,
    type,
    color,
    time: new Intl.DateTimeFormat(languageLocale(), {
      timeZone: "Africa/Nairobi",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date()),
  });
  eventItems = eventItems.slice(0, 12);
  renderEventFeed();
}

function renderEventFeed() {
  const fragment = document.createDocumentFragment();
  for (const event of eventItems) {
    const li = document.createElement("li");
    li.style.setProperty("--event-color", event.color);
    li.innerHTML = `<b>${eventDisplayText(event)}</b><small>${event.time} · ${eventTypeName(event.type)}</small>`;
    fragment.append(li);
  }
  elements.eventFeed.replaceChildren(fragment);
  elements.eventCount.textContent = formatCount(eventSerial);
}

function eventVariantKey(kind, data) {
  return [
    kind,
    data.predator || "",
    data.prey || "",
    data.scavenger || "",
    data.owner || "",
    data.species || "",
    data.amount || "",
    data.season || "",
  ].join("|");
}

function eventTypeName(type) {
  if (type === "predation") return translate("eventPredation");
  if (type === "scavenge") return translate("eventScavenge");
  if (type === "conflict") return translate("eventConflict");
  return translate("eventSystem");
}

function predatorPressureText() {
  if (currentLanguage === "en") {
    if (predatorPressure > 66) return "predation pressure is high";
    if (predatorPressure < 32) return "predation pressure is low";
    return "predation pressure is moderate";
  }
  if (predatorPressure > 66) return "捕食压力偏高";
  if (predatorPressure < 32) return "捕食压力偏低";
  return "捕食压力保持中位";
}

function balanceState(score) {
  if (score >= 82) return translate("stable");
  if (score >= 64) return translate("slight");
  if (score >= 44) return translate("stressed");
  return translate("risk");
}

function markerRadius(entity, sp) {
  const base = sp.category === "predator" ? 5.7 : sp.category === "omnivore" ? 4.5 : 4.8;
  const group = clamp(Math.log(entity.groupSize + 1) / 4, 0, 2.3);
  if (sp.id === "elephant" || sp.id === "giraffe" || sp.id === "hippo") return base + 3.4;
  return base + group;
}

function curvePath(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const midX = x1 + dx * 0.5 - dy * 0.12;
  const midY = y1 + dy * 0.5 + dx * 0.12;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${midX.toFixed(1)} ${midY.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function distanceToRiver(x, y) {
  let best = Infinity;
  for (let i = 1; i < riverPoints.length; i += 1) {
    best = Math.min(best, distancePointToSegment(x, y, riverPoints[i - 1], riverPoints[i]));
  }
  return best;
}

function distancePointToSegment(x, y, a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lengthSq = dx * dx + dy * dy || 1;
  const t = clamp(((x - a.x) * dx + (y - a.y) * dy) / lengthSq, 0, 1);
  const px = a.x + t * dx;
  const py = a.y + t * dy;
  return Math.hypot(x - px, y - py);
}

function cubicPoint(p0, p1, p2, p3, t) {
  const mt = 1 - t;
  return {
    x: mt ** 3 * p0.x + 3 * mt ** 2 * t * p1.x + 3 * mt * t ** 2 * p2.x + t ** 3 * p3.x,
    y: mt ** 3 * p0.y + 3 * mt ** 2 * t * p1.y + 3 * mt * t ** 2 * p2.y + t ** 3 * p3.y,
  };
}

function unitVector(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const mag = Math.hypot(dx, dy) || 1;
  return { x: dx / mag, y: dy / mag };
}

function getNairobiHour() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Nairobi",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const hour = Number(parts.find((part) => part.type === "hour")?.value || 0);
  return hour === 24 ? 0 : hour;
}

function svgEl(name, attrs = {}) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", name);
  for (const [key, value] of Object.entries(attrs)) {
    if (value !== undefined && value !== null) node.setAttribute(key, value);
  }
  return node;
}

function randomRange(min, max) {
  return min + (max - min) * rng();
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function mulberry32(seed) {
  return function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
