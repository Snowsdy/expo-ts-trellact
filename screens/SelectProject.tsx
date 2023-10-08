/**
 * @brief This is the menu page to select an existing project to open
 */

import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { deleteProject, getProjectsByUserId } from "../api/projectslist";
import { ProjectType } from "../types/ProjectType";
import { router } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import { ScrollView } from "react-native-gesture-handler";
import { Text, View } from "../components/Themed";
import { Button } from "@rneui/themed";
import { deleteTasksList, getTaskListsByProjectId } from "../api/taskslist";
import { deleteTask, getTasksByTasklistId } from "../api/tasks";

function openProject(id: string | undefined, name: string) {
  if (id === undefined) return;

  router.push("/project/");
  router.setParams({
    projectId: id,
    projectName: name,
  });
}

function ProjectCard({ project }: { project: ProjectType }) {
  return (
    <TouchableOpacity
      onPress={() => openProject(project.id, project.title)}
      style={StyleSheet.compose(styles.projectCard, {
        backgroundColor: project.color,
      })}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "transparent",
          width: "100%",
        }}>
        <Text style={styles.projectTitle}>{project.title}</Text>
        <Button
          onPress={() => {
            getTaskListsByProjectId(project.id ? project.id : "").then(
              (value) => {
                if (value.length != 0) {
                  value.forEach((tasklist) => {
                    getTasksByTasklistId(tasklist.id ? tasklist.id : "").then(
                      (tasks) => {
                        if (tasks.length > 0) {
                          tasks.forEach((task) => {
                            deleteTask(task.id ? task.id : "").then(() =>
                              deleteTasksList(
                                tasklist.id ? tasklist.id : ""
                              ).then(() =>
                                deleteProject(
                                  project.id ? project.id : ""
                                ).then(() => {
                                  alert("Project deleted. Back to home.");
                                  router.push("/home/");
                                })
                              )
                            );
                          });
                        } else {
                          deleteTasksList(tasklist.id ? tasklist.id : "").then(
                            () =>
                              deleteProject(project.id ? project.id : "").then(
                                () => {
                                  alert("Project deleted. Back to home.");
                                  router.push("/home/");
                                }
                              )
                          );
                        }
                      }
                    );
                  });
                } else {
                  deleteProject(project.id ? project.id : "").then(() => {
                    alert("Project deleted. Back to home.");
                    router.push("/home/");
                  });
                }
              }
            );
          }}
          icon={{
            name: "trash",
            type: "font-awesome",
            size: 15,
            color: "red",
          }}
          iconContainerStyle={{
            padding: 0,
          }}
          buttonStyle={{
            backgroundColor: "rgba(90, 154, 230, 1)",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 8,
            height: 35,
            padding: 0,
          }}
          containerStyle={{
            padding: 0,
          }}
        />
      </View>
    </TouchableOpacity>
  );
}

export function SelectProject() {
  const loggedUser = useAuth().user;
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (loggedUser === null) return;
    setIsLoading(true);
    getProjectsByUserId(loggedUser.uid).then((projects) => {
      setProjects(projects);
      setIsLoading(false);
    });
  }, [loggedUser]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select a project</Text>
      <ScrollView style={styles.projectsList}>
        {projects.map((project, index) => (
          <ProjectCard project={project} key={index} />
        ))}
      </ScrollView>
    </SafeAreaView>
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
  },
  projectsList: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  projectCard: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  projectTitle: {
    fontSize: 18,
  },
});
