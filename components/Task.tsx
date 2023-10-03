import { Card } from '@rneui/base';
import { CardDivider } from '@rneui/base/dist/Card/Card.Divider';
import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { TaskType } from '../types/TaskType';
import TaskStyle  from '../constants/Task';
import { deleteTask } from '../api/tasks';
import { Button } from '@rneui/themed';



const Task: React.FC<TaskType> = ({ id, title, images, description, color, badges }) => {
  return (
    <Card containerStyle={[{backgroundColor: color}, TaskStyle.default.containerStyle]}>
        <Button onPress={deleteTask(id)} title="Learn More" color="#841584" accessibilityLabel="Learn more about this purple button" />
        <Card.Title style={TaskStyle.default.titleTask}>{title}</Card.Title>
        <CardDivider></CardDivider>
        <View>
            <Text style={TaskStyle.default.descriptionTitleTask}>
                Description de la tâche : 
            </Text>
            <Text style={TaskStyle.default.descriptionTask}>
                {description}
            </Text>
            <Text style={TaskStyle.default.descriptionTitleTask}>
                Image de description : 
            </Text>
        </View>
    </Card>
  );
};


export default Task;
