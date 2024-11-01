import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Logo = () => (
  <Image 
    source={{ uri: 'https://sgweb.vn/wp-content/uploads/2022/12/cac-mau-logo-shop-quan-ao-thoi-trang-dep-va-tinh-te.jpg' }} 
    style={styles.logo} 
  />
);

const App = () => {
  const navigation = useNavigation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/data')
      .then(res => res.json())
      .then(json => setProducts(json))
      .catch(err => console.error(err));

    // Load cart from localStorage
    const loadCart = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartItems(storedCart);
    };
    loadCart();
  }, []);

  const handleAddToCart = (product) => {
    const existingProduct = cartItems.find(item => item.id === product.id);
    let newCart;
    if (existingProduct) {
      newCart = cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cartItems, { ...product, quantity: 1 }];
    }
    setCartItems(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart)); // Save to localStorage
    alert('Đã thêm vào giỏ hàng!');
    navigation.navigate('giohang', { cartItems: newCart }); // Navigate to cart page
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => setSelectedProduct(item)}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{item.price} </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Logo />
        <Text style={styles.headerTitle}>Trang Chủ</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sản phẩm..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        
        <TouchableOpacity 
          style={styles.cartButton} 
          onPress={() => navigation.navigate('giohang', { cartItems })}>
          <Icon name="shopping-cart" size={20} color="#fff" />
          <Text style={styles.cartButtonText}>Giỏ Hàng ({cartItems.length})</Text>
        </TouchableOpacity>
      </View>

      {selectedProduct ? (
<View style={styles.detailContainer}>
          <Text style={styles.title}>{selectedProduct.title}</Text>
          <Image source={{ uri: selectedProduct.image }} style={styles.detailImage} />
          <Text>{selectedProduct.description}</Text>
          <Text style={styles.price}>{selectedProduct.price} $</Text>
          <Button
            title="Thêm vào giỏ hàng"
            onPress={() => handleAddToCart(selectedProduct)}
          />
          <TouchableOpacity onPress={() => setSelectedProduct(null)}>
            <Text style={styles.backButton}>Quay lại danh sách sản phẩm</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 200, 
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  searchInput: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '100%',
  },
  cartButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3498db',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  productInfo: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: 'green',
    marginTop: 5,
  },
  detailContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  detailImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  backButton: {
    marginTop: 20,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default App;