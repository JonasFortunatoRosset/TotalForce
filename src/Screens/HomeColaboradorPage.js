import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity, FlatList, Alert, Modal, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import EvilIcons from '@expo/vector-icons/EvilIcons'; 
import logoTotal from './Images/logoTotal.png';
import axios from 'axios';

export function HomeColaboradorPage({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [planos, setPlanos] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchText, setSearchText] = useState('');

  const buscarPlanos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/planos');
      console.log('Dados dos planos:', response.data); 
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
      setFilteredUsuarios(response.data); 
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

  const filterUsuarios = (text) => {
    setSearchText(text);
    if (text === '') {
      setFilteredUsuarios(usuarios); 
    } else {
      const filteredData = usuarios.filter((usuario) =>
        usuario.nome.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredUsuarios(filteredData);
    }
  };

  useEffect(() => {
    fetchUsuarios();
    buscarPlanos();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>Aluno: {item.nome}</Text>
        <Text style={styles.userPlan}>Plano Atual: {item.codplano}</Text>
      </View>
      <TouchableHighlight
        onPress={() => handlePlanChange(item.codigo)}
        underlayColor={null}
        style={styles.changePlanButton}
      >
        <View style={styles.buttonContent}>
          <MaterialIcons name="edit" size={30} color="black" />
        </View>
      </TouchableHighlight>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.txtHeader}>ACADEMIA TOTAL FORCE</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Pesquisar aluno pelo nome"
            value={searchText}
            onChangeText={filterUsuarios}
          />
          <EvilIcons name="search" size={24} color="black" style={styles.searchIcon} />
        </View>

        <FlatList
          data={filteredUsuarios}
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
            {Array.isArray(planos) && planos.map((plano) => (
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
    backgroundColor: '#FF9756',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 22,
    backgroundColor: '#FF9756',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  txtHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF9756',
    borderRadius: 8,
    width: '90%',
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginVertical: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 8,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingBottom: 20,
  },
  userCard: {
    width: '90%',
    backgroundColor: '#FF9756',
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
    backgroundColor: '#FF9756',
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
    backgroundColor: '#fff',
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
    backgroundColor: '#FF9756',
    padding: 10,
    borderRadius: 12,
    elevation: 4,
  },
});
