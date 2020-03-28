import { AsyncStorage } from "react-native";

const preFix = "corona:";

export const writeToStorage = async (key, data) => {
  try {
    await AsyncStorage.setItem(`${preFix}${key}`, JSON.stringify(data));
  } catch (e) {
    console.log("error", e);
  }
};

export const removeFromStorage = async key => {
  try {
    await AsyncStorage.removeItem(`${preFix}${key}`);
  } catch (e) {
    console.log("error", e);
  }
};

export const readFromStorage = async key => {
  try {
    const data = await AsyncStorage.getItem(`${preFix}${key}`);
    const parsedData = JSON.parse(data)
    return parsedData;
  } catch (e) {
    console.log("error", e);
  }
};
