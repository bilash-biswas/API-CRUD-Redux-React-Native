import { StyleSheet } from 'react-native'
import React from 'react';
import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/redux/store';

const App = () => {
  return (
    <Provider store = {store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;