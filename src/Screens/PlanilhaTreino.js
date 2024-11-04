import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet, FlatList, Alert, ScrollView } from 'react-native';
import axios from 'axios';

export function PlanilhaExercicios({ route, navigation }) {
  // Recebe codtreino e codusuario da tela anterior
  const { codtreino, codusuario } = route.params;

  const [cargas, setCargas] = useState({});
  const [repeticoes, setRepeticoes] = useState({});
  const [data, setData] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [exercicioModal, setExercicioModal] = useState(null);
  const [exercicios, setExercicios] = useState([]);

  const BuscarExercicios = async () => {
    try {
      //  requisição para buscar exercícios de acordo codtreino
      const response = await axios.get(`http://localhost:3000/pesquisarexercicios?codtreino=${codtreino}`);
      
      // filtra os exercícios que correspondem ao codtreino
      const exerciciosFiltrados = [
        ...(response.data.Exercicio1 || []),
        ...(response.data.Exercicio2 || []),
        ...(response.data.Exercicio3 || [])
      ].filter(exercicio => exercicio.codtreino === codtreino);

      setExercicios(exerciciosFiltrados); // Define a lista de exercícios
    } catch (error) {
      console.error("Erro ao buscar exercícios:", error);
    }
  };

  useEffect(() => {
    BuscarExercicios();
  }, []);

  // Função para atualizar o valor das cargas de um exercício específico
  const handleCargaChange = (codigo, valor) => {
    setCargas({ ...cargas, [codigo]: valor });
  };

  // Função para atualizar o valor das repetições de um exercício específico
  const handleRepeticoesChange = (codigo, valor) => {
    setRepeticoes({ ...repeticoes, [codigo]: valor });
  };

  const abrirModal = (exercicio) => {
    setExercicioModal(exercicio);
    setModalVisible(true);
  };

  const fecharModal = () => setModalVisible(false);

  const salvarTreino = async () => {
    // Verifica se a data está no formato correto
    if (data.length !== 8) { 
      Alert.alert('Erro', 'Por favor, insira a data no formato ddMMyyyy.');
      return;
    }

    // Cria o payload com codtreino, codusuario, data, cargas e repetições
    const payload = {
      codtreino,
      codusuario,
      data,
      ...Object.keys(cargas).reduce((acc, codigo, index) => ({
        ...acc,
        [`exercicio${index + 1}`]: {
          carga: cargas[codigo] || 0,
          repeticoes: repeticoes[codigo] || 0
        }
      }), {}),
    };

    try {
      // Envia o payload para o backend 
      await axios.post('http://localhost:3000/resultadousuarios', payload);
      Alert.alert('Sucesso', 'Treino salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar treino:', error);
      Alert.alert('Erro', 'Não foi possível salvar o treino.');
    }
  };

  // Função de renderização de cada exercício na lista com entrada de dados para carga e repetições
  const renderExercicio = ({ item }) => (
    <View style={styles.exercicioRow}>
      <TouchableOpacity onPress={() => abrirModal(item)} style={styles.exercicioButton}>
        <Text style={styles.exercicioNome}>{item.nome}</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Carga"
        style={styles.inputCarga}
        keyboardType="numeric"
        value={cargas[item.codigo] || ''}
        onChangeText={(valor) => handleCargaChange(item.codigo, valor)}
      />
      <TextInput
        placeholder="Repetições"
        style={styles.inputRepeticoes}
        keyboardType="numeric"
        value={repeticoes[item.codigo] || ''}
        onChangeText={(valor) => handleRepeticoesChange(item.codigo, valor)}
      />
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.txtheader}>Exercícios do Treino {codtreino}</Text>
            </View>
      
      <FlatList
        data={exercicios}
        renderItem={renderExercicio}
        keyExtractor={(item) => item.codigo.toString()}
        contentContainerStyle={styles.lista}
      />
      
      <TextInput
        placeholder="Data (ddMMyyyy)"
        style={styles.inputData}
        maxLength={8}
        keyboardType="numeric"
        value={data}
        onChangeText={setData}
      />
      

      <TouchableOpacity style={styles.btn} onPress={salvarTreino} >
        <Text style={styles.txtbtn}> Salvar </Text>
      </TouchableOpacity> 

      <Modal visible={modalVisible} transparent={true} animationType="slide">  {/* modal com detalhes do exercício */}
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={fecharModal} style={styles.closeModalButton}>
            <Text style={styles.closeModalText}>X</Text>
          </TouchableOpacity>
          {exercicioModal && (
            <>
              <Text style={styles.modalExercicioNome}>{exercicioModal.nome}</Text>
              <Text>Descrição: {exercicioModal.descricao}</Text>
              {exercicioModal.video && (
                <>
                  <Text>Vídeo:</Text>
                  <Text>{exercicioModal.video}</Text>
                </>
              )}
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
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
    marginTop: 30,
},
txtheader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10, 
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
    textAlign: 'center',
  },
  inputData: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    fontSize: 18,
    textAlign: 'center',
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
  modalExercicioNome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
});
