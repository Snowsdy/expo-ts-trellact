import { Card } from "@rneui/base";
import { CardDivider } from "@rneui/base/dist/Card/Card.Divider";
import React, { useState } from "react";
import { Text, View, Image, useColorScheme, Keyboard } from "react-native";
import { TaskStyle } from "../constants/Task";
import { TaskType } from "../types/TaskType";
import { Button, Input } from "@rneui/themed";
import { deleteTask, updateTask } from "../api/tasks";
import CustomOverlay from "./Overlay";
import Colors from "../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

const Task: React.FC<TaskType> = ({
  id,
  title,
  images,
  description,
  color,
  tasklistId,
}) => {
  if (images == undefined) {
    return;
  }

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
          setImagesEdit(uris);
        }
      }
    });
  };

  const colorScheme = useColorScheme();
  const [taskEditOverlay, setTaskEditOverlay] = useState<boolean>(false);
  const [descriptionEdit, setDescriptionEdit] = useState<string>(description);
  const [colorName, setColorName] = useState<string>(color ? color : "");
  const [taskName, setTaskName] = useState<string>(title);
  const [imagesEdit, setImagesEdit] = useState<string[]>(images);
  const taskId = id ? id : "";
  const colorTask = color ? color : "#999";
  return (
    <>
      <Card
        containerStyle={[{ backgroundColor: colorTask }, TaskStyle.container]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 5,
          }}>
          <Card.Title style={TaskStyle.titleTask}>{title}</Card.Title>
          <Button
            onPress={() => {
              deleteTask(taskId).then(() => {
                alert("Task deleted Back to home.");
                router.push("/home/");
              });
            }}
            icon={{
              name: "trash",
              type: "font-awesome",
              size: 15,
              color: "#fff",
            }}
            accessibilityLabel="Learn more about this purple button"
            color="red"
          />
          <Button
            onPress={() => {
              setTaskEditOverlay(!taskEditOverlay);
            }}
            icon={{
              name: "pencil",
              type: "font-awesome",
              size: 15,
              color: "#fff",
            }}
            accessibilityLabel="Learn more about this purple button"
            color="orange"
          />
        </View>
        <CardDivider></CardDivider>
        <View>
          <Text style={TaskStyle.descriptionTitleTask}>
            Description de la tâche :
          </Text>
          <Text style={TaskStyle.descriptionTask}>{description}</Text>
          <Text style={TaskStyle.descriptionTitleTask}>
            Image de description :
          </Text>
          <Image source={{ uri: images[0], width: 200, height: 200 }} />
        </View>
      </Card>
      <CustomOverlay
        overlayStyle={{ width: "60%" }}
        isVisible={taskEditOverlay}
        onBackdropPress={() => {
          setTaskEditOverlay(!taskEditOverlay);
          setColorName("");
          setTaskName("");
          setImagesEdit([]);
          setDescriptionEdit("");
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
            value={descriptionEdit}
            onChangeText={setDescriptionEdit}
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
                id: id,
                title: taskName,
                color: colorName,
                description: descriptionEdit,
                images: imagesEdit.length > 0 ? imagesEdit : images,
                tasklistId: tasklistId,
              }).then(() => setTaskEditOverlay(!taskEditOverlay));
            }}>
            Update Task
          </Button>
        </View>
      </CustomOverlay>
    </>
  );
};

export default Task;
