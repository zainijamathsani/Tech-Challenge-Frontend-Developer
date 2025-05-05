import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  LogBox,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import {useDispatch, useSelector} from 'react-redux';
import CustomHeader from '../../Components/CustomHeader';
import NavigatorServices from '../../Helper/NavigatorServices';
import {toDp} from '../../Helper/PercentageToDp';
import {selectCartCount} from '../../Redux/cartSlice';
import {
  fetchCategories,
  fetchProductsByCategory,
} from '../../Redux/productSlice';
import {AppDispatch, RootState} from '../../Redux/store';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const {width} = Dimensions.get('window');

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {items, loading, error, categories} = useSelector(
    (state: RootState) => state.products,
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const cartCount = useSelector(selectCartCount);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProductsByCategory('all'));
    LogBox.ignoreAllLogs();
  }, []);

  const onSelectCategory = (category: string) => {
    setSelectedCategory(category);
    dispatch(fetchProductsByCategory(category));
  };

  const renderShimmer = () => {
    return (
      <View style={styles.viewShimmer}>
        {[...Array(6)].map((_, index) => (
          <ShimmerPlaceHolder
            key={'shimmer-' + Math.random()}
            style={styles.shimmer}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={'Products'} isShadow={false} cartCount={cartCount} />
      {/* CATEGORIES */}
      <View style={styles.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[{slug: 'all', name: 'All'}, ...categories].map((cat, index) => (
            <TouchableOpacity
              key={'' + index}
              onPress={() => onSelectCategory(cat.slug)}
              style={[
                styles.categoryBtn,
                selectedCategory === cat.slug && styles.categorySelected,
              ]}>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat.slug && styles.categoryTextSelected,
                ]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <LinearGradient
        colors={
          Platform.OS === 'android'
            ? ['transparent', '#0F172A']
            : ['#0F172A', 'transparent']
        }
        style={styles.headerLinear}
      />

      {/* PRODUCT LIST */}
      {loading ? (
        renderShimmer()
      ) : error ? (
        <View style={styles.center}>
          <Text>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={item => '' + item.id}
          contentContainerStyle={{padding: toDp(10)}}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => {
                NavigatorServices.navigate('Details', {productId: item.id});
              }}>
              <Image source={{uri: item.thumbnail}} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.title}>{item.title}</Text>
                <Text numberOfLines={2} style={styles.description}>
                  {item.description}
                </Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContainer: {
    paddingVertical: toDp(10),
    paddingHorizontal: toDp(10),
    backgroundColor: 'white',
  },
  categoryBtn: {
    backgroundColor: '#fff',
    paddingVertical: toDp(6),
    paddingHorizontal: toDp(12),
    borderRadius: toDp(20),
    marginRight: toDp(10),
    borderWidth: 1,
    borderColor: '#ccc',
  },
  categorySelected: {
    backgroundColor: '#0a84ff',
    borderColor: '#0a84ff',
  },
  categoryText: {
    fontSize: toDp(12),
    color: '#333',
  },
  categoryTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: toDp(10),
    marginBottom: toDp(10),
    padding: toDp(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  viewShimmer: {
    alignItems: 'center',
  },
  shimmer: {
    width: '94%',
    height: toDp(110),
    borderRadius: toDp(8),
    marginTop: toDp(10),
  },
  image: {
    width: toDp(80),
    height: toDp(80),
    borderRadius: toDp(10),
    resizeMode: 'cover',
    backgroundColor: '#cccccc26',
  },
  info: {
    flex: 1,
    marginLeft: toDp(10),
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: toDp(14),
  },
  description: {
    fontSize: toDp(12),
    color: '#555',
  },
  price: {
    fontSize: toDp(13),
    fontWeight: '600',
    color: '#0a84ff',
  },
  headerLinear: {
    width,
    height: toDp(4),
    opacity: Platform.OS === 'android' ? toDp(0.1) : toDp(0.2),
    transform: [{rotate: '180deg'}],
  },
});

export default Products;
