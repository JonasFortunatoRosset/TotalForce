import { StyleSheet, Text, View, TextInput, Alert, TouchableOpacity, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export function CadastroTreino() {
  const navigation = useNavigation();
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

  const fetchPlanos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/planos');
      setPlanos(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os planos.');
      console.error(error);
    }
  };

  const inserirTreino = async () => {
    try {
      await axios.post('http://localhost:3000/treinos', {
        nome: treino.nome,
        descricao: treino.descricao,
        codplano: treino.codplano,
      });
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.txtheader}>Cadastro de Treinos</Text>
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
                  setTreino({ ...treino, codplano: parseInt(itemValue) });
                  setModalVisible(false);
                }}
                style={styles.picker}
              >
                <Picker.Item label="Selecione um plano" value="" />
                {planos.map((plano) => (
                  <Picker.Item key={plano.codigo} label={plano.nome} value={plano.codigo} />
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
    justifyContent: 'center'
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
