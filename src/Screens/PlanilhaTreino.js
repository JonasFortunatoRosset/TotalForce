import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { apiRoute } from '../../apiRoute';

export function PlanilhaExercicios({ route, navigation }) {
  const { treino, index } = route.params; // Recebe o treino e o índice
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [codtreino, setCodtreino] = useState(null); // Armazena o codtreino

  const BuscarExercicios = async () => {
    try {
      const storedData = await AsyncStorage.getItem('dadosPlanos');
      if (storedData) {
        const parsedData = JSON.parse(storedData);

        // Determinar qual lista de exercícios carregar com base no índice
        const exerciseKey = `Exercicio${index + 1}`; // Gera 'Exercicio1', 'Exercicio2', etc.
        const exercises = parsedData[exerciseKey];

        if (exercises) {
          const enrichedExercises = exercises.map((exercise, idx) => ({
            id: idx + 1,
            nome: exercise.nome,
            carga: '', // Adiciona o campo de carga como vazio
          }));

          setData(enrichedExercises);

          // Define o codtreino do primeiro exercício
          if (exercises.length > 0) {
            setCodtreino(exercises[0].codtreino); // Obtém o codtreino do primeiro exercício
          }
        } else {
          console.log('Nenhum exercício encontrado para o índice fornecido.');
        }
      } else {
        console.log('Nenhum dado encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  };

  const handleCargaChange = (value, exerciseId) => {
    const updatedData = data.map((item) =>
      item.id === exerciseId ? { ...item, carga: value } : item
    );
    setData(updatedData);  // Atualiza o estado com a nova lista
  };

  const enviarResultado = async () => {
    const formattedData = data.reduce((acc, exercise, idx) => {
      // Converte as cargas para float (caso estejam como strings)
      acc[`exercicio${idx + 1}`] = parseFloat(exercise.carga) || 0; // Se a carga não for válida, coloca 0
      return acc;
    }, {});
    
    const codusuario = await AsyncStorage.getItem('codusuario');

    // Formata a data para o formato YYYY-MM-DD
    formattedData.data = selectedDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    formattedData.codtreino = codtreino; // Usa o codtreino do primeiro exercício
    formattedData.codusuario = codusuario; // Substitua pelo código real do usuário

    try {
      const response = await axios.post(`http://${apiRoute}:3000/resultadousuarios`, {
        ...formattedData,
      });
      if (response.status === 200) {
        alert('Dados enviados com sucesso!');
      } else {
        alert('Erro ao enviar os dados.');
      }
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  useEffect(() => {
    BuscarExercicios();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.planoButton}>
      <Text style={styles.txtPlano}>{item.nome}</Text>
      <TextInput
        style={styles.cargaInput}
        placeholder="Carga"
        keyboardType="numeric"
        value={item.carga ? item.carga.toString() : ''} // Garante que a carga será exibida corretamente
        onChangeText={(value) => handleCargaChange(value, item.id)}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.seta}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.txtheader}>Treino: {treino}</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()} // Usando o índice como chave única
        contentContainerStyle={styles.body}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.buttonText}>Selecionar Data</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowDatePicker(false);
              if (date) setSelectedDate(date);
            }}
          />
        )}
        <Text style={styles.selectedDateText}>
          Data selecionada: {selectedDate.toLocaleDateString()}
        </Text>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={enviarResultado}
        >
          <Text style={styles.confirmButtonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4E9E3',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  seta: {
    marginRight: 10,
  },
  txtheader: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#EA5D04',
  },
  planoButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: '100%',
  },
  txtPlano: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  cargaInput: {
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    width: 80,
    height: 40,
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
  },
  dateButton: {
    backgroundColor: '#FF914C',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: '#EA5D04',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
