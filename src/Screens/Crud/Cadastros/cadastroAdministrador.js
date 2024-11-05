import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, TouchableHighlight, Modal } from 'react-native';
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';

export function CadastroAdministrador({ navigation }) {
  const [administrador, setAdministrador] = useState({
    nome: '',
    cpf: '',
    login: '',
    senha: '',
  });

  const [modalVisible, setModalVisible] = useState(false);

  const inserirAdministrador = async () => {
    try {
      await axios.post(
        'http://localhost:3000/administradores',
        administrador,
        { headers: { 'Content-Type': 'application/json' } }
      );

      Alert.alert('Sucesso', 'Administrador cadastrado!');
      setAdministrador({ nome: '', cpf: '', login: '', senha: '' });
      setModalVisible(true); 
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o administrador.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight
          style={styles.seta}
          underlayColor={null}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableHighlight>
        <Text style={styles.txtheader}>Cadastro Administrador</Text>
      </View>

      <View style={styles.body}>
        <TextInput
          style={styles.inputs}
          placeholder="Nome"
          value={administrador.nome}
          onChangeText={(text) => setAdministrador({ ...administrador, nome: text })}
        />

        <TextInput
          style={styles.inputs}
          placeholder="CPF"
          value={administrador.cpf}
          onChangeText={(text) => setAdministrador({ ...administrador, cpf: text })}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.inputs}
          placeholder="Login"
          value={administrador.login}
          onChangeText={(text) => setAdministrador({ ...administrador, login: text })}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Senha"
          value={administrador.senha}
          onChangeText={(text) => setAdministrador({ ...administrador, senha: text })}
          secureTextEntry
        />

        <TouchableOpacity style={styles.btn} onPress={inserirAdministrador}>
          <Text style={styles.txtbtn}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Parabéns!</Text>
            <Text style={styles.modalMessage}>
              O cadastro do administrador foi concluído com sucesso.
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
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
    marginTop: 30,
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
    backgroundColor: '#FF9756',
    borderRadius: 12,
    elevation: 2,
    alignItems: 'center',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
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
    backgroundColor: '#EA5D04',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  modalButtonText: {
    fontSize: 18,
    color: '#000',
  },
});
