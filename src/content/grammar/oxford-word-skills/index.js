import Unit1 from "./unit-1";

const UNITS = {
  "unit-1": Unit1,
};

export function getUnit(unitId) {
  return UNITS[unitId] || null;
}

export function getAllUnitIds() {
  return Object.keys(UNITS);
}
