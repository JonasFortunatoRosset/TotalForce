import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, TouchableOpacity, StyleSheet, FlatList, Alert, ScrollView } from 'react-native';
import axios from 'axios';

export function PlanilhaExercicios({ route, navigation }) {
  // Recebe codtreino e codusuario da tela anterior
  const { codusuario } = route.params;
  const [data, setData] = useState([])

  const BuscarExercicios = async () => {
    try {
      const data = await AsyncStorage.getItem('dadosPlanos');
      if (data !== null) {
        setData(JSON.parse(data).Exercicio1); 
      } else {
        console.log('Nenhum dado encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.exerciseCard}>
      <Text style={styles.exerciseName}>{item.nome}</Text>
      <Text>Descrição: {item.descricao}</Text>
      <Text>Séries: {item.serie}</Text>
      <Text>Repetições: {item.repeticoes}</Text>
      <Text>Vídeo: {item.video}</Text>
    </View>
  );

  useEffect(() => {
    BuscarExercicios();
  }, []);



  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.txtheader}>Exercícios do Treino {codtreino}</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.codigo.toString()}
        contentContainerStyle={styles.list}
      />
      
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
list: {
  paddingVertical: 20,
},
exerciseCard: {
  backgroundColor: '#fff',
  padding: 15,
  borderRadius: 8,
  marginBottom: 10,
  elevation: 3,
},
exerciseName: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 5,
},
});


