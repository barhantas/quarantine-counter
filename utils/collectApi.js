import { AsyncStorage } from "react-native";

const COLLECT_API_API_KEY = "3P6Me18WqxwsMN0ZD6B5Ku:5oFD5Gylk1eYtKnJUaqTTr"
const BASE_URL = "https://api.collectapi.com";

const headers = {
    Authorization: `apikey ${COLLECT_API_API_KEY}`,
    'Content-Type': 'application/json',
};

export const getFromCollectApi = async (endPoint, params) => {
  try {
    const data = await fetch(`${BASE_URL}/${endPoint}`, {
      method: 'GET',
      headers: headers,
      body: JSON.stringify(params)
    });
    return data.json();
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
