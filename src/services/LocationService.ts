import RNLocation from 'react-native-location';
import LocationEnabler from 'react-native-location-enabler';



export const onLocation = async () => {
  const locationPermission = await RNLocation.requestPermission({
    android: {
      detail: "coarse",
      rationale: {
        title: "We need to access your location",
        message: "We use your location to show where you are on the map",
        buttonPositive: "OK",
        buttonNegative: "Cancel"
      }
    }
  })

  console.log('onLocationonLocationonLocation', locationPermission)
}

export const onDeviceLocation = () => {
    const {
      useLocationSettings,
      PRIORITIES: { HIGH_ACCURACY },
    } = LocationEnabler;

    const locationStatus = LocationEnabler.checkSettings({})
    console.log('locationStatuslocationStatuslocationStatus', locationStatus)
    const locationVal = LocationEnabler.requestResolutionSettings({

    })
    console.log('locationVallocationVallocationVal', locationVal)

}
