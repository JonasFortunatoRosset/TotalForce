import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableOpacity, FlatList, Alert, Modal, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import EvilIcons from '@expo/vector-icons/EvilIcons'; 
import axios from 'axios';

export function HomeColaboradorPage({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [filteredUsuarios, setFilteredUsuarios] = useState([]);
  const [planos, setPlanos] = useState([]); 
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedUserCode, setSelectedUserCode] = useState(null);  // Armazenar código do usuário selecionado

  const fetchPlanos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/planos');
      console.log("Resposta da API:", response.data);

      if (Array.isArray(response.data)) {
        setPlanos(response.data);
      } else if (Array.isArray(response.data.Planos)) {
        setPlanos(response.data.Planos); 
      } else {
        console.error('A chave "Planos" não é um array:', response.data);
        Alert.alert('Erro', 'Nenhum plano encontrado.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os planos.');
      console.error(error);
    }
  };
  
  const fetchUsuarios = async () => {
    try {
      const response = await axios.get('http://localhost:3000/usuarios');
      const usuariosData = response.data.usuario; 
      setUsuarios(usuariosData);
      setFilteredUsuarios(usuariosData); 
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  };

  const updateCodPlano = async (novoCodPlano, codusuario) => {
    if (!novoCodPlano || !codusuario) {
      Alert.alert('Erro', 'Plano ou usuário não selecionado corretamente.');
      return;
    }
  
    try {
      const response = await axios.put('http://localhost:3000/usuarios', {
        codigo: codusuario,
        codplano: novoCodPlano,
      });
      
      if (response.status === 200) {
        Alert.alert('Sucesso', 'O plano foi atualizado com sucesso!');
        fetchUsuarios(); // Atualiza a lista de usuários
      }
    } catch (error) {
      console.log("Resposta da API:", codusuario,novoCodPlano);
      console.error('Erro ao atualizar o plano:', error.response?.data || error.message);
      Alert.alert('Erro', `Erro ao atualizar o plano: ${error.response?.data?.message || 'Verifique os dados enviados.'}`);
    }
    
  };
  

  const confirmPlanChange = () => {
    if (selectedPlan && selectedUserCode) {
      updateCodPlano(selectedPlan, selectedUserCode);  // Usando selectedUserCode
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

  const renderItem = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.nome}</Text>
        <Text style={styles.userPlan}>Plano Atual: {item.codplano}</Text>
      </View>
      <TouchableHighlight
        onPress={() => {
          setModalVisible(true);
          setSelectedUserCode(item.codigo);  // Passa o código do usuário selecionado
        }}
        underlayColor={null}
        style={styles.changePlanButton}
      >
        <View style={styles.buttonContent}>
          <MaterialIcons name="edit" size={30} color="#EB6808" />
        </View>
      </TouchableHighlight>
    </View>
  );

  useEffect(() => {
    fetchUsuarios();
    fetchPlanos();
  }, []); 

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

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Picker
            selectedValue={selectedPlan}
            onValueChange={(itemValue) => {
              setSelectedPlan(itemValue);
              console.log('Código do Usuário:', selectedUserCode);  // Exibe o código do usuário no console
              console.log('Plano Selecionado:', itemValue);  // Exibe o plano selecionado no console
            }}
            style={styles.picker}
          >
            <Picker.Item label="Selecione um plano" value="" />
            {Array.isArray(planos) && planos.length > 0 ? (
              planos.map((plano) => (
                <Picker.Item key={plano.codigo} label={plano.nome} value={plano.codigo} />
              ))
            ) : (
              <Picker.Item label="Nenhum plano disponível" value="" />
            )}
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
    width: 300,
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 12,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
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
