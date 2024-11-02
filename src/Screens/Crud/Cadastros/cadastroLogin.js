import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, TouchableHighlight, Modal } from 'react-native';
import axios from 'axios';
import AntDesign from '@expo/vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';

export function CadastroLogin({ navigation }) {
  const [etapa, setEtapa] = useState(1); 
  const [usuario, setUsuario] = useState({
    nome: '',
    login: '',
    endereco: '',
    senha: '',
    peso: '',
    altura: '',
    codplano: 1,
    status: 'Em Análise',
  });

  const [modalVisible, setModalVisible] = useState(false);

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
    try {
      await axios.post('http://localhost:3000/usuarios', usuario);

      setUsuario({
        nome: '',
        login: '',
        endereco: '',
        senha: '',
        peso: '',
        altura: '',
      });

      setModalVisible(true); 
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o usuário.');
      console.error(error);
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

      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Parabéns!</Text>
            <Text style={styles.modalMessage}>
              Seu cadastro foi concluído. Aguarde a confirmação de um administrador para realizar login.
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
    </SafeAreaView>
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
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#E49413'
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
    backgroundColor: '#FFB031',
    borderRadius: 12,
    elevation: 2,
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
    backgroundColor: '#E49413',
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
    width: '48%', 
    height: 45,
    backgroundColor: '#E49413',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
    fontSize: 18,
    color: '#000',
  },
});
