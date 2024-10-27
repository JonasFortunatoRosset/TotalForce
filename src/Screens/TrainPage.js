import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Alert, TouchableHighlight } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function TrainPage({ navigation }) {
  const [planos, setPlanos] = useState([]); 
  const [codPlanoUsuario, setCodPlanoUsuario] = useState(null); 

  
  const carregarPlanos = async () => {
    try {
      const codigo = await AsyncStorage.getItem('codigo'); 
      if (codigo) {
       
        const [resPlanos, resUsuario] = await Promise.all([
          axios.get('http://localhost:3000/planos'), 
          axios.get(`http://localhost:3000/usuarios/${JSON.parse(codigo)}`), 
        ]);

        setPlanos(resPlanos.data); 
        setCodPlanoUsuario(resUsuario.data.codplano); 
      } else {
        Alert.alert('Erro', 'Usuário não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao carregar planos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os planos.');
    }
  };

  useEffect(() => {
    carregarPlanos();
  }, []);


  const renderizarPlano = ({ item }) => {
    const planoLiberado = item.codplano === codPlanoUsuario; 

    return (
      <TouchableOpacity
        style={[
          styles.planoButton,
          planoLiberado ? styles.planoLiberado : styles.planoBloqueado,
        ]}
        onPress={() =>
          planoLiberado
            ? navigation.navigate('ListaTreinos', { treinos: item.treinos }) 
            : Alert.alert('Plano Bloqueado', 'Este plano não está disponível para você.')
        }
      >
        <Text style={styles.txtPlano}>{item.nome}</Text>
        {!planoLiberado && (
          <MaterialCommunityIcons name="lock" size={24} color="black" style={styles.cadeado} />
        )}
      </TouchableOpacity>
    );
  };

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
        <Text style={styles.txtheader}>PLANOS</Text>
      </View>

      <FlatList
        data={planos}
        keyExtractor={(item) => item.codplano.toString()} 
        renderItem={renderizarPlano}
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
  txtheader: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  lista: {
    alignItems: 'center',
  },
  planoButton: {
    width: '80%',
    padding: 15,
    marginVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 4,
  },
  planoLiberado: {
    backgroundColor: '#E49413',
  },
  planoBloqueado: {
    backgroundColor: '#855200',
  },
  txtPlano: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
  cadeado: {
    marginLeft: 10,
  },
});
