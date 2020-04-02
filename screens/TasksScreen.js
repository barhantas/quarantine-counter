import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight
} from "react-native";

import { TaskListItem, ModalContainer, TaskDetail } from "../components";

import { readFromStorage, writeToStorage } from "../utils";
import { TASKS } from "../constants/Tasks";
import Colors from "../constants/Colors";

export default class TasksScreen extends React.Component {
  state = {
    totalTaskCount: undefined,
    isModalVisible: false,
    selectedTask: undefined,
    compeletedDays: {},
    checkedChallengeCount: 0,
    tasks: []
  };

  componentDidMount = async () => {
    const totalTaskCount = await readFromStorage("quarantineDurationInDays");
    const tasks = await readFromStorage("tasks");

    this.setState({
      totalTaskCount,
      tasks: tasks.slice(0, totalTaskCount)
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
    const { selectedTask } = this.state;
    if (selectedTask && selectedTask.id) {
      const tasks = await readFromStorage("tasks");

      tasks[selectedTask.id - 1].challanges[
        challangeId - 1
      ].isCompleted = !tasks[selectedTask.id - 1].challanges[challangeId - 1]
        .isCompleted;

      await writeToStorage("tasks", tasks);

      this.setState({
        selectedTask: {
          ...selectedTask,
          challanges: [...tasks[selectedTask.id - 1].challanges]
        }
      });

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
    const {
      totalTaskCount,
      isModalVisible,
      selectedTask,
      compeletedDays,
      checkedChallengeCount,
      tasks
    } = this.state;

    if (!totalTaskCount) {
      <Text>Loading</Text>;
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <TaskListItem
              name={item.name}
              checkedChallengeCount={checkedChallengeCount}
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
            onChallangesFinished={this.onChallangesFinished}
            getCheckedChallengeCount={checkedChallengeCount}
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
