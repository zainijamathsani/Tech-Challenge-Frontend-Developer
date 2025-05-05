import {ArrowLeft, Search, ShoppingCart, Star} from 'lucide-react-native';
import React from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import NavigatorServices from '../Helper/NavigatorServices';
import {toDp} from '../Helper/PercentageToDp';

const {width} = Dimensions.get('window');

interface CustomHeaderProps {
  onPress?: () => void;
  title: string;
  isShadow?: boolean;
  roleName?: string;
  cartCount?: number;
}

const CustomHeader: React.FC<CustomHeaderProps> = props => {
  const {onPress, title, isShadow = true} = props;
  return (
    <View style={styles.header}>
      <View style={styles.systemBar} />
      <View style={styles.viewHeader}>
        {onPress && (
          <TouchableOpacity style={styles.touchBack} onPress={onPress}>
            <ArrowLeft
              size={toDp(24)}
              color={'#5B6C83'}
              strokeWidth={toDp(2)}
            />
          </TouchableOpacity>
        )}
        <Text
          style={[
            styles.title,
            {
              marginLeft: onPress ? toDp(12) : 0,
            },
          ]}>
          {title}
        </Text>
        <View style={styles.touchCart}>
          {props.title === 'Products' && (
            <TouchableOpacity
              style={{padding: toDp(4)}}
              onPress={() => {
                NavigatorServices.navigate('Search');
              }}>
              <Search size={toDp(24)} color={'#5B6C83'} strokeWidth={toDp(2)} />
            </TouchableOpacity>
          )}
          {props.title === 'Products' && (
            <TouchableOpacity
              style={{padding: toDp(4), marginLeft: toDp(12)}}
              onPress={() => {
                NavigatorServices.navigate('Favorites');
              }}>
              <Star size={toDp(24)} color={'#5B6C83'} strokeWidth={toDp(2)} />
            </TouchableOpacity>
          )}
          {props.cartCount && (
            <TouchableOpacity
              style={[styles.touchCart, {marginLeft: toDp(12)}]}
              onPress={() => {
                NavigatorServices.navigate('Cart');
              }}>
              <ShoppingCart
                size={toDp(24)}
                color={'#5B6C83'}
                strokeWidth={toDp(2)}
              />
              {props.cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>
                    {props.cartCount > 99 ? '99+' : props.cartCount || '0'}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
      {isShadow && (
        <LinearGradient
          colors={
            Platform.OS === 'android'
              ? ['transparent', '#0F172A']
              : ['#0F172A', 'transparent']
          }
          style={styles.headerLinear}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
  },
  systemBar: {
    width,
    height: Platform.OS === 'ios' ? toDp(42) : toDp(0),
    backgroundColor: 'white',
  },
  touchBack: {
    padding: toDp(4),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewHeader: {
    width,
    height: toDp(56),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: toDp(16),
    paddingRight: toDp(24),
    position: 'relative',
  },
  title: {
    color: '#0F172A',
    fontSize: toDp(18),
    marginLeft: toDp(16),
    fontWeight: '700',
  },
  headerLinear: {
    width,
    height: toDp(4),
    opacity: Platform.OS === 'android' ? toDp(0.1) : toDp(0.2),
    transform: [{rotate: '180deg'}],
  },
  circleHelpStyle: {
    position: 'absolute',
    top: toDp(17),
    right: toDp(16),
  },
  touchCart: {
    padding: toDp(4),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    flexDirection: 'row',
  },
  cartBadge: {
    position: 'absolute',
    top: -toDp(4),
    right: -toDp(4),
    minWidth: toDp(16),
    height: toDp(16),
    backgroundColor: 'red',
    borderRadius: toDp(8),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: toDp(4),
  },
  cartBadgeText: {
    color: 'white',
    fontSize: toDp(10),
    fontWeight: 'bold',
  },
});

export default CustomHeader;
