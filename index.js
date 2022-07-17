/**
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/screens/index';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as ReduxProvider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';

const AppWithRouter = () => (
  <ReduxProvider store={store}>
    <PersistGate persistor={persistor}>
      <SafeAreaProvider>
        <NavigationContainer>
          <App />
        </NavigationContainer>
      </SafeAreaProvider>
    </PersistGate>
  </ReduxProvider>
);

AppRegistry.registerComponent(appName, () => AppWithRouter);
