// place files you want to import through the `$lib` alias in this folder.
import { initializeApp, getApps, getApp, deleteApp } from "firebase/app";
import { Timestamp } from "firebase/firestore";

import {
  Database,
  getDatabase,
  ref,
  set,
  onValue,
  update,
  remove,
  get,
} from "firebase/database";

import { getAuth } from "firebase/auth";

import {
  PUBLIC_API_KEY,
  PUBLIC_AUTH_DOMAIN,
  PUBLIC_DATABASE_URL,
  PUBLIC_PROJECT_ID,
  PUBLIC_STORAGE_BUCKET,
  PUBLIC_MESSAGING_SENDER_ID,
  PUBLIC_APP_ID,
} from "$env/static/public";

const firebaseConfig = {
  apiKey: PUBLIC_API_KEY,
  authDomain: PUBLIC_AUTH_DOMAIN,
  databaseURL: PUBLIC_DATABASE_URL,
  projectId: PUBLIC_PROJECT_ID,
  storageBucket: PUBLIC_STORAGE_BUCKET,
  messagingSenderId: PUBLIC_MESSAGING_SENDER_ID,
  appId: PUBLIC_APP_ID,
};

// let app: FirebaseApp | undefined;
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
  deleteApp(app);
  app = initializeApp(firebaseConfig);
}

console.log("app");

export const auth = getAuth(app);

// export async function signup(email: string, password: string) {
//   await createUserWithEmailAndPassword(auth, email, password);
// }
// export async function logout() {
//   await signOut(auth);
// }

export const database = getDatabase(app);

export async function getAllAddress(uid: string) {
  const reference = ref(database, "address/" + uid);
  try {
    // const snapshot = await get(reference);
    // if (snapshot.exists()) {
    //   const data = snapshot.val();
    //   console.log(data);
    //   return data;
    // } else {
    //   // Handle the case where the data doesn't exist
    //   return null;
    // }
    let data;
    data = await get(reference);
    return data.val();
  } catch (err) {
    console.log(err);
  }
}

export async function createAddress(data: Address) {
  // console.log(app);

  const reference = ref(database, "/address/" + data.userID + "/" + data.id);

  try {
    await set(reference, data);
    return data;
  } catch (e) {
    return e;
  }
}

export async function updateAddress(data: Address) {
  const reference = ref(database, "/address/" + data.userID + "/" + data.id);

  try {
    await update(reference, data);
    return data;
  } catch (e) {
    return e;
  }
}

export async function deleteAddress(userID: string, id: string) {
  const reference = ref(database, `/address/${userID}/${id}`);
  const tarifReference = ref(database, `/tarif/${userID}/${id}`);
  try {
    await remove(reference);
    await remove(tarifReference);
  } catch (e: any) {
    throw new Error(e);
  }
}

export async function getTarifs(userID: string, id: string) {
  const reference = ref(database, "/tarif/" + userID + "/" + id);
  let data;
  const arr: Tarif[] = [];
  await onValue(reference, (snapshot) => {
    data = snapshot.val();

    if (!data) {
      return [];
    }
    for (let [key, value] of Object.entries(data)) {
      arr.push(value as Tarif);
    }

    if (arr.length < 0) {
      return [];
    }

    data = arr.sort((a: any, b: any) => {
      return a.createdAt.seconds > b.createdAt.seconds ? -1 : 1;
    });
  });
  return data;
}

export async function createTarif(data: Tarif) {
  const reference = ref(
    database,
    `/tarif/${data.userID}/${data.addressID}/${data.id}`
  );

  try {
    const newData = { ...data, createdAt: Timestamp.fromDate(new Date()) };
    await set(reference, newData);
    return newData;
  } catch (e) {
    console.log("error");
    return null;
  }
}

export async function updateTarif(data: Tarif) {
  const reference = ref(
    database,
    `/tarif/${data.userID}/${data.addressID}/${data.id}`
  );

  try {
    await update(reference, data);
    return data;
  } catch (e) {
    return e;
  }
}

export async function deleteTarif(
  userID: string,
  addressID: string,
  id: string
) {
  console.log(addressID, id);
  const reference = ref(database, `/tarif/${userID}/${addressID}/${id}`);

  await remove(reference);
}
