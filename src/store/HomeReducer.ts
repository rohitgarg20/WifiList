import { useReducer } from "react"

export interface Dispatcher {
  type: String
  payload?: any
}

export interface State {
  showLocationPermissionView: boolean
  showWifiPermissionView: boolean
  showActivityIndicator: boolean
  availableWifiNetworks: any[]
  connectedWifiNetworkName: string
  passwordModalVisible: boolean
  passwordValue: string
  isConnectedToWifiNetwork: boolean
}

const initialState = {
  showLocationPermissionView: true,
  showWifiPermissionView: false,
  showActivityIndicator: false,
  availableWifiNetworks: [],
  connectedWifiNetworkName: '',
  passwordModalVisible: false,
  passwordValue: '',
  isConnectedToWifiNetwork: false
}

const ACTIONS = {
  UPDATE_LOCATION_VIEW_STATUS: 'UPDATE_LOCATION_VIEW_STATUS',
  UPDATE_WIFI_TOOGLE_STATUS: 'UPDATE_WIFI_TOOGLE_STATUS',
  UPDATE_ACTIVITY_INDICATOR_STATUS: 'UPDATE_ACTIVITY_INDICATOR_STATUS',
  UPDATE_AVAILABLE_WIFI_NETWORK_LIST: 'UPDATE_AVAILABLE_WIFI_NETWORK_LIST',
  UPDATE_CONNECTED_NETWORK_DETAIL: 'UPDATE_CONNECTED_NETWORK_DETAIL',
  SHOW_PASSWWORD_MODAL: 'SHOW_PASSWWORD_MODAL',
  HIDE_PASSWORD_MODAL: 'HIDE_PASSWORD_MODAL',
  ON_CHANGE_VALUE: 'ON_CHANGE_VALUE',
  CONNECT_TO_NETWORK_SUCCESS: 'CONNECT_TO_NETWORK_SUCCESS'
}


const reducer = (state: State, action: Dispatcher) => {
  switch(action.type) {
    case ACTIONS.UPDATE_ACTIVITY_INDICATOR_STATUS:
      return {
        ...state,
        showActivityIndicator: action.payload
      }

      case ACTIONS.UPDATE_WIFI_TOOGLE_STATUS:
      return {
        ...state,
        showWifiPermissionView: action.payload
      }

      case ACTIONS.UPDATE_LOCATION_VIEW_STATUS:
      return {
        ...state,
        showLocationPermissionView: action.payload
      }

      case ACTIONS.UPDATE_AVAILABLE_WIFI_NETWORK_LIST:
        return {
          ...state,
          availableWifiNetworks: action.payload
        }

      case ACTIONS.UPDATE_CONNECTED_NETWORK_DETAIL:
        return {
          ...state,
          connectedWifiNetworkData: action.payload
        }
      case ACTIONS.SHOW_PASSWWORD_MODAL:
        return {
          ...state,
          passwordModalVisible: true,
          connectedWifiNetworkName: action.payload

        }
      case ACTIONS.HIDE_PASSWORD_MODAL:
        return {
          ...state,
          passwordModalVisible: false,
          connectedWifiNetworkName: action.payload,
          passwordValue: '',
        }
      case ACTIONS.ON_CHANGE_VALUE:
        return {
          ...state,
          passwordValue: action.payload
        }

      case ACTIONS.CONNECT_TO_NETWORK_SUCCESS:
        return {
          ...state,
          passwordModalVisible: false,
          passwordValue: '',
          isConnectedToWifiNetwork: true
        }
      default:
        return state

  }
}

export {
  reducer,
  ACTIONS,
  initialState
}

