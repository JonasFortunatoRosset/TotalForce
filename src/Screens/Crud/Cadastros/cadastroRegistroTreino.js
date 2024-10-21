import { StyleSheet, Text, View, ScrollView, TextInput, Alert, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

export function CadastroRegistroTreino() {
  const [registroTreino, setRegistroTreino] = useState({
    exercicio1: "",
    exercicio2: "",    
    exercicio3: "",
    exercicio4: "",    
    exercicio5: "",
    exercicio6: "",
    exercicio7: "",
    exercicio8: "",
    exercicio9: "",
    data: "",
    codtreino: "",
    codusario: ""
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [planos, setPlanos] = useState([]); 
  const [users, setUsers] = useState([])

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.error('Erro ao recuperar o token:', error);
      return null;
    }
  };

  const validarData = (text) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (text === "" || regex.test(text)) {
      setRegistroTreino({ ...registroTreino, data: text });
    } else {
      Alert.alert("Formato inválido", "A data deve ser no formato DD/MM/AAAA");
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
      setRegistroTreino(response.data); 
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar os planos.');
      console.error(error);
    }
  };

  const buscarUsuario = async () => {
    const token = await getToken();

    if (!token) {
      Alert.alert('Erro', 'Token não encontrado. Faça login novamente.');
      return;
    }

    try {
      const response = await axios.get("http://localhost:3000/usuarios", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRegistroTreino(response.data); 
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar os usuários.');
      console.error(error);
    }
  };

  const inserirRegistrosTreino = async () => {
    const token = await getToken();

    if (!token) {
      Alert.alert('Erro', 'Token não encontrado. Faça login novamente.');
      return;
    }

    axios
      .post(
        "http://localhost:3000/registrotreinos",
        {
            exercicio1: registroTreino.exercicio1,
            exercicio2: registroTreino.exercicio2,
            exercicio3: registroTreino.exercicio3,
            exercicio4: registroTreino.exercicio4,
            exercicio5: registroTreino.exercicio5,
            exercicio6: registroTreino.exercicio6,
            exercicio7: registroTreino.exercicio7,
            exercicio8: registroTreino.exercicio8,
            exercicio9: registroTreino.exercicio9,
            codtreino: registroTreino.codtreino,
            codusario: registroTreino.codusario
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
            exercicio1: "",
            exercicio2: "",    
            exercicio3: "",
            exercicio4: "",    
            exercicio5: "",
            exercicio6: "",
            exercicio7: "",
            exercicio8: "",
            exercicio9: "",
            data: "",
            codtreino: "",
            codusario: ""
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txtheader}>Cadastro de Usuário</Text>
      </View>

      <View style={styles.body}>
        <TextInput
          style={styles.inputs}
          placeholder="Exercício1 "
          value={registroTreino.exercicio1}
          onChangeText={(text) => setRegistroTreino({ ...registroTreino, nome: text })}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Exercício2 "
          value={registroTreino.exercicio2}
          onChangeText={(text) => setRegistroTreino({ ...registroTreino, nome: text })}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Exercício3 "
          value={registroTreino.exercicio3}
          onChangeText={(text) => setRegistroTreino({ ...registroTreino, nome: text })}
        />
                <TextInput
          style={styles.inputs}
          placeholder="Exercício4 "
          value={registroTreino.exercicio4}
          onChangeText={(text) => setRegistroTreino({ ...registroTreino, nome: text })}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Exercício5 "
          value={registroTreino.exercicio5}
          onChangeText={(text) => setRegistroTreino({ ...registroTreino, nome: text })}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Exercício6 "
          value={registroTreino.exercicio6}
          onChangeText={(text) => setRegistroTreino({ ...registroTreino, nome: text })}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Exercício7 "
          value={registroTreino.exercicio7}
          onChangeText={(text) => setRegistroTreino({ ...registroTreino, nome: text })}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Exercício8 "
          value={registroTreino.exercicio8}
          onChangeText={(text) => setRegistroTreino({ ...registroTreino, nome: text })}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Exercício9 "
          value={registroTreino.exercicio9}
          onChangeText={(text) => setRegistroTreino({ ...registroTreino, nome: text })}
        />

        <TextInput
          style={styles.inputs}
          placeholder="Data (DD/MM/AAAA)"
          value={registroTreino.data}
          onChangeText={validarData} 
          keyboardType="numeric"
        />

        <TouchableOpacity 
          style={styles.inputs} 
          onPress={() => {
            buscarPlanos(); 
            setModalVisible(true);
          }}
        >
          <Text style={styles.placeholderText}>
            {registroTreino.codplano ? `Plano: ${registroTreino.codplano}` : "Selecione um plano"}
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
                selectedValue={registroTreino.codplano}
                onValueChange={(itemValue) => {
                  setRegistroTreino({ ...registroTreino, codplano: itemValue });
                  setModalVisible(false);
                }}
                style={styles.picker}
              >
                <Picker.Item label="Selecione um plano" value="" />
                {planos.map((plano) => (
                  <Picker.Item key={plano.id} label={plano.nome} value={plano.id} />
                ))}
              </Picker>
              
            </View>
          </View>
        </Modal>

        <TouchableOpacity 
          style={styles.inputs} 
          onPress={() => {
            buscarUsuario(); 
            setModalVisible(true);
          }}
        >
          <Text style={styles.placeholderText}>
            {registroTreino.codusario ? `Usuário: ${registroTreino.codusario}` : "Selecione um Usuário"}
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
                selectedValue={registroTreino.codusario}
                onValueChange={(itemValue) => {
                  setRegistroTreino({ ...registroTreino, codusario: itemValue });
                  setModalVisible(false);
                }}
                style={styles.picker}
              >
                <Picker.Item label="Selecione um plano" value="" />
                {planos.map((user) => (
                  <Picker.Item key={user.id} label={user.nome} value={user.id} />
                ))}
              </Picker>

            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.btn} onPress={inserirRegistrosTreino}>
          <Text style={styles.txtbtn}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    height: '100%',
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