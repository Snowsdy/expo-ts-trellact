/**
 * @brief this is the page for creating a new project, it is a form page
 * @note this page was created by Copilot to save time, had to fix three issues, all else is AI generated
 */

import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import { addTasksList } from "../api/taskslist";
import { TaskListType } from "../types/TaskListType";
import { TaskType } from "../types/TaskType";
import Task from "../components/Task";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

export function CreateProject() {
  const colorScheme = useColorScheme();
  const [taskList, setTaskList] = useState<TaskListType>({
    id: "",
    title: "",
    color: undefined,
    projectId: "",
  });
  const [taskTitle, setTaskTitle] = useState<string>("");

  function addTask() {
    //TODO
  }

  function createProject() {
    router.push("/project/bovCjDkFuFhDKU0gtqvZ");
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}>
      <View style={styles.container}>
        <Text style={styles.title}>Create a new project</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTaskTitle}
          value={taskTitle}
          placeholder="Enter a task title"
        />
        <Button title="Create project" onPress={createProject} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 20,
  },
});
