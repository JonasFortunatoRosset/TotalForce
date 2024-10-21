import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export function CadastroUsuario() {
  const [usuario, setUsuario] = useState({
    nome: "",
    cpf: "",
    endereco: "",
    senha: "",
    peso: "",
    altura: "",
    codplano: "",
    status: "Ativo"
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [planos, setPlanos] = useState([]); 

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.error('Erro ao recuperar o token:', error);
      return null;
    }
  };

  const buscarPlanos = async () => {
    const token = await getToken();

    if (!token) {
      Alert.alert('Erro', 'Token não encontrado. Faça login novamente.');
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/planos", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPlanos(response.data); 
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar os planos.');
      console.error(error);
    }
  };

  const inserirUsuarios = async () => {
    const token = await getToken();

    if (!token) {
      Alert.alert('Erro', 'Token não encontrado. Faça login novamente.');
      return;
    }

    axios
      .post(
        "http://localhost:3000/usuarios",
        {
          nome: usuario.nome,
          cpf: usuario.cpf,
          endereco: usuario.endereco,
          senha: usuario.senha,
          peso: usuario.peso,
          altura: usuario.altura,
          status: usuario.status,
          codplano: usuario.codplano
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      .then(() => {
        Alert.alert("Sucesso", "Usuário foi cadastrado");
        setUsuario({
          nome: "",
          cpf: "",
          endereco: "",
          senha: "",
          peso: "",
          altura: "",
          codplano: "",
          status: "Ativo"
        });
        setModalVisible(false);
        setStatusModalVisible(false);
      })
      .catch((error) => {
        Alert.alert("Erro", "Não foi possível cadastrar o usuário");
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txtheader}>Cadastro de Usuário</Text>
      </View>

      <View style={styles.body}>
        <TextInput
          style={styles.inputs}
          placeholder="Nome"
          value={usuario.nome}
          onChangeText={(text) => setUsuario({ ...usuario, nome: text })}
        />

        <TextInput
          style={styles.inputs}
          placeholder="CPF"
          value={usuario.cpf}
          onChangeText={(text) => setUsuario({ ...usuario, cpf: text })}
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

        <TouchableOpacity 
          style={styles.inputs} 
          onPress={() => setStatusModalVisible(true)}
        >
          <Text style={styles.placeholderText}>
            {usuario.status}
          </Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={statusModalVisible}
          onRequestClose={() => setStatusModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Picker
                selectedValue={usuario.status}
                onValueChange={(itemValue) => {
                  setUsuario({ ...usuario, status: itemValue });
                  setStatusModalVisible(false);
                }}
                style={styles.picker}
              >
                <Picker.Item label="Ativo"      value="Ativo" />
                <Picker.Item label="Inativo"    value="Inativo" />
                <Picker.Item label="Em Análise" value="Em Análise" />
                <Picker.Item label="Recusado"   value="Recusado" />
              </Picker>

              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setStatusModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity 
          style={styles.inputs} 
          onPress={() => {
            buscarPlanos(); 
            setModalVisible(true);
          }}
        >
          <Text style={styles.placeholderText}>
            {usuario.codplano ? `Plano: ${usuario.codplano}` : "Selecione um plano"}
          </Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Picker
                selectedValue={usuario.codplano}
                onValueChange={(itemValue) => {
                  setUsuario({ ...usuario, codplano: itemValue });
                  setModalVisible(false);
                }}
                style={styles.picker}
              >
                <Picker.Item label="Selecione um plano" value="" />
                {planos.map((plano) => (
                  <Picker.Item key={plano.id} label={plano.nome} value={plano.id} />
                ))}
              </Picker>

              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.btn} onPress={inserirUsuarios}>
          <Text style={styles.txtbtn}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB031',
  },
  header: {
    backgroundColor: '#E49413',
    width: '100%',
    height: '8%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtheader: {
    fontSize: 20,
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
  placeholderText: {
    color: '#888',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    height: '50%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    height: 150,
    width: '100%',
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#FFB031',
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#000',
    fontSize: 16,
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
});