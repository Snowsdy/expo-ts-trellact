import { Button, Input } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { addTasksList } from "../api/taskslist";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { TaskListType } from "../types/TaskListType";

type ReactSetter = React.Dispatch<React.SetStateAction<string>>;

function onCreateTasklist(
  projectId: string,
  color: string,
  name: string,
  setNameErr: ReactSetter,
  setColorErr: ReactSetter
): void {
  if (name.length === 0) {
    setNameErr("Veuillez remplir ce champ.");
  }
  if (color.length === 0) {
    setColorErr("Veuillez remplir ce champ.");
  }
  if (color.length === 0 || name.length === 0) {
    return;
  }

  const tasklist: TaskListType = {
    id: undefined,
    color: color,
    title: name,
    projectId: projectId,
  };

  addTasksList(tasklist).then((addedTasklist) => {
    if (addedTasklist != null) {
      alert("Tasklist added.");
    }
  });
}

const CreateTaskslist: React.FC<{ projectId: string }> = ({ projectId }) => {
  const colorScheme = useColorScheme();
  const [tasklistName, setTasklistName] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [tasklistErr, setTasklistErr] = useState<string>("");
  const [colorErr, setColorErr] = useState<string>("");

  return (
    projectId != "" && (
      <View style={styles.container}>
        <Text style={styles.title}>Create a New Taskslist</Text>
        <View
          style={[
            styles.card,
            { borderColor: Colors[colorScheme ?? "light"].text },
          ]}>
          <Text>Name :</Text>
          <Input
            value={tasklistName}
            onChangeText={setTasklistName}
            inputStyle={{
              color: Colors[colorScheme ?? "light"].text,
            }}
            errorMessage={tasklistErr}
          />
          <Text>Color :</Text>
          <Input
            value={color}
            onChangeText={setColor}
            containerStyle={{ marginBottom: 8 }}
            inputStyle={{
              color: Colors[colorScheme ?? "light"].text,
            }}
            errorMessage={colorErr}
          />
          <Button
            radius={"sm"}
            type="solid"
            onPress={() => {
              onCreateTasklist(
                projectId,
                color,
                tasklistName,
                setTasklistErr,
                setColorErr
              );
            }}>
            Create New Tasklist
          </Button>
        </View>
      </View>
    )
  );
};

export default CreateTaskslist;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    borderRadius: 16,
    padding: 8,
    borderWidth: 3,
  },
});
