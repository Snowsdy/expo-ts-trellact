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
import { ProjectType } from "../types/ProjectType";

const PROJECT_PATH = "project";

export async function addProject(
  projectList: ProjectType
): Promise<ProjectType | null> {
  try {
    const docRef = await addDoc(collection(db, PROJECT_PATH), {
      color: projectList.color,
      title: projectList.title,
      userId: projectList.userId,
    });
    let project: ProjectType = projectList;
    project.id = docRef.id;

    return project;
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  return null;
}

export async function getProjectsByUserId(
  userId: string
): Promise<ProjectType[]> {
  const projectRef = collection(db, PROJECT_PATH);
  const q = query(projectRef, where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  let projects: ProjectType[] = [];
  querySnapshot.forEach((projectDoc) => {
    projects.push({
      id: projectDoc.id,
      color: projectDoc.get("color") as string | undefined,
      title: projectDoc.get("title") as string,
      userId: projectDoc.get("userId") as string,
    });
  });

  return projects;
}

export async function updateProject(project: ProjectType): Promise<void> {
  const projectRef = doc(db, PROJECT_PATH, project.id ? project.id : "");
  return await runTransaction(db, async (transaction) => {
    return await transaction.get(projectRef).then((data) => {
      if (!data.exists) {
        throw "Document does not exists !";
      }

      transaction.update(projectRef, project);
    });
  });
}

export async function deleteProject(id: string): Promise<void> {
  await deleteDoc(doc(db, PROJECT_PATH, id));
}
