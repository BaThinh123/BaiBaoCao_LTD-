import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Nhập thư viện biểu tượng Ionicons
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State để kiểm soát việc hiển thị mật khẩu

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible); // Chuyển đổi trạng thái hiển thị mật khẩu
  };

  const handleLogin = () => {
    // Lấy danh sách người dùng từ API
    fetch('https://671a07bfacf9aa94f6a8d06e.mockapi.io/user', {
      method: 'GET', // Sử dụng GET để lấy dữ liệu
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => {
        // Kiểm tra xem username và password có trùng khớp với dữ liệu API không
        const user = json.find((user) => user.username === username && user.password === password);
        if (user) {
          // Nếu đăng nhập thành công
          navigation.navigate('trangchu');
        } else {
          // Nếu đăng nhập không thành công
          Alert.alert('Đăng nhập thất bại', 'Sai tên người dùng hoặc mật khẩu. Vui lòng thử lại.');
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Lỗi', 'Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.');
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://tse4.mm.bing.net/th?id=OIP.y79ijHCTQaTcc-cUeG3UBgHaHa&pid=Api&P=0&h=220' }} 
        style={styles.logo}
      />
      
      <View style={styles.inputContainer}>
        <Ionicons name="person-outline" size={24} color="#aaa" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Tên người dùng"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.passwordContainer}>
        <Ionicons name="lock-closed-outline" size={24} color="#aaa" style={styles.icon} />
        <TextInput
          style={styles.passwordInput}
          placeholder="Mật khẩu"
          placeholderTextColor="#aaa"
          secureTextEntry={!isPasswordVisible} // Hiển thị mật khẩu dựa trên trạng thái
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <Ionicons
            name={isPasswordVisible ? "eye-off" : "eye"}
            size={24}
            color="#aaa"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng Nhập</Text>
      </TouchableOpacity>
      
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.noAccountText}>Bạn chưa có tài khoản?</Text>
        <TouchableOpacity>
          <Text style={styles.registerText} onPress={() => navigation.navigate('dk')}>Đăng ký ngay</Text>
        </TouchableOpacity>
      </View>
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
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 40, // Tăng khoảng cách giữa logo và ô nhập
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16, // Tăng kích thước font
    color: '#333', // Màu chữ tối hơn
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingRight: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  passwordInput: {
    flex: 1,
    height: 50,
    fontSize: 16, // Tăng kích thước font
    color: '#333', // Màu chữ tối hơn
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 13,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotPassword: {
    color: '#3b82f6',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 10, // Thêm khoảng cách giữa đường dẫn quên mật khẩu và phần đăng ký
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  noAccountText: {
    fontSize: 14,
    color: '#333',
  },
  registerText: {
    fontSize: 14,
    color: '#3b82f6',
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
