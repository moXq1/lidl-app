import { json } from "@sveltejs/kit";
import { createTarif, deleteTarif, updateTarif } from "$lib/db.js";

export async function POST({ params, request, locals }) {
  const {
    prevGas,
    currGas,
    distinctionGas,
    totalGas,
    prevWater,
    currWater,
    distinctionWater,
    totalWater,
    prevElec,
    currElec,
    distinctionElec,
    totalElec,

    total,
  } = await request.json();
  let uuid = crypto.randomUUID();

  const data = createTarif({
    id: uuid,
    addressID: params.slug,
    userID: locals.user.uid,
    prevGas,
    currGas,
    distinctionGas,
    totalGas,
    prevWater,
    currWater,
    distinctionWater,
    totalWater,
    prevElec,
    currElec,
    distinctionElec,
    totalElec,
    total,
  });

  return json(data, { status: 201 });
}

export async function PUT({ request, locals }) {
  const {
    prevGas,
    currGas,
    distinctionGas,
    totalGas,
    prevWater,
    currWater,
    distinctionWater,
    totalWater,
    prevElec,
    currElec,
    distinctionElec,
    totalElec,
    addressID,
    createdAt,
    id,
    total,
  } = await request.json();

  const data = await updateTarif({
    createdAt,
    userID: locals.user.uid,
    prevGas,
    currGas,
    distinctionGas,
    totalGas,
    prevWater,
    currWater,
    distinctionWater,
    totalWater,
    prevElec,
    currElec,
    distinctionElec,
    totalElec,
    addressID,
    id,
    total,
  });

  return json(data, { status: 201 });
}

export async function DELETE({ params, request, locals }) {
  const addressID = params.slug;
  const { id } = await request.json();

  try {
    await deleteTarif(locals.user.uid, addressID, id);
  } catch (e) {
    throw new Error("failed to delete tarif");
  }

  return json(true, { status: 201 });
}
