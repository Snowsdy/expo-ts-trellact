import React from "react";
import { TaskListType } from "../types/TaskListType";
import { Text, View } from "./Themed";
import { StyleSheet, FlatList, useColorScheme } from "react-native";
import Task from "./Task";
import Colors from "../constants/Colors";
import { Button } from "@rneui/themed";

const TasksList: React.FC<TaskListType> = ({ id, tasks, title }) => {
  const colorScheme = useColorScheme();
  return (
    <View style={[TasksListStyle.container,{shadowColor: Colors[colorScheme ?? "light"].shadowColor} ]}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={TasksListStyle.title}>{title}</Text>
        <View style={{flexDirection: "row", justifyContent: "space-between", gap: 5,}}>
            <Button  icon={{ name: "plus-circle", type: "font-awesome", size: 15, color: "#fff", }} accessibilityLabel="Add task" color="green"/>
            <Button  icon={{ name: "pencil", type: "font-awesome", size: 15, color: "#fff", }} accessibilityLabel="Edit task"/>
            <Button  icon={{ name: "trash", type: "font-awesome", size: 15, color: "#fff", }} accessibilityLabel="Delete task" color="red" />
        </View>
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
  title: { fontSize: 28, textAlign: "center", color: "#000", fontWeight: "bold",},
});

export default TasksList;

