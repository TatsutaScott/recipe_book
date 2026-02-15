const unicodeFractions = {
  "1/4": "¼",
  "1/2": "½",
  "3/4": "¾",
  "1/7": "⅐",
  "1/9": "⅑",
  "1/10": "⅒",
  "1/3": "⅓",
  "2/3": "⅔",
  "1/5": "⅕",
  "2/5": "⅖",
  "3/5": "⅗",
  "4/5": "⅘",
  "1/6": "⅙",
  "5/6": "⅚",
  "1/8": "⅛",
  "3/8": "⅜",
  "5/8": "⅝",
  "7/8": "⅞"
}

const gcd = (a, b) => (b ? gcd(b, a % b) : a)

function toFraction(decimal, maxDenominator = 16) {
  if (Number.isInteger(decimal)) return decimal.toString()

  const sign = decimal < 0 ? "-" : ""
  decimal = Math.abs(decimal)

  const whole = Math.floor(decimal)
  const frac = decimal - whole

  if (frac === 0) return sign + whole

  // Find best fraction
  let bestNumerator = 0
  let bestDenominator = 1
  let bestError = Infinity

  for (let d = 1; d <= maxDenominator; d++) {
    const n = Math.round(frac * d)
    const error = Math.abs(frac - n / d)

    if (error < bestError) {
      bestError = error
      bestNumerator = n
      bestDenominator = d
    }
  }

  // Simplify
  const g = gcd(bestNumerator, bestDenominator)

  const n = bestNumerator / g
  const d = bestDenominator / g

  // Format nicely
  if (whole === 0) return `${sign}${n}/${d}`
  return `${sign}${whole} ${n}/${d}`
}

function formatFraction(str) {
  const parts = str.split(" ")
  if (parts.length === 1) return unicodeFractions[str] || str
  return `${parts[0]}${unicodeFractions[parts[1]] || parts[1]}`
}

export function formatNumber(val){
  const fraction = toFraction(val);
  const prettyFraction = formatFraction(fraction);
  return prettyFraction;
}

export function formatTime(input) {
  if (typeof input !== "string" || !/^\d{6}$/.test(input)) {
    throw new Error("Expected a 6-digit string in the format DDHHMM.");
  }

  const rawDays = Number(input.slice(0, 2));
  const rawHours = Number(input.slice(2, 4));
  const rawMinutes = Number(input.slice(4, 6));

  // --- Normalize ---
  const totalMinutes = rawDays * 1440 + rawHours * 60 + rawMinutes;

  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;

  const units = [
    { value: days, long: "day", short: "d" },
    { value: hours, long: "hour", short: "h" },
    { value: minutes, long: "minute", short: "m" }
  ].filter(u => u.value > 0);

  // --- No time ---
  if (units.length === 0) return "0 minutes";

  // --- Single unit → natural language ---
  if (units.length === 1) {
    const u = units[0];
    return `${u.value} ${u.long}${u.value === 1 ? "" : "s"}`;
  }

  // --- Multiple units → compact ---
  return units.map(u => `${u.value}${u.short}`).join(" ");
}

export function addTimes(...inputs) {
  // Allow array input
  if (inputs.length === 1 && Array.isArray(inputs[0])) {
    inputs = inputs[0];
  }

  if (inputs.length === 0) {
    throw new Error("Provide at least one DDHHMM string.");
  }

  let totalMinutes = 0;

  for (const str of inputs) {
    if (typeof str !== "string" || !/^\d{6}$/.test(str)) {
      throw new Error(`Invalid DDHHMM string: ${str}`);
    }

    const days = Number(str.slice(0, 2));
    const hours = Number(str.slice(2, 4));
    const minutes = Number(str.slice(4, 6));

    totalMinutes += days * 1440 + hours * 60 + minutes;
  }

  // --- Normalize ---
  const outDays = Math.floor(totalMinutes / 1440);
  const outHours = Math.floor((totalMinutes % 1440) / 60);
  const outMinutes = totalMinutes % 60;

  const pad = n => String(n).padStart(2, "0");

  return `${pad(outDays)}${pad(outHours)}${pad(outMinutes)}`;
}

export function formatDate (ddmmyyyy)  {
  const day = ddmmyyyy.slice(0, 2)
  const month = ddmmyyyy.slice(2, 4)
  const year = ddmmyyyy.slice(4)

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return `${months[month - 1]} ${parseInt(day)}, ${year}`
}
