import { toTitleCase } from "@/lib/utils";

export const PRODUCT_GENDERS = [
  { value: "MALE", label: "For Men" },
  { value: "FEMALE", label: "For Women" },
  { value: "UNISEX", label: "Unisex" },
];

export const PRODUCT_CONCENTRATIONS = [
  { value: "EDC", label: "Eau de Cologne (EDC)" },
  { value: "EDT", label: "Eau de Toilette (EDT)" },
  { value: "EDP", label: "Eau de Parfum (EDP)" },
  { value: "PARFUM", label: "Parfum" },
];

export const PRODUCT_FILTER_CONFIG = {
  gender: {
    allowedValues: ["MALE", "FEMALE", "UNISEX"],
    displayComputed: (val: string) =>
      PRODUCT_GENDERS.find((o) => o.value === val)?.label || val,
  },
  concentration: {
    allowedValues: ["EDC", "EDT", "EDP", "PARFUM"],
    displayComputed: (val: string) => val,
  },
  isLimited: {
    allowedValues: ["true"],
    displayComputed: (val: string) => (val === "true" ? "Limited Edition" : val),
  },
  brand: {
    allowedValues: ["*"],
    displayComputed: (val: string) => `Brand: ${toTitleCase(val.replace("-", " "))}`,
  },
  search: {
    allowedValues: ["*"],
    displayComputed: (val: string) => `Search: ${val}`,
  },
};
