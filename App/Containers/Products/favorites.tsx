import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import CustomHeader from '../../Components/CustomHeader';
import {toDp} from '../../Helper/PercentageToDp';
import {selectFavorites} from '../../Redux/favoriteSlice';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const Favorites = ({navigation}) => {
  const favoriteIds = useSelector(selectFavorites);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const responses = await Promise.all(
          favoriteIds.map(id =>
            axios.get(`https://dummyjson.com/products/${id}`),
          ),
        );
        const data = responses.map(res => res.data);
        setProducts(data);
      } catch (err) {
        console.error('Error fetching favorites:', err);
      } finally {
        setLoading(false);
      }
    };

    if (favoriteIds.length > 0) {
      fetchFavoriteProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [favoriteIds]);

  if (loading) {
    return (
      <>
        <CustomHeader title="Favorites" onPress={() => navigation.goBack()} />
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2196F3" />
        </View>
      </>
    );
  }

  if (products.length === 0) {
    return (
      <>
        <CustomHeader title="Favorites" onPress={() => navigation.goBack()} />
        <View style={styles.center}>
          <Text style={styles.emptyText}>Tidak ada produk favorit.</Text>
        </View>
      </>
    );
  }

  return (
    <>
      <CustomHeader title="Favorites" onPress={() => navigation.goBack()} />
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.container}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('Details', {productId: item.id})
            }>
            <Image source={{uri: item.thumbnail}} style={styles.image} />
            <View style={{flex: 1}}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: toDp(16),
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: toDp(16),
    color: '#666',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: toDp(12),
    padding: toDp(12),
    backgroundColor: '#fff',
    borderRadius: toDp(8),
    elevation: 2,
  },
  image: {
    width: toDp(60),
    height: toDp(60),
    resizeMode: 'cover',
    borderRadius: toDp(6),
    marginRight: toDp(12),
  },
  title: {
    fontSize: toDp(16),
    fontWeight: 'bold',
  },
  price: {
    fontSize: toDp(14),
    color: '#2196F3',
    marginTop: toDp(4),
  },
});

export default Favorites;
