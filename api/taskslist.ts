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
import { TaskListType } from "../types/TaskListType";
import { TaskType } from "../types/TaskType";

const TASKLIST_PATH = "tasklist";

/**
 * @param tasksList
 * @returns a promise to let the opportunity to show a notification which alert the user of the added item.
 * @nothrow
 */
export async function addTasksList(
  tasksList: TaskListType
): Promise<TaskListType | null> {
  try {
    const docRef = await addDoc(collection(db, TASKLIST_PATH), {
      title: tasksList.title,
      color: tasksList.color,
      projectId: tasksList.projectId,
    });
    let tasklist: TaskListType = tasksList;
    tasklist.id = docRef.id;

    return tasklist;
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return null;
}

export async function getTaskListsByProjectId(
  projectId: string
): Promise<TaskListType[]> {
  const collectionRef = collection(db, TASKLIST_PATH);
  const q = query(collectionRef, where("projectId", "==", projectId));
  const querySnapshot = await getDocs(q);
  let tasklists: TaskListType[] = [];
  querySnapshot.forEach((docRef) => {
    tasklists.push({
      id: docRef.id,
      color: docRef.get("color") as string | undefined,
      projectId: docRef.get("projectId") as string,
      title: docRef.get("title") as string,
    });
  });

  return tasklists;
}

/**
 * @brief update a TaskList from Firebase
 * @param {TaskType} taskslist the TaskList to update
 * @returns {Promise<void>}
 * @throws {string} if the document does not exists
 */
export async function updateTaskList(taskslist: TaskType): Promise<void> {
  const tasksListRef = doc(db, TASKLIST_PATH, taskslist.id ? taskslist.id : "");
  return await runTransaction(db, async (transaction) => {
    let data = await transaction.get(tasksListRef);

    if (!data.exists) {
      throw "Document does not exists !";
    }

    transaction.update(tasksListRef, taskslist);
  });
}

/**
 * @brief delete a TaskList from Firebase
 * @param {string} id the id of the TaskList to delete
 * @returns {Promise<void>}
 */
export async function deleteTasksList(id: string): Promise<void> {
  await deleteDoc(doc(db, TASKLIST_PATH, id));
}
