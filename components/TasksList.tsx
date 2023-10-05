import React from "react";
import { TaskListType } from "../types/TaskListType";
import { Text, View } from "./Themed";
import { StyleSheet, FlatList } from "react-native";
import Task from "./Task";

const TasksList: React.FC<TaskListType> = ({ id, tasks, title }) => {
  return (
    <View style={TasksListStyle.container}>
      <Text style={TasksListStyle.title}>{title}</Text>
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
  container: {},
  stackView: {},
  title: { fontSize: 28 },
});

export default TasksList;
