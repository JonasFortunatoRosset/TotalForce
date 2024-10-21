import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

export function CadastroTreino() {
  const [treino, setTreino] = useState({
    nome: '',
    descricao: '',
    codplano: '',
  });

  const [planos, setPlanos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    fetchPlanos(); 
  }, []);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.error('Erro ao recuperar o token:', error);
      return null;
    }
  };

  const fetchPlanos = async () => {
    const token = await getToken();
    if (!token) {
      Alert.alert('Erro', 'Token não encontrado. Faça login novamente.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/planos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlanos(response.data); 
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os planos.');
      console.error(error);
    }
  };

  const inserirTreino = async () => {
    const token = await getToken();
    if (!token) {
      Alert.alert('Erro', 'Token não encontrado. Faça login novamente.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:3000/treinos',
        { ...treino },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      Alert.alert('Sucesso', 'Treino cadastrado com sucesso!');
      setTreino({ nome: '', descricao: '', codplano: '' });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível cadastrar o treino.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txtheader}>Cadastro de Treino</Text>
      </View>

      <View style={styles.body}>
        <TextInput
          style={styles.inputs}
          placeholder="Nome do Treino"
          value={treino.nome}
          onChangeText={(text) => setTreino({ ...treino, nome: text })}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Descrição"
          value={treino.descricao}
          onChangeText={(text) => setTreino({ ...treino, descricao: text })}
        />

        <TouchableOpacity style={styles.inputs} onPress={() => setModalVisible(true)}>
          <Text style={styles.placeholderText}>
            {treino.codplano ? `Plano: ${treino.codplano}` : 'Selecionar Plano'}
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
                selectedValue={treino.codplano}
                onValueChange={(itemValue) => {
                  setTreino({ ...treino, codplano: itemValue });
                  setModalVisible(false);
                }}
                style={styles.picker}
              >
                <Picker.Item label="Selecione um plano" value="" />
                {planos.map((plano) => (
                  <Picker.Item
                    key={plano.id}
                    label={plano.nome}
                    value={plano.codplano}
                  />
                ))}
              </Picker>

              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.btn} onPress={inserirTreino}>
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#FFB031',
    width: 300,
    height: 45,
  },
  txtbtn: {
    color: '#000',
    fontSize: 20,
  },
});