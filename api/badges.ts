import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  runTransaction,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { BadgeType } from "../types/BadgeType";

const BADGES_PATH = "badges";

export async function addBadge(badge: BadgeType): Promise<BadgeType | null> {
  try {
    const docRef = await addDoc(collection(db, BADGES_PATH), {
      title: badge.title,
      color: badge.color,
      taskId: badge.id,
    });
    let addedBadge: BadgeType = badge;
    addedBadge.id = docRef.id;

    return addedBadge;
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return null;
}

export async function getBadgesByTaskId(taskId: string): Promise<BadgeType[]> {
  const collectionRef = collection(db, BADGES_PATH);
  const q = query(collectionRef, where("taskId", "==", taskId));
  const querySnapshot = await getDocs(q);
  let badges: BadgeType[] = [];
  querySnapshot.forEach((docRef) => {
    badges.push({
      id: docRef.id,
      color: docRef.get("color") as string | undefined,
      taskId: docRef.get("taskId") as string,
      title: docRef.get("title") as string,
    });
  });

  return badges;
}

export async function updateBadge(badge: BadgeType) {
  const badgeRef = doc(db, BADGES_PATH, badge.id ? badge.id : "");
  return await runTransaction(db, async (transaction) => {
    let data = await transaction.get(badgeRef);

    if (!data.exists) {
      throw "Document does not exists !";
    }

    transaction.update(badgeRef, badge);
  });
}

export async function deleteBadge(id: string) {
  await deleteDoc(doc(db, BADGES_PATH, id));
}
