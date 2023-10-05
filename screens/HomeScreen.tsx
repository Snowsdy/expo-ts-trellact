import React, { useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TasksList from "../components/TasksList";
import Colors from "../constants/Colors";
import { TaskListType } from "../types/TaskListType";
import { getProjectsByUserId } from "../api/projectslist";
import { getTaskListsByProjectId } from "../api/taskslist";
import { getTasksByTasklistId } from "../api/tasks";

export const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const [tasksList, setTasksList] = useState<TaskListType>({
    id: "",
    title: "",
    color: undefined,
    projectId: "",
  });

  useEffect(() => {
    getProjectsByUserId("Ge6VPweQRhgCwLit6ZrgCuPe5K53").then((projects) => {
      projects.forEach((project) => {
        getTaskListsByProjectId(project.id ? project.id : "").then(
          (taskslists) => {
            taskslists.forEach((taskslist) => {
              setTasksList(taskslist);
            });
          }
        );
      });
    });
  }, []);

  return (
    tasksList.id && (
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
