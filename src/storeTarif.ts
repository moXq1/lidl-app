import { writable } from "svelte/store";

const initaialTarif = {
  id: "",
  createdAt: "",
  addressID: "",
  prevGas: 0,
  currGas: 0,
  distinctionGas: 0,
  totalGas: 0,
  prevWater: 0,
  currWater: 0,
  distinctionWater: 0,
  totalWater: 0,
  prevElec: 0,
  currElec: 0,
  distinctionElec: 0,
  totalElec: 0,
  total: 0,
};

const { subscribe, set, update } = writable(initaialTarif);

export const tarifData = {
  subscribe,
  set,
  update,
  updateStoreTarifData: (data: Tarif) => set(data),
  reset: () => set(initaialTarif),
};
