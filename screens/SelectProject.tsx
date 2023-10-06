/**
 * @brief This is the menu page to select an existing project to open
 */

import React, { useState, useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../constants/Colors";
import { getProjectsByUserId } from "../api/projectslist";
import { ProjectType } from "../types/ProjectType";
import { router } from "expo-router";
import { useAuth } from "../hooks/useAuth";
import { ScrollView } from "react-native-gesture-handler";



function openProject(id: string | undefined) {
    if(id === undefined) return;

    router.push("/project/");
    router.setParams({
        projectId: id,
    });
}

function ProjectCard({project}: {project: ProjectType}) {
    
    return (
        <TouchableOpacity onPress={() => openProject(project.id)} style={StyleSheet.compose(styles.projectCard, {backgroundColor: project.color})}>
            <Text style={styles.projectTitle}>{project.title}</Text>
        </TouchableOpacity>
    );
}



export function SelectProject() {
    const colorScheme = useColorScheme();
    const loggedUser = useAuth().user;
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if(loggedUser === null) return;
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
                {projects.map((project) => (
                    <ProjectCard project={project} />
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
