import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';

export function ListaTreinos({ route, navigation }) {
  const { codplano } = route.params; // Pega o código do plano passado pela outra tela
  const [treinos, setTreinos] = useState([]); 

  const BuscarTreinos = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/pesquisartreinos?codplano=${codplano}`); // faz a requisição de acordo com o codplano
      const treinoData = response.data.Treinos;
      setTreinos(treinoData); 
    } catch (error) {
      console.error("Erro ao buscar treinos:", error);
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
        <Text style={styles.txtheader}>Planos</Text>
      </View>

      <View style={styles.body}>
        <FlatList
          data={treinos}
          keyExtractor={(item) => item.codigo.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              onPress={() => navigation.navigate('PlanilhaTreino', { codTreino: item.codigo, codplano })} // passa o código do plano e do treino para a outra tela
              style={styles.planoButton}
            >
              <Text style={styles.txtPlano}>{item.nome}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFB031',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 30,
    elevation: 4,
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
  },
  planoButton: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E49413',
    elevation: 4,
  },
  txtPlano: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
});
