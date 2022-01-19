import { PermissionsAndroid } from 'react-native'

export const checkIsLocationPermissionGranted = async () => {
  const appHasLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
  return appHasLocationPermission
}

export const requestLocationPermission = async () => {
  const result = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Location permission is required for WiFi connections',
      message:
        'This app needs location permission as this is required  ' +
        'to scan for wifi networks.',
      buttonNegative: 'DENY',
      buttonPositive: 'ALLOW',
    },
  )
  return result
}