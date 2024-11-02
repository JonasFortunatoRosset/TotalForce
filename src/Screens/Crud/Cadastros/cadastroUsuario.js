import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

export function CadastroUsuario() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState({
    nome: "",
    login: "",
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

  useEffect(() => {
    buscarPlanos();
  }, []);

  const buscarPlanos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/planos", {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setPlanos(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar os planos.');
      console.error(error);
    }
  };

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
          codplano: usuario.codplano, 
      }, {
          headers: { 'Content-Type': 'application/json' },
      });

      Alert.alert("Sucesso", "Usuário foi cadastrado");
      setUsuario({
        nome: "",
        login: "",
        endereco: "",
        senha: "",
        peso: "",
        altura: "",
        codplano: "",
        status: "Ativo",
      });
      setModalVisible(false);
      setStatusModalVisible(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cadastrar o usuário");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
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
          secureTextEntry
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
          <Text style={styles.placeholderText}>{usuario.status}</Text>
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
                <Picker.Item label="Ativo" value="Ativo" />
                <Picker.Item label="Inativo" value="Inativo" />
                <Picker.Item label="Em Análise" value="Em Análise" />
                <Picker.Item label="Recusado" value="Recusado" />
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
          onPress={() => setModalVisible(true)}
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
                  if (itemValue) {
                    setUsuario({ ...usuario, codplano: parseInt(itemValue, 10) });
                    setModalVisible(false);
                  } else {
                    Alert.alert('Por favor, selecione um plano válido.');
                  }
                }}
                style={styles.picker}
              >
                <Picker.Item label="Selecione um plano" value="" />
                {planos.map((plano) => (
                  <Picker.Item key={plano.codigo} label={plano.nome} value={plano.codigo} />
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
  backButton: {
    marginRight: 15,
  },
  txtheader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  color:{
    backgroundColor: '#E49413'
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
    justifyContent: 'center',
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
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  picker: {
    height: 150,
    width: '100%',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FFB031',
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#000',
    fontSize: 16,
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
