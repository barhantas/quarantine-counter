import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight
} from "react-native";

import { TaskItem, ModalContainer } from "../components";

import { readFromStorage } from "../utils";
import { TASKS } from "../constants/Tasks";
import Colors from "../constants/Colors";

export default class TasksScreen extends React.Component {
  state = {
    totalTaskCount: undefined,
    isModalVisible: false,
    selectedItem: undefined
  };

  componentDidMount = async () => {
    const totalTaskCount = await readFromStorage("quarantineDurationInDays");

    this.setState({
      totalTaskCount
    });
  };

  toggleModal = selectedItem =>
    this.setState(({ isModalVisible }) => ({
      isModalVisible: !isModalVisible,
      selectedItem
    }));

  render() {
    const { totalTaskCount, isModalVisible, selectedItem } = this.state;
    const data = TASKS.slice(0, totalTaskCount);

    if (!totalTaskCount) {
      <Text>Loading</Text>;
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TaskItem
              name={item.name}
              onPress={() => {
                this.toggleModal(item);
              }}
            />
          )}
        />
        <ModalContainer
          title={selectedItem?.name}
          isModalVisible={isModalVisible}
          toggleModal={this.toggleModal}
        >
          {/* TODO: Add Task Detail Content Item */}
          <Text>{selectedItem?.name}</Text>
          {selectedItem?.challanges.map(challange => (
            <View>
              <Text>{challange.name}</Text>
              <Text>{challange.description}</Text>
            </View>
          ))}
        </ModalContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
    backgroundColor: Colors.white
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});
