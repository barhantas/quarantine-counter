import * as React from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { TaskListItem, ModalContainer, TaskDetail } from "../components";

import { readFromStorage, writeToStorage } from "../utils";
import Colors from "../constants/Colors";

export default class TasksScreen extends React.Component {
  state = {
    isModalVisible: false,
    selectedTask: undefined,
    tasks: []
  };

  componentDidMount = async () => {
    const tasks = await readFromStorage("tasks");

    this.setState({
      tasks
    });
  };

  componentDidUpdate = async () => {
    const tasks = await readFromStorage("tasks");

    this.setState({
      tasks
    });
  };

  onChallangesFinished = () => {
    this.setState(({ isModalVisible }) => ({
      isModalVisible: !isModalVisible,
      selectedTask: undefined
    }));
  };

  toggleModal = async selectedTask => {
    const tasks = await readFromStorage("tasks");

    this.setState(({ isModalVisible }) => ({
      isModalVisible: !isModalVisible,
      selectedTask: !!selectedTask && tasks[selectedTask.id - 1]
    }));
  };

  handleCheckBoxPress = async challangeId => {
    const { selectedTask, tasks } = this.state;
    if (selectedTask && selectedTask.id) {
      // const tasks = await readFromStorage("tasks");

      tasks[selectedTask.id - 1].challanges[
        challangeId - 1
      ].isCompleted = !tasks[selectedTask.id - 1].challanges[challangeId - 1]
        .isCompleted;

      this.setState({
        tasks,
        selectedTask: {
          ...selectedTask,
          challanges: [...tasks[selectedTask.id - 1].challanges]
        }
      });

      await writeToStorage("tasks", tasks);

      if (
        tasks[selectedTask.id - 1].challanges.filter(
          challange => !challange.isCompleted
        ).length === 0
      ) {
        this.onChallangesFinished();
      }
    }
  };

  render() {
    const { isModalVisible, selectedTask, tasks } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TaskListItem
              name={item.name}
              challenges={tasks[item.id - 1].challanges}
              isCompleted={
                tasks[item.id - 1].challanges.filter(
                  challange => !challange.isCompleted
                ).length === 0
              }
              onPress={() => {
                this.toggleModal(item);
              }}
            />
          )}
        />
        <ModalContainer
          title={selectedTask?.name}
          isModalVisible={isModalVisible}
          toggleModal={this.toggleModal}
        >
          <TaskDetail
            task={selectedTask}
            handleCheckBoxPress={this.handleCheckBoxPress}
          />
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
