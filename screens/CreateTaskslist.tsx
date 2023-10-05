import { Button, Input } from "@rneui/themed";
import React, { useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";

const CreateTaskslist: React.FC<{ projectId: string }> = ({ projectId }) => {
  const colorScheme = useColorScheme();
  const [tasklistName, setTasklistName] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [tasklistErr, setTasklistErr] = useState<string>("");
  const [colorErr, setColorErr] = useState<string>("");

  useEffect(() => {}, []);

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
          <Button radius={"sm"} type="solid" onPress={() => {}}>
            Create New Project
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
