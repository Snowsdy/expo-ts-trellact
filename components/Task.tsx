import { Card } from "@rneui/base";
import { CardDivider } from "@rneui/base/dist/Card/Card.Divider";
import React from "react";
import { Text, View, Image } from "react-native";
import { TaskStyle } from "../constants/Task";
import { TaskType } from "../types/TaskType";
import { Button } from "@rneui/themed";
import { deleteTask } from "../api/tasks";

const Task: React.FC<TaskType> = ({
  id,
  title,
  images,
  description,
  color,
}) => {
  if (images == undefined) {
    return;
  }
  const taskId = id ? id : "";
  const colorTask = color ? color : "#999";
  return (
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
          onLongPress={() => {
            deleteTask(taskId);
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
  );
};

export default Task;
