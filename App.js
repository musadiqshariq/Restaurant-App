import store from "./src/store/index";
import { Provider } from "react-redux";
import AppNavigation from "./src/config/navigation/navigation";
import React from 'react';
import auth from '@react-native-firebase/auth';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {useState, useEffect} from "react"


const App = () => {
  return (
    <Provider store = {store}>
      <AppNavigation />
    </Provider>
  );
};

const styles = StyleSheet.create({
  
});

export default App;

