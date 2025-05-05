import {Platform} from 'react-native';
import {
  CommonActions,
  NavigationContainerRef,
  ParamListBase,
} from '@react-navigation/native';

let _container: NavigationContainerRef<ParamListBase> | null = null;

function setContainer(container: NavigationContainerRef<ParamListBase> | null) {
  _container = container;
}

async function reset(name: string, params?: object) {
  if (_container) {
    _container.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name, params}],
      }),
    );
  }
}

async function navigate(name: string, params?: object) {
  const event = (Platform.OS + '_' + name).toUpperCase();
  console.log('EVENT', event);
  if (_container) {
    _container.dispatch(
      CommonActions.navigate({
        name,
        params,
      }),
    );
  }
}

export default {
  setContainer,
  reset,
  navigate,
};
