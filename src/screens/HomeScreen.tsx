import React, { useContext, useEffect, useRef } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native'
import { strings } from '../common/Constant'
import { hitPostApi } from '../http-layer/Axios'
import { onDeviceLocation, onLocation } from '../services/LocationService'
import { checkIsLocationPermissionGranted, requestLocationPermission } from '../services/PermissionService'
import { connectToWifiNetwork, getAvailableWifiNetworks } from '../services/WifiServiceManager'
import { AppContext } from '../store/AppContext'
import { ACTIONS } from '../store/HomeReducer'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20
  },
  noLocationAccessContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  wifiItemContainer: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    paddingVertical: 10
  },
  itemSeparator: {
    paddingBottom: 10
  },
  passwordModal: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flex: 1
  }
})


const homeScreen = () => {

  const textInputRef = useRef(null)

  const { appReducer, appState } = useContext(AppContext)
  const { connectedWifiNetworkName, isConnectedToWifiNetwork } = appState


  const getWifiList = async () => {
    const { UPDATE_AVAILABLE_WIFI_NETWORK_LIST }  = ACTIONS

    try {
      const wifiList = await getAvailableWifiNetworks()
      appReducer({
        type: UPDATE_AVAILABLE_WIFI_NETWORK_LIST,
        payload: wifiList
      })
    } catch(err) {
      console.log('getWifiListgetWifiListgetWifiList', err)
    }
  }

  const managePermissions = async () => {
    const { UPDATE_LOCATION_VIEW_STATUS }  = ACTIONS

    const isGranted = await checkIsLocationPermissionGranted()
    console.log('isGrantedisGrantedisGrantedisGranted', isGranted)
    if(!isGranted) {
      const userGivePermission = await requestLocationPermission()
      if(userGivePermission) {
        appReducer({
          type: UPDATE_LOCATION_VIEW_STATUS,
          payload: false
        })
        await getWifiList()
      } else {
        appReducer({
          type: UPDATE_LOCATION_VIEW_STATUS,
          payload: true
        })
      }
    } else {
      appReducer({
        type: UPDATE_LOCATION_VIEW_STATUS,
        payload: false
      })
    }
    await getWifiList()

  }

  useEffect(() => {
    managePermissions()
  }, [])


  const renderNoLocationAccessView = () => {
    const { LOACTION_PERMISSION, GIVE_PERMISSION_BUTTON } = strings
    return (
      <View style = {styles.noLocationAccessContainer}>
        <Text>{ LOACTION_PERMISSION}</Text>
        <TouchableOpacity onPress={managePermissions}>
          <Text>{GIVE_PERMISSION_BUTTON}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const showPasswordModal = (name: string) => {
    appReducer({
      type: ACTIONS.SHOW_PASSWWORD_MODAL,
      payload: name
    })
  }

  const renderAvailableWifiNetworkList = () => {
    const { availableWifiNetworks } = appState
    return (
      <FlatList
        data = {availableWifiNetworks}
        renderItem={({item}) => {
          const { SSID } = item || {}
          return (
            <TouchableOpacity style = {styles.wifiItemContainer} onPress={() => showPasswordModal(SSID)}>
              <Text>
                {SSID}
              </Text>
            </TouchableOpacity>
          )
        }}
        ItemSeparatorComponent={() => {
          return (
            <View style = {styles.itemSeparator}/>
          )
        }}
      />
    )
  }

  const connectToWifi = () => {
    const { passwordModalVisible, connectedWifiNetworkName, passwordValue } = appState
    const onSuccessfulPassword = () => appReducer({
      type: ACTIONS.CONNECT_TO_NETWORK_SUCCESS,
      payload: ''
    })
    connectToWifiNetwork(connectedWifiNetworkName, passwordValue, onSuccessfulPassword)
  }

  const onChangePasswordValue = (value: string) => {
    appReducer({
      type: ACTIONS.ON_CHANGE_VALUE,
      payload: value
    })
  }

  const showEnterPasswordModal = () => {
    const { passwordModalVisible, connectedWifiNetworkName, passwordValue } = appState
    return (
          <Modal
            animationType="slide"
            transparent={true}
            visible={passwordModalVisible}

          >
            <View style = {styles.passwordModal}>
              <Text>Connect to the wifi network {connectedWifiNetworkName}</Text>
              <Text>Password</Text>
              <View style = {{
                borderBottomWidth: 1,
                width: '100%'
              }}>
                <TextInput
                  ref = {textInputRef}
                  secureTextEntry = {true}
                  onChangeText={onChangePasswordValue}
                  value= {passwordValue}
                />
              </View>
              <TouchableOpacity onPress={() => connectToWifi()}>
                <Text>Connect</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => appReducer({
                 type: ACTIONS.HIDE_PASSWORD_MODAL,
                 payload: ''
              })}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
    )
  }

  const hitRequestToNetwork = () => {
    hitPostApi()
  }

  const renderNetworkRequestView = () => {
    const { connectedWifiNetworkName, isConnectedToWifiNetwork } = appState
    return (
      isConnectedToWifiNetwork ? <View>
        <Text>Connected to network {connectedWifiNetworkName}</Text>
        <TouchableOpacity onPress={hitRequestToNetwork}>
          <Text>Ping</Text>
        </TouchableOpacity>
      </View>
      : null
    )
  }


  return (
    <View style = {styles.mainContainer}>
      {!isConnectedToWifiNetwork && renderAvailableWifiNetworkList()}
      {showEnterPasswordModal()}
      {renderNetworkRequestView()}
    </View>
  )
}

export {
  homeScreen as HomeScreen
}
