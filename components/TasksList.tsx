import { Button, Input } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { FlatList, Keyboard, StyleSheet, useColorScheme } from "react-native";
import { addTask, getTasksByTasklistId, updateTask } from "../api/tasks";
import Colors from "../constants/Colors";
import { TaskListType } from "../types/TaskListType";
import { TaskType } from "../types/TaskType";
import CustomOverlay from "./Overlay";
import Task from "./Task";
import { Text, View } from "./Themed";
import { updateTaskList } from "../api/taskslist";

function addNewTask(
  tasklistId: string,
  name: string,
  color: string,
  description: string,
  images: string[]
) {
  const newTask: TaskType = {
    id: undefined,
    color: color,
    description: description,
    images: images,
    tasklistId: tasklistId,
    title: name,
  };

  addTask(newTask).then((addedTask) => {
    if (addedTask != null) {
      alert("New Task added !");
    }
  });
}

const TasksList: React.FC<Pick<TaskListType, "id" | "title" | "color">> = ({
  id,
  title,
  color,
}) => {
  const colorScheme = useColorScheme();
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [taskOverlay, setTaskOverlay] = useState<boolean>(false);
  const [taskName, setTaskName] = useState<string>("");
  const [taskEditOverlay, setTaskEditOverlay] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [colorName, setColorName] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    ImagePicker.requestMediaLibraryPermissionsAsync().then(async (value) => {
      if (value.granted) {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          let uris: string[] = [];
          result.assets.forEach((asset) => {
            uris.push(asset.uri);
          });
          setImages(uris);
        }
      }
    });
  };

  useEffect(() => {
    getTasksByTasklistId(id ? id : "").then((tasklist) => setTasks(tasklist));
  }, []);

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

      <CustomOverlay
        overlayStyle={{ width: "60%" }}
        isVisible={taskOverlay}
        onBackdropPress={() => {
          setTaskOverlay(!taskOverlay);
          setColorName("");
          setTaskName("");
          setImages([]);
        }}>
        <View style={{ backgroundColor: Colors[colorScheme ?? "light"].text }}>
          <Input
            value={taskName}
            onChangeText={setTaskName}
            containerStyle={{
              paddingHorizontal: 0,
              width: "auto",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 8,
            }}
            inputStyle={{
              color: Colors[colorScheme ?? "light"].background,
            }}
            label={"Name"}
            placeholder="My Task"
          />
          <Input
            value={colorName}
            onChangeText={setColorName}
            containerStyle={{
              paddingHorizontal: 0,
              width: "auto",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 8,
            }}
            inputStyle={{
              color: Colors[colorScheme ?? "light"].background,
            }}
            label={"Color"}
            placeholder="#6F44D3"
          />
          <Input
            value={description}
            onChangeText={setDescription}
            containerStyle={{
              paddingHorizontal: 0,
              width: "auto",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 16,
            }}
            inputStyle={{
              color: Colors[colorScheme ?? "light"].background,
            }}
            label={"Description"}
            allowFontScaling
            multiline
            placeholder="A little description to describe your task."
          />
          <Button
            title="Pick an image from camera roll"
            buttonStyle={{ marginBottom: 8, borderRadius: 4 }}
            onPress={pickImage}
          />
          {images.length > 0 && (
            <Text style={{ color: "black", marginBottom: 8 }}>
              Image selected
            </Text>
          )}
          <Button
            radius={"sm"}
            type="solid"
            onPress={() => {
              Keyboard.dismiss();
              addNewTask(
                id ? id : "",
                taskName,
                colorName,
                description,
                images
              );
              setTaskOverlay(!taskOverlay);
            }}>
            Add New Task
          </Button>
        </View>
      </CustomOverlay>

      <CustomOverlay
        overlayStyle={{ width: "60%" }}
        isVisible={taskEditOverlay}
        onBackdropPress={() => {
          setTaskEditOverlay(!taskEditOverlay);
          setColorName("");
          setTaskName("");
          setImages([]);
        }}>
        <View style={{ backgroundColor: Colors[colorScheme ?? "light"].text }}>
          <Input
            value={taskName}
            onChangeText={setTaskName}
            containerStyle={{
              paddingHorizontal: 0,
              width: "auto",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 8,
            }}
            inputStyle={{
              color: Colors[colorScheme ?? "light"].background,
            }}
            label={"Name"}
            placeholder="My Task"
          />
          <Input
            value={colorName}
            onChangeText={setColorName}
            containerStyle={{
              paddingHorizontal: 0,
              width: "auto",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 8,
            }}
            inputStyle={{
              color: Colors[colorScheme ?? "light"].background,
            }}
            label={"Color"}
            placeholder="#6F44D3"
          />
          <Input
            value={description}
            onChangeText={setDescription}
            containerStyle={{
              paddingHorizontal: 0,
              width: "auto",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 16,
            }}
            inputStyle={{
              color: Colors[colorScheme ?? "light"].background,
            }}
            label={"Description"}
            allowFontScaling
            multiline
            placeholder="A little description to describe your task."
          />
          <Button
            title="Pick an image from camera roll"
            buttonStyle={{ marginBottom: 8, borderRadius: 4 }}
            onPress={pickImage}
          />
          {images.length > 0 && (
            <Text style={{ color: "black", marginBottom: 8 }}>
              Image selected
            </Text>
          )}
          <Button
            radius={"sm"}
            type="solid"
            onPress={() => {
              Keyboard.dismiss();
              updateTask({
                id: undefined,
                title: taskName,
                color: colorName,
                description: description,
                images: images,
                tasklistId: id ? id : "",
              });
              setTaskEditOverlay(!taskEditOverlay);
            }}>
            Add New Task
          </Button>
        </View>
      </CustomOverlay>
    </>
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
