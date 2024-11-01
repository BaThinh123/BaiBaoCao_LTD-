import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
    const navigation = useNavigation();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const loadCart = async () => {
            const cartData = JSON.parse(localStorage.getItem('cart')) || [];
            setCart(cartData);
        };

        loadCart();
    }, []);

    const handleRemoveItem = (id) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleIncreaseQuantity = (id) => {
        const updatedCart = cart.map(item => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleDecreaseQuantity = (id) => {
        const updatedCart = cart.map(item => {
            if (item.id === id && item.quantity > 1) {
                return { ...item, quantity: item.quantity - 1 };
            }
            return item;
        });
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleCheckout = () => {
        if (cart.length > 0) {
            navigation.navigate('thanhtoan'); // Điều hướng đến PaymentScreen
        } else {
            Alert.alert("Giỏ hàng trống", "Vui lòng thêm sản phẩm trước khi thanh toán.");
        }
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.cartItemImage} />
            <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemName}>{item.title}</Text>
                <Text style={styles.cartItemPrice}>{item.price}$ x {item.quantity}</Text>
                <View style={styles.quantityControls}>
                    <TouchableOpacity onPress={() => handleDecreaseQuantity(item.id)} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => handleIncreaseQuantity(item.id)} style={styles.quantityButton}>
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={() => handleRemoveItem(item.id)} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Xóa</Text>
            </TouchableOpacity>
        </View>
    );

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Giỏ Hàng</Text>
            {cart.length === 0 ? (
                <Text style={styles.emptyCart}>Giỏ hàng của bạn đang trống!</Text>
            ) : (
                <FlatList
                    data={cart}
                    renderItem={renderCartItem}
                    keyExtractor={item => item.id.toString()}
                    style={styles.cartList}
                />
            )}
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Tổng: {totalAmount}$</Text>
                <TouchableOpacity onPress={handleCheckout} style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Thanh toán</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f9',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        color: '#333',
        marginVertical: 20,
    },
    emptyCart: {
        textAlign: 'center',
        fontSize: 18,
        color: '#999',
        marginTop: 20,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cartItemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 15,
    },
    cartItemDetails: {
        flex: 1,
        marginRight: 10,
    },
    cartItemName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#444',
        marginBottom: 4,
    },
    cartItemPrice: {
        fontSize: 16,
        color: '#888',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    quantityButton: {
        backgroundColor: '#3498db',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '500',
    },
    quantityText: {
        fontSize: 16,
        marginHorizontal: 10,
    },
    removeButton: {
        backgroundColor: '#e74c3c',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    removeButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '500',
    },
    totalContainer: {
        padding: 15,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        marginTop: 20,
    },
    totalText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    checkoutButton: {
        backgroundColor: '#3498db',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 20,
        marginTop: 15,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default Cart;
