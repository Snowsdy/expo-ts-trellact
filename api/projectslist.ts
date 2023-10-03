import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  runTransaction,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { ProjectType } from "../types/ProjectType";
import { TaskListType } from "../types/TaskListType";

export async function addProject(projectList: ProjectType, uid: string) {
  try {
    const docRef = await addDoc(collection(db, "projectslist"), {
      color: projectList.color,
      title: projectList.title,
      tasksListIds: projectList.taskslists,
      userId: uid,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getProjects() {
  const querySnapshot = await getDocs(collection(db, "projectslist"));
  let projects: ProjectType[] = [];
  querySnapshot.forEach((doc) => {
    let project: ProjectType = {
      id: doc.id,
      color: doc.get("color") as string,
      title: doc.get("title") as string,
      taskslists: doc.get("tasksListIds") as TaskListType[],
      userId: doc.get("userId") as string,
    };
    projects.push(project);
    console.log(`${doc.id} => ${doc.data()}`);
  });

  return {
    projects,
  };
}

export async function updateProject(project: ProjectType) {
  const projectRef = doc(db, "projectlist", project.id ? project.id : "");
  return await runTransaction(db, async (transaction) => {
    return await transaction.get(projectRef).then((data) => {
      if (!data.exists) {
        throw "Document does not exists !";
      }

      transaction.update(projectRef, project);
    });
  });
}

export async function deleteProject(id: string) {
  await deleteDoc(doc(db, "projectslist", id));
}
