import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlight } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export function ListaTreinos({ route, navigation }) {
  const { codplano } = route.params; // Pega o código do plano passado pela outra tela
  const [data, setData] = useState([])

  const BuscarTreinos = async () => {
    try {
      const data = await AsyncStorage.getItem('dadosPlanos');
      if (data !== null) {
        setData(JSON.parse(data)); 
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
        <Text style={styles.txtheader}>Planos</Text>
      </View>

      <View style={styles.body}>
        <TouchableOpacity style={styles.planoButton} onPress={() => navigation.navigate('PlanilhaTreino', {codplano})}>
          <Text style={styles.txtPlano}>
            {data.Treino1}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.planoButton}>
          <Text style={styles.txtPlano}>
            {data.Treino2}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.planoButton}>
          <Text style={styles.txtPlano}>
            {data.Treino3}
          </Text>
        </TouchableOpacity>
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
