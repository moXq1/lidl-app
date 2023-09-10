import { auth } from "$lib/admin";
import { getAllAddress } from "$lib/db";
import { redirect } from "@sveltejs/kit";

export async function load({ cookies, locals }) {
  try {
    // @ts-ignore
    const user = locals.user;
    // if (!user) {

    //   throw redirect(307, "/auth");
    // }

    console.log(user.uid);
    let data;

    let addresses = await getAllAddress(user.uid);
    console.log(addresses);

    if (!addresses) {
      return { addresses: null, uid: user?.uid };
    }

    const res = [];
    for (let [key, value] of Object.entries(addresses)) {
      res.push(value);
    }

    data = {
      addresses: res,
      uid: user?.uid,
    };
    console.log("load running");
    return data;
  } catch (err) {
    console.log("kek");
    // cookies.set("token", "", { maxAge: -1 });
    // throw redirect(307, "/auth");
  }
}
