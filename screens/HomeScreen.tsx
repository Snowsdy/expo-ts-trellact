import React, { useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTaskListById } from "../api/taskslist";
import TasksList from "../components/TasksList";
import Colors from "../constants/Colors";
import { TaskListType } from "../types/TaskListType";

export const HomeScreen = () => {
  const colorScheme = useColorScheme();
  const [tasksList, setTasksList] = useState<TaskListType>({
    id: "",
    tasks: [],
    title: "",
  });

  useEffect(() => {
    getTaskListById("RhqfdfY9QmmmSsYOc63W").then((taskListData) => {
      setTasksList({
        id: taskListData.id,
        tasks: taskListData.tasks,
        title: taskListData.title,
      });
    });
  }, []);

  return (
    tasksList.id && (
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors[colorScheme ?? "light"].background, }}>
        <TasksList {...tasksList} />
      </SafeAreaView>
    )
  );
};
