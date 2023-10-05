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
    const docRef = await addDoc(collection(db, "badges"), {
      title: task.title,
      color: task.color,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getBadges() {
  const querySnapshot = await getDocs(collection(db, "badges"));
  let badges: BadgeType[] = [];
  querySnapshot.forEach((doc) => {
    let badge: BadgeType = {
      id: doc.id,
      title: doc.get("title") as string,
      color: doc.get("color") as string,
    };
    badges.push(badge);
  });

  return {
    badges,
  };
}

export async function getBadgeById(id: string) {
  const badgeRef = doc(db, "badges", id);
  const querySnapshot = await getDoc(badgeRef);
  const badge: BadgeType = {
    id: querySnapshot.id,
    color: querySnapshot.get("color") as string,
    title: querySnapshot.get("title") as string,
  };

  return badge;
}

export async function updateBadge(badge: BadgeType) {
  const badgeRef = doc(db, "badges", badge.id ? badge.id : "");
  return await runTransaction(db, async (transaction) => {
    let data = await transaction.get(badgeRef)
    
    if (!data.exists) {
      throw "Document does not exists !";
    }

    transaction.update(badgeRef, badge);
  });
}

export async function deleteBadge(id: string) {
  await deleteDoc(doc(db, "badges", id));
}
