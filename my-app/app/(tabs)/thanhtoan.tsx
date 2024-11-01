import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Modal } from 'react-native';

const PaymentScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handlePayment = () => {
    if (!name || !email || !address || !cardNumber) {
      Alert.alert('Thông báo', 'Vui lòng điền tất cả các thông tin!');
      return;
    }
    // Xử lý thanh toán ở đây
    setModalVisible(true); // Hiển thị modal thông báo thanh toán thành công
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh Toán</Text>
      <TextInput
        style={styles.input}
        placeholder="Họ và tên"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Địa chỉ giao hàng"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Số thẻ tín dụng"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
      />
      <Button title="Hoàn tất thanh toán" onPress={handlePayment} />

      {/* Modal hiển thị thông báo thanh toán thành công */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Thanh toán thành công!</Text>
            <Button title="Đóng" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 18,
    textAlign: 'center',
  },
});

export default PaymentScreen;
