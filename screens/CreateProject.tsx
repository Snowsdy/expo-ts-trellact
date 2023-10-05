import React, { useEffect, useState } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { Text, View } from "../components/Themed";
import { useAuth } from "../hooks/useAuth";
import Colors from "../constants/Colors";
import { Input, Button } from "@rneui/themed";
import { ProjectType } from "../types/ProjectType";
import { addProject } from "../api/projectslist";
import { router } from "expo-router";

export function CreateProject() {
  const userCredentials = useAuth();
  const colorScheme = useColorScheme();
  const [userId, setUserId] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [nameErr, setNameErr] = useState<string>("");
  const [colorErr, setColorErr] = useState<string>("");

  useEffect(() => {
    if (userCredentials.user) {
      setUserId(userCredentials.user.uid);
    }
  }, [userCredentials]);

  return (
    userId != "" && (
      <View style={styles.container}>
        <Text style={styles.title}>Create a New Project</Text>
        <View
          style={[
            styles.card,
            { borderColor: Colors[colorScheme ?? "light"].text },
          ]}>
          <Text>Name :</Text>
          <Input
            value={projectName}
            onChangeText={setProjectName}
            inputStyle={{
              color: Colors[colorScheme ?? "light"].text,
            }}
            errorMessage={nameErr}
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
              if (projectName.length === 0) {
                setNameErr("Veuillez remplir ce champ.");
              }
              if (color.length === 0) {
                setColorErr("Veuillez remplir ce champ.");
              }
              // Do something
              if (color.length > 0 && projectName.length > 0) {
                const project: ProjectType = {
                  id: undefined,
                  userId: userId,
                  color: color,
                  title: projectName,
                };

                addProject(project).then((addedProject) => {
                  if (addedProject != null) {
                    router.push("/home/readProject");
                  }
                });
              }
            }}>
            Create New Project
          </Button>
        </View>
      </View>
    )
  );
}

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
