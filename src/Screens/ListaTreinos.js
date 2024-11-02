import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

export function ListaTreinos({ route, navigation }) {
  const { codplano } = route.params;  

  const renderizarTreino = ({ item }) => (
    <TouchableOpacity
      style={styles.treinoButton}
      onPress={() => navigation.navigate('PlanilhaTreino', { exercicios: item.exercicios })}
    >
      <Text style={styles.txtTreino}>{item.nome}</Text>
    </TouchableOpacity>
  );
  

  return (
    <View style={styles.container}>
      <FlatList
        data={treinos}
        keyExtractor={(item) => item.codigo.toString()}
        renderItem={renderizarTreino}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB031',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  lista: {
    alignItems: 'center',
  },
  treinoButton: {
    backgroundColor: '#E49413',
    padding: 15,
    marginVertical: 10,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
    elevation: 4,
  },
  txtTreino: {
    fontSize: 20,
    color: '#000',
  },
});
