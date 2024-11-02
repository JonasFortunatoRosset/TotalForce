import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from 'axios';

export function CadastroColaborador({ navigation }) {
  const [colaborador, setColaborador] = useState({
    nome: '',
    cpf: '',
    endereco: '',
    cidade: '',
    senha: '',
    login: '',
  });

  const inserirColaborador = async () => {
    try {
      const response = await axios.post('http://localhost:3000/colaboradores', {
        nome: colaborador.nome,
        cpf: colaborador.cpf,
        endereco: colaborador.endereco,
        senha: colaborador.senha,
        login: colaborador.login,
        status: 'Ativo',
      });

      Alert.alert("Sucesso", "Personal cadastrado com sucesso");
      setColaborador({
        nome: "",
        cpf: "",
        endereco: "",
        cidade: "",
        senha: "",
        login: ""
      });
    } catch (error) {
      Alert.alert('Erro', 'Erro ao cadastrar o colaborador');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.seta}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.txtheader}>Cadastro de colaborador</Text>
      </View>

      <View style={styles.body}>
        <TextInput
          style={styles.inputs}
          placeholder="Nome"
          value={colaborador.nome}
          onChangeText={(text) => setColaborador({ ...colaborador, nome: text })}
        />

        <TextInput
          style={styles.inputs}
          placeholder="CPF"
          value={colaborador.cpf}
          onChangeText={(text) => setColaborador({ ...colaborador, cpf: text })}
          keyboardType="numeric"
        />

        <TextInput
          style={styles.inputs}
          placeholder="Endereço"
          value={colaborador.endereco}
          onChangeText={(text) => setColaborador({ ...colaborador, endereco: text })}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Senha"
          value={colaborador.senha}
          secureTextEntry
          onChangeText={(text) => setColaborador({ ...colaborador, senha: text })}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Login"
          value={colaborador.login}
          onChangeText={(text) => setColaborador({ ...colaborador, login: text })}
        />

        <TouchableOpacity style={styles.btn} onPress={inserirColaborador}>
          <Text style={styles.txtbtn}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#E49413',
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
    backgroundColor: '#FFB031',
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
});
