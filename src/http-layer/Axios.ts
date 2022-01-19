import axios from "axios";
import { ToastAndroid } from "react-native";

const instance = axios.create({
  baseURL: 'http://192.168.4.1/',
  timeout: 1000,
});

export const hitPostApi = async () => {
  try {
  const urlParams = JSON.stringify({username:"technixia", password:"automation"})
  const apiResponse = await instance.post('master_login', urlParams)
  console.log('apiResponseapiResponseapiResponseapiResponse', apiResponse)
  } catch(error: any) {
    ToastAndroid.show(error.message, ToastAndroid.SHORT)
  }
}


