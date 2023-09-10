import { json } from "@sveltejs/kit";
import { database, createAddress, updateAddress, deleteAddress } from "$lib/db";

export async function POST({ request, locals }) {
  const {
    name,
    gasPrice,
    waterPrice,
    electricityPrice,
    heating,
    internet,
    intercom,
    gasRaspred,
    abonplata,
    garbage,
    kvartplata,
  } = await request.json();
  let uuid = crypto.randomUUID();

  console.log(locals.user.uid);

  const data = await createAddress({
    id: uuid,
    userID: locals.user.uid,
    name,
    gasPrice,
    waterPrice,
    electricityPrice,
    heating,
    internet,
    intercom,
    gasRaspred,
    abonplata,
    garbage,
    kvartplata,
  });

  return json(data, { status: 201 });
}

export async function PUT({ request, locals }) {
  const {
    id,
    name,
    gasPrice,
    waterPrice,
    electricityPrice,
    heating,
    internet,
    intercom,
    gasRaspred,
    abonplata,
    garbage,
    kvartplata,
  } = await request.json();

  const data = await updateAddress({
    id,
    userID: locals.user.uid,
    name,
    gasPrice,
    waterPrice,
    electricityPrice,
    heating,
    internet,
    intercom,

    gasRaspred,
    abonplata,
    garbage,
    kvartplata,
  });

  console.log(data);

  return json(data, { status: 201 });
}

export async function DELETE({ request, locals }) {
  const { id } = await request.json();

  try {
    await deleteAddress(locals.user.uid, id);
  } catch (e: any) {
    throw new Error(e);
  }

  return json(true, { status: 201 });
}
