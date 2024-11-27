import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, Pressable } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { apiRoute } from '../../apiRoute';


import logoTotal from './Images/logoTotal.png';

export function LoginPage({ navigation }) {
  const [Click, setClick] = useState(null);
  const [dados, setDados] = useState({ login: "", senha: "" });

  const armazenarDadosUsuario = async (token, codusuario = null) => {
    try {
      await AsyncStorage.setItem('token', token);
      if (codusuario) {
        await AsyncStorage.setItem('codusuario', JSON.stringify(codusuario));
        console.log('Dados armazenados:', { token, codusuario });
      }
    } catch (error) {
      console.error('Erro ao armazenar dados:', error);
      Alert.alert('Erro', 'Não foi possível armazenar os dados.');
    }
  };

  const handleLoginResponse = async (response, navigateTo, isUserLogin = false) => {
    if (response) {
      const { token, codusuario } = response.data;
      await armazenarDadosUsuario(token, isUserLogin ? codusuario : null);
      Alert.alert('Login efetuado com sucesso');
      navigation.navigate(navigateTo);
    }
  };

  const handleLoginError = (error) => {
    console.error(error);
    Alert.alert('Erro', 'Credenciais incorretas!');
  };

  const loginUsuario = async () => {
    try {
      const response = await axios.post(`http://${apiRoute}:3000/loginusuarios`, {
        login: dados.login,
        senha: dados.senha,
      });
      await handleLoginResponse(response, 'HomePage', true); 
    } catch (error) {
      handleLoginError(error);
    }
  };

  const loginAdministrador = async () => {
    try {
       const response = await axios.post(`http://${apiRoute}:3000/loginadministradores`, { 
        login: dados.login,
        senha: dados.senha,
      });
      await handleLoginResponse(response, 'HomeAdmPage'); 
    } catch (error) {
      handleLoginError(error);
    }
  };

  const loginColaborador = async () => {
    try {
      const response = await axios.post(`http://${apiRoute}:3000/logincolaboradores`, { 
        login: dados.login,
        senha: dados.senha,
      });
      await handleLoginResponse(response, 'HomeColaboradorPage'); 
    } catch (error) {
      handleLoginError(error);
    }
  };

  const Acess = () => {
    if (Click === 1) {
      loginUsuario();
    } else if (Click === 2) {
      loginColaborador();
    } else if (Click === 3) {
      loginAdministrador();
    } else {
      Alert.alert("Selecione um tipo de usuário");
    }
  };

  return (
    <LinearGradient colors={['#F4E9E3', '#FF914C']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <View style={styles.header}>
          <Image source={logoTotal} style={styles.headerimg} />
        </View>
        <View style={styles.body}>
          <View style={styles.btnstipos}>
            <Pressable onPress={() => setClick(1)} style={[styles.logs, { backgroundColor: Click === 1 ? '#FF914C' : '#fff' }]}>
              <FontAwesome name="user" size={50} color={Click === 1 ? '#fff' : '#EA5D04'} />
              <Text style={[styles.txttipos, { color: Click === 1 ? '#fff' : '#EA5D04' }]}>User</Text>
            </Pressable>
            <Pressable onPress={() => setClick(2)} style={[styles.logs, { backgroundColor: Click === 2 ? '#FF914C' : '#fff' }]}>
              <FontAwesome5 name="chalkboard-teacher" size={50} color={Click === 2 ? '#fff' : '#EA5D04'} />
              <Text style={[styles.txttipos, { color: Click === 2 ? '#fff' : '#EA5D04' }]}>Personal</Text>
            </Pressable>
            <Pressable onPress={() => setClick(3)} style={[styles.logs, { backgroundColor: Click === 3 ? '#FF914C' : '#fff' }]}>
              <Ionicons name="people" size={50} color={Click === 3 ? '#fff' : '#EA5D04'} />  
              <Text style={[styles.txttipos, { color: Click === 3 ? '#fff' : '#EA5D04' }]}>Admin</Text>
            </Pressable>
          </View>
          <TextInput
            style={styles.inputs}
            placeholder="Digite seu Login"
            placeholderTextColor="#666"
            value={dados.login}
            onChangeText={(text) => setDados({ ...dados, login: text })}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Digite sua senha"
            placeholderTextColor="#666"
            secureTextEntry
            value={dados.senha}
            onChangeText={(text) => setDados({ ...dados, senha: text })}
          />
          <TouchableOpacity style={styles.boxbtnacess} onPress={Acess}>
            <Text style={styles.txtbtnlogin}>Acessar</Text>
          </TouchableOpacity>

          <Text style={styles.newuser} onPress={() => navigation.navigate('cadastroLogin')}>
            Não tem uma conta? Cadastrar-se
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 40,
    flexGrow: 1, 
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  headerimg: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
  },
  body: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: '90%',
    height: '48%',
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  btnstipos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  logs: {
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    width: 80,
  },
  imguser: {
    width: 40,
    height: 40,
  },
  txttipos: {
    fontSize: 12,
    color: '#EA5D04',
    marginTop: 5,
  },
  inputs: {
    color: '#000',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    width: '100%',
    height: 45,
    paddingHorizontal: 10,
    marginBottom: 18, 
    borderWidth: 1,
    borderColor: '#ddd',
  },
  boxbtnacess: {
    backgroundColor: '#EA5D04',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 45,
    marginTop: 10,
  },
  txtbtnlogin: {
    color: '#fff',
    fontSize: 16,
  },
  newuser: {
    color: '#000',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
});
