/**
 * @brief This is the page to view the tasks in a project,
 * this is where you can see and interact with each tasks
 * @note when you enter this page, only the id is passed as param in the router
 * ! WORK IN PROGRESS : this page is not usable yet
 */

import React, { useState, useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity, View, ScrollView, Alert, Button } from "react-native";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import { useAuth } from "../hooks/useAuth";
import { router } from "expo-router";
import { getTaskListsByProjectId } from "../api/taskslist";
import { addTask, getTasksByTasklistId, updateTask, deleteTask } from "../api/tasks";
import { useNavigation } from "@react-navigation/native";
import { TaskType } from "../types/TaskType";
import { TaskListType } from "../types/TaskListType";
import { BadgeType } from "../types/BadgeType";
import Task from "../components/Task";
import TasksList from "../components/TasksList";



export default function Project() {
  const user = useAuth().user;
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const [tasklists, setTasklists] = useState<TaskListType[]>([]);
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [badge, setBadge] = useState<BadgeType[]>([]);

  useEffect(() => {
    getTaskListsByProjectId(router.getParam("id")).then((tasklist) => setTasklists(tasklist));
  }, []);

  useEffect(() => {
    getTasksByTasklistId(tasklists[0]?.id ? tasklists[0].id : "").then((tasklist) => setTasks(tasklist));
  }, [tasklists]);

  useEffect(() => {
    setBadge([
      {
        value: tasks.filter((task) => task.status === "todo").length,
        color: "rgba(90, 154, 230, 1)",
        title: "Todo",
      },
      {
        value: tasks.filter((task) => task.status === "inprogress").length,
        color: "rgba(255, 195, 0, 1)",
        title: "In Progress",
      },
      {
        value: tasks.filter((task) => task.status === "done").length,
        color: "rgba(0, 255, 0, 1)",
        title: "Done",
      },
    ]);
  }, [tasks]);

  return (
    <SafeAreaView style={ProjectStyle.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={ProjectStyle.title}>{router.getParam("title")}</Text>
          <Button
            title="Add Tasklist"
            onPress={() => {
              navigation.navigate("AddTasklist", { id: router.getParam("id") });
            }}
          />
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {tasklists.map((tasklist) => (
            <TasksList key={tasklist.id} {...tasklist} />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}



const ProjectStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.light.text,
  },
});
