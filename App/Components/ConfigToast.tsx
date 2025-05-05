import {BadgeCheck, Info} from 'lucide-react-native';
import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Toast, {
  ErrorToast,
  SuccessToast,
  ToastConfigParams,
} from 'react-native-toast-message';
import {toDp} from '../Helper/PercentageToDp';

const parseBoldText = (text: string) => {
  const parts = text.split(/<b>(.*?)<\/b>/); // Pisahkan teks di dalam tag <b>
  return (
    <Text style={styles.text1Style}>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          // Index ganjil adalah teks dalam tag <b>
          <Text key={index} style={[styles.text1Style, {fontWeight: 'bold'}]}>
            {part}
          </Text>
        ) : (
          // Index genap adalah teks biasa
          part
        ),
      )}
    </Text>
  );
};

const toastConfig = {
  error: (props: ToastConfigParams<any>) => (
    <ErrorToast
      {...props}
      style={styles.containerError}
      text1Style={styles.text1StyleDefault}
      renderLeadingIcon={() => <Info color={'white'} size={toDp(24)} />}
      renderTrailingIcon={() => <Text style={styles.textOk}>OK</Text>}
      text1NumberOfLines={2}
      onPress={() => Toast.hide()}
    />
  ),

  success: (props: ToastConfigParams<any>) => (
    <SuccessToast
      {...props}
      style={styles.containerSuccessDefault}
      text1Style={styles.text1StyleDefault}
      renderLeadingIcon={() => <Info color={'white'} size={toDp(24)} />}
      renderTrailingIcon={() => <Text style={styles.textOkDefault}>OK</Text>}
      text1NumberOfLines={2}
      onPress={() => Toast.hide()}
    />
  ),
  successCustom: ({text1}: ToastConfigParams<any>) => (
    <View style={styles.customContainerSuccess}>
      <Info color={'white'} size={toDp(24)} />
      <Text style={styles.text1Style}>{parseBoldText(text1 || '')}</Text>
      <TouchableOpacity onPress={() => Toast.hide()}>
        <Text style={styles.textOk}>OK</Text>
      </TouchableOpacity>
    </View>
  ),
  blackCustom: ({text1}: ToastConfigParams<any>) => (
    <View style={styles.blackCustom}>
      <BadgeCheck color={'white'} size={toDp(24)} />
      <Text style={styles.text1Style}>{parseBoldText(text1 || '')}</Text>
      <TouchableOpacity onPress={() => Toast.hide()}>
        <Text style={styles.textOk}>OK</Text>
      </TouchableOpacity>
    </View>
  ),
};

const styles = StyleSheet.create({
  containerError: {
    width: '92%',
    height: 'auto',
    borderRadius: toDp(8),
    backgroundColor: '#EF4444',
    marginTop: toDp(72),
    borderLeftColor: '#EF4444',
    alignItems: 'center',
    paddingHorizontal: toDp(16),
    paddingVertical: toDp(8),
    zIndex: 1000,
  },
  containerSuccessDefault: {
    width: '92%',
    height: 'auto',
    borderRadius: toDp(8),
    backgroundColor: '#00B844',
    marginTop: toDp(72),
    borderLeftColor: '#00B844',
    alignItems: 'center',
    paddingHorizontal: toDp(16),
    paddingVertical: toDp(8),
    zIndex: 1000,
  },
  text1StyleDefault: {
    fontSize: toDp(14),
    fontWeight: '400',
    color: 'white',
    fontFamily: 'PlusJakartaSans-Regular',
  },
  textOkDefault: {
    fontSize: toDp(14),
    fontWeight: '700',
    color: 'white',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  customContainerSuccess: {
    //height: toDp(40),
    paddingVertical: toDp(8),
    borderRadius: toDp(8),
    backgroundColor: '#00B844',
    borderLeftColor: '#00B844',
    alignItems: 'center',
    paddingHorizontal: toDp(16),
    position: 'absolute',
    top: toDp(72),
    right: toDp(16),
    left: toDp(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  blackCustom: {
    //height: toDp(40),
    paddingVertical: toDp(8),
    borderRadius: toDp(8),
    backgroundColor: '#000000BF',
    borderLeftColor: '#00B844',
    alignItems: 'center',
    paddingHorizontal: toDp(16),
    position: 'absolute',
    top: Platform.OS === 'ios' ? toDp(72) : toDp(56),
    right: toDp(16),
    left: toDp(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text1Style: {
    fontSize: toDp(14),
    color: 'white',
    //marginHorizontal: toDp(16),
    marginBottom: toDp(4),
    width: toDp(218),
  },
  textOk: {
    fontSize: toDp(14),
    color: 'white',
  },
});

export default toastConfig;

/*
Toast.show({
  type: 'success',
  text1: 'Berhasil membuat inspeksi',
});

Toast.show({
  type: 'error',
  text1: 'Gagal buat inspeksi, silakan coba lagi.',
});
*/
