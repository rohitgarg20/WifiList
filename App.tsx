

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import { HomeScreen } from './src/screens';
import { StoreProvider } from './src/store/StoreProvider';


const App = () => {
  return (
    <SafeAreaView style = {styles.mainContainer}>
      <StoreProvider>
        <HomeScreen/>
      </StoreProvider>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 10
  }
});

export default App;
