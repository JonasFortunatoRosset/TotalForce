import React, { useEffect, useState } from 'react';
import {StyleSheet,Text,View,Image,TouchableHighlight,TouchableOpacity,FlatList,Alert,Modal,} from 'react-native';
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
      const response = await axios.get('http://localhost:3000/planos');
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

  const updateCodPlano = async (codigo, novoCodPlano) => {
    try {
      await axios.put(`http://localhost:3000/usuarios/${codigo}`, {
        codplano: novoCodPlano,
      });
      Alert.alert('Sucesso', 'O plano foi atualizado com sucesso!');
      fetchUsuarios();
    } catch (error) {
      console.error('Erro ao atualizar o plano:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o plano.');
    }
  };

  const handlePlanChange = (codigo) => {
    setSelectedUserId(codigo);
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
        <Text style={styles.userName}>Código: {item.codigo}</Text>
        <Text style={styles.userName}>Aluno: {item.nome}</Text>
        <Text style={styles.userPlan}>Plano Atual: {item.codplano}</Text>
      </View>
      <TouchableHighlight
        onPress={() => handlePlanChange(item.codigo)}
        underlayColor={'#D87D0E'}
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
        <Text style={styles.txtHeader}>ACADEMIA TOTAL FORCE</Text>
        <EvilIcons name="user" size={60} color="black" />
      </View>
      <View style={styles.body}>
        <FlatList
          data={usuarios}
          renderItem={renderItem}
          keyExtractor={(item) => item.codigo.toString()}
          contentContainerStyle={styles.listContainer}
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
              <Picker.Item
                key={plano.codigo}
                label={plano.nome}
                value={plano.codigo}
              />
            ))}
          </Picker>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={confirmPlanChange} style={styles.button}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.button}
            >
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
    backgroundColor: '#FFB031',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E49413',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  txtHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    paddingBottom: 20,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  userPlan: {
    fontSize: 16,
    marginTop: 5,
    color: '#333',
  },
  changePlanButton: {
    borderRadius: 12,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 5,
  },
  footer: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#E49413',
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
    backgroundColor: '#FFB031',
    borderRadius: 12,
    elevation: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#E49413',
    padding: 10,
    borderRadius: 12,
    elevation: 4,
  },
});
