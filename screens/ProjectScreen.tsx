/**
 * @brief This is the page to view the tasks in a project,
 * this is where you can see and interact with each tasks
 * @note when you enter this page, only the id is passed as param in the router
 * ! WORK IN PROGRESS : this page is not usable yet
 */

import React, { useEffect, useState } from "react";
import { Button, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getTaskListsByProjectId } from "../api/taskslist";
import TasksList from "../components/TasksList";
import Colors from "../constants/Colors";
import { useAuth } from "../hooks/useAuth";
import { TaskListType } from "../types/TaskListType";
import { Text, View } from "../components/Themed";

const ProjectScreen: React.FC<{ projectId: string; projectName: string }> = ({
  projectId,
  projectName,
}) => {
  const user = useAuth().user;
  const [tasklists, setTasklists] = useState<TaskListType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user == null) return;
    setIsLoading(true);
    getTaskListsByProjectId(projectId).then((tasklist) => {
      setTasklists(tasklist);
      setIsLoading(false);
    });
  }, [user]);

  return (
    <SafeAreaView style={ProjectStyle.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={ProjectStyle.title}>{projectName}</Text>
          <Button
            title="Add Tasklist"
            onPress={() => {
              // TODO : Make a function that call the api and the state to refresh items.
            }}
          />
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {tasklists.map((tasklist) => (
            <TasksList key={tasklist.id} {...tasklist} />
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProjectScreen;

const ProjectStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
