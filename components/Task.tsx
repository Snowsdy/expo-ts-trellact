import { Card } from "@rneui/base";
import { CardDivider } from "@rneui/base/dist/Card/Card.Divider";
import React from "react";
import { Button, Text, View } from "react-native";
import { deleteTask } from "../api/tasks";
import { TaskStyle } from "../constants/Task";
import { TaskType } from "../types/TaskType";

const Task: React.FC<TaskType> = ({
  id,
  title,
  images,
  description,
  color,
  badges,
}) => {
  const taskId = id ? id : "";
  return (
    <Card containerStyle={[{ backgroundColor: color }, TaskStyle.container]}>
      <Button
        onPress={() => deleteTask(taskId)}
        title="Learn More"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Card.Title style={TaskStyle.titleTask}>{title}</Card.Title>
      <CardDivider></CardDivider>
      <View>
        <Text style={TaskStyle.descriptionTitleTask}>
          Description de la tâche :
        </Text>
        <Text style={TaskStyle.descriptionTask}>{description}</Text>
        <Text style={TaskStyle.descriptionTitleTask}>
          Image de description :
        </Text>
      </View>
    </Card>
  );
};

export default Task;
