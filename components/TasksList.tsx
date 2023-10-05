import React, { useState, useEffect } from "react";
import { TaskListType } from "../types/TaskListType";
import { Text, View } from "./Themed";
import { StyleSheet, FlatList, useColorScheme } from "react-native";
import Task from "./Task";
import Colors from "../constants/Colors";
import { Button } from "@rneui/themed";
import { TaskType } from "../types/TaskType";
import { getTasksByTasklistId } from "../api/tasks";

const TasksList: React.FC<Pick<TaskListType, "id" | "title" | "color">> = ({
  id,
  title,
  color,
}) => {
  const colorScheme = useColorScheme();
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    getTasksByTasklistId(id ? id : "").then((tasklist) => setTasks(tasklist));
  }, []);

  return (
    <View
      style={[
        TasksListStyle.container,
        { shadowColor: Colors[colorScheme ?? "light"].shadowColor },
      ]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={TasksListStyle.title}>{title}</Text>
        <Button
          icon={{
            name: "plus",
            type: "font-awesome",
            size: 15,
            color: "white",
          }}
          iconContainerStyle={{
            padding: 0,
          }}
          buttonStyle={{
            backgroundColor: "rgba(90, 154, 230, 1)",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 8,
            height: 35,
            padding: 0,
          }}
          containerStyle={{
            padding: 0,
          }}
        />
      </View>

      <FlatList
        data={tasks}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <Task {...item} />}
        id={id}
      />
    </View>
  );
};

// * Style
const TasksListStyle = StyleSheet.create({
  container: {
    margin: 30,
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 10,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 8,
  },
  stackView: {},
  title: {
    fontSize: 28,
    textAlign: "center",
    color: "#000",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default TasksList;
