import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export function ListaTreinos({ route, navigation }) {
  const { treinos } = route.params;

  const renderizarTreino = ({ item }) => (
    <TouchableOpacity
        onPress={() => navigation.navigate('PlanilhaTreino', { codtreino: item.codtreino })}
        style={styles.boxnovotreino}
    >
        <Text style={styles.txtTreino}>{item.nome}</Text>
    </TouchableOpacity>

  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight
          style={styles.seta}
          underlayColor={null}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableHighlight>
        <Text style={styles.txtHeader}>TREINOS</Text>
      </View>


      <FlatList
        data={treinos}
        keyExtractor={(item) => item.id.toString()}
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
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E49413',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 30,
    elevation: 4,
  },
  seta: {
    marginRight: 15,
  },
  txtHeader: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  lista: {
    width: '100%',
    alignItems: 'center',
  },
  treinoContainer: {
    backgroundColor: '#E49413',
    padding: 15,
    marginVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    width: '80%',
    elevation: 2,
  },
  txtTreino: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});
