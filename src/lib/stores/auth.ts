import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import cookie from "cookie";
import { auth } from "../db";
import { browser } from "$app/environment";
import { writable } from "svelte/store";

export async function signup(email: string, password: string) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}
export async function logout() {
  await signOut(auth);
}

export async function singin(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("abs");
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}

export const user = writable<User | null>(null);

if (browser) {
  auth.onIdTokenChanged(async (newUser) => {
    const tokenCurrentlYSet =
      cookie.parse(document.cookie)["token"] !== undefined;

    const token = newUser ? await newUser.getIdToken() : undefined;

    document.cookie = cookie.serialize("token", token ?? "", {
      path: "/",
      maxAge: token ? undefined : 0,
    });

    user.set(newUser);

    if (!tokenCurrentlYSet && token) {
      document.location.reload();
    }
  });

  setInterval(async () => {
    if (auth.currentUser) {
      await auth.currentUser.getIdToken(true);
    }
  }, 10 * 60 * 1000);
}
