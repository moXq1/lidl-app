// export const ssr = false;
// export const csr = true;

export async function load({ parent }) {
  const { uid } = await parent();
  // console.log(uid + "keke");
  console.log(uid);
  return { uid };
}
