import {useRoute} from '@react-navigation/native';
import axios from 'axios';
import {Minus, Plus, Star} from 'lucide-react-native';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  LogBox,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useDispatch, useSelector} from 'react-redux';
import CustomHeader from '../../Components/CustomHeader';
import {toDp} from '../../Helper/PercentageToDp';
import {addToCart, selectCartCount} from '../../Redux/cartSlice';
import {selectFavorites, toggleFavorite} from '../../Redux/favoriteSlice';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  brand: string;
  stock: number;
  thumbnail: string;
  category: string;
}

const Details: React.FC = props => {
  const route = useRoute<any>();
  const {productId} = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const cartCount = useSelector(selectCartCount);
  const favorites = useSelector(selectFavorites);
  const isFavorite = product ? favorites.includes(product.id) : false;
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    LogBox.ignoreAllLogs();
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://dummyjson.com/products/${productId}`,
        );
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <>
        <CustomHeader
          title="Product Details"
          onPress={() => {
            props.navigation.goBack();
          }}
          cartCount={cartCount}
        />
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2196F3" />
        </View>
      </>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Produk tidak ditemukan.</Text>
      </View>
    );
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product.id));
  };

  const handleAddToCart = () => {
    Toast.show({
      type: 'blackCustom',
      text1:
        '<b>' +
        quantity +
        ' ' +
        product.title +
        '</b> successfully added to cart',
    });
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: quantity,
      }),
    );
    setQuantity(0);
  };

  return (
    <>
      <CustomHeader
        title="Product Details"
        onPress={() => {
          props.navigation.goBack();
        }}
        cartCount={cartCount}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{uri: product.thumbnail}} style={styles.image} />

        <Text style={styles.title}>{product.title}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={styles.brand}>Brand: {product.brand}</Text>
            <Text style={styles.category}>Category: {product.category}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              marginBottom: toDp(12),
              padding: toDp(4),
            }}
            onPress={handleToggleFavorite}>
            <Star
              size={toDp(28)}
              color={isFavorite ? '#FACC15' : '#5B6C83'}
              strokeWidth={toDp(2)}
              fill={isFavorite ? '#FACC15' : 'none'}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.rating}>Rating: {product.rating}⭐</Text>
        <Text style={styles.desc}>{product.description}</Text>

        <View style={styles.viewCenter}>
          <View style={styles.qtyContainer}>
            <TouchableOpacity
              onPress={() => setQuantity(Math.max(quantity - 1, 0))}>
              <Minus size={toDp(20)} color={'white'} strokeWidth={toDp(2)} />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <Plus size={toDp(20)} color={'white'} strokeWidth={toDp(1.5)} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: quantity > 0 ? '#2196F3' : '#C2CEE1'},
          ]}
          disabled={quantity <= 0}
          onPress={() => {
            quantity > 0 ? handleAddToCart() : undefined;
          }}>
          <Text
            style={[
              styles.buttonText,
              {color: quantity > 0 ? 'white' : '#8A9DB9'},
            ]}>
            Add to Cart
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: toDp(16),
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: toDp(200),
    resizeMode: 'contain',
    marginBottom: toDp(16),
  },
  title: {
    fontSize: toDp(18),
    fontWeight: 'bold',
    marginBottom: toDp(4),
  },
  brand: {
    fontSize: toDp(14),
    color: '#666',
  },
  category: {
    fontSize: toDp(14),
    color: '#666',
    marginBottom: toDp(8),
  },
  price: {
    fontSize: toDp(16),
    color: '#2196F3',
    marginBottom: toDp(4),
  },
  rating: {
    fontSize: toDp(14),
    marginBottom: toDp(8),
  },
  desc: {
    fontSize: toDp(14),
    color: '#444',
    marginBottom: toDp(20),
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: toDp(12),
    borderRadius: toDp(8),
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: toDp(16),
    fontWeight: 'bold',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: toDp(6),
    backgroundColor: 'grey',
    borderRadius: toDp(4),
    width: toDp(100),
    height: toDp(32),
  },
  qtyText: {
    fontSize: toDp(16),
    color: 'white',
    marginHorizontal: toDp(12),
    width: toDp(20),
    textAlign: 'center',
  },
  viewCenter: {
    alignItems: 'center',
    marginBottom: toDp(24),
  },
});

export default Details;
