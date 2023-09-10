import { getAllAddress, getTarifs } from "$lib/db";

export async function load({ params, locals }) {
  const { addressID } = params;
  //@ts-ignore
  let tarifs = await getTarifs(locals.user.uid, addressID);

  if (!tarifs) {
    return { tarifs: null };
  }

  console.log("load tarif running");
  return {
    tarifs,
  };
}
