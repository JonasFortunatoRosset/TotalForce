import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, TouchableHighlight, Image } from 'react-native';
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiRoute } from '../../../../apiRoute';

import logoTotal from '../../Images/logoTotal.png';

export function CadastroLogin({ navigation }) {
  const [etapa, setEtapa] = useState(1); 
  const [usuario, setUsuario] = useState({
    nome: "",
    login: "",
    endereco: "",
    senha: "",
    peso: "",
    altura: "",
    codplano: 1,
    status: "Em Análise"
  });


  const verificarCamposEtapa1 = () => {
    const { nome, login, senha } = usuario;
    if (!nome || !login || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos da primeira etapa.');
      return false;
    }
    return true;
  };

  const avancarEtapa = () => {
    if (verificarCamposEtapa1()) {
      setEtapa(2); 
    }
  };

  const inserirUsuarios = async () => { 
    if (!usuario.endereco || !usuario.peso || !usuario.altura ) {
      Alert.alert("Erro", "Por favor, preencha todos os campos .");
      return;
    }
    
    console.log("Dados do usuário:", usuario); 
  
    try {
      await axios.post(`http://${apiRoute}:3000/usuarios`, {
        nome: usuario.nome,
        login: usuario.login,
        endereco: usuario.endereco,
        senha: usuario.senha,
        peso: usuario.peso,
        altura: usuario.altura,
        status: usuario.status,
        codplano: parseInt(usuario.codplano, 10), 
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      Alert.alert("Seu cadastro foi concluído. Aguarde a confirmação de um administrador para realizar login.")
      setUsuario({
        nome: "",
        login: "",
        endereco: "",
        senha: "",
        peso: "",
        altura: "",
        codplano: 1,
        status: "Ativo"
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cadastrar o usuário");
      console.error("Erro ao cadastrar usuário:", error.response?.data || error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight
          style={styles.seta}
          underlayColor={null}
          onPress={() => navigation.navigate('LoginPage')}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableHighlight>
        <Text style={styles.txtheader}>Cadastro de Usuário</Text>
      </View>
  
      {etapa === 1 ? (
        <>
          <View style={styles.logoContainer}>
            <Image source={logoTotal} style={styles.logo} />
            <Text style={styles.welcomeText}>Bem Vindo!</Text>
            <Text style={styles.welcomeText}>Faça seu cadastro para começar!</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.titulo}>Etapa 1 de 2</Text>
            <TextInput
              style={styles.inputs}
              placeholder="Nome"
              value={usuario.nome}
              onChangeText={(text) => setUsuario({ ...usuario, nome: text })}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Login"
              value={usuario.login}
              onChangeText={(text) => setUsuario({ ...usuario, login: text })}
            />
            <TextInput
              style={styles.inputs}
              placeholder="Senha"
              value={usuario.senha}
              onChangeText={(text) => setUsuario({ ...usuario, senha: text })}
              secureTextEntry
            />
            <TouchableOpacity style={styles.btn} onPress={avancarEtapa}>
              <Text style={styles.txtbtn}>Avançar</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.body}>
          <Text style={styles.titulo}>Etapa 2 de 2</Text>
          <TextInput
            style={styles.inputs}
            placeholder="Endereço"
            value={usuario.endereco}
            onChangeText={(text) => setUsuario({ ...usuario, endereco: text })}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Peso"
            value={usuario.peso}
            onChangeText={(text) => setUsuario({ ...usuario, peso: text })}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.inputs}
            placeholder="Altura"
            value={usuario.altura}
            onChangeText={(text) => setUsuario({ ...usuario, altura: text })}
            keyboardType="numeric"
          />
  
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.btnPequeno} onPress={() => setEtapa(1)}>
              <Text style={styles.txtbtn}>Voltar</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.btnPequeno} onPress={inserirUsuarios}>
              <Text style={styles.txtbtn}>Concluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff'
  },
  seta: {
    marginRight: 15,
  },
  txtheader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  body: {
    margin: 20,
    padding: 15,
    backgroundColor: '#FF914C',
    borderRadius: 12,
    elevation: 2,
    alignItems: 'center',
  },
  logo: {
    width: 340,
    height: 270,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 15,
  },
  inputs: {
    width: '100%',
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  btn: {
    width: '100%',
    height: 45,
    backgroundColor: '#EA5D04',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  txtbtn: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  btnPequeno: {
    width: '50%', 
    height: 45,
    backgroundColor: '#EA5D04',
    borderRadius: 12,
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },  
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
