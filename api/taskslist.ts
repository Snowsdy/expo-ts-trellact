import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  runTransaction,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { TaskListType } from "../types/TaskListType";
import { TaskType } from "../types/TaskType";

export async function addTasksList(tasksList: TaskListType) {
  try {
    const docRef = await addDoc(collection(db, "taskslist"), {
      title: tasksList.title,
      tasks: tasksList.tasks,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

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
    console.log(`${doc.id} => ${doc.data()}`);
  });

  return {
    taskslists,
  };
}

export async function updateTaskList(taskslist: TaskType) {
  const tasksListRef = doc(db, "taskslist", taskslist.id ? taskslist.id : "");
  return await runTransaction(db, async (transaction) => {
    return await transaction.get(tasksListRef).then((data) => {
      if (!data.exists) {
        throw "Document does not exists !";
      }

      transaction.update(tasksListRef, taskslist);
    });
  });
}

export async function deleteTasksList(id: string) {
  await deleteDoc(doc(db, "taskslist", id));
}