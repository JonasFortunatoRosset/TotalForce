import { StyleSheet, Text, View, ScrollView, TextInput, Alert, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons'; 
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { apiRoute } from '../../../../apiRoute';

export function CadastroRegistroTreino() {
  const navigation = useNavigation();
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
    exercicio10: "",
    exercicio11: "",
    data: "",
    codplano: "",
    codusario: ""
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [planos, setPlanos] = useState([]); 
  const [users, setUsers] = useState([]);

  const validarData = (text) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (text === "" || regex.test(text)) {
      setRegistroTreino({ ...registroTreino, data: text });
    } else {
      Alert.alert("Formato inválido", "A data deve ser no formato DD/MM/AAAA");
    }
  };

  const buscarPlanos = async () => {
    try {
      const response = await axios.get(`http://${apiRoute}:3000/planos`);
      setPlanos(response.data); 
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar os planos.');
      console.error(error);
    }
  };

  const buscarUsuario = async () => {
    try {
      const response = await axios.get(`http://${apiRoute}:3000/usuarios`);
      setUsers(response.data); 
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar os usuários.');
      console.error(error);
    }
  };

  const inserirRegistrosTreino = async () => {
    axios.post(`http://${apiRoute}:3000/resultadousuarios`,
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
            exercicio10: registroTreino.exercicio10,
            exercicio11: registroTreino.exercicio11,
            data: registroTreino.data,
            codplano: registroTreino.codplano,
            codusario: registroTreino.codusario
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(() => {
        Alert.alert("Sucesso", "Usuário foi cadastrado");
        setRegistroTreino({
          exercicio1: "",
          exercicio2: "",    
          exercicio3: "",
          exercicio4: "",    
          exercicio5: "",
          exercicio6: "",
          exercicio7: "",
          exercicio8: "",
          exercicio9: "",
          exercicio10: "",
          exercicio11: "",
          data: "",
          codplano: "",
          codusario: ""
        });
        setModalVisible(false);
      })
      .catch((error) => {
        Alert.alert("Erro", "Não foi possível cadastrar o usuário");
        console.error(error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.txtheader}>Cadastro de Registro de Treino</Text>
      </View>

      <View style={styles.body}>
        {[...Array(11)].map((_, index) => (
          <TextInput
            key={index}
            style={styles.inputs}
            placeholder={`Exercício ${index + 1}`}
            value={registroTreino[`exercicio${index + 1}`]}
            onChangeText={(text) => setRegistroTreino({ ...registroTreino, [`exercicio${index + 1}`]: text })}
          />
        ))}

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
                <Picker.Item label="Selecione um usuário" value="" />
                {users.map((user) => (
                  <Picker.Item key={user.codigo} label={user.nome} value={user.codigo} />
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    paddingLeft: 15,
    paddingRight: 10,
  },
  txtheader: {
    fontSize: 20,
  },
  body: {
    backgroundColor: '#E49413',
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
