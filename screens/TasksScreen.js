import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight
} from "react-native";

import { TaskListItem, ModalContainer, TaskDetail } from "../components";

import { readFromStorage } from "../utils";
import { TASKS } from "../constants/Tasks";
import Colors from "../constants/Colors";

export default class TasksScreen extends React.Component {
  state = {
    totalTaskCount: undefined,
    isModalVisible: false,
    selectedItem: undefined,
    compeletedDays: {},
    checkedChallengeCount: 0
  };

  componentDidMount = async () => {
    const totalTaskCount = await readFromStorage("quarantineDurationInDays");

    this.setState({
      totalTaskCount
    });
  };

  onChallangesFinished = () => {
    this.setState(({ isModalVisible, selectedItem, compeletedDays }) => ({
      isModalVisible: !isModalVisible,
      selectedItem: undefined,
      compeletedDays: { ...compeletedDays, [selectedItem.name]: true }
    }));
  };

  toggleModal = selectedItem =>
    this.setState(({ isModalVisible }) => ({
      isModalVisible: !isModalVisible,
      selectedItem
    }));

  render() {
    const { totalTaskCount, isModalVisible, selectedItem,compeletedDays, checkedChallengeCount } = this.state;
    const data = TASKS.slice(0, totalTaskCount);

    if (!totalTaskCount) {
      <Text>Loading</Text>;
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TaskListItem
              name={item.name}
              checkedChallengeCount={checkedChallengeCount}
              isCompleted={compeletedDays[item.name]}
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
          <TaskDetail
            task={selectedItem}
            onChallangesFinished={this.onChallangesFinished}
            getCheckedChallengeCount={checkedChallengeCount}
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
