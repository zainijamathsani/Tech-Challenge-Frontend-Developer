import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {toDp} from '../../Helper/PercentageToDp';

import {Minus, Plus, X} from 'lucide-react-native';
import ReactNativeModal from 'react-native-modal';
import CustomHeader from '../../Components/CustomHeader';
import {
  decrementQty,
  incrementQty,
  removeFromCart,
} from '../../Redux/cartSlice';
import {RootState} from '../../Redux/store';

const Cart = props => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const renderModal = () => {
    return (
      <ReactNativeModal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Confirm Checkout</Text>
          <Text style={styles.modalText}>
            Are you sure you want to proceed to payment?
          </Text>
          <Text style={styles.modalAmount}>
            Total: ${totalPrice.toFixed(2)}
          </Text>
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.modalButton, {backgroundColor: '#e2e8f0'}]}
              onPress={() => setModalVisible(false)}>
              <Text style={{color: 'black', fontWeight: '600'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, {backgroundColor: '#2196F3'}]}
              onPress={() => {
                setModalVisible(false);
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Proceed</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
    );
  };

  return (
    <>
      <CustomHeader
        title="Shopping Cart"
        onPress={() => {
          props.navigation.goBack();
        }}
      />
      {renderModal()}
      <View style={styles.container}>
        <FlatList
          data={cart}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.itemContainer}>
              <Image source={{uri: item.thumbnail}} style={styles.image} />
              <View style={{flex: 1}}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                <View style={styles.qtyContainer}>
                  <TouchableOpacity
                    onPress={() => dispatch(decrementQty(item.id))}>
                    <Minus
                      size={toDp(20)}
                      color={'white'}
                      strokeWidth={toDp(2)}
                    />
                  </TouchableOpacity>
                  <Text style={styles.qtyText}>{item.quantity}</Text>
                  <TouchableOpacity
                    onPress={() => dispatch(incrementQty(item.id))}>
                    <Plus
                      size={toDp(20)}
                      color={'white'}
                      strokeWidth={toDp(1.5)}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => dispatch(removeFromCart(item.id))}>
                <X size={toDp(24)} color={'red'} strokeWidth={toDp(2)} />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={
            <Text style={styles.empty}>Your cart is empty</Text>
          }
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.totalText}>
          Total: $
          {cart
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toFixed(2)}
        </Text>
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: toDp(10),
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  image: {
    width: toDp(64),
    height: toDp(64),
    marginRight: toDp(12),
  },
  title: {
    fontSize: toDp(16),
    fontWeight: '600',
    color: '#1e293b',
  },
  price: {
    fontSize: toDp(14),
    color: '#475569',
    marginTop: toDp(2),
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: toDp(6),
    backgroundColor: 'grey',
    borderRadius: toDp(4),
    width: toDp(100),
    height: toDp(24),
  },
  qtyBtn: {
    fontSize: toDp(20),
    color: '#2563eb',
    paddingHorizontal: toDp(12),
  },
  qtyText: {
    fontSize: toDp(16),
    color: 'white',
    marginHorizontal: toDp(12),
    width: toDp(20),
    textAlign: 'center',
  },
  removeText: {
    fontSize: toDp(18),
    color: '#ef4444',
    marginLeft: toDp(8),
  },
  empty: {
    marginTop: toDp(100),
    textAlign: 'center',
    fontSize: toDp(16),
    color: '#64748b',
  },
  footer: {
    padding: toDp(16),
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f8fafc',
  },
  totalText: {
    fontSize: toDp(18),
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: toDp(12),
  },
  checkoutBtn: {
    backgroundColor: '#2196F3',
    paddingVertical: toDp(12),
    borderRadius: toDp(8),
    alignItems: 'center',
  },
  checkoutText: {
    fontSize: toDp(16),
    color: '#fff',
    fontWeight: 'bold',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: toDp(20),
    borderTopLeftRadius: toDp(20),
    borderTopRightRadius: toDp(20),
  },
  modalTitle: {
    fontSize: toDp(18),
    fontWeight: 'bold',
    marginBottom: toDp(10),
    color: '#0f172a',
  },
  modalText: {
    fontSize: toDp(14),
    color: '#475569',
    marginBottom: toDp(10),
  },
  modalAmount: {
    fontSize: toDp(16),
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: toDp(20),
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: toDp(12),
    borderRadius: toDp(8),
    alignItems: 'center',
    marginHorizontal: toDp(4),
  },
});
