import { ToastAndroid } from "react-native";
import WifiManager from "react-native-wifi-reborn";
export const getAvailableWifiNetworks = async () => {
  await enableWifiNetwork()
  const wifiList = await WifiManager.loadWifiList()
  console.log('getAvailableWifiNetworksgetAvailableWifiNetworks', wifiList)
  return wifiList
}

export const getWifiStatus = async () => {
  const wifiButtonStatus = await WifiManager.isEnabled();
  return wifiButtonStatus
}

export const updateWifiStatus = async (status: boolean) => {
  const updateWifiStatus = await WifiManager.setEnabled(status)
  console.log('updateWifiStatusupdateWifiStatusupdateWifiStatus', updateWifiStatus)
}

export const connectToWifiNetwork = (ssid: string, password: string, cb:() => void) => {
  WifiManager.connectToProtectedSSID(ssid, password, true).then(
    () => {
      ToastAndroid.show("Connected successfully!", ToastAndroid.SHORT);
      cb()
    },
    (err) => {
      console.log("Connection failed!", err, err.message);
      ToastAndroid.show(err.message, ToastAndroid.SHORT)
    }
  );
}


export const enableWifiNetwork = async () => {
  const isWifiOn = await getWifiStatus()
  console.log('isWifiOnisWifiOnisWifiOn', isWifiOn)
  if(!isWifiOn){
    console.log('inside if is called')
    await updateWifiStatus(true)
  }
}