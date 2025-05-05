import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import toastConfig from './Components/ConfigToast';
import {default as NavigatorService} from './Helper/NavigatorServices';
import AppNavigator from './Navigations/AppNavigator';
import {store} from './Redux/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer
        ref={(navigatorRef: any | null) =>
          NavigatorService.setContainer(navigatorRef)
        }>
        <AppNavigator />
        <Toast config={toastConfig} />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
