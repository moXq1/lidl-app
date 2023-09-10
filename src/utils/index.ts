import { addressData } from "../store";

export async function deleteAddressHandler(id: string) {
  try {
    const resp = await fetch("/address", {
      method: "DELETE",
      body: JSON.stringify({
        id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const r = await resp.json();

    return r;
  } catch (e) {
    throw new Error("failed to delete address");
  }
}

export function gotoTarifPage(
  id: string,
  data: { addresses: Address[] | null }
) {
  const address = data.addresses!.filter((add) => add.id === id);
  addressData.updateStoreAddressData(address[0]);
  localStorage.removeItem("AddressData");
  localStorage.setItem("AddressData", JSON.stringify(address[0]));
}

export function toFixed(x: number) {
  return Number(x.toFixed(2));
}
