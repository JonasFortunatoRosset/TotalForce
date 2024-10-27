import React, { useState } from 'react';
import { View, Text, TextInput, Button, Modal, TouchableOpacity, StyleSheet, FlatList, Alert, ScrollView } from 'react-native';
import axios from 'axios';

export function PlanilhaExercicios({ route, navigation }) {
  const { codtreino, codplano, exercicios } = route.params;
  const [cargas, setCargas] = useState({});
  const [data, setData] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [exercicioModal, setExercicioModal] = useState(null);

  const handleCargaChange = (index, valor) => {
    setCargas({ ...cargas, [`exercicio${index + 1}`]: valor });
  };

  const abrirModal = (exercicio) => {
    setExercicioModal(exercicio);
    setModalVisible(true);
  };


  const salvarTreino = async () => {
    if (data.length !== 8) {
      Alert.alert('Erro', 'Por favor, insira a data no formato ddMMyyyy.');
      return;
    }

    const payload = {
      codtreino,
      codplano,
      data,
      ...cargas, 
    };

    try {
      await axios.post('http://localhost:3000/resultadodousuarios', payload);
      Alert.alert('Sucesso', 'Treino salvo com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar treino:', error);
      Alert.alert('Erro', 'Não foi possível salvar o treino.');
    }
  };

  const renderExercicio = ({ item, index }) => (
    <View style={styles.exercicioRow}>
      <TouchableOpacity onPress={() => abrirModal(item)} style={styles.exercicioButton}>
        <Text style={styles.exercicioNome}>{item.nome}</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Carga"
        style={styles.inputCarga}
        keyboardType="numeric"
        value={cargas[`exercicio${index + 1}`] || ''}
        onChangeText={(valor) => handleCargaChange(index, valor)}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Exercícios</Text>
      <FlatList
        data={exercicios}
        renderItem={renderExercicio}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.lista}
      />
      <TextInput
        placeholder="Data (ddMMyyyy)"
        style={styles.inputData}
        maxLength={4}
        keyboardType="numeric"
        value={data}
        onChangeText={setData}
      />
      <Button title="Salvar Treino" onPress={salvarTreino} />

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeModalButton}>
            <Text style={styles.closeModalText}>X</Text>
          </TouchableOpacity>
          {exercicioModal && (
            <>
              <Text style={styles.exercicioNome}>{exercicioModal.nome}</Text>
              <Text>Descrição: {exercicioModal.descricao}</Text>
              <Text>Vídeo:</Text>
              <Text>{exercicioModal.videoURL}</Text>
            </>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFB031',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  lista: {
    paddingBottom: 20,
  },
  exercicioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    backgroundColor: '#E49413',
    padding: 10,
    borderRadius: 8,
  },
  exercicioButton: {
    flex: 1,
  },
  exercicioNome: {
    fontSize: 18,
    color: '#fff',
  },
  inputCarga: {
    width: 80,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  inputData: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  closeModalButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  closeModalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
