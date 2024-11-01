import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePhoneInput = (text) => {
    const numericText = text.replace(/[^0-9]/g, '');
    setPhone(numericText);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleRegister = () => {
    if (username === '' || password === '' || phone === '') {
      Alert.alert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    fetch('https://671a07bfacf9aa94f6a8d06e.mockapi.io/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        phone: phone,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.id) {
          Alert.alert('Đăng ký thành công', 'Tài khoản của bạn đã được tạo.');
          navigation.navigate('index');
        } else {
          Alert.alert('Đăng ký thất bại', 'Đã xảy ra lỗi trong quá trình đăng ký.');
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Lỗi', 'Đã xảy ra lỗi trong quá trình đăng ký. Vui lòng thử lại.');
      });
  };

  return (
    <View style={styles.container}>
      {/* Chữ Đăng ký ở giữa */}
      <Text style={styles.title}>Đăng Ký</Text>

      {/* Input cho tên người dùng */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={24} color="#777" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Tên người dùng"
          placeholderTextColor="#777"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* Input cho điện thoại */}
      <View style={styles.inputContainer}>
        <Ionicons name="call-outline" size={24} color="#777" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Điện thoại"
          placeholderTextColor="#777"
          value={phone}
          onChangeText={handlePhoneInput}
          keyboardType="numeric"
          maxLength={10}
        />
      </View>

      {/* Input cho mật khẩu */}
      <View style={styles.passwordContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="#777" style={styles.icon} />
        <TextInput
          style={styles.passwordInput}
          placeholder="Mật khẩu"
          placeholderTextColor="#777"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="#777" />
        </TouchableOpacity>
      </View>

      {/* Nút Đăng ký */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng Ký</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f7fa',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    height: 50,
    marginLeft: 10,
    fontSize: 16,
  },
  passwordContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    paddingRight: 50,
    fontSize: 16,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 13,
  },
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default RegisterScreen;
