import Unit1 from "./unit-1";
import Unit2 from "./unit-2";

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
