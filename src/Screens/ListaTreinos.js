import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ListaTreinos({ navigation }) {
  const [treinos, setTreinos] = useState([]);

  const BuscarTreinos = async () => {
    try {
      const data = await AsyncStorage.getItem('dadosPlanos');
      if (data !== null) {
        const parsedData = JSON.parse(data);
        const treinoList = [];

        // Pega apenas os treinos (Treino1, Treino2, ...)
        Object.keys(parsedData).forEach((key) => {
          if (key.startsWith('Treino')) {
            treinoList.push(parsedData[key]);
          }
        });

        // Ordenar a lista de treinos (caso necessário)
        setTreinos(treinoList.sort()); // Ordena alfabeticamente
      } else {
        console.log('Nenhum dado encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  };

  useEffect(() => {
    BuscarTreinos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight
          style={styles.seta}
          underlayColor={null}
          onPress={() => navigation.navigate('HomePage')}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableHighlight>
        <Text style={styles.txtheader}>Treinos</Text>
      </View>

      <View style={styles.body}>
        {treinos.map((treino, index) => (
          <TouchableOpacity
            key={index}
            style={styles.planoButton}
            onPress={() => navigation.navigate('PlanilhaTreino', { treino, index })}
          >
            <Text style={styles.txtPlano}>{treino}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 30,
  },
  seta: {
    marginRight: 15,
  },
  txtheader: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center', // Centraliza os itens horizontalmente
  },
  planoButton: {
    width: '80%',
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  txtPlano: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#000',
  },
});
