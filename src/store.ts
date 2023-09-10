import { writable } from "svelte/store";

const initialData = {
  id: "",
  name: "",
  gasPrice: 0,
  waterPrice: 0,
  electricityPrice: 0,
  heating: 0,
  internet: 0,
  intercom: 0,
  gasRaspred: 0,
  abonplata: 0,
  garbage: 0,
  kvartplata: 0,
};

const { subscribe, set, update } = writable(initialData);

export const addressData = {
  subscribe,
  set,
  update,
  updateStoreAddressData: (data: Address) => set(data),
  reset: () => set(initialData),
};
