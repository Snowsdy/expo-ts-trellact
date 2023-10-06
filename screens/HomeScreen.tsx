import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getProjectsByUserId } from "../api/projectslist";
import { getTaskListsByProjectId } from "../api/taskslist";
import TasksList from "../components/TasksList";
import Colors from "../constants/Colors";
import { ProjectType } from "../types/ProjectType";
import { TaskListType } from "../types/TaskListType";

export const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const [tasksList, setTasksList] = useState<TaskListType>();

  const getTasklist = async () => {
    const projects: ProjectType[] = await getProjectsByUserId(
      "Ge6VPweQRhgCwLit6ZrgCuPe5K53"
    );
    projects.forEach(async (project) => {
      const taskslists = await getTaskListsByProjectId(
        project.id ? project.id : ""
      );
      setTasksList(taskslists[0]);
    });
  };

  useEffect(() => {
    if (tasksList == undefined) {
      getTasklist();
    }

    return setTasksList(undefined);
  }, []);

  return (
    tasksList && (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors[colorScheme ?? "light"].background,
        }}>
        <TasksList {...tasksList} />
      </SafeAreaView>
    )
  );
};
