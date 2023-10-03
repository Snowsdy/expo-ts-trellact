import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  runTransaction,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { BadgeType } from "../types/BadgeType";
import { TaskType } from "../types/TaskType";

export async function addTask(task: TaskType) {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      title: task.title,
      images: task.images,
      description: task.description,
      color: task.color,
      badges: task.badges,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getTasks() {
  const querySnapshot = await getDocs(collection(db, "tasks"));
  let tasks: TaskType[] = [];
  querySnapshot.forEach((doc) => {
    let task: TaskType = {
      id: doc.id,
      title: doc.get("title") as string,
      images: doc.get("images") as string[],
      description: doc.get("description") as string,
      color: doc.get("color") as string,
      badges: doc.get("badges") as BadgeType[],
    };
    tasks.push(task);
    console.log(`${doc.id} => ${doc.data()}`);
  });

  return {
    tasks,
  };
}

export async function updateTask(task: TaskType) {
  const taskRef = doc(db, "tasks", task.id ? task.id : "");
  return await runTransaction(db, async (transaction) => {
    return await transaction.get(taskRef).then((data) => {
      if (!data.exists) {
        throw "Document does not exists !";
      }

      transaction.update(taskRef, task);
    });
  });
}

/// Example of How to get a collection of another collection (Task from Badge)
/* export async function getTaskByBadge(badge: BadgeType) {
  const id = badge.id as string;
  const taskRef = collection(db, "tasks");
  const q = query(taskRef, where("badges", "array-contains", id));
  const querySnapshot = await getDocs(q);
  let tasks: TaskType[] = [];
  querySnapshot.forEach((doc) => {
    let task: TaskType = {
      id: doc.id,
      title: doc.get("title") as string,
      images: doc.get("images") as string[],
      description: doc.get("description") as string,
      color: doc.get("color") as string,
      badges: doc.get("badges") as BadgeType[],
    };
    tasks.push(task);
    console.log(`${doc.id} => ${doc.data()}`);
  });

  return {
    tasks,
  };
} */

export async function deleteTask(id: string) {
  return deleteDoc(doc(db, "tasks", id));
}
