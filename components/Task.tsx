import { Card } from "@rneui/base";
import { CardDivider } from "@rneui/base/dist/Card/Card.Divider";
import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image, Modal } from "react-native";
import { deleteTask } from "../api/tasks";
import { TaskStyle } from "../constants/Task";
import { TaskType } from "../types/TaskType";
import { Button } from "@rneui/themed";
import ImageViewer from "react-native-image-zoom-viewer";



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
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const openModal = (index) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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
        <View style={{flexDirection: "row", flexWrap: "wrap"}}>
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => openModal(index)}
              style={{ marginRight: 10, marginBottom: 10,}}
            >
              <Image
                source={{ uri: image }}
                style={{ width: 115, height: 115 }}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Modal visible={isModalVisible} transparent={true}>
          <Text style={{ color: "white" }}>
            Swipper l'image vers le bas pour fermer la modal
          </Text>
          <ImageViewer
            imageUrls={images.map((imageUrl) => ({ url: imageUrl }))}
            index={selectedIndex}
            enableSwipeDown
            onSwipeDown={closeModal}
          />
        </Modal>
      </View>
    </Card>
  );
};

export default Task;
