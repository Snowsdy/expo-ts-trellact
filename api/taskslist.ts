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
import { TaskListType } from "../types/TaskListType";
import { TaskType } from "../types/TaskType";

/**
 * @param tasksList
 * @returns a promise to let the opportunity to show a notification which alert the user of the added item.
 * @nothrow
 */
export async function addTasksList(tasksList: TaskListType) {
  try {
    const docRef = await addDoc(collection(db, "taskslist"), {
      title: tasksList.title,
      tasks: tasksList.tasks,
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

/**
 * @brief fetch all TaskLists from Firebase
 * @returns {Promise<TaskListType[]>}
 */
export async function getTasksLists() {
  const querySnapshot = await getDocs(collection(db, "taskslist"));
  let taskslists: TaskListType[] = [];
  querySnapshot.forEach((doc) => {
    let taskslist: TaskListType = {
      id: doc.id,
      title: doc.get("title") as string,
      tasks: doc.get("tasks") as TaskType[],
    };
    taskslists.push(taskslist);
  });

  return {
    taskslists,
  };
}

/**
 * @brief fetch a TaskList from Firebase using its id
 * @param {string} id the id of the TaskList to fetch
 * @returns {Promise<TaskListType>}
 */
export async function getTaskListById(id: string) {
  const taskslistRef = doc(db, "taskslist", id);
  const querySnapshot = await getDoc(taskslistRef);
  const tasksList: TaskListType = {
    id: querySnapshot.id,
    tasks: querySnapshot.get("tasks") as TaskType[],
    title: querySnapshot.get("title") as string,
  };

  return tasksList;
}

/**
 * @brief update a TaskList from Firebase
 * @param {TaskType} taskslist the TaskList to update
 * @returns {Promise<void>}
 * @throws {string} if the document does not exists
 */
export async function updateTaskList(taskslist: TaskType) {
  const tasksListRef = doc(db, "taskslist", taskslist.id ? taskslist.id : "");
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
export async function deleteTasksList(id: string) {
  await deleteDoc(doc(db, "taskslist", id));
}
