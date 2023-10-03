import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  runTransaction,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { BadgeType } from "../types/BadgeType";

export async function addBadge(task: BadgeType) {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      title: task.title,
      color: task.color,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getBadges() {
  const querySnapshot = await getDocs(collection(db, "tasks"));
  let tasks: BadgeType[] = [];
  querySnapshot.forEach((doc) => {
    let task: BadgeType = {
      id: doc.id,
      title: doc.get("title") as string,
      color: doc.get("color") as string,
    };
    tasks.push(task);
    console.log(`${doc.id} => ${doc.data()}`);
  });

  return {
    tasks,
  };
}

export async function getBadgeById(id: string) {
  const badgeRef = doc(db, "badges", id);
  return await getDoc(badgeRef);
}

export async function updateBadge(badge: BadgeType) {
  const badgeRef = doc(db, "badges", badge.id ? badge.id : "");
  return await runTransaction(db, async (transaction) => {
    return await transaction.get(badgeRef).then((data) => {
      if (!data.exists) {
        throw "Document does not exists !";
      }

      transaction.update(badgeRef, badge);
    });
  });
}

export async function deleteBadge(id: string) {
  await deleteDoc(doc(db, "tasks", id));
}
