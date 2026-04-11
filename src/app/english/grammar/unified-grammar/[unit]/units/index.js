import Unit1 from "./unit-1";
import Unit2 from "./unit-2";

// ─── Registry ─────────────────────────────────────────────────────────────────
// To add a new unit:
// 1. Create units/unit-N.jsx with TopicContent, PracticeContent, meta, and tocItems exports
// 2. Import it here
// 3. Add entry to UNITS below

const UNITS = {
  "unit-1": Unit1,
  "unit-2": Unit2,
};

export function getUnit(unitId) {
  return UNITS[unitId] || null;
}

export function getAllUnitIds() {
  return Object.keys(UNITS);
}
