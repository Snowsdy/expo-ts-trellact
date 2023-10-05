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
import { TaskType } from "../types/TaskType";

const TASKS_PATH = "tasks";

export async function addTask(task: TaskType): Promise<TaskType | null> {
  try {
    const docRef = await addDoc(collection(db, TASKS_PATH), {
      title: task.title,
      images: task.images,
      description: task.description,
      color: task.color,
      tasklistId: task.tasklistId,
    });
    let addedTask: TaskType = task;
    addedTask.id = docRef.id;

    return addedTask;
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return null;
}

export async function getTasksByTasklistId(
  tasklistId: string
): Promise<TaskType[]> {
  const collectionRef = collection(db, TASKS_PATH);
  const q = query(collectionRef, where("tasklistId", "==", tasklistId));
  const querySnapshot = await getDocs(q);
  let tasks: TaskType[] = [];
  querySnapshot.forEach((docRef) => {
    tasks.push({
      id: docRef.id,
      color: docRef.get("color") as string | undefined,
      description: docRef.get("description") as string,
      images: docRef.get("images") as string[],
      tasklistId: docRef.get("tasklistId") as string,
      title: docRef.get("title") as string,
    });
  });

  return tasks;
}

export async function updateTask(task: TaskType): Promise<void> {
  const taskRef = doc(db, TASKS_PATH, task.id ? task.id : "");
  return await runTransaction(db, async (transaction) => {
    return await transaction.get(taskRef).then((data) => {
      if (!data.exists) {
        throw "Document does not exists !";
      }

      transaction.update(taskRef, task);
    });
  });
}

export async function deleteTask(id: string): Promise<void> {
  return deleteDoc(doc(db, TASKS_PATH, id));
}
