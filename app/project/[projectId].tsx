import React from "react";
import { Text, View } from "../../components/Themed";
import { useGlobalSearchParams } from "expo-router";

const ProjectScreen = () => {
  const local = useGlobalSearchParams<{
    projectId: string;
  }>();
  return (
    <View>
      <Text>Voici l'id du projet : {local.projectId}</Text>
    </View>
  );
};

export default ProjectScreen;
