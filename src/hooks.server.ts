import { auth } from "$lib/admin";
import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get("token");
  // console.log(token);
  // const l = await auth.verifyIdToken(token);
  // console.log(l);
  // return await resolve(event);
  // console.log(token);
  console.log(12);

  try {
    const user = token ? await auth.verifyIdToken(token) : null;

    if (!user) {
      if (event.url.pathname !== "/auth") {
        throw redirect(307, "/auth");
      }
    }

    event.locals.user = user;
    return await resolve(event);
  } catch (err) {
    event.cookies.set("token", "", { maxAge: -1 });
    throw redirect(307, "/auth");
  }
};
