import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';

import {allLogo} from '../../Assets';
import NavigatorServices from '../../Helper/NavigatorServices';
import {toDp} from '../../Helper/PercentageToDp';

const SplashScreen: React.FC = () => {
  useEffect(() => {
    setTimeout(() => {
      NavigatorServices.reset('Products');
    }, 2500);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={allLogo.logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: toDp(200),
    height: toDp(200),
    resizeMode: 'contain',
  },
});

export default SplashScreen;
