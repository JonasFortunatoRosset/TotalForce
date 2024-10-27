import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, Alert, 
  TouchableOpacity, TouchableHighlight, Modal 
} from 'react-native';
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';

export function CadastroLogin({ navigation }) {
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

  const [modalVisible, setModalVisible] = useState(false);

  const inserirUsuarios = async () => {
    try {
      await axios.post("http://localhost:3000/usuarios", {
        nome: usuario.nome,
        login: usuario.login,
        endereco: usuario.endereco,
        senha: usuario.senha,
        peso: usuario.peso,
        altura: usuario.altura,
        status: usuario.status,
        codplano: usuario.codplano
      });

      setUsuario({
        nome: "",
        login: "",
        endereco: "",
        senha: "",
        peso: "",
        altura: ""
      });

      setModalVisible(true); 

    } catch (error) {
      Alert.alert("Erro", "Não foi possível cadastrar o usuário.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
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

     <View style={styles.color}>
      <View style={styles.body}>
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
          placeholder="Endereço"
          value={usuario.endereco}
          onChangeText={(text) => setUsuario({ ...usuario, endereco: text })}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Senha"
          value={usuario.senha}
          onChangeText={(text) => setUsuario({ ...usuario, senha: text })}
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

        <TouchableOpacity style={styles.btn} onPress={inserirUsuarios}>
          <Text style={styles.txtbtn}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Parabéns</Text>
            <Text style={styles.modalMessage}>
              Seu cadastro foi concluído, aguarde a confirmação de um administrador para poder realizar login.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('LoginPage');
              }}
            >
              <Text style={styles.modalButtonText}>Entendi!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E49413',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E49413',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    elevation: 4,
    marginTop: 30,
  },
  seta: {
    marginRight: 15,
  },
  txtheader: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  color:{
    backgroundColor: '#FFB031',
  },
  body: {
    backgroundColor: '#E49413',
    height: '80%',
    margin: 20,
    padding: 15,
    alignItems: 'center',
  },
  inputs: {
    color: '#000',
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    width: 300,
    height: 45,
    padding: 10,
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFB031',
    borderRadius: 12,
    width: 300,
    height: 45,
  },
  txtbtn: {
    color: '#000',
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#FFB031',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  modalButtonText: {
    color: '#000',
    fontSize: 18,
  },
});
