import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, FlatList, Alert, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Entypo from '@expo/vector-icons/Entypo';
import logoTotal from './Images/logoTotal.png';
import axios from 'axios';

export function HomeColaboradorPage({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [planos, setPlanos] = useState([]); 
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const buscarPlanos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/planos");
      setPlanos(response.data); 
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar os planos.');
      console.error(error);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuarios');
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const updateCodPlano = async (usuarioId, novoCodPlano) => {
    try {
      await axios.put(`http://localhost:3000/usuarios/${usuarioId}`, { codplano: novoCodPlano });
      Alert.alert('Sucesso', 'O plano foi atualizado com sucesso!');
      fetchUsuarios(); 
    } catch (error) {
      console.error('Erro ao atualizar o plano:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o plano.');
    }
  };

  const handlePlanChange = (usuarioId) => {
    setSelectedUserId(usuarioId);
    setModalVisible(true);
  };

  const confirmPlanChange = () => {
    if (selectedPlan) {
      updateCodPlano(selectedUserId, selectedPlan);
      setModalVisible(false);
    } else {
      Alert.alert('Erro', 'Por favor, selecione um plano.');
    }
  };

  useEffect(() => {
    fetchUsuarios();
    buscarPlanos();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.nome}</Text>
        <Text style={styles.userPlan}>Plano Atual: {item.codplano}</Text>
      </View>
      <TouchableHighlight 
        onPress={() => handlePlanChange(item.id)} 
        underlayColor={'#855200'} 
        style={styles.changePlanButton}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>Alterar Plano</Text>
          <Entypo name="cog" size={30} color="black" />
        </View>
      </TouchableHighlight>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txtheader}>ACADEMIA TOTAL FORCE</Text>
        <EvilIcons name="user" size={60} color="black" />
      </View>
      <View style={styles.body}>
        <FlatList
          data={usuarios}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()} 
        />
      </View>
      <View style={styles.footer}>
        <Image style={styles.imgFooter} source={logoTotal} />
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Picker
            selectedValue={selectedPlan}
            onValueChange={(itemValue) => setSelectedPlan(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione um plano" value="" />
            {planos.map((plano) => (
              <Picker.Item key={plano.id} label={plano.nome} value={plano.id} />
            ))}
          </Picker>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={confirmPlanChange} style={styles.button}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.button}>
              <Text style={styles.buttonText}>Cancelar</Text>
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
    width: '100%',
    backgroundColor: '#E49413',
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
    borderRadius: 12,
    marginTop: 25,
  },
  txtheader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  body: {
    backgroundColor: '#FFB031',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userCard: {
    width: '90%',
    backgroundColor: '#E49413',
    padding: 15,
    marginVertical: 10,
    borderRadius: 12,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  userPlan: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  changePlanButton: {
    borderRadius: 12,
  },
  buttonContent: {
    backgroundColor: '#E49413',
    padding: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginRight: 5,
  },
  footer: {
    width: '100%',
    backgroundColor: '#E49413',
    padding: 20,
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  imgFooter: {
    width: 120,
    height: 60,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  picker: {
    width: 300,
    height: 50,
    marginVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  button: {
    backgroundColor: '#E49413',
    padding: 10,
    borderRadius: 12,
    elevation: 4,
  },
});

