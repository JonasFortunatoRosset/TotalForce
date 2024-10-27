import { View,ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, TouchableHighlight, Image, Alert, Pressable } from 'react-native';
import axios from 'axios';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import personal from './Images/personal.png';
import user from './Images/user.png';
import adm from './Images/adm.png';
import logoTotal from './Images/logoTotal.png';

export function LoginPage({ navigation }) {
  const [Click, setClick] = useState(null);

  function boxClick(buttonIndex) {
    setClick(buttonIndex);
  }

  const armazenarDadosUsuario = async (token, codusuario) => {
    try {
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('codusuario', JSON.stringify(codusuario));
      console.log('Dados armazenados:', { token, codusuario });
    } catch (error) {
      console.error('Erro ao armazenar dados:', error);
      Alert.alert('Erro', 'Não foi possível armazenar os dados.');
    }
  };

  const loginUsuario = async () => {
    try {
      const response = await axios.post('http://localhost:3000/loginusuarios', {
        login: dados.login,
        senha: dados.senha,
      });

      setDados({
        login: "",
        senha: "",
      });
      if (response) {
        const { token, codusuario } = response.data;
        await armazenarDadosUsuario(token, codusuario);
        Alert.alert('Login efetuado com sucesso');
        navigation.navigate('HomePage');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Credenciais incorretas!');
    }
  };

  const loginAdministrador = async () => {
    try {
      const response = await axios.post('http://localhost:3000/loginadministradores', {
        login: dados.login,
        senha: dados.senha,
      });

      setDados({
        login: "",
        senha: "",
      });
      if (response) {
        const { token } = response.data;
        await armazenarDadosUsuario(token);
        Alert.alert('Login efetuado com sucesso');
        navigation.navigate('LoginAdmPage');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Credenciais incorretas!');
    }
  };

  const loginColaborador = async () => {
    try {
      const response = await axios.post('http://localhost:3000/logincolaboradores', {
        login: dados.login,
        senha: dados.senha,
      });

      setDados({
        login: "",
        senha: "",
      });
      if (response) {
        const { token } = response.data;
        await armazenarDadosUsuario(token);
        Alert.alert('Login efetuado com sucesso');
        navigation.navigate('HomeColaboradorPage');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Credenciais incorretas!');
    }
  };

  function Acess() {
    if (Click === 1) {
      loginUsuario();
    } else if (Click === 2) {
      loginColaborador();
    } else if (Click === 3) {
      loginAdministrador();
    } else {
      Alert.alert("Usuário ou senha incorreto");
    }
  }

  const [dados, setDados] = useState({
    login: "",
    senha: "",
  });

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Image source={logoTotal} style={styles.headerimg} />
      </View>
      <View style={styles.body}>
        <View style={styles.boxlogin}>
          <View style={styles.btnstipos}>
            <Pressable
              onPress={() => boxClick(1)}
              style={[
                styles.logs,
                { backgroundColor: Click === 1 ? '#FFB031' : '#E49413' },
              ]}
            >
              <Image source={user} style={styles.imguser} />
              <Text style={styles.txttipos}> Usuário </Text>
            </Pressable>
  
            <Pressable
              onPress={() => boxClick(2)}
              style={[
                styles.logs,
                { backgroundColor: Click === 2 ? '#FFB031' : '#E49413' },
              ]}
            >
              <Image source={personal} style={styles.imguser} />
              <Text style={styles.txttipos}> Personal </Text>
            </Pressable>
  
            <Pressable
              onPress={() => boxClick(3)}
              style={[
                styles.logs,
                { backgroundColor: Click === 3 ? '#FFB031' : '#E49413' },
              ]}
            >
              <Image source={adm} style={styles.imguser} />
              <Text style={styles.txttipos}> Admin </Text>
            </Pressable>
          </View>
  
          <View style={styles.boxbtn}>
            <TextInput
              style={styles.inputs}
              placeholder='Login'
              placeholderTextColor={'#000'}
              value={dados.login}
              onChangeText={(text) => setDados({ ...dados, login: text })}
            />
  
            <TextInput
              style={styles.inputs}
              placeholder='Senha'
              placeholderTextColor={'#000'}
              value={dados.senha}
              onChangeText={(text) => setDados({ ...dados, senha: text })}
              secureTextEntry={true}
            />
  
            <TouchableOpacity onPress={Acess} style={styles.boxbtnacess}>
              <Text style={styles.txtbtnlogin}> Acessar </Text>
            </TouchableOpacity>
          </View>
  
          <TouchableHighlight 
            onPress={() => navigation.navigate('cadastroLogin')} 
            underlayColor={null}
          >
            <Text style={styles.newuser}>Não tem uma conta? Cadastrar-se</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  )};
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFB031',
    },
    scrollContent: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40, 
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginBottom: 20,
    },
    headerimg: {
      width: 340,
      height: 320,
      resizeMode: 'contain',
    },
    imguser: {
      width: 60,
      height: 60,
      marginTop: 10,
    },
    body: {
      backgroundColor: '#E49413',
      borderRadius: 15,
      width: '90%',
      padding: 20,
    },
    boxlogin: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnstipos: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginBottom: 20,
    },
    logs: {
      alignItems: 'center',
      paddingTop: 5,
      paddingBottom: 5,
      paddingHorizontal: 10,
      borderRadius: 8,
      marginHorizontal: 10,
    },
    txttipos: {
      fontSize: 12,
    },
    boxbtn: {
      flexDirection: 'column',
      margin: 5,
      alignItems: 'flex-end',
    },
    inputs: {
      color: '#000',
      marginBottom: 15,
      borderRadius: 12,
      backgroundColor: '#fff',
      width: 300,
      height: 45,
      padding: 10,
    },
    boxbtnacess: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      borderRadius: 12,
      backgroundColor: '#FFB031',
      width: 300,
      height: 45,
    },
    txtbtnlogin: {
      color: '#000',
      fontSize: 20,
    },
    newuser: {
      color: '#004cff',
      fontSize: 12,
      textAlign: 'left',
      marginBottom: 10,
      alignSelf: 'flex-start',
    },
  });
