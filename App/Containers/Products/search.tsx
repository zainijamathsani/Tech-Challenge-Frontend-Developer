import axios from 'axios';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import {toDp} from '../../Helper/PercentageToDp';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const Search = ({navigation}: any) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const searchProducts = async (searchText: string) => {
    if (!searchText.trim()) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `https://dummyjson.com/products/search?q=${searchText}`,
      );
      setResults(res.data.products);
    } catch (err) {
      console.log('Error searching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setQuery(text);
    searchProducts(text);
  };

  const renderItem = ({item}: {item: Product}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', {productId: item.id})}>
      <Image source={{uri: item.thumbnail}} style={styles.image} />
      <View style={{marginLeft: toDp(12)}}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Search Products"
        onPress={() => navigation.goBack()}
      />
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Search products..."
          value={query}
          onChangeText={handleSearch}
          style={styles.input}
          autoFocus={true}
        />
      </View>
      {loading ? (
        <Text style={styles.loading}>Searching...</Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: toDp(20)}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  searchBox: {
    paddingHorizontal: toDp(16),
    paddingVertical: toDp(8),
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: toDp(8),
    padding: toDp(10),
    backgroundColor: '#fff',
  },
  loading: {
    textAlign: 'center',
    marginTop: toDp(20),
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: toDp(12),
    marginHorizontal: toDp(16),
    marginTop: toDp(10),
    borderRadius: toDp(8),
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },
  image: {
    width: toDp(60),
    height: toDp(60),
    borderRadius: toDp(8),
    backgroundColor: '#E2E8F0',
  },
  title: {
    fontSize: toDp(16),
    fontWeight: '600',
    color: '#0F172A',
  },
  price: {
    marginTop: toDp(4),
    color: '#64748B',
  },
});

export default Search;
